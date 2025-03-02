"use client"
import React, { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@components/ui/input";
import { addUserAction } from "@lib/actions";
import { useRouter } from "next/navigation";
import { LoadingIcon, ErrorIcon, ExclamationIcon } from "@components/ui/Icons";

/**
 * clerkでのユーザ登録後に、supabaseへの情報登録で
 * 自動的に遷移されるページに配置。
 * ユーザ名、メールアドレス、学校名、入学年度、学籍番号
 */
export function CreateUserForm({
  username, email, schoolName, admissionYear, studentNumber,
}: {
  username?: string,
  email?: string,
  schoolName?: string,
  admissionYear?: string,
  studentNumber?: string,
}) {
  // 編数定義
  const router = useRouter();
  const initialState = {
    errors: {},
    success: false,
    values: {
      username: username ? username : "",
      email: email ? email : "",
      schoolName: schoolName ? schoolName : "",
      admissionYear: admissionYear ? admissionYear : new Date().getFullYear().toString(),
      studentNumber: studentNumber ? studentNumber : 1101,
    },
  }

  // サーバアクション（ユーザ登録処理）
  const [state, formAction] = useActionState(
    addUserAction,
    initialState
  );

  // 登録成功後の処理
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  return (
    <form
      action={ formAction }
    >
      <InputDiv 
        type="text"
        name="username"
        displayName="ユーザ名"
        value={ state.values.username }
        error={ state.errors? state.errors.username : null }
      />
      <InputDiv 
        type="email"
        name="email"
        displayName="メールアドレス"
        value={ state.values.email }
        error={ state.errors? state.errors.email : null }
      />
      <InputDiv 
        type="text"
        name="school_name"
        displayName="学校名"
        value={ state.values.schoolName }
        error={ state.errors? state.errors.schoolName : null }
      />
      <InputDiv 
        type="number"
        name="admission_year"
        displayName="入学年度"
        value={ state.values.admissionYear }
        error={ state.errors? state.errors.admissionYear : null }
      />
      <InputDiv 
        type="number"
        name="student_number"
        displayName="学籍番号"
        value={ state.values.studentNumber }
        error={ state.errors? state.errors.studentNumber : null }
      />
      <ErrorAlert 
        flag={ state.errors.other }
        message={ state.errors.other }
      />
      <SuccessAlert
        success={ state.success }
        message={ `${ state.message } トップページに戻ります。` }
      />
      <div
        className="mt-2"
      >
        <SubmitButton>
          登録
        </SubmitButton>
      </div>
    </form>
  )
}

function SubmitButton({
  children
}: {
  children: React.ReactNode
}) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit"
      disabled={ pending }
      className="w-full rounded shadow p-2 bg-slate-900 text-slate-50 hover:bg-slate-600"
    >
      {pending ? 
        <span
          className="w-full flex justify-center"
        >
          <LoadingIcon width={24} height={24} className="animate-spin fill-slate-50"/>
        </span>
        : 
        children 
      }
    </button>
  )
}

function InputDiv({
  type, name, displayName, value, error
}: {
  type: "text" | "email" | "number",
  name: string,
  displayName: string,
  value: string,
  error: string,
}) {
  return (
    <div
      className="mt-2"
    >
      <label htmlFor={ name }>{ displayName }</label>
      <Input 
        type={ type }
        defaultValue={ value || "" }
        name={ name }
      />
      <ErrorAlert 
        flag={ error != null}
        message={ error }
      />
    </div>
  );
}

function SuccessAlert({
  success, message
}: {
  success: boolean, message: string
}) {
  if (success) {
    return (
      <p
        className="flex items-center p-1 rounded bg-green-100 text-green-500 text-sm mt-1"
      >
        <span
          className="pr-1"
        >
          <ExclamationIcon width={16} height={16} className="fill-green-500" />
        </span>
        { message }
      </p>
    );
  }
  return (
    <></>
  )
}
function ErrorAlert({
  flag, message
}: {
  flag: boolean, message: string
}) {
  if (flag) {
    return (
      <p
        className="flex items-center p-1 rounded bg-yellow-100 text-yellow-500 text-sm mt-1"
      >
        <span
          className="pr-1"
        >
          <ErrorIcon width={16} height={16} className="fill-yellow-500" />
        </span>
        { message }
      </p>
    );
  }
  return (
    <></>
  )
}