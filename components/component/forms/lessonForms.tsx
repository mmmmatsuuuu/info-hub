"use client"
import React, { useEffect, useActionState, useState } from "react";
import { createLessonAction, editLessonAction, deleteLessonAction } from "@lib/actions/lessonAction";
import { useRouter } from "next/navigation";
import { FormAlert, Button, SubmitButton, InputDiv, RadioDiv, SelectDiv, ErrorTip, SuccessTip } from "@components/ui/formUi";
import { OuterCard } from "@components/ui/card";
import { Header2 } from "@components/ui/title";
import { OperationResult, Lesson, MessageLesson } from "@/types/dbOperation";
import { OptionProps } from "@/types/dbOperation";
import { CloseIcon } from "@components/ui/Icons";

export function CreateLessonForm({
  defaultValue,
  options
}: {
  defaultValue: string,
  options: OptionProps[],
}) {
  const router = useRouter();
  const [ display, setDisplay ] = useState<string>("hidden");
  const initialState:OperationResult<Lesson, MessageLesson> = {
    messages: {},
    isSuccess:false,
    values: {
      lessonId: "",
      title: "",
      description: "",
      isPublic: false,
      unitId: "",
    }
  };

  const ispublicRadioItems = [
    { value: "true", displayName: "公開" },
    { value: "false", displayName: "非公開" },
  ];

  const handleIspublicChange = (value: string) => {
    if (value == "true") {
      state.values.isPublic = true;
    } else {
      state.values.isPublic = false;
    }
  }

  const handleOptionsChange = (value: string) => {
    state.values.lessonId = value;
  }

  const handleClose = () => {
    setDisplay("hidden");
  }

  const handleOpen = () => {
    setDisplay("block");
  }
  
  // 編集の場合
  const [ state, formAction ] = useActionState(
    createLessonAction,
    initialState
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (state.isSuccess) {
      const timer = setTimeout(() => {
        router.refresh();
        state.messages = {};
        state.values = initialState.values;
        state.isSuccess = false;
        setDisplay("hidden");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.isSuccess, router]);

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
      className={ `z-50 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center ${ display }` }
    >
      <OuterCard>
        <div
          className="flex justify-end p-2"
        >
          <div>
            <Button
              onClick={ handleClose }
              cls="w-8 h-8 flex justify-center items-center"
            >
              <CloseIcon/>
            </Button>
          </div>
        </div>
        <Header2 
          title="授業の追加"
        />
        <form
          className="flex flex-wrap"
          action={ formAction }
        >
          <div
            className="w-1/4"
          >
            <InputDiv 
              type="text"
              name={`lesson_id`}
              displayName="授業ID"
              initialValue={ state.values.lessonId }
              error={ state.messages.lessonId ? state.messages.lessonId : null }
            />
          </div>
          <div
            className="w-3/4"
          >
            <InputDiv 
              type="text"
              name={`title`}
              displayName="授業名"
              initialValue={ state.values.title }
              error={ state.messages.title ? state.messages.title : null }
            />
          </div>
          <div
            className="w-full"
          >
            <InputDiv 
              type="text"
              name={`description`}
              displayName="説明"
              initialValue={ state.values.description || "" }
              error={ state.messages.description ? state.messages.description : null }
            />
          </div>
          <div
            className="w-4/6"
          >
            <SelectDiv
              label="所属する単元"
              name="unit_id"
              options={ options }
              onChange={ handleOptionsChange }
              required={ true }
              defaultValue={ defaultValue }
              error={ state.isSuccess == false && state.messages.unitId != undefined }
              message={ state.messages.unitId || ""}
            />
          </div>
          <div
            className="w-2/6"
          >
            <RadioDiv 
              legend="公開設定"
              id="is_public"
              name="is_public"
              defaultValue={ String(state.values.isPublic) }
              onChange={ handleIspublicChange }
              radios={ ispublicRadioItems }
              cls="flex gap-4"
              error={ state.isSuccess == false && state.messages.isPublic != undefined }
              message={ state.messages.isPublic || "" }
            />
          </div>
          <div>
            <SuccessTip
              success={ state.isSuccess == true && state.messages.other != undefined}
              message={ state.messages.other || "" }
            />
            <ErrorTip
              flag={ state.isSuccess == false && state.messages.other != undefined}
              message={ state.messages.other || "" }
            />
          </div>
          <div
            className="mt-2 w-full"
          >
            <SubmitButton>
              登録
            </SubmitButton>
          </div>
        </form>
      </OuterCard>
    </div>
    </>
  )
}

export function EditLessonForm({
  defaultValue,
  options,
  lesson
}: {
  defaultValue: string,
  options: OptionProps[],
  lesson: Lesson
}) {
  const router = useRouter();
  const [ display, setDisplay ] = useState<string>("hidden");
  const initialState:OperationResult<Lesson, MessageLesson> = {
    messages: {},
    isSuccess:false,
    values: lesson
  };

  const ispublicRadioItems = [
    { value: "true", displayName: "公開" },
    { value: "false", displayName: "非公開" },
  ];

  const handleIspublicChange = (value: string) => {
    if (value == "true") {
      state.values.isPublic = true;
    } else {
      state.values.isPublic = false;
    }
  }

  const handleOptionsChange = (value: string) => {
    state.values.unitId = value;
  }

  const handleClose = () => {
    setDisplay("hidden");
  }

  const handleOpen = () => {
    setDisplay("block");
  }

  const [ state, formAction ] = useActionState(
    editLessonAction,
    initialState
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (state.isSuccess) {
      const timer = setTimeout(() => {
        router.refresh();
        state.messages = {};
        setDisplay("hidden");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.isSuccess, router]);

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
      className={ `z-50 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center ${ display }` }
    >
      <OuterCard>
        <div
          className="flex justify-end p-2"
        >
          <div>
            <Button
              onClick={ handleClose }
              cls="w-8 h-8 flex justify-center items-center"
            >
              <CloseIcon/>
            </Button>
          </div>
        </div>
        <Header2 
          title="授業の追加"
        />
        <form
          className="flex flex-wrap"
          action={ formAction }
        >
          <div
            className="w-1/4"
          >
            <InputDiv 
              type="text"
              name={`lesson_id${ lesson.lessonId }`}
              displayName="授業ID"
              initialValue={ state.values.lessonId }
              error={ state.messages.lessonId ? state.messages.lessonId : null }
            />
          </div>
          <div
            className="w-3/4"
          >
            <InputDiv 
              type="text"
              name={`title${ lesson.lessonId }`}
              displayName="授業名"
              initialValue={ state.values.title }
              error={ state.messages.title ? state.messages.title : null }
            />
          </div>
          <div
            className="w-full"
          >
            <InputDiv 
              type="text"
              name={`description${ lesson.lessonId }`}
              displayName="説明"
              initialValue={ state.values.description || "" }
              error={ state.messages.description ? state.messages.description : null }
            />
          </div>
          <div
            className="w-5/6"
          >
            <SelectDiv
              label="所属する科目"
              name={`unit_id${ lesson.lessonId }`}
              options={ options }
              onChange={ handleOptionsChange }
              required={ true }
              defaultValue={ defaultValue }
              error={ state.isSuccess == false && state.messages.lessonId != undefined }
              message={ state.messages.lessonId || ""}
            />
          </div>
          <div
            className="w-1/6"
          >
            <RadioDiv 
              legend="公開設定"
              id={`is_public${ lesson.lessonId }`}
              name={`is_public${ lesson.lessonId }`}
              defaultValue={ String(state.values.isPublic) }
              onChange={ handleIspublicChange }
              radios={ ispublicRadioItems }
              cls="flex gap-4"
              error={ state.isSuccess == false && state.messages.isPublic != undefined }
              message={ state.messages.isPublic || "" }
            />
          </div>
          <div>
            <SuccessTip
              success={ state.isSuccess == true && state.messages.other != undefined}
              message={ state.messages.other || "" }
            />
            <ErrorTip
              flag={ state.isSuccess ==false && state.messages.other != undefined}
              message={ state.messages.other || "" }
            />
          </div>
          <div
            className="mt-2 w-full"
          >
            <SubmitButton>
              登録
            </SubmitButton>
          </div>
        </form>
      </OuterCard>
    </div>
    </>
  )
}

/**
 * 科目の削除
 * @param param0 
 * @returns 
 */
export function DeleteLessonForm({
  lessonId,
}: {
  lessonId: string,
}) {
  // 編数定義
  const router = useRouter();
  const initialState:OperationResult<Lesson, MessageLesson> = {
    messages: {},
    isSuccess: false,
    values: {
      lessonId: lessonId,
      title: "",
      description: "",
      isPublic: false,
      unitId: "",
    },
  }

  // サーバアクション（科目削除処理）
  const [state, formAction] = useActionState(
    deleteLessonAction,
    initialState
  );

  // 削除成功後の処理
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (state.isSuccess) {
      const timer = setTimeout(() => {
        router.refresh();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.isSuccess, router]);

  return (
    <form
      action={ formAction }
    >
      <input type="hidden" name={`delete${ state.values.lessonId }`}  value={ state.values.lessonId } />
      <SubmitButton>
        削除
      </SubmitButton>
      <FormAlert
        flag={ state.isSuccess == true && state.messages.other != undefined }
        message={ state.messages.other || "" }
        type="success"
      />
      <FormAlert
        flag={ state.isSuccess == false && state.messages.other != undefined }
        message={ state.messages.other || "" }
        type="error"
      />
    </form>
  )
}
