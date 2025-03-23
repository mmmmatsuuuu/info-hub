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
    const value = await getUserWithStudent(userId);
    if (value.isSuccess == false) {
      return redirect("/");
    }
    userData = value.values;
  }

  if (!userData) {
    return redirect("/register");
  }
  return(
    <div
      className="w-full p-4"
    >
      <EditStudentForm 
        userId={ userData.userId }
        username={ userData.username }
        email={ userData.email }
        type={ userData.type }
        schoolName={ userData.schoolName }
        admissionYear={ userData.admissionYear }
        studentNumber={ Number(userData.studentNumber) }
      />
    </div>
  )
}