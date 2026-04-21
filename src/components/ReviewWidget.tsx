"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export function ReviewWidget() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { setError("Please select a star rating."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, message }),
      });
      if (res.ok) setSubmitted(true);
      else setError("Failed to submit. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto w-full mb-16 px-4">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🙏</div>
          <h3 className="text-xl font-bold text-green-800 mb-1">Thank you for your feedback!</h3>
          <p className="text-sm text-green-600">Your review helps us improve HireMatch AI for everyone.</p>
          <div className="flex justify-center gap-1 mt-3">
            {[1,2,3,4,5].map(s => (
              <Star key={s} className={`w-5 h-5 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full mb-16 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Rate HireMatch AI</h2>
            <p className="text-sm text-gray-500">Your feedback helps us improve. Takes 20 seconds.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Stars */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Your Rating *</label>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(star => (
                <button
                  key={star} type="button"
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star className={`w-8 h-8 transition-colors ${star <= (hover || rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`} />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-gray-500">
                  {["","Poor","Fair","Good","Very Good","Excellent"][rating]}
                </span>
              )}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Arjun K."
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2557a7]"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">What did you think?</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Tell us what worked well or what we can improve..."
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2557a7] resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <button
            type="submit" disabled={loading}
            className="bg-[#2557a7] hover:bg-[#1b4383] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
