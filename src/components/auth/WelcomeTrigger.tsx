"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/utils/supabase";

/**
 * This component runs on every page.
 * It checks if a user is logged in and triggers the welcome email API.
 * The API itself handles the logic to ensure the email is only sent once.
 */
export function WelcomeTrigger() {
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (triggeredRef.current) return;

    const checkAndTrigger = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        triggeredRef.current = true;
        
        try {
          // Trigger the welcome email API
          await fetch("/api/send-welcome", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: session.user.email,
              name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0],
              userId: session.user.id
            }),
          });
        } catch (err) {
          console.error("Failed to trigger welcome email:", err);
        }
      }
    };

    checkAndTrigger();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user && !triggeredRef.current) {
        checkAndTrigger();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return null; // This component doesn't render anything
}
