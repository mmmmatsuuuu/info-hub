import { Suspense } from "react";
import { Loading } from "@components/ui/loading";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getUserWithStudent } from "@lib/dbController/user";
import { Header1 } from "@components/ui/title";
import { InternalLink } from "@components/ui/myLink";
import { 
  BasicInfo, 
  PersonalDataDashboard,
} from "@components/component/ssrMypage";
import { StudentsDataDashboard } from "@components/component/csrMypage";
import { UserAndStudent } from "@/types/dbOperation";
import { NotFoundWithRedirect } from "@components/ui/notFound";
import Footer from "@components/component/common/Footer";

export default async function MyPage({
  params
}: {
  params: Promise<{ user_id: string }>
}) {
  // ユーザデータがない場合、registerページにリダイレクト
  const user = await auth();
  const clerkUserData = await currentUser();
  const userId = (await params).user_id;
  if (!userId || !user.userId) {
    return (
      <NotFoundWithRedirect
        text="ログインが済んでいません。"
        href="/login"
      />
    )
  }
  const res = await getUserWithStudent(userId);
  if (res.isSuccess = false) {
    return (
      <NotFoundWithRedirect
        text="ユーザ情報の登録が済んでいません。"
        href="/register"
      />
    )
  }
  const userData:UserAndStudent = res.values;
  if (!userData) {
    return (
      <NotFoundWithRedirect
        text="ユーザ情報の登録が済んでいません。"
        href="/register"
      />
    )
  }
  return(
    <div
      className="w-full mt-4 p-4 flex flex-col gap-4 overflow-y-scroll"
    >
      <div
        className="w-full"
        >
        <Header1 title="マイページ" />
      </div>
      {userData.type === "admin" && (
        <div
          className="m-2 flex gap-4 justify-end"
        >
          <InternalLink href="/content_manager" text="コンテンツマネージャー" />
        </div>
      )}
      <BasicInfo 
        user={ userData } 
        imageUrl={ clerkUserData?.imageUrl }
      />
      <PersonalDataDashboard 
        userId={ userData.userId || "" }
      />
      <div
        className="lg:col-span-2"
      >
      </div>
      {
        userData.type === "admin"
        ?
        <Suspense fallback={ <Loading />}>
          <StudentsDataDashboard />
        </Suspense>
        :
        <></>
      }
      {
        userData.type === "teacher"
        ?
        <Suspense fallback={ <Loading />}>
          <StudentsDataDashboard />
        </Suspense>
        :
        <></>
      }
      <Footer />
    </div>
  )
}