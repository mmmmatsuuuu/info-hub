import { auth } from "@clerk/nextjs/server";
import { InnerCard } from "@components/ui/card";
import { InternalLink } from "@components/ui/myLink";
import { NotFoundWithRedirect } from "@components/ui/notFound";
import { Header1, Header2 } from "@components/ui/title";
import { getSubject } from "@lib/dbController/subject";
import { getUnitWithLessons, getUnits } from "@lib/dbController/unit";
import { getUserWithClerkId } from "@lib/dbController/user";
import { ContentManagerBreadcrumbs } from "@components/component/breadcrumbs";
import { CreateLessonForm, EditLessonForm, DeleteLessonForm } from "@components/component/forms/lessonForms";
import { Lesson, OptionProps } from "@/types/form";
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
  if (user == null) {
    return (
      <NotFoundWithRedirect
        text="ユーザ登録が済んでいません。ユーザ登録をしてください。"
        href="/register"
      />
    );
  }
  if (user.type != "admin") {
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
        text={ res.messages }
        href="/"
      />
    )
  }

  const subject = await getSubject(subjectId);

  if (!subject) {
    return (
      <NotFoundWithRedirect
        text="科目が存在しません。"
        href="/"
      />
    )
  }

  const breadcrumbs: BreadCrumb[] = [
    {
      path: "/content_manager",
      name: "科目管理",
    },
    {
      path: `/content_manager/${ subjectId }`,
      name: subject.subject_name,
    },
    {
      path: `/content_manager/${ subjectId }/${ unitId }`,
      name: unit.unit_name,
    },
  ];

  const units = await getUnits();
  const options:OptionProps[] = [];
  units.map(s => {
    var val:OptionProps = {
      label: s.unit_name,
      value: s.unit_id,
    }
    options.push(val);
  });

  return (
    <div
      className="w-full p-4 flex flex-col gap-4"
    >
      <div
        className="mt-8"
      >
        <ContentManagerBreadcrumbs 
          breadcrumbs={ breadcrumbs }
        />
      </div>
      <div
        className="flex justify-end"
      >
        <InternalLink 
          href="/content_manager/contents"
          text="コンテンツ一覧を開く"
        />
      </div>
      <Header1 title="授業管理" />
      <InnerCard>
        <Header2 title={ unit.unit_name } />
        <p>{ unit?.description }</p>
      </InnerCard>
      <div
        className="flex justify-end"
      >
        <CreateLessonForm 
          defaultValue={ unit.unit_id }
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
          { unit.Lessons.map(l => {
            const lesson:Lesson = {
              lessonId: l.lesson_id,
              title: l.title,
              description: l.description || "",
              isPublic: l.is_public,
              unitId: l.unit_id
            }
            return (
              <DataColumn
                key={ l.lesson_id }
                lesson={ lesson }
                options={ options }
                link={`/content_manager/${ subjectId }/${ unitId }/${ l.lesson_id }`}
              />
            )
          })}
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
      className="flex gap-1 items-center border-b p-1"
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