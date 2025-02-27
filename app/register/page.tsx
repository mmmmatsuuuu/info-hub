import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Header1 } from "@components/ui/title";
import UserRegister from '@components/component/Register';

export default async function Register() {

  // ログインがなされていない場合の処理
  const user = await currentUser();
  
  if (!user) {
    return redirect("/");
  }
  const username = user.username ? user.username : "";
  const email = user.emailAddresses[0].emailAddress;

  return (
    <div
      className="w-full p-12"
    >
      <Header1 title="ユーザ情報の登録" />
      <p>最初に基本情報を登録しましょう。</p>
      <UserRegister
        username={ username }
        email={ email }
      />
    </div>
  )
}