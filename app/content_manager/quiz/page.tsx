import { EditQuizForm } from "@components/component/forms/quizForms";
import { Quiz } from "@/types/dbOperation";

export default function QuizManagePage() {
  const quiz:Quiz = {
    quizId: "1",
    contentId: "1",
    title: "開発用",
    description: "開発用",
    isPublic: false,
    questions: []
  }
  return (
    <div>
      <EditQuizForm 
        quiz={ quiz }
      />
    </div>
  )
}