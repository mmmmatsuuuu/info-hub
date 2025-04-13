"use server"
import { prisma } from '@lib/prisma';
import { OperationResult, User, MessageUser, UserAndStudent, MessageUserAndStudent } from '@/types/dbOperation';

export async function getUserWithClerkId(
  clerkId: string
): Promise<OperationResult<User, MessageUser>> {
  const res:OperationResult<User, MessageUser> = {
    isSuccess: false,
    values: {
      userId: "",
      clerkId: "",
      type: "student",
      name: "",
      email: "",
    },
    messages: {
      other: "clerk_idによるユーザ情報の取得",
    }
  }
  try {
    const value = await prisma.user.findUnique({
      where: {
        clerk_id: clerkId
      }
    });
    if (value == null) {
      res.messages.other = "ユーザが見つかりません。";
      return res;
    }
    res.values = {
      userId: value.user_id,
      clerkId: value.clerk_id,
      type: value.type,
      name: value.name,
      email: value.email,
    }
    res.messages.other = "ユーザを取得しました。";
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserWithStudent(
  userId: string
): Promise<OperationResult<UserAndStudent, MessageUserAndStudent>> {
  const res:OperationResult<UserAndStudent, MessageUserAndStudent> = {
    isSuccess: false,
    values: {
      userId: "",
      username: "",
      email: "",
      type: "student",
      schoolName: "",
      admissionYear: 0,
      studentNumber: 0,
    },
    messages: {
      other: "ユーザ情報の取得",
    }
  };
  try {
    const value = await prisma.user.findUnique({
      where: {
        user_id: userId
      },
      include: {
        Student: {
  
        },
      }
    });
    if (value == null) {
      res.messages.other = "ユーザが見つかりません。";
      return res;
    }
    if (value.Student == null) {
      res.messages.other = "ユーザ情報が取得できませんでした。";
      return res;
    }
    res.values = {
      userId: value.user_id,
      username: value.name,
      email: value.email,
      type: value.type,
      schoolName: value.Student?.school_name,
      admissionYear: value.Student?.admission_year,
      studentNumber: Number(value.Student?.student_number),
    }
    res.messages.other = "ユーザを取得しました。";
    res.isSuccess = true;
    return res;
  } catch (error) {
    res.messages.other = String(error);
    return res;
  } finally { 
    await prisma.$disconnect();
  }
}

export async function createUserWithStudent(
  clerkId: string, 
  username: string, 
  email: string,
  admissionYear: number,
  schoolName: string,
  studentNumber: string,
) :Promise<OperationResult<UserAndStudent, MessageUserAndStudent>> {
  const res:OperationResult<UserAndStudent, MessageUserAndStudent> = {
    isSuccess: false,
    values: {
      userId: "",
      username: "",
      email: "",
      type: "student",
      schoolName: "",
      admissionYear: 0,
      studentNumber: 0,
    },
    messages: {
      other: "ユーザ情報の登録",
    }
  };
  try {
    const value = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          clerk_id: clerkId,
          type: "student",
          name: username,
          email: email,
        },
      });
      const student = await tx.student.create({
        data: {
          user_id: user.user_id,
          admission_year: admissionYear,
          school_name: schoolName,
          student_number: studentNumber
        }
      });
      return { user, student };
    });

    res.values = {
      userId: value.user.user_id,
      username: value.user.name,
      email: value.user.email,
      type: value.user.type,
      schoolName: value.student.school_name,
      admissionYear: value.student.admission_year,
      studentNumber: Number(value.student.student_number),
    }
    res.messages.other = "登録に成功しました。";
    res.isSuccess = true;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

export async function editUserWithStudent(
  userId: string, 
  username: string, 
  email: string,
  admissionYear: number,
  schoolName: string,
  studentNumber: string,
) :Promise<OperationResult<UserAndStudent, MessageUserAndStudent>> {
  const res:OperationResult<UserAndStudent, MessageUserAndStudent> = {
    isSuccess: false,
    values: {
      userId: "",
      username: "",
      email: "",
      type: "student",
      schoolName: "",
      admissionYear: 0,
      studentNumber: 0,
    },
    messages: {
      other: "ユーザ情報の登録",
    }
  };
  try {
    const value = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: {
          user_id: userId,
        },
        data: {
          name: username,
          email: email
        }
      });
      const student = await tx.student.update({
        where: {
          user_id: userId,
        },
        data: {
          admission_year: admissionYear,
          school_name: schoolName,
          student_number: studentNumber,
        }
      });
      return { user, student };
    });
  
    res.values = {
      userId: value.user.user_id,
      username: value.user.name,
      email: value.user.email,
      type: value.user.type,
      schoolName: value.student.school_name,
      admissionYear: value.student.admission_year,
      studentNumber: Number(value.student.student_number),
    }
    res.messages.other = "更新に成功しました。";
    res.isSuccess = true;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}