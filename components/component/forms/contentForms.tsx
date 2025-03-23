"use client"
import React, { useEffect, useActionState, useState } from "react";
import { createContentAction, editContentAction, deleteContentAction } from "@lib/actions/contentAction";
import { useRouter } from "next/navigation";
import { FormAlert, Button, SubmitButton, InputDiv, RadioDiv, ErrorTip, SuccessTip } from "@components/ui/formUi";
import { OuterCard } from "@components/ui/card";
import { Header2 } from "@components/ui/title";
import { MovieIcon,QuizIcon,OtherContentIcon, CloseIcon } from "@components/ui/Icons";
import { OperationResult, Content, MessageContent } from "@/types/dbOperation";

/**
 * コンテンツの新規作成
 * @returns 
 */
export function CreateContentForm() {
  const router = useRouter();
  const [ display, setDisplay ] = useState<string>("hidden");
  const initialState:OperationResult<Content, MessageContent> = {
    messages: {},
    isSuccess:false,
    values: {
      contentId: "",
      title: "",
      description: "",
      type: "",
      isPublic: false,
      url: "",
    },
  };

  const typeRadioItems = [
    {value: "movie", displayName: <TypeIcon type="movie" />},
    {value: "quiz", displayName: <TypeIcon type="quiz" />},
    {value: "other", displayName: <TypeIcon type="other" />},
  ]

  const handleTypeRadioChange= (value: string) => {
    state.values.type = value;
  }

  const ispublicRadioItems = [
    { value: "true", displayName: "公開" },
    { value: "false", displayName: "非公開" },
  ]

  const handleIspublicChange = (value: string) => {
    if (value == "true") {
      state.values.isPublic = true;
    } else {
      state.values.isPublic = false;
    }
  }

  const handleClose = () => {
    setDisplay("hidden");
  }

  const handleOpen = () => {
    setDisplay("block");
  }
  
  // 編集の場合
  const [ state, formAction ] = useActionState(
    createContentAction,
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
          <div
            className="w-1/4"
          >
            <InputDiv 
              type="text"
              name={`content_id`}
              displayName="コンテンツID"
              initialValue={ state.values.contentId }
              error={ state.messages.contentId ? state.messages.contentId : null }
            />
          </div>
          <div
            className="w-3/4"
          >
            <InputDiv 
              type="text"
              name={`title`}
              displayName="コンテンツ名"
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
            className="w-full"
          >
            <InputDiv 
              type="text"
              name={`url`}
              displayName="URL"
              initialValue={ state.values.url || "" }
              error={ state.messages.url ? state.messages.url : null }
            />
          </div>
          <div
            className="w-4/6 p-1"
          >
            <RadioDiv
              legend="タイプ"
              id="type"
              name="type"
              defaultValue={ state.values.type }
              onChange={ handleTypeRadioChange }
              radios={ typeRadioItems }
              cls="flex gap-4"
              error={ state.isSuccess == false && state.messages.type != undefined }
              message={ state.messages.type || "" }
            />
          </div>
          <div
            className="w-2/6 p-1"
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

function TypeIcon({
  type
}: {
  type: string
}) {
  switch (type) {
    case "movie":
      return (
        <div
          className="flex items-center gap-1"
        >
          <MovieIcon 
            className="fill-slate-500 text-slate-500"
          />
          <div>動画</div>
        </div>
      )
    case "quiz":
      return (
        <div
          className="flex items-center gap-1"
        >
          <QuizIcon 
            className="fill-slate-500 text-slate-500"
          />
          <div>小テスト</div>
        </div>
      )
    case "other":
      return (
        <div
          className="flex items-center gap-1"
        >
          <OtherContentIcon
            className="fill-slate-500 text-slate-500"
          />
          <div>その他</div>
        </div>
      )
    default:
      return <></>;
  }
}

/**
 * コンテンツの編集
 * @param param0 
 * @returns 
 */
export function EditContentForm({
  content
}: {
  content: Content
}) {
  const router = useRouter();
  const [ display, setDisplay ] = useState<string>("hidden");
  const initialState:OperationResult<Content, MessageContent> = {
    messages: {},
    isSuccess:false,
    values: content
  };

  const typeRadioItems = [
    {value: "movie", displayName: <TypeIcon type="movie" />},
    {value: "quiz", displayName: <TypeIcon type="quiz" />},
    {value: "other", displayName: <TypeIcon type="other" />},
  ]

  const handleTypeRadioChange= (value: string) => {
    state.values.type = value;
  }

  const ispublicRadioItems = [
    { value: "true", displayName: "公開" },
    { value: "false", displayName: "非公開" },
  ]

  const handleIspublicChange = (value: string) => {
    if (value == "true") {
      state.values.isPublic = true;
    } else {
      state.values.isPublic = false;
    }
  }

  const handleClose = () => {
    setDisplay("hidden");
  }

  const handleOpen = () => {
    setDisplay("block");
  }

  const [ state, formAction ] = useActionState(
    editContentAction,
    initialState
  );
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
          title="コンテンツの編集"
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
              name={`content_id${ content.contentId }`}
              displayName="コンテンツID"
              initialValue={ state.values.contentId }
              error={ state.messages.contentId ? state.messages.contentId : null }
            />
          </div>
          <div
            className="w-3/4"
          >
            <InputDiv 
              type="text"
              name={`title${ content.contentId }`}
              displayName="コンテンツ名"
              initialValue={ state.values.title }
              error={ state.messages.title ? state.messages.title : null }
            />
          </div>
          <div
            className="w-full"
          >
            <InputDiv 
              type="text"
              name={`description${ content.contentId }`}
              displayName="説明"
              initialValue={ state.values.description || "" }
              error={ state.messages.description ? state.messages.description : null }
            />
          </div>
          <div
            className="w-full"
          >
            <InputDiv 
              type="text"
              name={`url${ content.contentId }`}
              displayName="URL"
              initialValue={ state.values.url || "" }
              error={ state.messages.url ? state.messages.url : null }
            />
          </div>
          <div
            className="w-4/6 p-1"
          >
            <RadioDiv
              legend="タイプ"
              id="type"
              name={`type${ content.contentId }`}
              defaultValue={ state.values.type }
              onChange={ handleTypeRadioChange }
              radios={ typeRadioItems }
              cls="flex gap-4"
              error={ !state.isSuccess && state.messages.type != null}
              message={ state.messages.type || "" }
            />
          </div>
          <div
            className="w-2/6 p-1"
          >
            <RadioDiv 
              legend="公開設定"
              id={`is_public${ content.contentId }`}
              name={`is_public${ content.contentId }`}
              defaultValue={ String(state.values.isPublic) }
              onChange={ handleIspublicChange }
              radios={ ispublicRadioItems }
              cls="flex gap-4"
              error={ !state.isSuccess && state.messages.isPublic != null}
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

/**
 * コンテンツの削除
 * @param param0 
 * @returns 
 */
export function DeleteContentForm({
  contentId,
}: {
  contentId: string,
}) {
  // 編数定義
  const router = useRouter();
  const initialState:OperationResult<Content, MessageContent> = {
    messages: {},
    isSuccess: false,
    values: {
      contentId: contentId,
      title: "",
      description: "",
      type: "",
      isPublic: false,
      url: "",
    },
  }

  // サーバアクション（科目削除処理）
  const [state, formAction] = useActionState(
    deleteContentAction,
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
      <input type="hidden" name={`delete${ state.values.contentId }`} value={ state.values.contentId } />
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
