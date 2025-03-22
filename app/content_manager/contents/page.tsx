import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { InnerCard } from "@components/ui/card";
import { NotFoundWithRedirect } from "@components/ui/notFound";
import { Header1 } from "@components/ui/title";
import { getUserWithClerkId } from "@lib/dbController/user";
import { ContentWithLessons } from "@/types/form";
import { getAllContents } from "@lib/dbController/content";
import { TypeIcon } from "@components/component/contentType";
import { CreateContentForm, EditContentForm, DeleteContentForm } from "@components/component/forms/contentForms";
import ContentsList from "@components/component/ContentsList";

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
  
  // データの取得
  const contents = await getAllContents();

  return (
    <div
      className="w-full p-4 flex flex-col gap-4"
    >
      <Header1 title="コンテンツ管理" />
      <InnerCard>
        <p>ここでは、授業で使用するコンテンツの管理を行います。</p>
      </InnerCard>
      <div
        className="flex justify-end"
      >
        <CreateContentForm />
      </div>
      <ContentsList
        contents={ contents }
      />
    </div>
  )
}
