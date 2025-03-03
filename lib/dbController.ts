import { prisma } from '@lib/prisma';
import { UserAndStudent } from '@/types/form';

// ==================================================
// User Table
// ==================================================
export async function getUserWithClerkId(clerkId: string) {
  return await prisma.user.findUnique({
    where: {
      clerk_id: clerkId
    }
  });
}

export async function getUserWithStudent(userId: string) {
  return await prisma.user.findUnique({
    where: {
      user_id: userId
    },
    include: {
      Student: {

      },
    }
  });
}

export async function createUserWithStudent(
  clerkId: string, 
  username: string, 
  email: string,
  admissionYear: number,
  schoolName: string,
  studentNumber: string,
) {
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
    error: undefined,
    success: true,
    values: result.user
  };
}

export async function editUserWithStudent(
  userId: string, 
  username: string, 
  email: string,
  admissionYear: number,
  schoolName: string,
  studentNumber: string,
) {
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
}

// ==================================================
// Teacher Table
// ==================================================
// ==================================================
// Student Table
// ==================================================

// ==================================================
// Subject Table
// ==================================================
export async function getSubject(subjectId: string) {
  return await prisma.subject.findUnique({
    where: {
      subject_id: subjectId,
    },
    include: {
      Units: {
        include: {
          Lessons: {
            select: {
              lesson_id: true,
              title: true,
            },
            orderBy: {
              lesson_id: 'asc'
            }
          }
        },
        orderBy: {
          unit_id: 'asc'
        }
      },
    },
  });
}

// ==================================================
// Unit Table
// ==================================================
// ==================================================
// Lesson Table
// ==================================================
export async function getLesson(lessonId: string) {
  const movies = [];
  const quiz = [];
  const others = [];
  const lesson = await prisma.lesson.findUnique({
    where: {
      lesson_id: lessonId
    },
    include: {
      Contents: {
        where: {
          lesson_id: lessonId
        },
        orderBy: {
          content_id: "asc"
        }
      },
    }
  });
  if (!lesson) {
    return null;
  }
  for (let i = 0; i < lesson.Contents.length; i++) {
    const content = await prisma.content.findUnique({
      where: {
        content_id: lesson.Contents[i].content_id
      }
    });
    if (content) {
      switch (content.type) {
        case "movie":
          movies.push(content);
          break;
        case "quiz":
          quiz.push(content);
          break;
        default:
          others.push(content);
          break;
      }
    }
  }
  return {
    lesson_id: lesson.lesson_id,
    title: lesson.title,
    description: lesson.description,
    unit_id: lesson.unit_id,
    movies: movies,
    quiz: quiz,
    others:others
  }
}
// ==================================================
// Content Table
// ==================================================
// ==================================================
// Progress Table
// ==================================================
