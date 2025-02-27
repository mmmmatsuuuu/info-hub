import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';
import { Header1, Header2 } from "@components/ui/title";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";

export default async function Register() {
  // ログインがなされていない場合の処理
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }

  const username = user.username ? user.username : "";
  const email = user.emailAddresses ? user.emailAddresses[0].emailAddress : "";
  
  // サーバアクション
  async function addDataAction(formData:FormData) {
    "use server"
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    console.log(username);
    console.log(email);
  }
  return (
    <div
      className="w-full p-12"
    >
      <Header1 title="ユーザ情報の登録" />
      <p>最初に基本情報を登録しましょう。</p>
      <form action={ addDataAction }>
        <div>
          <label htmlFor="username">ユーザ名</label>
          <Input 
            type="text"
            defaultValue={ username }
            name="username"
          />
        </div>
        <div>
          <label>メールアドレス</label>
          <Input 
            type="email"
            defaultValue={ email }
            name="email"
          />
        </div>
        <Button
          className="w-full"
        >
          登録
        </Button>
      </form>
    </div>
  )
}