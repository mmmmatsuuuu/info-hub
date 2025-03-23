"use client"
import React, { useEffect, useActionState, useState } from "react";
import { createUnitAction, editUnitAction, deleteUnitAction } from "@lib/actions/unitActions";
import { useRouter } from "next/navigation";
import { FormAlert, Button, SubmitButton, InputDiv, RadioDiv, SelectDiv, ErrorTip, SuccessTip } from "@components/ui/formUi";
import { OuterCard } from "@components/ui/card";
import { Header2 } from "@components/ui/title";
import { OperationResult, Unit, MessageUnit, OptionProps } from "@/types/dbOperation";
import { CloseIcon } from "@components/ui/Icons";

export function CreateUnitForm({
  defaultValue,
  options
}: {
  defaultValue: string,
  options: OptionProps[]
}) {
  const router = useRouter();
  const [ display, setDisplay ] = useState<string>("hidden");
  const initialState:OperationResult<Unit, MessageUnit> = {
    messages: {},
    isSuccess:false,
    values: {
      unitId: "",
      unitName: "",
      subjectId: defaultValue,
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

  const handleOptionsChange = (value: string) => {
    state.values.subjectId = value;
  }

  const handleClose = () => {
    setDisplay("hidden");
  }

  const handleOpen = () => {
    setDisplay("block");
  }
  
  // 編集の場合
  const [ state, formAction ] = useActionState(
    createUnitAction,
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
          title="単元の追加"
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
              name={`unit_id`}
              displayName="単元ID"
              initialValue={ state.values.unitId }
              error={ state.messages.unitId ? state.messages.unitId : null }
            />
          </div>
          <div
            className="w-3/4"
          >
            <InputDiv 
              type="text"
              name={`unit_name`}
              displayName="単元名"
              initialValue={ state.values.unitName }
              error={ state.messages.unitName ? state.messages.unitName : null }
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
            className="w-4/6 flex items-center"
          >
            <SelectDiv
              label="所属する科目"
              name="subject_id"
              options={ options }
              onChange={ handleOptionsChange }
              required={ true }
              defaultValue={ defaultValue }
              error={ state.isSuccess == false && state.messages.subjectId != undefined }
              message={ state.messages.subjectId || ""}
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

export function EditUnitForm({
  defaultValue,
  options,
  unit
}: {
  defaultValue: string,
  options: OptionProps[],
  unit: Unit
}) {
  const router = useRouter();
  const [ display, setDisplay ] = useState<string>("hidden");
  const initialState:OperationResult<Unit, MessageUnit> = {
    messages: {},
    isSuccess:false,
    values: unit
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
    state.values.subjectId = value;
  }

  const handleClose = () => {
    setDisplay("hidden");
  }

  const handleOpen = () => {
    setDisplay("block");
  }

  const [ state, formAction ] = useActionState(
    editUnitAction,
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
          title="単元の追加"
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
              name={`unit_id${ unit.unitId }`}
              displayName="単元ID"
              initialValue={ state.values.unitId }
              error={ state.messages.unitId ? state.messages.unitId : null }
            />
          </div>
          <div
            className="w-3/4"
          >
            <InputDiv 
              type="text"
              name={`unit_name${ unit.unitId }`}
              displayName="単元名"
              initialValue={ state.values.unitName }
              error={ state.messages.unitName ? state.messages.unitName : null }
            />
          </div>
          <div
            className="w-full"
          >
            <InputDiv 
              type="text"
              name={`description${ unit.unitId }`}
              displayName="説明"
              initialValue={ state.values.description || "" }
              error={ state.messages.description ? state.messages.description : null }
            />
          </div>
          <div
            className="w-4/6 flex items-center"
          >
            <SelectDiv
              label="所属する科目"
              name={`subject_id${ unit.unitId }`}
              options={ options }
              onChange={ handleOptionsChange }
              required={ true }
              defaultValue={ defaultValue }
              error={ state.isSuccess == false && state.messages.subjectId != undefined }
              message={ state.messages.subjectId || ""}
            />
          </div>
          <div
            className="w-2/6"
          >
            <RadioDiv 
              legend="公開設定"
              id={`is_public${ unit.unitId }`}
              name={`is_public${ unit.unitId }`}
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

/**
 * 科目の削除
 * @param param0 
 * @returns 
 */
export function DeleteUnitForm({
  unitId,
}: {
  unitId: string,
}) {
  // 編数定義
  const router = useRouter();
  const initialState:OperationResult<Unit, MessageUnit> = {
    messages: {},
    isSuccess: false,
    values: {
      unitId: unitId,
      unitName: "",
      description: "",
      subjectId: "",
      isPublic: false,
    },
  }

  // サーバアクション（科目削除処理）
  const [state, formAction] = useActionState(
    deleteUnitAction,
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
      <input type="hidden" name={`delete${ state.values.unitId }`} value={ state.values.unitId } />
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
