"use client"
import { NotFound } from "@components/ui/notFound";
import { Quiz } from "@/types/dbOperation";
import { 
  ShortAnswerQuestion,
  MultipleChoiceQuestion,
  MultipleSelectQuestion,
  SortQuestion
} from "@/types/quiz";
import { EditQuizForm, DeleteQuizForm } from "../forms/quizForms";

export default function QuizList({
  quizzes
}: {
  quizzes: Quiz[] | null,
}) {
  if (quizzes == null) {
    return (
      <NotFound text="データがありません。"/>
    );
  } else {
    // フィルター、ソート機能を実装する
    // const [ quizzes, setQuizzes ] = useState(initialQuizzes);
    
    return (
      <div
        className="flex flex-col gap-1 w-full overflow-y-scroll"
      >
        <div
          className="flex gap-1 items-center border-b border-slate-300 p-1"
        >
          <div
            className="w-[64px] shrink-0 text-center"
          >
            公開
          </div>
          <div
            className="w-[64px] shrink-0 text-center"
          >
            ID
          </div>
          <div
            className="grow"
          >
            名称
          </div>
          <div
            className="w-[192px] shrink-0"
          >
          </div>
        </div>
        <div
          className="overflow-y-scroll"
        >
          {
            quizzes.map(q => {
              return (
                <DataColumn 
                  key={ q.quizId }
                  quiz={ q }
                />
              )
            })
          }
        </div>
      </div>
    );
  }
}

function DataColumn({
  quiz
}: {
  quiz: Quiz
}) {
  const QuestionDiv = ({
    index, question
  }: {
    index: number,
    question: ShortAnswerQuestion | MultipleChoiceQuestion | MultipleSelectQuestion | SortQuestion
  }) => {
    return (
      <div
        className="rounded border border-slate-200 p-1 gap-1 items-center text-xs max-w-[224px]"
      >
        <div
          className="flex gap-1 items-center"
        >
          <span>{index}問目</span>
          <span>{ question.type }</span>
        </div>
        <div
          className="truncate"
        >
          { question.questionText }
        </div>
      </div>
    )
  }
  return (
    <div
      className="flex gap-1 items-center p-1 border-b hover:bg-slate-100"
    >
      <div
        className="w-[64px] shrink-0 text-center px-1 text-sm"
      >
        {
          quiz.isPublic
          ?
          <div
            className="rounded p-1 border border-green-500 text-green-500 bg-green-50"
          >
            公開
          </div>
          :
          <div
            className="rounded p-1 border border-red-500 text-red-500 bg-red-50"
          >
            非公開
          </div>
        }
      </div>
      <div
        className="w-[64px] shrink-0 text-center"
      >
        { quiz.quizId }
      </div>
      <div
        className="grow overflow-x-scroll flex flex-col gap-1 text-sm"
      >
        <div
          className="font-bold"
        >
          { quiz.title }
        </div>
        <div
          className="text-nowrap"
        >
          { quiz.description }
        </div>
        <div
          className="flex gap-1 items-center"
        >
          {
            quiz.questions.map((q, index) => {
              return (
                <QuestionDiv
                  key={ index }
                  index={ index + 1 }
                  question={ q }
                />
              )
            })
          }
        </div>
      </div>
      <div
        className="w-[192px] shrink-0 grid grid-cols-2 gap-1"
      >
        <EditQuizForm
          quiz={ quiz }
        />
        <DeleteQuizForm
          quizId={ quiz.quizId }
        />
      </div>
    </div>
  )
}