import { Participant, Session, AttendanceRecord } from '../types';

const STORAGE_KEYS = {
  PARTICIPANTS: 'ai_workshop_participants',
  SESSIONS: 'ai_workshop_sessions',
  ATTENDANCE: 'ai_workshop_attendance',
};

export const storage = {
  // Participants
  getParticipants: (): Participant[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PARTICIPANTS);
    return data ? JSON.parse(data) : [];
  },

  saveParticipants: (participants: Participant[]) => {
    localStorage.setItem(STORAGE_KEYS.PARTICIPANTS, JSON.stringify(participants));
  },

  // Sessions
  getSessions: (): Session[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    return data ? JSON.parse(data) : [];
  },

  saveSessions: (sessions: Session[]) => {
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
  },

  // Attendance
  getAttendance: (): AttendanceRecord[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    return data ? JSON.parse(data) : [];
  },

  saveAttendance: (attendance: AttendanceRecord[]) => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
  },

  // Export all data
  exportData: () => {
    return {
      participants: storage.getParticipants(),
      sessions: storage.getSessions(),
      attendance: storage.getAttendance(),
      exportDate: new Date().toISOString(),
    };
  },

  // Import all data
  importData: (data: any) => {
    if (data.participants) storage.saveParticipants(data.participants);
    if (data.sessions) storage.saveSessions(data.sessions);
    if (data.attendance) storage.saveAttendance(data.attendance);
  },
};