// "use server"
// import { OperationResult, Quiz, MessageQuiz } from "@/types/dbOperation";
// import { Questions } from "@/types/quiz";
// import { ValidateQuiz } from "@lib/validate";
// import { createQuiz, editQuiz, deleteQuiz } from "@lib/dbController/quiz";

// export async function createQuizAction(
//   prevState: OperationResult<Quiz, MessageQuiz>,
//   formData: FormData
// ): Promise<OperationResult<Quiz, MessageQuiz>> {
//   const res:OperationResult<Quiz, MessageQuiz> = {
//     isSuccess: false,
//     values: {
//       quizId: "",
//       title: "",
//       description: "",
//       isPublic: false,
//       questions: []
//     },
//     messages: {
//       other: "form(新規作成)"
//     }
//   };
//   try {
//     // データの取得と整形

//     // バリデーション

//     // データベース登録
    
//     // 返却

//     return res;
//   } catch (error) {
//     res.messages.other = String(error);
//     return res;
//   }
// }

// export async function editQuizAction(
//   prevState: OperationResult<Quiz, MessageQuiz>,
//   formData: FormData
// ): Promise<OperationResult<Quiz, MessageQuiz>> {
//   const res:OperationResult<Quiz, MessageQuiz> = {
//     isSuccess: false,
//     values: {
//       quizId: "",
//       title: "",
//       description: "",
//       isPublic: false,
//       questions: []
//     },
//     messages: {
//       other: "form(新規作成)"
//     }
//   };
//   try {
//     // データの取得と整形

//     // バリデーション

//     // データベース登録
    
//     // 返却

//     return res;
//   } catch (error) {
//     res.messages.other = String(error);
//     return res;
//   }
// }

// export async function deleteQuizAction(
//   prevState: OperationResult<Quiz, MessageQuiz>,
//   formData: FormData
// ): Promise<OperationResult<Quiz, MessageQuiz>> {
//   const res:OperationResult<Quiz, MessageQuiz> = {
//     isSuccess: false,
//     values: {
//       quizId: "",
//       title: "",
//       description: "",
//       isPublic: false,
//       questions: []
//     },
//     messages: {
//       other: "form(新規作成)"
//     }
//   };
//   try {
//     // データの取得と整形

//     // バリデーション

//     // データベース登録
    
//     // 返却

//     return res;
//   } catch (error) {
//     res.messages.other = String(error);
//     return res;
//   }
// }