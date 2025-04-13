import { auth } from "@clerk/nextjs/server";
import { getUserWithClerkId } from "@lib/dbController/user";
import { getPublicQuiz } from "@lib/dbController/quiz";
import { NotFoundWithRedirect } from "@components/ui/notFound";
import { Header1, Header2 } from "@components/ui/title";
import QuizAnswerForm from "@components/component/forms/quizAnswering";
import { BackButton } from "@components/ui/myButton";

export default async function QuizPage({
  params
}: {
  params: Promise<{ quiz_id: string }>
}) {
  const { userId } = await auth();
  let user;
  if (userId) {
    const res = await getUserWithClerkId(userId);
    if (res.isSuccess == true) {
      user = res.values;
    }
  }

  if (!user) {
    return (
      <NotFoundWithRedirect
        text="ログインが済んでいません。"
        href="/login"
      />
    )
  }

  const res = await getPublicQuiz((await params).quiz_id);
  if (res.isSuccess == false) {
    return (
      <NotFoundWithRedirect
        text="小テストが見つかりませんでした"
        href="/"
      />
    )
  }
  const quiz = res.values;
  const questions = quiz.questions;
  return (
    <div
      className="max-w-5xl p-6 mx-auto overflow-y-auto"
    >
      <div
        className="w-full flex justify-end"
      >
        <BackButton />
      </div>
      <Header1 title="小テスト" />
      <Header2 title={`${quiz.title}`} />
      <p>{ quiz.description }</p>
      <QuizAnswerForm
        questions={questions}
        quizId={quiz.quizId}
        userId={ user.userId }
      />
    </div>
  )
}