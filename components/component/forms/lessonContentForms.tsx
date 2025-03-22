"use client"
import React, { useEffect, useActionState, useState } from "react";
import { createLessonContentAction, deleteLessonContentAction } from "@lib/actions/lessonContentAction";
import { useRouter } from "next/navigation";
import { FormAlert, Button, SubmitButton, RichSelectDiv } from "@components/ui/formUi";
import { OuterCard } from "@components/ui/card";
import { Header2 } from "@components/ui/title";
import { FormState, LessonContent, MessageLessonContent, OptionProps } from "@/types/form";
import { CloseIcon } from "@components/ui/Icons";
/**
 * 新規作成
 * @returns 
 */
export function CreateLessonContentForm({
  lessonId, options
}: {
  lessonId: string,
  options: OptionProps[],
}) {
  // セレクトボックスから追加するコンテンツを一つ選んで追加ボタンで追加する処理を作成していく。
  const router = useRouter();
  const [ display, setDisplay ] = useState<string>("hidden");
  const initialState:FormState<LessonContent, MessageLessonContent> = {
    messages: {},
    isSuccess:false,
    values: {
      contentId: "",
      lessonId: "",
    },
  };

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
    createLessonContentAction,
    initialState
  );
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
        追加
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
              <CloseIcon />
            </Button>
          </div>
        </div>
        <Header2 
          title="コンテンツの追加"
        />
        <form
          className="flex flex-wrap"
          action={ formAction }
        >
          <input type="hidden" name="lesson_id" value={ lessonId } />
          <div
            className="mb-4 w-full"
          >
            <RichSelectDiv
              label="追加するコンテンツ"
              name="content_id"
              options={ options }
              onChange={ handleOptionsChange }
              error={ state.isSuccess == false && state.messages.contentId != undefined }
              message={ state.messages.contentId || "" }
              size={ 300 }
              cls=""
            />
          </div>
          <SubmitButton>
            追加
          </SubmitButton>
        </form>
      </OuterCard>
    </div>
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
    </>
  )
}

/**
 * コンテンツの削除
 * @param param0 
 * @returns 
 */
export function DeleteLessonContentForm({
  data
}: {
  data: LessonContent
}) {
  // 編数定義
  const router = useRouter();
  const initialState:FormState<LessonContent, MessageLessonContent> = {
    messages: {},
    isSuccess: false,
    values: {
      contentId: data.contentId,
      lessonId: data.lessonId,
    },
  }

  // サーバアクション（科目削除処理）
  const [state, formAction] = useActionState(
    deleteLessonContentAction,
    initialState
  );

  // 削除成功後の処理
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
      <input type="hidden" name={`delete_content_id${ state.values.lessonId }-${ state.values.contentId }`} value={ state.values.contentId } />
      <input type="hidden" name={`delete_lesson_id${ state.values.lessonId }-${ state.values.contentId }`} value={ state.values.lessonId } />
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
