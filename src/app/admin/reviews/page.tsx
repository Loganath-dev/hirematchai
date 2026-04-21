"use client";

import { useState } from "react";
import { Star, Lock, BarChart2 } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  message: string;
  created_at: string;
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={`w-4 h-4 ${s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`} />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const [password, setPassword] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/reviews?password=${encodeURIComponent(password)}`);
      if (res.status === 401) { setError("Wrong password."); setLoading(false); return; }
      const data = await res.json();
      setReviews(data.reviews || []);
      setUnlocked(true);
    } catch {
      setError("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  // Stats
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "—";
  const ratingCounts = [5,4,3,2,1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    pct: reviews.length ? Math.round((reviews.filter(r => r.rating === star).length / reviews.length) * 100) : 0
  }));

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#2557a7]/10 p-2.5 rounded-xl">
              <Lock className="w-5 h-5 text-[#2557a7]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Admin Access</h1>
              <p className="text-xs text-gray-400">HireMatch AI Reviews Dashboard</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2557a7]"
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit" disabled={loading}
              className="w-full bg-[#2557a7] hover:bg-[#1b4383] text-white font-bold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
            >
              {loading ? "Checking…" : "View Reviews"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center gap-3 mb-8">
        <BarChart2 className="w-6 h-6 text-[#2557a7]" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews Dashboard</h1>
          <p className="text-sm text-gray-500">{reviews.length} total review{reviews.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center gap-5">
          <div className="text-5xl font-extrabold text-gray-900">{avgRating}</div>
          <div>
            <StarDisplay rating={Math.round(Number(avgRating))} />
            <p className="text-xs text-gray-400 mt-1">Average rating</p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-1.5">
          {ratingCounts.map(({ star, count, pct }) => (
            <div key={star} className="flex items-center gap-2 text-sm">
              <span className="text-gray-500 w-4 text-right">{star}</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-gray-400 w-6 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <div className="text-center py-16 text-gray-400">No reviews yet.</div>
      ) : (
        <div className="space-y-3">
          {reviews.map(review => (
            <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{review.name || "Anonymous"}</p>
                  <StarDisplay rating={review.rating} />
                </div>
                <p className="text-xs text-gray-400 flex-shrink-0">
                  {new Date(review.created_at).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric"
                  })}
                </p>
              </div>
              {review.message && (
                <p className="text-sm text-gray-600 leading-relaxed mt-2 italic">"{review.message}"</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
