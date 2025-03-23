"use client"
import React, { useEffect, useActionState, useState } from "react";
import { deleteSubjectAction, createSubjectAction, editSubjectAction } from "@lib/actions/subjectActions";
import { useRouter } from "next/navigation";
import { FormAlert, Button, SubmitButton, InputDiv, RadioDiv, ErrorTip, SuccessTip } from "@components/ui/formUi";
import { OuterCard } from "@components/ui/card";
import { Header2 } from "@components/ui/title";
import { OperationResult, MessageSubject, Subject } from "@/types/dbOperation";
import { CloseIcon } from "@components/ui/Icons";

export function CreateSubjectForm() {
  const router = useRouter();
  const [ display, setDisplay ] = useState<string>("hidden");
  const initialState:OperationResult<Subject, MessageSubject> = {
    messages: {},
    isSuccess:false,
    values: {
      subjectId: "",
      subjectName: "",
      description: "",
      isPublic: false,
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

  const handleClose = () => {
    setDisplay("hidden");
  }

  const handleOpen = () => {
    setDisplay("block");
  }
  
  // 編集の場合
  const [ state, formAction ] = useActionState(
    createSubjectAction,
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
          title="科目の追加"
        />
        <form
          className="flex flex-wrap"
          action={ formAction }
        >
          <div
            className="basis-1/6"
          >
            <InputDiv 
              type="text"
              name={`subject_id`}
              displayName="科目ID"
              initialValue={ state.values.subjectId }
              error={ state.messages.subjectId ? state.messages.subjectId : null }
            />
          </div>
          <div
            className="basis-3/6"
          >
            <InputDiv 
              type="text"
              name={`subject_name`}
              displayName="科目名"
              initialValue={ state.values.subjectName }
              error={ state.messages.subjectId ? state.messages.subjectId : null }
            />
          </div>
          <div
            className="basis-2/6"
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

export function EditSubjectForm({
  subject
}: {
  subject: Subject
}) {
  const router = useRouter();
  const [ display, setDisplay ] = useState<string>("hidden");
  const initialState:OperationResult<Subject, MessageSubject> = {
    messages: {},
    isSuccess:false,
    values: subject
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

  const handleClose = () => {
    setDisplay("hidden");
  }

  const handleOpen = () => {
    setDisplay("block");
  }

  const [ state, formAction ] = useActionState(
    editSubjectAction,
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
          title="科目の追加"
        />
        <form
          className="flex flex-wrap"
          action={ formAction }
        >
          <div
            className="w-1/6"
          >
            <InputDiv 
              type="text"
              name={`subject_id${ subject.subjectId }`}
              displayName="科目ID"
              initialValue={ state.values.subjectId }
              error={ state.messages.subjectId ? state.messages.subjectId : null }
            />
          </div>
          <div
            className="w-3/6"
          >
            <InputDiv 
              type="text"
              name={`subject_name${ subject.subjectId }`}
              displayName="科目名"
              initialValue={ state.values.subjectName }
              error={ state.messages.subjectId ? state.messages.subjectId : null }
            />
          </div>
          <div
            className="w-2/6"
          >
            <RadioDiv 
              legend="公開設定"
              id={`is_public${ subject.subjectId }`}
              name={`is_public${ subject.subjectId }`}
              defaultValue={ String(state.values.isPublic) }
              onChange={ handleIspublicChange }
              radios={ ispublicRadioItems }
              cls="flex gap-4"
              error={ !state.isSuccess && state.messages.isPublic != null}
              message={ state.messages.isPublic || "" }
            />
          </div>
          <div
            className="w-full"
          >
            <InputDiv 
              type="text"
              name={`description${ subject.subjectId }`}
              displayName="説明"
              initialValue={ state.values.description ? state.values.description : "" }
              error={ state.messages.description ? state.messages.description : null }
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
 * 科目の削除
 * @param param0 
 * @returns 
 */
export function DeleteSubjectForm({
  subjectId,
}: {
  subjectId: string,
}) {
  // 編数定義
  const router = useRouter();
  const initialState = {
    isSuccess: false,
    values: {
      subjectId: subjectId,
      subjectName: "",
      description: "",
      isPublic: false,
    },
    messages: {
    },
  }

  // サーバアクション（科目削除処理）
  const [state, formAction] = useActionState(
    deleteSubjectAction,
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
      <input type="hidden" name={`delete${ state.values.subjectId }`} value={ state.values.subjectId } />
      <SubmitButton>
        削除
      </SubmitButton>
      <FormAlert
        flag={ state.isSuccess == true && state.messages.other != undefined }
        message={ state.messages.other || "" }
        type="success"
      />
      <FormAlert
        flag={ !state.isSuccess == false && state.messages.other != undefined }
        message={ state.messages.other || "" }
        type="error"
      />
    </form>
  )
}
