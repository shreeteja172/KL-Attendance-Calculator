import { useState } from "react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_ACCESS_KEY,
          name: data.name,
          email: data.email,
          message: data.message,
          subject: "New Feedback - KL Attendance Calculator",
        }),
      });
      //   console.log(import.meta.env.VITE_ACCESS_KEY);

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          setData({ name: "", email: "", message: "" });
          setSubmitted(false);
          onClose();
        }, 2500);
      } else {
        setError("Failed to send. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err) {
      setError("Network error. Please check your connection." + err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-(--color-card) border border-(--color-border) rounded-xl shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-(--color-muted)/30 transition-colors"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-(--color-muted-foreground)"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-(--color-foreground) mb-2">
            Share Your Feedback
          </h2>
          <p className="text-sm text-(--color-muted-foreground)">
            Have suggestions or found a bug? Let me know!
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-(--color-success)/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-(--color-success)"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-(--color-foreground) mb-2">
              Thank you!
            </p>
            <p className="text-sm text-(--color-muted-foreground)">
              Your feedback has been sent successfully!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-(--color-destructive)/10 border border-(--color-destructive)/30">
                <p className="text-sm text-(--color-destructive)">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-(--color-foreground)"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
                className="w-full h-11 rounded border-2 border-(--color-border) bg-(--color-input) px-4 text-sm text-(--color-foreground) placeholder:text-(--color-muted-foreground) focus:outline-none focus:border-(--color-primary) transition-colors"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-(--color-foreground)"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
                className="w-full h-11 rounded border-2 border-(--color-border) bg-(--color-input) px-4 text-sm text-(--color-foreground) placeholder:text-(--color-muted-foreground) focus:outline-none focus:border-(--color-primary) transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-(--color-foreground)"
              >
                Message
              </label>
              <textarea
                id="message"
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
                required
                rows={5}
                className="w-full rounded border-2 border-(--color-border) bg-(--color-input) px-4 py-3 text-sm text-(--color-foreground) placeholder:text-(--color-muted-foreground) focus:outline-none focus:border-(--color-primary) transition-colors resize-none"
                placeholder="Share your suggestions, feedback, or report issues..."
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 h-11 rounded bg-(--color-muted) text-sm font-medium text-(--color-foreground) hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-11 rounded bg-(--color-primary) text-sm font-semibold text-(--color-primary-foreground) hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Feedback"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
