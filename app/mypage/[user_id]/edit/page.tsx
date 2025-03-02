import { auth } from "@clerk/nextjs/server";
import { getUserWithStudent } from "@lib/dbController";
import { redirect } from "next/navigation";
import { EditStudentForm } from "@components/component/Forms";

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
      className="w-full"
    >
      <EditStudentForm 
        userId={ userData.user_id }
        username={ userData.name }
        email={ userData.email }
        schoolName={ userData.Student? userData.Student.school_name : ""}
        admissionYear={ userData.Student? userData.Student.admission_year : 1900 }
        studentNumber={ userData.Student? Number(userData.Student.student_number) : 1101 }
      />
    </div>
  )
}