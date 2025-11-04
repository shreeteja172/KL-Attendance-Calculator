import type { Course } from "../types";
import {
  getAttendanceColor,
  getAttendanceStatus,
} from "../utils/calculateAttendance";

interface AttendanceTableProps {
  courses: Course[];
  averageAttendance: number | null;
  onDeleteCourse: (id: string) => void;
}

const AttendanceTable = ({
  courses,
  averageAttendance,
  onDeleteCourse,
}: AttendanceTableProps) => {
  if (courses.length === 0) {
    return (
      <div className="border border-(--color-border) rounded-lg p-12 text-center">
        <p className="text-sm text-(--color-muted-foreground)">
          No courses yet. Add one above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border border-(--color-border) rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-(--color-border)">
                <th className="px-4 py-3 text-left text-xs font-medium text-(--color-muted-foreground)">
                  Course
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-(--color-muted-foreground)">
                  Conducted
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-(--color-muted-foreground)">
                  Attended
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-(--color-muted-foreground)">
                  Percentage
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-(--color-muted-foreground)"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--color-border)">
              {courses.map((course) => {
                const status = getAttendanceStatus(course.attendancePercentage);
                return (
                  <tr key={course.id} className="hover:bg-(--color-muted)/30">
                    <td className="px-4 py-3 text-sm text-(--color-foreground)">
                      {course.courseName}
                    </td>
                    <td className="px-4 py-3 text-sm text-(--color-muted-foreground)">
                      {course.totalConducted}
                    </td>
                    <td className="px-4 py-3 text-sm text-(--color-muted-foreground)">
                      {course.totalAttended}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${getAttendanceColor(
                            course.attendancePercentage
                          )}`}
                        >
                          {course.attendancePercentage !== null
                            ? `${course.attendancePercentage}%`
                            : "—"}
                        </span>
                        {status && (
                          <span className="text-xs text-(--color-muted-foreground)">
                            {status}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                      <button
                        onClick={() => onDeleteCourse(course.id)}
                        className="text-xs text-(--color-muted-foreground) hover:text-(--color-destructive) focus:outline-none"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {averageAttendance !== null && (
        <div className="border border-(--color-border) rounded-lg p-5">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xs text-(--color-muted-foreground) mb-1">
                Overall attendance
              </p>
              <p className="text-3xl font-semibold tracking-tight text-(--color-foreground)">
                {averageAttendance}%
              </p>
            </div>
            <span
              className={`text-xs font-medium ${getAttendanceColor(
                averageAttendance
              )}`}
            >
              {getAttendanceStatus(averageAttendance)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTable;
