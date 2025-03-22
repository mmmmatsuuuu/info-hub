import { auth } from "@clerk/nextjs/server";
import { InnerCard } from "@components/ui/card";
import { InternalLink } from "@components/ui/myLink";
import { NotFoundWithRedirect } from "@components/ui/notFound";
import { Header1, Header2 } from "@components/ui/title";
import { getUserWithClerkId } from "@lib/dbController/user";
import { getSubjectWithUnits, getSubjects } from "@lib/dbController/subject";
import { CreateUnitForm, EditUnitForm, DeleteUnitForm } from "@components/component/forms/unitForms";
import { OptionProps, Unit } from "@/types/form";
import { ContentManagerBreadcrumbs } from "@components/component/breadcrumbs";
import { BreadCrumb } from "@/types/common";

export default async function ContentManagePage({
  params
}: {
  params: Promise<{ subject_id: string }>
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

  // データの取得
  const subject = await getSubjectWithUnits(subjectId);
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
    }
  ];

  const subjects = await getSubjects();
  const options:OptionProps[] = [];
  subjects.map(s => {
    var val:OptionProps = {
      label: s.subject_name,
      value: s.subject_id,
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
      <Header1 title="単元管理" />
      <InnerCard>
        <Header2 title={ subject.subject_name } />
        <p>{ subject.description }</p>
      </InnerCard>
      <div
        className="flex justify-end"
      >
        <CreateUnitForm 
          defaultValue={ subjectId }
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
        <div
          className="overflow-y-scroll"
        >
          { subject.Units.map(u => {
            const unit:Unit = {
              unitId: u.unit_id,
              unitName: u.unit_name,
              description: u.description || "",
              subjectId: u.subject_id,
              isPublic: u.is_public,
            }
            return (
              <DataColumn
                key={unit.unitId}
                defaultValue={ subjectId }
                options={ options }
                unit={ unit }
                link={`/content_manager/${ subjectId }/${ unit.unitId }`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function DataColumn({
  defaultValue, options, unit, link
}: {
  defaultValue: string, options: OptionProps[],unit: Unit, link: string,
}) {
  return (
    <div
      className="flex gap-1 items-center border-b p-1"
      key={ unit.unitId }
    >
      <div
        className="w-[64px] shrink-0 text-center px-1 text-sm"
      >
        {
          unit.isPublic
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
        { unit.unitId }
      </div>
      <div
        className="grow"
      >
        { unit.unitName }
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
          <EditUnitForm
            defaultValue={ defaultValue }
            options={ options }
            unit={ unit }
          />
        </div>
        <div
          className="w-[64px]"
        >
          <DeleteUnitForm 
            unitId={ unit.unitId }
          />
        </div>
      </div>
    </div>
  )
}