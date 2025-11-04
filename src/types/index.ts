export interface Course {
  id: string;
  courseName: string;
  totalConducted: number;
  totalAttended: number;
  attendancePercentage: number | null;
}
