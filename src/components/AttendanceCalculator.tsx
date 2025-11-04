import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAttendanceColor } from "../utils/calculateAttendance";

interface AttendanceCalculatorProps {
  totalConducted: number;
  totalAttended: number;
}

interface FutureCalculationResult {
  percentage: number | null;
  error: string;
}

const calculateFutureAttendance = (
  totalConducted: number,
  totalAttended: number,
  futureClasses: string,
  futureAttended: string
): FutureCalculationResult => {
  if (!futureClasses || !futureAttended) {
    return { percentage: null, error: "" };
  }

  const future = parseInt(futureClasses);
  const attended = parseInt(futureAttended);

  if (isNaN(future) || isNaN(attended)) {
    return {
      percentage: null,
      error: "Please enter valid numbers",
    };
  }

  if (future < 0) {
    return {
      percentage: null,
      error: "Future classes cannot be negative",
    };
  }

  if (attended < 0) {
    return {
      percentage: null,
      error: "Classes attended cannot be negative",
    };
  }

  if (attended > future) {
    return {
      percentage: null,
      error: "You can't attend more classes than will be conducted!",
    };
  }

  const newTotal = totalConducted + future;
  const newAttended = totalAttended + attended;
  const percentage = Math.round((newAttended / newTotal) * 100);

  return { percentage, error: "" };
};

