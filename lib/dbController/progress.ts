import { prisma } from "@lib/prisma";
import { Message, Progress, MessageProgress, OperationResult } from "@/types/dbOperation";
import { LessonProgress, StudentProgress, SubjectWithUnits, UnitWithLessons } from "@/types/dashboardData";

// 取得
export async function getProgress(
  studentId: string,
  contentId: string,
): Promise<OperationResult<Progress, MessageProgress>> {
  const res: OperationResult<Progress, MessageProgress> = {
    isSuccess: false,
    values: {
      studentId: studentId,
      contentId: contentId,
      viewCount: 0,
      testScore: 0,
    },
    messages: {
      other: "取得"
    },
  };
  try {
    const value = await prisma.progress.findUnique({
      where: {
        student_id_content_id: {
          student_id: studentId,
          content_id: contentId
        },
      },
    });
    if (value == null) {
      res.messages.other = "見つかりません。";
      return res;
    }
    res.values.studentId = value.student_id;
    res.values.contentId = value.content_id;
    res.values.viewCount = value.view_count;
    if (value.test_score) {
      res.values.testScore = value.test_score;
    }
    res.messages.other = "取得しました。";
    res.isSuccess = true;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getStudentProgress(
  studentId: string,
): Promise<OperationResult<StudentProgress, Message>> {
  const res: OperationResult<StudentProgress, Message> = {
    isSuccess: false,
    values: {
      studentId: studentId,
      progress: [],
    },
    messages: {
      other: "取得"
    },
  };
  try {
    const subjects = await prisma.subject.findMany({
      where: {
        is_public: true,
      },
      select: {
        subject_id: true,
        subject_name: true,
        Units: {
          where: {
            is_public: true,
          },
          select: {
            unit_id: true,
            unit_name: true,
            Lessons: {
              where: {
                is_public: true,
              },
              select: {
                lesson_id: true,
                title: true,
                Contents: {
                  select: {
                    Content: {
                      select: {
                        content_id: true,
                        title: true,
                        type: true,
                      }
                    }
                  },
                  orderBy: {
                    content_id: "asc",
                  },
                }
              },
              orderBy: {
                lesson_id: "asc",
              },
            }
          },
          orderBy: {
            unit_id: "asc",
          },
        }
      },
      orderBy: {
        subject_id: "asc",
      }
    });
    if (subjects.length == 0) {
      res.messages.other = "データの取得に失敗しました。";
      return res;
    }

    const progress = await prisma.progress.findMany({
      where: {
        student_id: studentId
      },
    });

    // データ整形
    for (let i = 0; i < subjects.length; i++) {
      const units = subjects[i].Units;
      const subjectWithUnits:SubjectWithUnits = {
        subjectId: subjects[i].subject_id,
        subjectName: subjects[i].subject_name,
        units: [],
      };
      for (let j = 0; j < units.length; j++) {
        const lessons = units[j].Lessons;
        const unitWithLessons:UnitWithLessons = {
          unitId: units[j].unit_id,
          unitName: units[j].unit_name,
          lessons: [],
        };
        for (let k = 0; k < lessons.length; k++) {
          const contents = lessons[k].Contents.filter(content => content.Content.type == "movie");
          const contentCount = contents.length;
          let viewCount = 0;
          for (let l = 0; l < contents.length; l++) {
            if (progress.find(p => p.content_id == contents[l].Content.content_id && p.view_count > 0)) {
              viewCount++;
            }
          }
          const lessonProgress:LessonProgress = {
            lessonId: lessons[k].lesson_id,
            title: lessons[k].title,
            progress: viewCount / contentCount * 100,
          };
          unitWithLessons.lessons.push(lessonProgress);
        }
        subjectWithUnits.units.push(unitWithLessons);
      }
      res.values.progress.push(subjectWithUnits);
    }

    res.messages.other = "取得しました。";
    res.isSuccess = true;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}


// 追加または変更
export async function setProgress(
  progress: Progress
): Promise<OperationResult<Progress, MessageProgress>> {
  const res: OperationResult<Progress, MessageProgress> = {
    isSuccess: false,
    values: progress,
    messages: {
      other: "取得"
    },
  };
  try {
    const initialValue = await prisma.progress.findUnique({
      where: {
        student_id_content_id: {
          student_id: progress.studentId,
          content_id: progress.contentId
        },
      },
    });
    if (initialValue != null) {
      const value = await prisma.progress.update({
        where: {
          student_id_content_id: {
            student_id: progress.studentId,
            content_id: progress.contentId
          },
        },
        data: {
          view_count: progress.viewCount,
          test_score: progress.testScore
        }
      });
      res.values = {
        studentId: value.student_id,
        contentId: value.content_id,
        viewCount: value.view_count,
        testScore: value.test_score || 0,
      };
      res.messages.other = "登録に成功しました。";
      res.isSuccess = true;
      return res;
    } else {
      const value = await prisma.progress.create({
        data: {
          student_id: progress.studentId,
          content_id: progress.contentId,
          view_count: progress.viewCount,
          test_score: progress.testScore
        }
      });
      res.values = {
        studentId: value.student_id,
        contentId: value.content_id,
        viewCount: value.view_count,
        testScore: value.test_score || 0,
      };
      res.messages.other = "登録に成功しました。";
      res.isSuccess = true;
      return res;
    }
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}

// 削除
export async function deleteProgress(
  progress: Progress
): Promise<OperationResult<Progress, MessageProgress>> {
  const res: OperationResult<Progress, MessageProgress> = {
    isSuccess: false,
    values: progress,
    messages: {
      other: "取得"
    },
  };
  try {
    const value = await prisma.progress.delete({
      where: {
        student_id_content_id: {
          student_id: progress.studentId,
          content_id: progress.contentId
        }
      }
    });
    res.values = {
      studentId: value.student_id,
      contentId: value.content_id,
      viewCount: value.view_count,
      testScore: value.test_score || 0,
    }
    res.messages.other = "削除に成功しました。";
    res.isSuccess = true;
    return res;
  } catch(error) {
    res.messages.other = String(error);
    return res;
  } finally {
    await prisma.$disconnect();
  }
}