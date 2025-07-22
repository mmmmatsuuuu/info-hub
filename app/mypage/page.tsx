import { getPublicSubjectsWithUnitsAndLessonsAndContents } from "@/lib/dbController/subject";
import MypageClient from "./MypageClient";
import Footer from "@components/component/common/Footer";

export default async function Mypage() {
  const { values: subjects, isSuccess, messages } = await getPublicSubjectsWithUnitsAndLessonsAndContents();

  if (!isSuccess) {
    return <div>{messages.other}</div>;
  }

  return (
    <div
      className="container mx-auto p-4 overflow-y-auto"
    >
      <h1 className="text-3xl font-bold mb-6">マイページ</h1>
      <p>
        マイページでは、あなたが登録した科目の進捗状況を確認できます。各科目をクリックして、ユニットやレッスンの詳細を表示し、コンテンツの視聴回数や小テストの回数を確認してください。
      </p>
      <MypageClient subjects={subjects} />
      <Footer />
    </div>
  ); 
}
