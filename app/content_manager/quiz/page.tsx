import { auth } from "@clerk/nextjs/server";
import { getUserWithClerkId } from "@lib/dbController/user";
import { NotFoundWithRedirect, NotFound } from "@components/ui/notFound";
import { CreateQuizForm } from "@components/component/forms/quizForms";
import { getAllQuiz } from "@lib/dbController/quiz";
import { Header1 } from "@components/ui/title";
import QuizList from "@components/component/common/QuizList";
import { InternalLink } from "@components/ui/myLink";

export default async function QuizManagePage() {
  // 認証の確認
  const { userId } = await auth();
  if (!userId) {
    return (
      <NotFoundWithRedirect
        text="ログインしていません。ログインを済ませてください。"
        href="/"
        buttonText="ログイン"
      />
    );
  }

  const user = await getUserWithClerkId(userId);
  if (!user.values) {
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

  // データ取得
  const resQuiz = await getAllQuiz();
  if (resQuiz.isSuccess == false) {
    return (
      <NotFound
        text={ resQuiz.messages.other || "小テストの取得に失敗しました。" }
      />
    );
  }

  const quizzes = resQuiz.values;

  return (
    <div
      className="w-full p-4 flex flex-col gap-4"
    >
      <div
        className="flex justify-end gap-2 text-sm"
      >
        <InternalLink
          href="/content_manager"
          text="コンテンツマネージャー"
        />
        <InternalLink 
          href="/content_manager/contents"
          text="コンテンツ一覧を開く"
        />
      </div>
      <Header1 title="小テスト管理" />
      <div
        className="flex justify-end"
      >
        <CreateQuizForm />
      </div>
      <QuizList
        quizzes={ quizzes }
      />
    </div>
  )
}