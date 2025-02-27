import { prisma } from '@lib/prisma';

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
