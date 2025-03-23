import { auth } from "@clerk/nextjs/server";
import { getUserWithStudent } from "@lib/dbController/user";
import { redirect } from "next/navigation";
import { OuterCard } from "@components/ui/card";
import { Header1, Header2 } from "@components/ui/title";
import { InternalLink } from "@components/ui/myLink";

export default async function MyPage({
  params
}: {
  params: Promise<{ user_id: string }>
}) {
  // ユーザデータがない場合、registerページにリダイレクト
  const user = await auth();
  const userId = (await params).user_id;
  let userData;
  if (userId && user.userId) {
    const res = await getUserWithStudent(userId);
    if (res.isSuccess = false) {
      return redirect("/register");
    }
    userData = res.values;
  }
  if (!userData) {
    return redirect("/register");
  }
  return(
    <div
      className="w-full mt-12 p-4 flex flex-col gap-4"
    >
      <div
        className="w-full"
      >
        <Header1 title="マイページ" />
      </div>
      <OuterCard>
        <Header2 title="基本情報"/>
        <table
          className="w-full p-2"
        >
          <tbody>
            <tr className="border-b">
              <td>ユーザ名</td>
              <td>{ userData.username }</td>
            </tr>
            <tr className="border-b">
              <td>タイプ</td>
              <td>
                { userData.type === "student" ? "生徒": "" }
                { userData.type === "teacher" ? "先生": "" }
                { userData.type === "admin" ? "管理者": "" }
              </td>
            </tr>
            <tr className="border-b">
              <td>メールアドレス</td>
              <td>{ userData.email }</td>
            </tr>
            <tr className="border-b">
              <td>学校名</td>
              <td>{ userData.schoolName }</td>
            </tr>
            <tr className="border-b">
              <td>入学年度</td>
              <td>{ userData.admissionYear }</td>
            </tr>
            <tr className="border-b">
              <td>学籍番号</td>
              <td>{ Number(userData.studentNumber) }</td>
            </tr>
          </tbody>
        </table>
        <div
          className="w-full flex justify-end mt-2"
        >
          <InternalLink href={`/mypage/${ userId }/edit`} text="編集" cls="px-8"/>
        </div>
      </OuterCard>
      {userData.type === "admin" && (
        <OuterCard>
          <Header2 title="コンテンツマネージャー"/>
          <div
            className="m-2 flex gap-4 justify-end"
          >
            <p>ここで、教科や単元のコンテンツを管理します。</p>
            <InternalLink href="/content_manager" text="コンテンツマネージャー" />
          </div>
        </OuterCard>
      )}
    </div>
  )
}