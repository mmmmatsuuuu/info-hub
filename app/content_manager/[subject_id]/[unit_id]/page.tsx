import { auth } from "@clerk/nextjs/server";
import { InnerCard } from "@components/ui/card";
import { InternalLink } from "@components/ui/myLink";
import { NotFound, NotFoundWithRedirect } from "@components/ui/notFound";
import { Header1, Header2 } from "@components/ui/title";
import { getSubject } from "@lib/dbController/subject";
import { getUnitWithLessons, getUnits } from "@lib/dbController/unit";
import { getUserWithClerkId } from "@lib/dbController/user";
import { ContentManagerBreadcrumbs } from "@components/component/common/breadcrumbs";
import { CreateLessonForm, EditLessonForm, DeleteLessonForm } from "@components/component/forms/lessonForms";
import { Lesson, OptionProps } from "@/types/dbOperation";
import { BreadCrumb } from "@/types/common";

export default async function ContentManagePage({
  params
}: {
  params: Promise<{ subject_id: string,unit_id: string }>
}) {
  // 認証の確認
  const { userId } = await auth();
  if (!userId) {
    return (
      <NotFoundWithRedirect
        text="ログインしていません。ログインを済ませてください。"
        href="/"
      />
    );
  }

  const user = await getUserWithClerkId(userId);
  if (user.isSuccess == false) {
    return (
      <NotFoundWithRedirect
        text="ユーザ登録が済んでいません。ユーザ登録をしてください。"
        href="/register"
      />
    );
  }
  if (user.values.type != "admin") {
    return (
      <NotFoundWithRedirect
        text="管理者権限がありません。"
        href="/"
      />
    );
  }

  const p = await params;
  const subjectId = p.subject_id;
  const unitId = p.unit_id;

  // データの取得
  const res = await getUnitWithLessons(unitId);
  const unit = res.values;
  if (!res.isSuccess || !unit) {
    return (
      <NotFoundWithRedirect
        text={ res.messages.other || "" }
        href="/"
      />
    )
  }

  const subjectRes = await getSubject(subjectId);
  if (subjectRes.isSuccess == false) {
    return (
      <NotFoundWithRedirect
        text="エラーが発生しました。"
        href="/"
      />
    )
  }
  const subject = subjectRes.values;

  const breadcrumbs: BreadCrumb[] = [
    {
      path: "/content_manager",
      name: "科目管理",
    },
    {
      path: `/content_manager/${ subjectId }`,
      name: subject.subjectName,
    },
    {
      path: `/content_manager/${ subjectId }/${ unitId }`,
      name: unit.unitName,
    },
  ];

  const unitsRes = await getUnits();
  if (unitsRes.isSuccess == false) {
    return (
      <NotFoundWithRedirect
        text="エラーが発生しました。"
        href="/"
      />
    )
  }
  const units = unitsRes.values;
  const options:OptionProps[] = [];
  units.map(s => {
    const val:OptionProps = {
      label: s.unitName,
      value: s.unitId,
    }
    options.push(val);
  });

  return (
    <div
      className="w-full p-4 flex flex-col gap-4"
    >
      <div
        className="flex justify-between items-center"
      >
        <ContentManagerBreadcrumbs 
          breadcrumbs={ breadcrumbs }
        />
        <div
          className="flex gap-2 text-sm"
        >
          <InternalLink 
            href="/content_manager/contents"
            text="コンテンツ一覧を開く"
          />
          <InternalLink 
            href="/content_manager/quiz"
            text="小テスト一覧を開く"
          />
        </div>
      </div>
      <Header1 title="授業管理" />
      <InnerCard>
        <Header2 title={ unit.unitName } />
        <p>{ unit?.description }</p>
      </InnerCard>
      <div
        className="flex justify-end"
      >
        <CreateLessonForm 
          defaultValue={ unit.unitId }
          options={ options }
        />
      </div>
      <div
        className="flex flex-col gap-1 w-full overflow-y-scroll"
      >
        <div
          className="flex gap-1 items-center border-b p-1"
        >
          <div
            className="w-[64px] shrink-0"
          >
            公開
          </div>
          <div
            className="w-[64px] shrink-0"
          >
            ID
          </div>
          <div
            className="grow"
          >
            名称
          </div>
          <div
            className="w-[192px] shrink-0"
          >
          </div>
        </div>
        <div
          className="overflow-y-scroll"
        >
          { 
            unit.lessons.length > 0
            ?
            unit.lessons.map(l => {
              const lesson:Lesson = {
                lessonId: l.lessonId,
                title: l.title,
                description: l.description || "",
                isPublic: l.isPublic,
                unitId: l.unitId
              }
              return (
                <DataColumn
                  key={ l.lessonId }
                  lesson={ lesson }
                  options={ options }
                  link={`/content_manager/${ subjectId }/${ unitId }/${ l.lessonId }`}
                />
              )
            })
            :
            <NotFound text="データがありません" />
          }
        </div>
      </div>
    </div>
  )
}

function DataColumn({
  options, lesson, link
}: {
  options: OptionProps[], lesson: Lesson, link: string
}) {
  return (
    <div
      className="flex gap-1 items-center border-b p-1 hover:bg-slate-100"
      key={ lesson.lessonId }
    >
      <div
        className="w-[64px] shrink-0 text-center px-1 text-sm"
      >
        {
          lesson.isPublic
          ?
          <div
            className="rounded p-1 border border-green-500 text-green-500 bg-green-50"
          >
            公開
          </div>
          :
          <div
            className="rounded p-1 border border-red-500 text-red-500 bg-red-50"
          >
            非公開
          </div>
        }
      </div>
      <div
        className="w-[64px] shrink-0 text-center"
      >
        { lesson.lessonId }
      </div>
      <div
        className="grow"
      >
        { lesson.title }
      </div>
      <div
        className="w-[192px] shrink-0 flex gap-1 justify-center items-center"
      >
        <div
          className="w-[64px]"
        >
          <InternalLink
            text="開く"
            href={ link }
            cls="block w-full h-full text-center"
          />
        </div>
        <div
          className="w-[64px]"
        >
          <EditLessonForm 
            defaultValue={ lesson.unitId }
            options={ options }
            lesson={ lesson }
          />
        </div>
        <div
          className="w-[64px]"
        >
          <DeleteLessonForm
            lessonId={ lesson.lessonId }
          />
        </div>
      </div>
    </div>
  )
}