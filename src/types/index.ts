export interface Participant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  registrationDate: string;
  totalSessions: number;
  attendedSessions: number;
}

export interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number; // in minutes
  description?: string;
  totalParticipants: number;
  presentCount: number;
}

export interface AttendanceRecord {
  id: string;
  participantId: string;
  sessionId: string;
  status: 'present' | 'absent';
  timestamp: string;
}

export interface AttendanceStats {
  totalParticipants: number;
  totalSessions: number;
  averageAttendance: number;
  topAttendees: Participant[];
}