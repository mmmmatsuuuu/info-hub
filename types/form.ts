export type FormState<Tvalues=any, Tmessage=any> = {
  success: boolean;
  values: Tvalues;
  messages: Tmessage;
}

export type UserAndStudent = {
  userId?: string;
  username?: string;
  email?: string;
  schoolName?: string,
  admissionYear?: number,
  studentNumber?: number,
}

export type MessageUserAndStudent = {
  userId?: string;
  username?: string;
  email?: string;
  schoolName?: string;
  admissionYear?: string;
  studentNumber?: string;
  other?: string;
}
