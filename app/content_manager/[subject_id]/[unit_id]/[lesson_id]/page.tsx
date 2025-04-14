import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { InnerCard } from "@components/ui/card";
import { InternalLink } from "@components/ui/myLink";
import { NotFoundWithRedirect } from "@components/ui/notFound";
import { Header1, Header2 } from "@components/ui/title";
import { getLesson } from "@lib/dbController/lesson";
import { getUnit } from "@lib/dbController/unit";
import { getSubject } from "@lib/dbController/subject";
import { getUserWithClerkId } from "@lib/dbController/user";
import { getNotLessonContents } from "@lib/dbController/content";
import { ContentManagerBreadcrumbs } from "@components/component/common/breadcrumbs";
import { BreadCrumb } from "@/types/common";
import { TypeIcon } from "@components/component/common/contentType";
import { CreateLessonContentForm, DeleteLessonContentForm } from "@components/component/forms/lessonContentForms";
import { Content, LessonContent, OptionProps } from "@/types/dbOperation";
import { ExternalLink } from "@components/ui/myLink";

export default async function ContentManagePage({
  params
}: {
  params: Promise<{ lesson_id: string, unit_id: string, subject_id: string }>
}) {
  // 認証の確認
  const { userId } = await auth();
  if (!userId) {
    return (
      <NotFoundWithRedirect
        text="ログインしていません。ログインを済ませてください。"
        href="/"
        buttonText="トップページに戻る"
      />
    );
  }

  const user = await getUserWithClerkId(userId);
  if (user.isSuccess == false) {
    return (
      <NotFoundWithRedirect
        text="ユーザ登録が済んでいません。ユーザ登録をしてください。"
        href="/register"
        buttonText="ユーザ登録"
      />
    );
  }
  if (user.values.type != "admin") {
    return (
      <NotFoundWithRedirect
        text="管理者権限がありません。"
        href="/"
        buttonText="トップページに戻る"
      />
    );
  }

  const p = await params;
  const lessonId = p.lesson_id;
  const subjectId = p.subject_id;
  const unitId = p.unit_id;

  // データの取得
  const subjectRes = await getSubject(subjectId);
  if (subjectRes.isSuccess = false) {
    return (
      <NotFoundWithRedirect
        text="エラーが発生しました。"
        href="/"
        buttonText="トップページに戻る"
      />
    )
  }
  const subject = subjectRes.values;

  const unitRes = await getUnit(unitId);
  if (unitRes.isSuccess == false) {
    return (
      <NotFoundWithRedirect
        text="エラーが発生しました。"
        href="/"
        buttonText="トップページに戻る"
      />
    )
  }
  const unit = unitRes.values;

  const res = await getLesson(lessonId);
  const lesson = res.values;
  if (!lesson ) {
    return (
      <NotFoundWithRedirect
        text="授業がありません。"
        href="/"
        buttonText="トップページに戻る"
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
      name: subject.subjectName,
    },
    {
      path: `/content_manager/${ subjectId }/${ unitId }`,
      name: unit.unitName,
    },
    {
      path: `/content_manager/${ subjectId }/${ unitId }/${ lessonId }`,
      name: lesson.title,
    },
  ];

  const res2 = await getNotLessonContents(lessonId);
  if (res2.isSuccess == false) {
    return (
      <NotFoundWithRedirect
        text="エラーが発生しました。"
        href="/"
        buttonText="トップページに戻る"
      />
    )
  }
  const datas = res2.values;

  const options:OptionProps[] = [];
  if (datas.length > 0) {
    datas.map(d => {
      const value:OptionProps = {
        label: <OptionLabel content={ d } />,
        value: d.contentId,
      }
      options.push(value);
    })
  }

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
      <Header1 title="授業コンテンツ管理" />
      <InnerCard>
        <Header2 title={ lesson.title } />
        <p>{ lesson.description }</p>
      </InnerCard>
      <div
        className="flex justify-end"
      >
        <CreateLessonContentForm
          lessonId={ lessonId }
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
            className="w-[96px] shrink-0"
          >
            タイプ
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
            className="w-[192px]"
          >
          </div>
        </div>
        <div
          className="overflow-y-scroll"
        >
          { lesson.movies.map(c => {
            const content:Content = {
              contentId: c.contentId,
              title: c.title,
              description: c.description || "",
              isPublic: c.isPublic,
              url: c.url,
              type: c.type
            }
            return (
              <DataColumn
                key={ content.contentId }
                lessonId={ lessonId }
                content={ content }
              />
            )
          })}
          { lesson.quiz.map(c => {
            const content:Content = {
              contentId: c.contentId,
              title: c.title,
              description: c.description || "",
              isPublic: c.isPublic,
              url: c.url,
              type: c.type
            }
            return (
              <DataColumn
                key={ content.contentId }
                lessonId={ lessonId }
                content={ content }
              />
            )
          })}
          { lesson.others.map(c => {
            const content:Content = {
              contentId: c.contentId,
              title: c.title,
              description: c.description || "",
              isPublic: c.isPublic,
              url: c.url,
              type: c.type
            }
            return (
              <DataColumn
              key={ content.contentId }
                lessonId={ lessonId }
                content={ content }
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function DataColumn({
  lessonId, content
}: {
  lessonId: string,
  content: Content
}) {
  const data:LessonContent = {
    contentId: content.contentId,
    lessonId: lessonId
  };
  return (
    <div
      className="flex gap-1 items-center border-b p-1 hover:bg-slate-100"
    >
      <div
        className="w-[64px] shrink-0 text-center px-1 text-sm"
      >
        {
          content.isPublic
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
        className="w-[96px] shrink-0 text-center"
      >
        <TypeIcon type={ content.type } />
      </div>
      <div
        className="w-[64px] shrink-0 text-center"
      >
        { content.contentId }
      </div>
      <div
        className="grow flex flex-col gap-1"
      >
        <div
          className="font-bold text-sm"
        >
          { content.title }
        </div>
        <div
          className="text-xs"
        >
          { content.description }
        </div>
        <div
          className="text-xs"
        >
          <Link
            href={ content.url }
            className="hover:underline hover:text-blue-400"
            target="_blank" rel="noopener noreferrer"
          >
            { content.url }
          </Link>
        </div>
      </div>
      <div>
        <DeleteLessonContentForm 
          data={ data }
        />
      </div>
    </div>
  )
}

function OptionLabel({
  content
}: {
  content: Content
}) {
  return (
    <div
      className="w-full p-1 border-l-4 border-blue-400 flex justify-start items-center gap-1"
    >
      <div
        className="w-[80%] text-start"
      >
        <p
          className="font-bold"
        >
          { content.contentId } - {content.title }
        </p>
        <p
          className="text-xs"
        >
          { content.description }
        </p>
      </div>
      <div
        className="w-[8%]"
      >
        <TypeIcon type={ content.type } />
      </div>
      <div
        className="w-[8%]"
      >
        <ExternalLink href={ content.url } />
      </div>
    </div>
  )
}