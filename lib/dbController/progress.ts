"use server"
import { prisma } from "@lib/prisma";
import { Message, Progress, MessageProgress, OperationResult } from "@/types/dbOperation";
import { LessonProgress, StudentProgress, StudentsProgress, SubjectWithUnits, UnitProgress, UnitWithLessons } from "@/types/dashboardData";

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

// 生徒一人分の進捗を取得する
// 動画を視聴した比率を求める
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
    // 教科情報の取得
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

    // 進捗情報の取得
    const progress = await prisma.progress.findMany({
      where: {
        student_id: studentId
      },
    });

    // データ整形
    for (let i = 0; i < subjects.length; i++) {
      const units = subjects[i].Units;
      const subjectWithUnits:SubjectWithUnits<UnitWithLessons> = {
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

// 指定したクラスのそれぞれの生徒の進捗を取得する
export async function getStudentsProgress(
  schoolName: string,
  admissionYear: number,
  grade: number,
  classNum?: number,
) {
  const res:OperationResult<StudentsProgress[], Message> = {
    isSuccess: false,
    values: [],
    messages: {
      other: "データ取得",
    }
  };
  try {
    // 引数整形
    let studentNumberParam = String(grade);
    if (classNum != 0) studentNumberParam = studentNumberParam + String(classNum);

    // 生徒情報を取得
    const fetchStudents = await prisma.student.findMany({
      where: {
        admission_year: admissionYear,
        school_name: {
          startsWith: schoolName,
        },
        student_number: {
          startsWith: studentNumberParam,
        }
      },
      select: {
        user_id: true,
        student_number: true,
        User: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    });
    if (fetchStudents.length == 0) {
      res.messages.other = "生徒がいません。";
      return res;
    }

    // 教科情報を取得
    const fetchSubjects = await prisma.subject.findMany({
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
    if (fetchSubjects.length == 0) {
      res.messages.other = "データの取得に失敗しました。";
      return res;
    }

    // 進捗情報を取得
    const fetchProgress = await prisma.progress.findMany();

    // データ整形
    for (let i = 0; i < fetchStudents.length; i++) {
      const student = fetchStudents[i];
      const studentProgress:StudentsProgress = {
        studentId: student.user_id,
        studentNumber: student.student_number,
        name: student.User.name,
        progress: []
      };
      for (let j = 0; j < fetchSubjects.length; j++) {
        const subject = fetchSubjects[j];
        const subjectWithUnits: SubjectWithUnits<UnitProgress> = {
          subjectId: subject.subject_id,
          subjectName: subject.subject_name,
          units: []
        };
        for (let k = 0; k < subject.Units.length; k++) {
          const unit = subject.Units[k];
          const unitProgress: UnitProgress = {
            unitId: unit.unit_id,
            unitName: unit.unit_name,
            progress: 0
          }
          let totalContents = 0;
          let correctContents = 0;
          for (let l = 0; l < unit.Lessons.length; l++) {
            const lesson = unit.Lessons[l];
            for (let m = 0; m < lesson.Contents.length; m++) {
              const content = lesson.Contents[m].Content;
              const progress = fetchProgress.find(p => p.content_id == content.content_id);
              if (content.type == "movie") {
                totalContents++;
                if (progress && progress.view_count > 0) {
                  correctContents++;
                }
              }
            }
          }
          unitProgress.progress = correctContents / totalContents * 100;
          subjectWithUnits.units.push(unitProgress);
        }
        studentProgress.progress.push(subjectWithUnits);
      }
      res.values.push(studentProgress)
    }
    res.isSuccess = true;
    res.messages.other = "データを取得しました。";
    // 返却
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
        }
      });
      res.values = {
        studentId: value.student_id,
        contentId: value.content_id,
        viewCount: value.view_count,
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
        }
      });
      res.values = {
        studentId: value.student_id,
        contentId: value.content_id,
        viewCount: value.view_count,
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