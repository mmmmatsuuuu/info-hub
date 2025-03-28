import { Suspense } from "react";
import { Loading } from "@components/ui/loading";
import { Header2 } from "@components/ui/title";
import { OuterCard } from "@components/ui/card";
import { InternalLink } from "@components/ui/myLink";
import { UserAndStudent } from "@/types/dbOperation";
import { LessonProgress, SubjectWithUnits, UnitWithLessons } from "@/types/dashboardData";
import { getStudentProgress } from "@lib/dbController/progress";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@components/ui/tooltip";
import Link from "next/link";
import { NotFound } from "@components/ui/notFound";

export function BasicInfo({
  user, imageUrl
}: {
  user: UserAndStudent,
  imageUrl?: string,
}) {
  return (
    <OuterCard>
      <Header2 title="基本情報"/>
      <div
        className="w-full flex justify-end mt-2"
      >
        <InternalLink href={`/mypage/${ user.userId }/edit`} text="編集" cls="px-8"/>
      </div>
      <div
        className="flex gap-4"
      >
        <div
          className="basis-1/4 flex justify-center items-center"
        >
          {
            imageUrl
            ?
            <img
              src={ imageUrl }
              alt="ユーザアイコン"
              width={ 150 }
              height={ 150 }
              className="rounded-full"
            />
            :
            <></>
          }
        </div>
        <table
          className="basis-3/4 w-full p-2"
        >
          <tbody>
            <tr className="border-b">
              <td>ユーザ名</td>
              <td>{ user.username }</td>
            </tr>
            <tr className="border-b">
              <td>タイプ</td>
              <td>
                { user.type === "student" ? "生徒": "" }
                { user.type === "teacher" ? "先生": "" }
                { user.type === "admin" ? "管理者": "" }
              </td>
            </tr>
            <tr className="border-b">
              <td>メールアドレス</td>
              <td>{ user.email }</td>
            </tr>
            <tr className="border-b">
              <td>学校名</td>
              <td>{ user.schoolName }</td>
            </tr>
            <tr className="border-b">
              <td>入学年度</td>
              <td>{ user.admissionYear }</td>
            </tr>
            <tr className="border-b">
              <td>学籍番号</td>
              <td>{ Number(user.studentNumber) }</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </OuterCard>
  )
}

export async function PersonalDataDashboard({
  userId
}: {
  userId: string,
}) {
  // データ取得
  const res = await getStudentProgress(userId);
  if (res.isSuccess == false) {
    return (
      <NotFound text="データが取得できませんでした。" />
    )
  }

  const subjects = res.values.progress;
  
  return (
      <OuterCard>
        <Header2 title="授業の取り組み状況"/>
        <div
          className="flex justify-end gap-2 text-xs"
        >
          <div>
            <div>完了</div>
            <div
              className={`w-16 h-3 p-1 rounded bg-sky-400 border border-sky-400 text-sky-800 text-xs`}
            >
            </div>
          </div>
          <div>
            <div>進行中</div>
            <div
              className={`w-16 h-3 p-1 rounded bg-sky-200 border border-sky-200 text-sky-800 text-xs`}
            >
            </div>
          </div>
          <div>
            <div>未実施</div>
            <div
              className={`w-16 h-3 p-1 rounded border border-sky-400 text-sky-800 text-xs`}
            >
            </div>
          </div>
          <div>
            <div>エラー</div>
            <div
              className={`w-16 h-3 p-1 rounded bg-yellow-400 text-yellow-50 text-xs`}
            >
            </div>
          </div>
        </div>
        <div
          className="flex gap-2"
        >
          <Suspense fallback={ <Loading size={ 20 } />}>
            <SubjetCard
              key={ subjects[0].subjectId }
              subject={ subjects[0] }
            />
            <SubjetCard
              key={ subjects[1].subjectId }
              subject={ subjects[1] }
            />
          </Suspense>
        </div>
      </OuterCard>
  )
}

function SubjetCard({
  subject
}: {
  subject: SubjectWithUnits
}) {
  return (
    <div
      className="w-full"
    >
      <p className="font-bold">{ subject.subjectName }</p>
      {
        subject.units.map(u => {
          return (
            <UnitCard
              key={ u.unitId }
              unit={ u }
            />
          )
        })
      }
    </div>
  )
}

async function UnitCard({
  unit
}: {
  unit: UnitWithLessons
}) {
  const lessons = unit.lessons;
  const lessonCount = lessons.length;
  let doneCount = 0;
  for (let i = 0; i < lessons.length; i++) {
    if (lessons[i].progress == 100) {
      doneCount++;
    } else if (lessons[i].progress > 0) {
      doneCount = doneCount + 0.5;
    }
  }
  const progress = doneCount / lessonCount;
  return (
    <div
      className="w-full mb-1"
    >
      <p
        className="text-sm"
      >
        { unit.unitName }
      </p>
      <div
        className="flex w-full gap-4 justify-start items-center"
      >
        <div
          className="flex w-96"
        >
          {
            unit.lessons.map(l => {
              return (
                <LessonProgressCard
                  key={l.lessonId}
                  lesson={ l }
                />
              )
            })
          }
        </div>
        <div
          className="text-xs w-24 text-center"
        >
          {progress == 1 && (
            <div className="rounded border bg-green-100 border-green-400 text-green-400">
              完了
            </div>
          )}
          {progress > 0 && progress < 1 && (
            <div className="rounded border bg-red-100 border-red-400 text-red-400">
              途中
            </div>
          )}
          {progress == 0 && (
            <div className="rounded border bg-slate-100 border-slate-400 text-slate-400">
              未実施
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

async function LessonProgressCard({
  lesson
}: {
  lesson: LessonProgress
}) {
  let Color = "";
  if (lesson.progress == 100) {
    Color = "bg-sky-400 border border-sky-400 text-sky-800";
  } else if (lesson.progress > 0) {
    Color = "bg-sky-200 border border-sky-200 text-sky-800";
  } else if (lesson.progress == 0) {
    Color = "border border-sky-400 text-sky-800";
  } else {
    Color = "bg-yellow-400 text-yellow-50";
  }
  return (
    <TooltipProvider
      delayDuration={ 100 }
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`/lesson/${ lesson.lessonId }`}
            className="w-full"
          >
            <div
              className={`flex-1 h-3 p-1 rounded ${Color} text-xs`}
            >
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <div>
            <p>{ lesson.lessonId } - { lesson.title }</p>
            <p>{lesson.progress}%完了</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function StudentsDataDashboard() {
  return (
    <OuterCard>
      <Header2 title="各生徒の授業取り組み状況ダッシュボード（作成中）" />
      <p>＜内容＞</p>
      <p>指定した生徒について、各授業の動画を何人の生徒が視聴済みか？</p>
      <p>指定した生徒について、各授業の小テストの点数（平均や合計など）</p>
    </OuterCard>
  )
}

export function UnitsDataDashboard() {
  return (
    <OuterCard>
      <Header2 title="単元の取り組み状況ダッシュボード（作成中）" />
      <p>＜内容＞</p>
      <p>指定した年度、単元について、各授業の動画を何人の生徒が視聴済みか？</p>
      <p>指定した年度、単元について、各授業の小テストの点数（平均や合計など）</p>
    </OuterCard>
  )
}
