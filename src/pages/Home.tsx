import { useState } from "react";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceCalculator from "../components/AttendanceCalculator";


const Home = () => {
  const [totalConducted, setTotalConducted] = useState<number | null>(null);
  const [totalAttended, setTotalAttended] = useState<number | null>(null);

  const handleCalculate = (conducted: number, attended: number) => {
    setTotalConducted(conducted);
    setTotalAttended(attended);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-16">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-(--color-foreground) mb-4">
          KL University Attendance Calculator
        </h1>
        <p className="text-base sm:text-lg text-(--color-muted-foreground) max-w-2xl leading-relaxed mb-4">
          Plan your attendance smartly. See how skipping or attending classes
          affects your percentage.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-(--color-muted)/30 border border-(--color-border)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-(--color-primary)"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <p className="text-sm text-(--color-foreground)">
            Remember: 1 class = 2 hours at KL University
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <AttendanceForm onCalculate={handleCalculate} />
        </div>

        <div>
          {totalConducted !== null && totalAttended !== null ? (
            <AttendanceCalculator
              totalConducted={totalConducted}
              totalAttended={totalAttended}
            />
          ) : (
            <div className="border border-(--color-border) rounded-lg p-10 bg-(--color-card) h-full flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-(--color-muted)/30 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-(--color-muted-foreground)"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <path d="M12 7v6" />
                    <path d="M9 10h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-(--color-foreground) mb-2">
                  Ready to calculate?
                </h3>
                <p className="text-base text-(--color-muted-foreground) max-w-sm mx-auto">
                  Enter your attendance details on the left to see your results,
                  future predictions, and quick scenarios here.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-20 pt-8 border-t border-(--color-border)">
        <div className="flex items-center justify-between text-sm">
          <p className="text-(--color-muted-foreground)">
            KL University Attendance Calculator
          </p>
          <p className="text-(--color-muted-foreground)">
            Built by{" "}
            <a
              // href="https://github.com/shreeteja172"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-(--color-foreground) hover:text-(--color-primary) transition-colors"
            >
              Shreeteja M
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
