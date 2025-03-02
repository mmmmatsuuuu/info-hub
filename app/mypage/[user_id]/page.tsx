import { auth } from "@clerk/nextjs/server";
import { getUserWithStudent } from "@lib/dbController";
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
    userData = await getUserWithStudent(userId);
  }
  if (!userData) {
    return redirect("/register");
  }
  return(
    <div
      className="w-full mt-12"
    >
      <div
        className="w-full mb-4"
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
              <td>{ userData.name }</td>
            </tr>
            <tr className="border-b">
              <td>タイプ</td>
              <td>
                { userData.type === "student" ? "生徒": "" }
                { userData.type === "teacher" ? "先生": "" }
              </td>
            </tr>
            <tr className="border-b">
              <td>メールアドレス</td>
              <td>{ userData.email }</td>
            </tr>
            <tr className="border-b">
              <td>学校名</td>
              <td>{ userData.Student? userData.Student.school_name : "" }</td>
            </tr>
            <tr className="border-b">
              <td>入学年度</td>
              <td>{ userData.Student? userData.Student.admission_year : 1900 }</td>
            </tr>
            <tr className="border-b">
              <td>学籍番号</td>
              <td>{ userData.Student? Number(userData.Student.student_number) : 1101 }</td>
            </tr>
          </tbody>
        </table>
        <div
          className="w-full flex justify-end mt-2"
        >
          <InternalLink href={`/mypage/${ userId }/edit`} text="編集" cls="px-8"/>
        </div>
      </OuterCard>
    </div>
  )
}