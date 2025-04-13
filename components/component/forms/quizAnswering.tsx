"use client"
import React, { useState, useEffect, ChangeEvent } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  ShortAnswerQuestion,
  MultipleChoiceQuestion,
  MultipleSelectQuestion,
  SortQuestion
} from "@/types/quiz";
import { InnerCard } from "@components/ui/card";
import { ErrorTip } from "@components/ui/formUi";
import { SortOption } from "@/types/quiz";
import { AnswerType, UserAnswer } from "@/types/quiz";
import { SaveQuizReslut } from "@lib/actions/answeringAction";

export default function QuizAnswerForm({
  questions, quizId, userId
}: {
  questions: (ShortAnswerQuestion | MultipleChoiceQuestion | MultipleSelectQuestion | SortQuestion)[];
  quizId: string;
  userId: string;
}) {
  const [answers, setAnswers] = useState<AnswerType[]>(questions.map(q => {
    return {
      questionId: q.questionId,
      questionType: q.type,
      answer: null
    }
  }));

  const handleAnswerChange = (questionId: number, answer: string | string[] | number | number[]) => {
    setAnswers(prevAnswers => {
      return prevAnswers.map(a => {
        if (a.questionId === questionId) {
          return {
            ...a,
            answer: answer
          }
        }
        return a;
      })
    });
  }

  const handleSubmit = async() => {
    // 後で実装する。
    const userAnswer: UserAnswer = {
      quizId: quizId,
      userId: userId,
      answers: answers
    }
    console.log(userAnswer);
    const res = await SaveQuizReslut(userAnswer);
    const value = res.values;
    console.log(value);
  }
  return (
    <div
      className="flex flex-col gap-4 mt-4"
    >
      {
        questions.map((question, index) => {
          switch (question.type) {
            case "記述式":
              return (
                <ShortAnswerQuestionAnswerForm
                  key={index}
                  question={question}
                  handleAnswerChange={handleAnswerChange}
                />
              )
            case "単一選択":
              return (
                <MultipleChoiceQuestionAnswerForm
                  key={index}
                  question={question}
                  handleAnswerChange={handleAnswerChange}
                />
              )
            case "複数選択":
              return (
                <MultipleSelectQuestionAnswerForm
                  key={index}
                  question={question}
                  handleAnswerChange={handleAnswerChange}
                />
              )
            case "並び換え":
              return (
                <SortQuestionAnswerForm
                  key={index}
                  question={question}
                  handleAnswerChange={handleAnswerChange}
                />
              )
          }
        })
      }
      <div>
        <button
          className="w-full text-center font-bold text-lg bg-blue-400 text-white rounded-md p-2 hover:bg-blue-500 transition-all duration-200"
          onClick={handleSubmit}
        >
          送信
        </button>
      </div>
    </div>
  )
}

function ShortAnswerQuestionAnswerForm({
  question, handleAnswerChange
}: {
  question: ShortAnswerQuestion;
  handleAnswerChange: (questionId: number, answer: string) => void;
}) {
  const [answer, setAnswer] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAnswer(value);
  }

  useEffect(() => {
    handleAnswerChange(question.questionId, answer);
  }, [answer]);
  return (
    <InnerCard>
      <div
        className="py-4"
      >
        <div
          className="flex items-start justify-between gap-2"
        >
          <div
            className="px-2 rounded-md bg-slate-800 text-white"
          >
            問題ID:　<span>{ question.questionId }</span>
          </div>
          <div
            className="px-2 rounded-md bg-blue-400 text-white text-sm"
          >
            記述式問題
          </div>
        </div>
        <p
          className="text-lg font-bold py-4 pl-6"
        >
          { question.questionText }
        </p>
        <div
          className="pl-4"
        >
          <ErrorTip
            flag={true}
            message="一言一句間違いなく書いてください。アルファベット、数字は半角で書いてください。それ以外は全て全角になります。"
          />
        </div>
      </div>
      <div
        className="py-4"
      >
          <label className="text-sm text-slate-400">解答欄</label>
          <input 
            type="text" 
            className="w-full p-2 rounded border border-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
            onChange={ handleChange}
          />
      </div>
    </InnerCard>
  )
}

