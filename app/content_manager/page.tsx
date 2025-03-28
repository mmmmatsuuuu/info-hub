import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { InternalLink } from "@components/ui/myLink";
import { NotFoundWithRedirect, NotFound } from "@components/ui/notFound";
import { Header1 } from "@components/ui/title";
import { getUserWithClerkId } from "@lib/dbController/user";
import { getSubjects } from "@lib/dbController/subject";
import { CreateSubjectForm, EditSubjectForm, DeleteSubjectForm } from "@components/component/forms/subjectForms";
import { Subject } from "@/types/dbOperation";
import { ContentManagerBreadcrumbs } from "@components/component/common/breadcrumbs";
import { BreadCrumb } from "@/types/common";
import { Loading } from "@components/ui/loading";

export default async function ContentManagePage() {
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
  if (!user.values) {
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

  // データの取得
  const res = await getSubjects();

  const subjects = res.values;

  // パンくずリストの作成
  const breadcrumbs:BreadCrumb[] = [{
    path: "/content_manager",
    name: "科目管理",
  }];

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
        <InternalLink 
          href="/content_manager/contents"
          text="コンテンツ一覧を開く"
        />
      </div>
      <Header1 title="科目管理" />
      <div
        className="flex justify-end"
      >
        <CreateSubjectForm />
      </div>
      <div
        className="flex flex-col gap-1 w-full overflow-y-scroll"
      >
        <div
          className="flex gap-1 items-center border-b p-1"
        >
          <div
            className="w-[64px] shrink-0 text-center"
          >
            公開
          </div>
          <div
            className="w-[64px] shrink-0 text-center"
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
        <Suspense fallback={ <Loading /> }>
          <div
            className="overflow-y-scroll"
          >
          { 
            subjects.length > 0
            ?
            subjects.map(s => {
              const subject:Subject = {
                subjectId: s.subjectId,
                subjectName: s.subjectName,
                description: s.description ? s.description : undefined,
                isPublic: s.isPublic
              }
              return (
                <DataColumn
                  key={s.subjectId}
                  subject={ subject }
                  link={`/content_manager/${ s.subjectId }` }
                />
              )
            })
            :
            <NotFound text="データがありません。"/>
          }
          </div>
        </Suspense>
      </div>
    </div>
  )
}

function DataColumn({
  subject, link
}: {
  subject: Subject, link: string,
}) {
  return (
    <div
      className="flex gap-1 items-center border-b p-1"
      key={ subject.subjectId }
    >
      <div
        className="w-[64px] shrink-0 text-center px-1 text-sm"
      >
        {
          subject.isPublic
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
        { subject.subjectId }
      </div>
      <div
        className="grow"
      >
        { subject.subjectName }
      </div>
      <div
        className="w-[192px] flex shrink-0 gap-1 justify-center items-center "
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
          <EditSubjectForm
            subject={ subject }
          />
        </div>
        <div
          className="w-[64px]"
        >
          <DeleteSubjectForm 
            subjectId={ subject.subjectId }
          />
        </div>
      </div>
    </div>
  )
}