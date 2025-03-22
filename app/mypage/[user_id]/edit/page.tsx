import { auth } from "@clerk/nextjs/server";
import { getUserWithStudent } from "@lib/dbController/user";
import { redirect } from "next/navigation";
import { EditStudentForm } from "@components/component/forms/userForms";

export default async function EditMyPage({
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
      className="w-full p-4"
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