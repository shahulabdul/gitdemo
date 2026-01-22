import { Participant, Session, AttendanceRecord, AttendanceStats } from '../types';

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (time: string): string => {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const calculateAttendanceRate = (attended: number, total: number): number => {
  return total > 0 ? Math.round((attended / total) * 100) : 0;
};

export const getAttendanceStats = (
  participants: Participant[],
  sessions: Session[],
  attendance: AttendanceRecord[]
): AttendanceStats => {
  const totalParticipants = participants.length;
  const totalSessions = sessions.length;
  
  const averageAttendance = sessions.length > 0 
    ? Math.round(sessions.reduce((acc, session) => acc + session.presentCount, 0) / sessions.length)
    : 0;

  const topAttendees = participants
    .sort((a, b) => calculateAttendanceRate(b.attendedSessions, b.totalSessions) - calculateAttendanceRate(a.attendedSessions, a.totalSessions))
    .slice(0, 5);

  return {
    totalParticipants,
    totalSessions,
    averageAttendance,
    topAttendees,
  };
};

export const updateParticipantStats = (
  participants: Participant[],
  sessions: Session[],
  attendance: AttendanceRecord[]
): Participant[] => {
  return participants.map(participant => {
    const participantAttendance = attendance.filter(record => record.participantId === participant.id);
    const attendedSessions = participantAttendance.filter(record => record.status === 'present').length;
    const totalSessions = participantAttendance.length;

    return {
      ...participant,
      attendedSessions,
      totalSessions,
    };
  });
};

export const updateSessionStats = (
  sessions: Session[],
  attendance: AttendanceRecord[]
): Session[] => {
  return sessions.map(session => {
    const sessionAttendance = attendance.filter(record => record.sessionId === session.id);
    const presentCount = sessionAttendance.filter(record => record.status === 'present').length;
    const totalParticipants = sessionAttendance.length;

    return {
      ...session,
      presentCount,
      totalParticipants,
    };
  });
};