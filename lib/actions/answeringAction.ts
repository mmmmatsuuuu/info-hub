// "use server"
// import { UserAnswer } from "@/types/quiz";
// import { getQuiz } from "@lib/dbController/quiz";

// export async function SaveQuizReslut(userAnswer: UserAnswer) {
//   try {
//     // データの取得

//     const { quizId, userId, answers } = userAnswer;
//     const quizRes = await getQuiz(quizId);
//     if (quizRes.isSuccess == false) {
//       throw new Error("回答に対応する小テストが見つかりませんでした。");
//     }
//     const quiz = quizRes.values;
//     const questions = quiz.questions;
//     // 合否の判定
//     let pointAllocation = 0; // 配点
//     let score = 0; // ユーザの得点
    
//     console.log(answers);
//     console.log(questions);
  
//     // 結果をデータベースに保存
  
//     // 結果をユーザに返却
//     return 0;
//   } catch(error) {

//   }

// }