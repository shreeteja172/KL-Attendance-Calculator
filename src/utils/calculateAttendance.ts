export const calculateAttendance = (
  totalConducted: number,
  totalAttended: number
): number | null => {
  if (totalConducted === 0 || totalConducted < 0) {
    return null;
  }

  const percentage = (totalAttended / totalConducted) * 100;
  return Math.round(percentage);
};

export const getAttendanceColor = (percentage: number | null): string => {
  if (percentage === null) return "text-(--color-muted-foreground)";
  if (percentage < 75) return "text-(--color-destructive)";
  if (percentage < 85) return "text-(--color-warning)";
  return "text-(--color-success)";
};

export const getAttendanceStatus = (percentage: number | null): string => {
  if (percentage === null) return "";
  if (percentage < 75) return "at risk";
  if (percentage < 85) return "okay";
  return "good";
};

export const calculateAverageAttendance = (
  courses: Array<{ totalConducted: number; totalAttended: number }>
): number | null => {
  const validCourses = courses.filter((course) => course.totalConducted > 0);

  if (validCourses.length === 0) return null;

  const totalAttended = validCourses.reduce(
    (sum, course) => sum + course.totalAttended,
    0
  );
  const totalConducted = validCourses.reduce(
    (sum, course) => sum + course.totalConducted,
    0
  );

  return calculateAttendance(totalConducted, totalAttended);
};
