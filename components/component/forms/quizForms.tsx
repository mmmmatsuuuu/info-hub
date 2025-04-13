"use client"
import React, { useState } from "react";
import { useForm, useFieldArray, Control, UseFormRegister, SubmitHandler } from "react-hook-form";
import { Button, FormAlert } from "@components/ui/formUi";
import { InnerCard } from "@components/ui/card";
import { CloseIcon } from "@components/ui/Icons";
import { Header2 } from "@components/ui/title";
import { Quiz } from "@/types/dbOperation";
import { createQuiz, editQuiz, deleteQuiz } from "@lib/dbController/quiz";
import { Loading } from "@components/ui/loading";
import { quizDataFormat } from "@lib/dataFormat";
import { useRouter } from "next/navigation";

export function CreateQuizForm() {
  const labelCls = "text-sm font-semibold";
  const inputCls = "w-full px-1 text-md rounded border border-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950";
  const ButtonCls = "w-full bg-slate-800 text-slate-100 hover:bg-slate-600 p-2 rounded-md shadow";
  const router = useRouter();
  const [ display, setDisplay ] = useState<string>("hidden");
  const [ isLoading, setIsLoading ] = useState(false);
  const handleClose = () => {
    setDisplay("hidden");
  }

  const handleOpen = () => {
    setDisplay("block");
  }
  const { register, control, handleSubmit, reset } = useForm<Quiz>({
    defaultValues: {
      quizId: "",
      title: "",
      description: "",
      isPublic: false,
      questions: [],
    }
  });

  const onSubmit:SubmitHandler<Quiz> = async(data: Quiz) => {
    setIsLoading(true);
    try {
      // データ整形
      const formattedData = quizDataFormat(data);

      // データ登録
      const res = await createQuiz(
        formattedData.quizId,
        formattedData.title,
        formattedData.description,
        formattedData.isPublic,
        formattedData.questions
      );
      if (res.isSuccess) {
        reset();
        router.refresh();
        setDisplay("hidden");
        console.log("成功しました。");
      } else {
        throw new Error(res.messages.other);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
    <div>
      <Button
        onClick={ handleOpen }
      >
        新規作成
      </Button>
    </div>
    <div
      className={ `z-50 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center p-3 ${ display }` }
    >
      <div
        className="inline-block max-h-full overflow-y-auto rounded-md bg-white"
      >
        <div
          className="sticky top-0 bg-white p-2"
        >
          <div
            className="flex justify-end p-1"
          >
            <div>
              <Button
                onClick={ handleClose }
                cls="w-6 h-6 flex justify-center items-center"
              >
                <CloseIcon/>
              </Button>
            </div>
          </div>
          <Header2 
            title="小テストの追加・編集"
          />
        </div>
        <form
          onSubmit={ handleSubmit(onSubmit) }
          className="overflow-y-auto p-1"
        >
          <InnerCard>
            <div
              className="grid grid-cols-5 gap-2"
            >
              <div
                className="col-span-1"
              >
                <label className={ labelCls }>クイズID</label>
                <input className={ inputCls } { ...register("quizId", { required: "必ず入力してください。"})}/>
              </div>
              <div
                className="col-span-3"
              >
                <label className={ labelCls }>タイトル</label>
                <input className={ inputCls } { ...register("title", { required: "必ず入力してください。"})}/>
              </div>
              <div
                className="col-span-4"
              >
                <label className={ labelCls }>説明</label>
                <input className={ inputCls } { ...register("description", { required: "必ず入力してください。"})}/>
              </div>
              <div
                className="col-span-1"
              >
                <label className={ labelCls }>公開設定</label>
                <select
                  {...register("isPublic")}
                  className={ inputCls }
                >
                  <option value="true">公開</option>
                  <option value="false">非公開</option>
                </select>
              </div>
            </div>
          </InnerCard>
          <div
            className="py-6"
          >
            <QuestionFieldArray
              control={ control }
              register={ register }
            />
          </div>
          <button 
            type="submit"
            className={ `${ButtonCls}` }
            disabled={ isLoading }
          >
            {
              isLoading
              ?
              <Loading message="登録中" size={ 20 }/>
              :
              <div>登録</div>
            }
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export function EditQuizForm({
  quiz
}: {
  quiz:Quiz,
}) {
  const labelCls = "text-sm font-semibold";
  const inputCls = "w-full px-1 text-md rounded border border-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950";
  const ButtonCls = "w-full bg-slate-800 text-slate-100 hover:bg-slate-600 p-2 rounded-md shadow";
  const router = useRouter();
  const [ display, setDisplay ] = useState<string>("hidden");
  const [ isLoading, setIsLoading ] = useState(false);
  const handleClose = () => {
    setDisplay("hidden");
  }

  const handleOpen = () => {
    setDisplay("block");
  }
  const { register, control, handleSubmit, reset } = useForm<Quiz>({
    defaultValues: quiz
  });

  const onSubmit:SubmitHandler<Quiz> = async(data: Quiz) => {
    setIsLoading(true);
    try {
      // データ整形
      const formattedData = quizDataFormat(data);

      // データ登録
      const res = await editQuiz(
        formattedData
      );
      if (res.isSuccess) {
        reset();
        router.refresh();
        setDisplay("hidden");
        console.log("成功しました。");
      } else {
        throw new Error(res.messages.other);
      }
    } catch(error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
    <div>
      <Button
        onClick={ handleOpen }
      >
        編集
      </Button>
    </div>
    <div
      className={ `z-50 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center p-3 ${ display }` }
    >
      <div
        className="inline-block max-h-full overflow-y-auto rounded-md bg-white"
      >
        <div
          className="sticky top-0 bg-white p-2"
        >
          <div
            className="flex justify-end p-1"
          >
            <div>
              <Button
                onClick={ handleClose }
                cls="w-6 h-6 flex justify-center items-center"
              >
                <CloseIcon/>
              </Button>
            </div>
          </div>
          <Header2 
            title="小テストの追加・編集"
          />
        </div>
        <form
          onSubmit={ handleSubmit(onSubmit) }
          className="overflow-y-auto p-1"
        >
          <InnerCard>
            <div
              className="grid grid-cols-5 gap-2"
            >
              <div
                className="col-span-1"
              >
                <label className={ labelCls }>クイズID</label>
                <input className={ inputCls } { ...register("quizId", { required: "IDは必ず入力してください。"})}/>
              </div>
              <div
                className="col-span-3"
              >
                <label className={ labelCls }>タイトル</label>
                <input className={ inputCls } { ...register("title", { required: "IDは必ず入力してください。"})}/>
              </div>
              <div
                className="col-span-4"
              >
                <label className={ labelCls }>説明</label>
                <input className={ inputCls } { ...register("description", { required: "IDは必ず入力してください。"})}/>
              </div>
              <div
                className="col-span-1"
              >
                <label className={ labelCls }>公開設定</label>
                <select
                  {...register("isPublic")}
                  className={ inputCls }
                >
                  <option value="true">公開</option>
                  <option value="false">非公開</option>
                </select>
              </div>
            </div>
          </InnerCard>
          <div
            className="py-6"
          >
            <QuestionFieldArray
              control={ control }
              register={ register }
              defaultValues={ quiz }
            />
          </div>
          <button 
            type="submit"
            className={ `${ButtonCls}` }
            disabled={ isLoading }
          >
            {
              isLoading
              ?
              <Loading message="登録中" size={ 20 }/>
              :
              <div>登録</div>
            }
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

function QuestionFieldArray({
  control,
  register,
  defaultValues
}: {
  control: Control<Quiz>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  defaultValues?: Quiz;
}) {
  const labelCls = "text-sm font-semibold";
  const inputCls = "w-full px-1 text-md rounded border border-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950";
  const ButtonCls = "w-full bg-sky-500 text-sky-100 hover:bg-sky-400 p-1 rounded-md shadow";
  
  const defaultTypes:("記述式" | "単一選択" | "複数選択" | "並び換え")[] = [];
  if (defaultValues) {
    defaultValues.questions.map((question) => {
      defaultTypes.push(question.type);
    });
  }
  const [types, setTypes] = useState<("記述式" | "単一選択" | "複数選択" | "並び換え")[]>(
    defaultTypes.length > 0 ? defaultTypes : ["記述式"]
  );
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>, listNum: number) => {
    const newTypes = [...types]; 
    newTypes[listNum] = e.target.value as "記述式" | "単一選択" | "複数選択" | "並び換え";
    setTypes(newTypes);
  }

  const handleAddQuestion = () => {
    addQuestion({
      questionId: 0,
      questionText: "",
      img: "",
      type: "記述式",
      correct: "",
    });
    const newTypes = [...types]; 
    newTypes.push("記述式");
    setTypes(newTypes);
  }

  const {
    fields: questionFields,
    append: addQuestion,
    remove: removeQuestion
  } = useFieldArray({
    control, name: "questions",
  });

  return (
    <div>
      <div
        className="flex flex-col gap-1"
      >
      {
        questionFields.map((questionField, qIndex) => {
          return (
            <div
              key={qIndex}
              className="w-full rounded-md border border-slate-200 p-2 grid grid-cols-4 gap-2"
            >
              <div
                className="col-span-1"
              >
                <label className={ labelCls }>問題ID</label>
                <input className={ inputCls } { ...register(`questions.${qIndex}.questionId`)}/>
              </div>
              <div
                className="col-span-3"
              >
                <label className={ labelCls }>問題の種類</label>
                <select
                  { ...register(`questions.${qIndex}.type`) }
                  className={ inputCls }
                  onChange={(e) => handleTypeChange(e, qIndex)}
                >
                  <option value="記述式">記述式</option>
                  <option value="単一選択">単一選択</option>
                  <option value="複数選択">複数選択</option>
                  <option value="並び換え">並び換え</option>
                </select>
              </div>
              <div
                className="col-span-4"
              >
                <label className={ labelCls }>問題文</label>
                <input className={ inputCls } { ...register(`questions.${qIndex}.questionText`)}/>
              </div>
              <div
                className="col-span-4"
              >
                <label className={ labelCls }>画像</label>
                <input className={ inputCls } { ...register(`questions.${qIndex}.img`)}/>
              </div>
              {
                types[qIndex] == "記述式" && (
                  <div
                    className="col-span-4"
                  >
                    <label className={ labelCls }>答え</label>
                    <input className={ inputCls } { ...register(`questions.${qIndex}.correct`)}/>
                  </div>
                )
              }
              { 
                types[qIndex] == "単一選択" 
                && 
                <div className="col-span-4">
                  <SelectOptionFieldArray control={ control } register={ register } qIndex={ qIndex } />
                </div>
              }
              { 
                types[qIndex] == "複数選択" 
                && 
                <div className="col-span-4">
                  <SelectOptionFieldArray control={ control } register={ register } qIndex={ qIndex } />
                </div>
              }
              { 
                types[qIndex] == "並び換え" 
                &&
                <>
                <div className="col-span-4">
                  <SortOptionFieldArray control={ control } register={ register } qIndex={ qIndex } />
                </div>
                <div className="col-span-4">
                  <label className={ labelCls }>答えの順番（半角でスペース区切りで入力）</label>
                  <input className={ inputCls } { ...register(`questions.${qIndex}.correctOrder`)}/>
                </div>
                </> 
              }
              <div
                className="col-span-4"
              >
                <button
                  type="button"
                  className={ ButtonCls }
                  onClick={()=> removeQuestion(qIndex)}
                >
                  問題削除
                </button>
              </div>
            </div>
          )
        })
      }
      </div>
      <div
        className="flex justify-end py-2"
      >
        <div
          className="w-[120px]"
        >
          <button
            type="button"
            className={ ButtonCls }
            onClick={()=> handleAddQuestion()}
          >
            問題追加
          </button>
        </div>
      </div>
    </div>
  )
}

function SelectOptionFieldArray({
  control,
  register,
  qIndex,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  qIndex: number;
}) {
  const labelCls = "text-sm font-semibold";
  const inputCls = "w-full px-1 text-md rounded border border-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950";
  const ButtonCls = "w-full bg-sky-500 text-sky-100 hover:bg-sky-400 p-1 rounded-md shadow";

  const {
    fields: optionFields,
    append: addOption,
    remove: removeOption
  } = useFieldArray({
    control, name: `questions.${qIndex}.options`,
  });

  return (
    <div>
      <div
        className="flex justify-end py-2"
      >
        <div
          className="w-[120px]"
        >
          <button
            type="button"
            className={ ButtonCls }
            onClick={()=> addOption({
              text: "",
              img: "",
              isCorrect: "false",
            })}
          >
            選択肢追加
          </button>
        </div>
      </div>
      <div
        className="flex gap-1 overflow-x-scroll"
      >
      {
        optionFields.map((optionField, oIndex) => {
          return (
            <div
              key={ oIndex }
              className="rounded-md border border-slate-200 p-2"
            >
              <div
                className=""
              >
                <label className={ labelCls }>選択肢</label>
                <input className={ inputCls } { ...register(`questions.${qIndex}.options.${oIndex}.text`)}/>
              </div>
              <div
                className=""
              >
                <label className={ labelCls }>画像</label>
                <input className={ inputCls } { ...register(`questions.${qIndex}.options.${oIndex}.img`)}/>
              </div>
              <div
                className=""
              >
                <select
                  {...register(`questions.${qIndex}.options.${oIndex}.isCorrect`)}
                  className={ inputCls }
                >
                  <option value="true">正解</option>
                  <option value="false">不正解</option>
                </select>
              </div>
              <div
                className=""
              >
                <button
                  type="button"
                  className={ ButtonCls }
                  onClick={()=> removeOption(qIndex)}
                >
                  選択肢削除
                </button>
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
  
}

function SortOptionFieldArray({
  control,
  register,
  qIndex,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  qIndex: number;
}) {
  const labelCls = "text-sm font-semibold";
  const inputCls = "w-full px-1 text-md rounded border border-slate-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950";
  const ButtonCls = "w-full bg-sky-500 text-sky-100 hover:bg-sky-400 p-1 rounded-md shadow";

  const {
    fields: optionFields,
    append: addOption,
    remove: removeOption
  } = useFieldArray({
    control, name: `questions.${qIndex}.options`,
  });

  return (
    <div>
      <div
        className="flex justify-end py-2"
      >
        <div
          className="w-[120px]"
        >
          <button
            type="button"
            className={ ButtonCls }
            onClick={()=> addOption({
              id: optionFields.length + 1,
              text: "",
              img: "",
            })}
          >
            選択肢追加
          </button>
        </div>
      </div>
      <div
        className="flex gap-1 overflow-x-scroll"
      >
      {
        optionFields.map((optionField, oIndex) => {
          return (
            <div
              key={ oIndex }
              className="rounded-md border border-slate-200 p-2"
            >
              <div
                className=""
              >
                <label className={ labelCls }>番号</label>
                <input type="number" className={ inputCls } { ...register(`questions.${qIndex}.options.${oIndex}.id`)}/>
              </div>
              <div
                className=""
              >
                <label className={ labelCls }>選択肢</label>
                <input className={ inputCls } { ...register(`questions.${qIndex}.options.${oIndex}.text`)}/>
              </div>
              <div
                className=""
              >
                <label className={ labelCls }>画像</label>
                <input className={ inputCls } { ...register(`questions.${qIndex}.options.${oIndex}.img`)}/>
              </div>
              <div
                className=""
              >
                <button
                  type="button"
                  className={ ButtonCls }
                  onClick={()=> removeOption(qIndex)}
                >
                  選択肢削除
                </button>
              </div>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export function DeleteQuizForm({
  quizId
}: {
  quizId: string;
}) {
  const ButtonCls = "w-full bg-slate-800 text-slate-100 hover:bg-slate-600 p-2 rounded-md shadow";
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ success, setSuccess ] = useState("");
  const [ error, setError ] = useState("");

  const handleSubmit = async(quizId: string) => {
    setIsLoading(true);
    try {
      // データ登録
      const res = await deleteQuiz(quizId);
      if (res.isSuccess) {
        setSuccess("削除しました。");
        const timer = setTimeout(() => {
          router.refresh();
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        throw new Error(res.messages.other);
      }
    } catch(error) {
      setError(String(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={ () => handleSubmit(quizId) }
        className={ ButtonCls }
        disabled={ isLoading }
      >
        {
          isLoading
          ?
          <Loading message="削除中" size={ 20 }/>
          :
          <div>削除</div>
        }
      </button>
      <FormAlert
        flag={ success != "" }
        message={ success }
        type="success"
      />
      <FormAlert
        flag={ error != "" }
        message={ error }
        type="error"
      />
    </>
  )
}