import { Quiz } from "@/types/dbOperation";
import { ShortAnswerQuestion, MultipleChoiceQuestion, MultipleSelectQuestion, SortQuestion } from "@/types/quiz";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function quizDataFormat(data: any):Quiz {
  const formattedData:Quiz = {
    quizId: "",
    title: "",
    description: "",
    isPublic: false,
    questions: [],
  };
  if (
    !("quizId" in data) || 
    !("contentId" in data) || 
    !("title" in data) || 
    !("description" in data) || 
    !("isPublic" in data) || 
    !("questions" in data)
  ) {
    throw new Error("無効なデータです。");
  }
  
  if (!Array.isArray(data.questions)) {
    throw new Error("無効なデータです。");
  }

  formattedData.quizId = data.quizId;
  formattedData.title = data.title;
  formattedData.description = data.description;
  formattedData.isPublic = data.isPublic == "true" ? true : false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data.questions.map((q:any) => {
    switch (q.type) {
      case "記述式":
        const saQuestion: ShortAnswerQuestion = {
          questionId: q.questionId,
          questionText: q.questionText,
          img: q.img ? q.img : null,
          type: q.type,
          correct: q.correct,
        }
        formattedData.questions.push(saQuestion);
        break;
      case "単一選択":
        const mcQuestion: MultipleChoiceQuestion = {
          questionId: q.questionId,
          questionText: q.questionText,
          img: q.img ? q.img : null,
          type: q.type,
          options: q.options,
        }
        formattedData.questions.push(mcQuestion);
        break;
      case "複数選択":
        const msQuestion: MultipleSelectQuestion = {
          questionId: q.questionId,
          questionText: q.questionText,
          img: q.img ? q.img : null,
          type: q.type,
          options: q.options,
        }
        formattedData.questions.push(msQuestion);
        break;
      case "並び換え":
        const sQuestion: SortQuestion = {
          questionId: q.questionId,
          questionText: q.questionText,
          img: q.img ? q.img : null,
          type: q.type,
          options: q.options,
          correctOrder: q.correctOrder,
        }
        formattedData.questions.push(sQuestion);
        break;
      default:
        break;
    }
  });

  return formattedData;
}