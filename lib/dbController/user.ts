import { prisma } from '@lib/prisma';
import { UserAndStudent } from '@/types/form';

export async function getUserWithClerkId(clerkId: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        clerk_id: clerkId
      }
    });
  } catch (e) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserWithStudent(userId: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        user_id: userId
      },
      include: {
        Student: {
  
        },
      }
    });
  } catch (e) {
    return null;
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
) {
  try {
    const result = await prisma.$transaction(async (tx) => {
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
  
    return {
      messages: {
        other: "登録に成功しました。",
      },
      isSuccess: true,
      values: result.user
    };
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
) {
  try {
    const result = await prisma.$transaction(async (tx) => {
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
  
    const values:UserAndStudent = {
      userId: result.user.user_id,
      username: result.user.name,
      email: result.user.email,
      admissionYear: result.student.admission_year,
      schoolName: result.student.school_name,
      studentNumber: Number(result.student.student_number),
    }
    return {
      messages: "データベースへの登録に成功。",
      success: true,
      values: values
    };
  } finally {
    await prisma.$disconnect();
  }
}