function MultipleChoiceQuestionAnswerForm({
  question, handleAnswerChange,
}: {
  question: MultipleChoiceQuestion;
  handleAnswerChange: (questionId: number, answer: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleChecked = (val: string) => {
    const value = val;
    setSelected(value);
  }

  useEffect(() => {
    if (selected === null) return;
    handleAnswerChange(question.questionId, selected);
  }, [selected]);
  return (
    <InnerCard>
      <div
        className="py-4"
      >
        <div
          className="flex items-start justify-between gap-2"
        >
          <div
            className="px-2 rounded-md bg-slate-800 text-white"
          >
            問題ID:　<span>{ question.questionId }</span>
          </div>
          <div
            className="px-2 rounded-md bg-blue-400 text-white text-sm"
          >
            単一選択問題
          </div>
        </div>
        <p
          className="text-lg font-bold py-4 pl-6"
        >
          { question.questionText }
        </p>
        <div
          className="pl-4"
        >
          <ErrorTip
            flag={true}
            message="選択肢の中から1つだけ選んでください。"
          />
        </div>
      </div>
      <div
        className="py-4 flex flex-col gap-2"
      >
        {
          question.options.map((option, index) => {
            const isSelected = selected === option.text;
            return (
              <div
                key={index}
                className={`flex gap-2 p-2 rounded-md border border-slate-400 hover:bg-slate-100 ${ isSelected ? "bg-sky-100" : "" }`}
                onClick={()=> handleChecked(option.text)}
              >
                <input 
                  type="radio"
                  className=""
                  name={`question-${question.questionId}`} 
                  value={option.text} 
                  checked={isSelected}
                  onChange={ () => {} }
                />
                <label>
                  { option.text }
                </label>
              </div>
            );
          })
        }
      </div>
    </InnerCard>
  )
}

function MultipleSelectQuestionAnswerForm({
  question, handleAnswerChange
}: {
  question: MultipleSelectQuestion;
  handleAnswerChange: (questionId: number, answer: string[]) => void;
}) {

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    handleAnswerChange(question.questionId, selectedOptions);
  }, [selectedOptions]);

  const handleOptionChange = (option: string) => {
    setSelectedOptions(prevSelected => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter(o => o !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  }

  return (
    <InnerCard>
      <div
        className="py-4"
      >
        <div
          className="flex items-start justify-between gap-2"
        >
          <div
            className="px-2 rounded-md bg-slate-800 text-white"
          >
            問題ID:　<span>{ question.questionId }</span>
          </div>
          <div
            className="px-2 rounded-md bg-blue-400 text-white text-sm"
          >
            複数選択問題
          </div>
        </div>
        <p
          className="text-lg font-bold py-4 pl-6"
        >
          { question.questionText }
        </p>
        <div
          className="pl-4"
        >
          <ErrorTip
            flag={true}
            message="正しいものを全て選んでください。"
          />
        </div>
      </div>
      <div
        className="py-4 flex flex-col gap-2"
      >
        {
          question.options.map((option, index) => {
            const isSelected = selectedOptions.includes(option.text);
            return (
              <div
                key={index}
                className={`flex items-center gap-2 border border-slate-400 p-2 rounded-md hover:bg-slate-100 ${ isSelected ? "bg-sky-100" : "" }`}
                onClick={() => handleOptionChange(option.text)}
              >
                <input 
                  type="checkbox" 
                  name={`question-${question.questionId}`} 
                  value={option.text}
                  checked={isSelected}
                  onChange={() => {}}
                />
                <label>{ option.text }</label>
              </div>
            );
          })
        }
      </div>
    </InnerCard>
  )
}

function SortQuestionAnswerForm({
  question, handleAnswerChange
}: {
  question: SortQuestion;
  handleAnswerChange: (questionId: number, answer: number[]) => void;
}) {
  const [items, setItems] = useState(question.options);
  const sensors = useSensors(useSensor(PointerSensor));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  useEffect(() => {
    const answer = items.map((item) => item.id);
    handleAnswerChange(question.questionId, answer);
  }, [items]);

  return (
    <InnerCard>
      <div
        className="py-4"
      >
        <div
          className="flex items-start justify-between gap-2"
        >
          <div
            className="px-2 rounded-md bg-slate-800 text-white"
          >
            問題ID:　<span>{ question.questionId }</span>
          </div>
          <div
            className="px-2 rounded-md bg-blue-400 text-white text-sm"
          >
            並び換え問題
          </div>
        </div>
        <p
          className="text-lg font-bold py-4 pl-6"
        >
          { question.questionText }
        </p>
        <div
          className="pl-4"
        >
          <ErrorTip
            flag={true}
            message="上から正しい順番に並び替えてください。"
          />
        </div>
      </div>
      <div

      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.id.toString())}
            strategy={ verticalListSortingStrategy}
          >
            {
              items.map(item => {
                return (
                  <SortableItem key={item.id} item={ item } />
                )
              })
            }
          </SortableContext>
        </DndContext>
      </div>
    </InnerCard>
  )
}

function SortableItem({
  item
}: {
  item: SortOption;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <div 
      ref={setNodeRef}
      className="p-2 px-4 rounded-md border border-slate-500 my-2 bg-white hover:bg-slate-100"
      style={style} 
      {...attributes} 
      {...listeners}
    >
      <p>{ item.text }</p>
    </div>
  );
}