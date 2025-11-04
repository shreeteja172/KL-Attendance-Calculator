import { useState } from "react";

interface AttendanceFormProps {
  onCalculate: (totalConducted: number, totalAttended: number) => void;
}

const AttendanceForm = ({ onCalculate }: AttendanceFormProps) => {
  const [totalConducted, setTotalConducted] = useState("");
  const [totalAttended, setTotalAttended] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const conducted = parseInt(totalConducted);
    const attended = parseInt(totalAttended);

    if (!totalConducted || !totalAttended) {
      setError("Please fill in both fields");
      return;
    }

    if (isNaN(conducted) || isNaN(attended)) {
      setError("Please enter valid numbers");
      return;
    }

    if (conducted <= 0) {
      setError("Total classes must be greater than 0");
      return;
    }

    if (attended < 0) {
      setError("Classes attended cannot be negative");
      return;
    }

    if (attended > conducted) {
      setError("You can't attend more classes than were conducted!");
      return;
    }

    onCalculate(conducted, attended);
  };

  return (
    <div className="border border-(--color-border) rounded-lg p-6 sm:p-10 bg-(--color-card)">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-primary)/10">
            <span className="text-sm font-bold text-(--color-primary)">1</span>
          </div>
          <h2 className="text-lg sm:text-xl font-semibold text-(--color-foreground)">
            Enter your current attendance
          </h2>
        </div>
        <p className="text-sm sm:text-base text-(--color-muted-foreground) leading-relaxed ml-0 sm:ml-10">
          Start by entering how many classes have been conducted and how many
          you've attended so far
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <label
              htmlFor="totalConducted"
              className="text-base font-medium text-(--color-foreground) flex items-center gap-2"
            >
              Total classes conducted
              <span className="text-xs text-(--color-muted-foreground) font-normal">
                (till today)
              </span>
            </label>
            <input
              type="number"
              id="totalConducted"
              value={totalConducted}
              onChange={(e) => setTotalConducted(e.target.value)}
              min="0"
              className="h-12 sm:h-14 w-full rounded border-2 border-(--color-border) bg-(--color-input) px-4 sm:px-5 text-base sm:text-lg text-(--color-foreground) placeholder:text-(--color-muted-foreground) focus:outline-none focus:border-(--color-primary) transition-colors"
            />
            <p className="text-xs text-(--color-muted-foreground) mt-1">
              Total number of classes that happened
            </p>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="totalAttended"
              className="text-base font-medium text-(--color-foreground) flex items-center gap-2"
            >
              Classes you attended
              <span className="text-xs text-(--color-muted-foreground) font-normal">
                (so far)
              </span>
            </label>
            <input
              type="number"
              id="totalAttended"
              value={totalAttended}
              onChange={(e) => setTotalAttended(e.target.value)}
              min="0"
              className="h-12 sm:h-14 w-full rounded border-2 border-(--color-border) bg-(--color-input) px-4 sm:px-5 text-base sm:text-lg text-(--color-foreground) placeholder:text-(--color-muted-foreground) focus:outline-none focus:border-(--color-primary) transition-colors"
            />
            <p className="text-xs text-(--color-muted-foreground) mt-1">
              How many classes you were present for
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-6 p-4 rounded-lg bg-(--color-destructive)/10 border border-(--color-destructive)/30">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-(--color-destructive) shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm font-medium text-(--color-destructive)">
                {error}
              </p>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="cursor-pointer mt-6 sm:mt-8 w-full h-12 sm:h-14 rounded bg-(--color-primary) text-base sm:text-lg font-semibold text-(--color-primary-foreground) hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-(--color-ring) focus:ring-offset-2 transition-all"
        >
          Calculate My Attendance →
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