const AttendanceCalculator = ({
  totalConducted,
  totalAttended,
}: AttendanceCalculatorProps) => {
  const [futureClasses, setFutureClasses] = useState("");
  const [futureAttended, setFutureAttended] = useState("");

  const currentPercentage = Math.round((totalAttended / totalConducted) * 100);

  const { data: futureResult } = useQuery({
    queryKey: [
      "futureAttendance",
      totalConducted,
      totalAttended,
      futureClasses,
      futureAttended,
    ],
    queryFn: () =>
      calculateFutureAttendance(
        totalConducted,
        totalAttended,
        futureClasses,
        futureAttended
      ),
    enabled: true,
    staleTime: 0,
  });

  const futurePercentage = futureResult?.percentage ?? null;
  const futureError = futureResult?.error ?? "";

  const scenarios = [
    { label: "Skip 1 class (2 hours)", classes: 2, attend: 0 },
    { label: "Skip 2 classes (4 hours)", classes: 4, attend: 0 },
    { label: "Attend next 3 classes (6 hours)", classes: 6, attend: 6 },
    { label: "Attend next 5 classes (10 hours)", classes: 10, attend: 10 },
  ];

  const getScenarioPercentage = (classes: number, attend: number) => {
    const newTotal = totalConducted + classes;
    const newAttended = totalAttended + attend;
    return Math.round((newAttended / newTotal) * 100);
  };

  return (
    <div className="space-y-8">
      <div className="border border-(--color-border) rounded-lg p-6 sm:p-10 bg-(--color-card)">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <p className="text-sm text-(--color-muted-foreground) mb-2 uppercase tracking-wide">
              Your current attendance
            </p>
            <div className="flex items-baseline gap-4">
              <p className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-(--color-foreground)">
                {currentPercentage}%
              </p>
              <div>
                <p className="text-base sm:text-lg text-(--color-muted-foreground)">
                  {totalAttended} / {totalConducted} classes
                </p>
                <p className="text-sm text-(--color-muted-foreground)">
                  attended
                </p>
              </div>
            </div>
          </div>
          <div
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              currentPercentage >= 85
                ? "bg-(--color-success)/10 text-(--color-success)"
                : currentPercentage >= 75
                ? "bg-(--color-warning)/10 text-(--color-warning)"
                : "bg-(--color-destructive)/10 text-(--color-destructive)"
            }`}
          >
            {currentPercentage >= 85
              ? "✓ Good"
              : currentPercentage >= 75
              ? "⚠ Okay"
              : "✗ At Risk"}
          </div>
        </div>
        <div className="pt-6 border-t border-(--color-border)">
          <p className="text-sm text-(--color-muted-foreground)">
            💡 <strong>Pro tip:</strong>{" "}
            {currentPercentage >= 85
              ? "You're doing great! Keep maintaining this attendance."
              : currentPercentage >= 75
              ? "Try to attend more classes to reach 85% for a safer margin."
              : "You need to attend most upcoming classes to improve your percentage."}
          </p>
        </div>
      </div>

      <div className="border border-(--color-border) rounded-lg p-6 sm:p-10 bg-(--color-card)">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-primary)/10">
              <span className="text-sm font-bold text-(--color-primary)">
                2
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-(--color-foreground)">
              Plan your future attendance
            </h2>
          </div>
          <p className="text-sm sm:text-base text-(--color-muted-foreground) leading-relaxed ml-0 sm:ml-10">
            Enter how many classes are coming up and how many you plan to attend
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            <label
              htmlFor="futureClasses"
              className="text-base font-medium text-(--color-foreground)"
            >
              Upcoming classes
            </label>
            <input
              type="number"
              id="futureClasses"
              value={futureClasses}
              onChange={(e) => setFutureClasses(e.target.value)}
              min="0"
              className="h-12 sm:h-14 w-full rounded border-2 border-(--color-border) bg-(--color-input) px-4 sm:px-5 text-base sm:text-lg text-(--color-foreground) placeholder:text-(--color-muted-foreground) focus:outline-none focus:border-(--color-primary) transition-colors"
            />
            <p className="text-xs text-(--color-muted-foreground) mt-1">
              How many more classes will happen?
            </p>
          </div>

          <div className="space-y-3">
            <label
              htmlFor="futureAttended"
              className="text-base font-medium text-(--color-foreground)"
            >
              You'll attend
            </label>
            <input
              type="number"
              id="futureAttended"
              value={futureAttended}
              onChange={(e) => setFutureAttended(e.target.value)}
              min="0"
              className="h-12 sm:h-14 w-full rounded border-2 border-(--color-border) bg-(--color-input) px-4 sm:px-5 text-base sm:text-lg text-(--color-foreground) placeholder:text-(--color-muted-foreground) focus:outline-none focus:border-(--color-primary) transition-colors"
            />
            <p className="text-xs text-(--color-muted-foreground) mt-1">
              How many will you be present for?
            </p>
          </div>
        </div>

        {futureError && (
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
                {futureError}
              </p>
            </div>
          </div>
        )}

        {futurePercentage !== null && (
          <div className="pt-8 border-t border-(--color-border)">
            <p className="text-base text-(--color-muted-foreground) mb-3 uppercase tracking-wide">
              Your projected attendance will be
            </p>
            <div className="flex items-baseline gap-4">
              <p
                className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight ${getAttendanceColor(
                  futurePercentage
                )}`}
              >
                {futurePercentage}%
              </p>
              <div className="flex flex-col gap-1">
                <span
                  className={`text-sm font-semibold ${getAttendanceColor(
                    futurePercentage
                  )}`}
                >
                  {futurePercentage >= currentPercentage ? "↑" : "↓"}{" "}
                  {Math.abs(futurePercentage - currentPercentage)}%{" "}
                  {futurePercentage >= currentPercentage
                    ? "increase"
                    : "decrease"}
                </span>
                <span className="text-xs text-(--color-muted-foreground)">
                  compared to current
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border border-(--color-border) rounded-lg p-6 sm:p-10 bg-(--color-card)">
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-(--color-foreground) mb-2">
            Quick scenarios
          </h3>
          <p className="text-sm text-(--color-muted-foreground)">
            See how common situations would affect your attendance
          </p>
        </div>
        <div className="space-y-4">
          {scenarios.map((scenario, index) => {
            const percentage = getScenarioPercentage(
              scenario.classes,
              scenario.attend
            );
            const diff = percentage - currentPercentage;
            return (
              <div
                key={index}
                className="flex items-center justify-between py-4 px-5 rounded-lg bg-(--color-muted)/20 hover:bg-(--color-muted)/30 transition-colors border border-(--color-border)/50"
              >
                <div className="flex-1">
                  <span className="text-base font-medium text-(--color-foreground) block mb-1">
                    {scenario.label}
                  </span>
                  <span className="text-xs text-(--color-muted-foreground)">
                    {diff >= 0 ? "+" : ""}
                    {diff}% from current
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`text-2xl font-bold ${getAttendanceColor(
                      percentage
                    )} block`}
                  >
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalculator;
