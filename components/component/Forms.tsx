"use client"
import React, { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@components/ui/input";
import { addUserAction, editUserAction } from "@lib/actions";
import { useRouter } from "next/navigation";
import { LoadingIcon, ErrorIcon, ExclamationIcon } from "@components/ui/Icons";
import { UserAndStudent, MessageUserAndStudent, FormState } from "@/types/form";
/**
 * clerkでのユーザ登録後に、supabaseへの情報登録で
 * 自動的に遷移されるページに配置。
 * ユーザ名、メールアドレス、学校名、入学年度、学籍番号
 */
export function CreateUserForm({
  username, email, schoolName, admissionYear, studentNumber,
}: UserAndStudent) {
  // 編数定義
  const router = useRouter();
  const initialState:FormState<UserAndStudent, MessageUserAndStudent> = {
    messages: {},
    success: false,
    values: {
      username: username ? username : "",
      email: email ? email : "",
      schoolName: schoolName ? schoolName : "",
      admissionYear: admissionYear ? admissionYear : new Date().getFullYear(),
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
        value={ state.values.username ? state.values.username : "" }
        error={ state.messages.username ? state.messages.username : null }
      />
      <InputDiv 
        type="email"
        name="email"
        displayName="メールアドレス"
        value={ state.values.email ? state.values.email : "" }
        error={ state.messages.email ? state.messages.email : null }
      />
      <InputDiv 
        type="text"
        name="school_name"
        displayName="学校名"
        value={ state.values.schoolName ? state.values.schoolName : "" }
        error={ state.messages.schoolName ? state.messages.schoolName : null }
      />
      <InputDiv 
        type="number"
        name="admission_year"
        displayName="入学年度"
        value={ state.values.admissionYear ? String(state.values.admissionYear) : "" }
        error={ state.messages.admissionYear ? state.messages.admissionYear : null }
      />
      <InputDiv 
        type="number"
        name="student_number"
        displayName="学籍番号"
        value={ state.values.studentNumber ? String(state.values.studentNumber) : "" }
        error={ state.messages.studentNumber ? state.messages.studentNumber : null }
      />
      <ErrorAlert 
        flag={ state.messages.other != null && !state.success }
        message={ state.messages.other ? state.messages.other : "" }
      />
      <SuccessAlert
        success={ state.success }
        message={ `${ state.messages.other } トップページに戻ります。` }
      />
      <div
        className="mt-2 p-1"
      >
        <SubmitButton>
          登録
        </SubmitButton>
      </div>
    </form>
  )
}

/**
 * mypageで生徒情報を更新するページ
 * ユーザ名、メールアドレス、学校名、入学年度、学籍番号
 * @param param0 
 * @returns 
 */
export function EditStudentForm({
  userId, username, email, schoolName, admissionYear, studentNumber,
}: UserAndStudent) {
  // 編数定義
  const router = useRouter();
  const initialState:FormState<UserAndStudent, MessageUserAndStudent> = {
    messages: {},
    success: false,
    values: {
      userId: userId,
      username: username ? username : "",
      email: email ? email : "",
      schoolName: schoolName ? schoolName : "",
      admissionYear: admissionYear ? admissionYear : new Date().getFullYear(),
      studentNumber: studentNumber ? studentNumber : 1101,
    },
  }

  // サーバアクション（ユーザ登録処理）
  const [state, formAction] = useActionState(
    editUserAction,
    initialState
  );

  // 登録成功後の処理
  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push(`/mypage/${ userId }`);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  return (
    <form
      action={ formAction }
    >
      <input type="hidden" defaultValue={ state.values.userId } name="user_id" />
      <InputDiv 
        type="text"
        name="username"
        displayName="ユーザ名"
        value={ state.values.username ? state.values.username : "" }
        error={ state.messages.username ? state.messages.username : null }
      />
      <InputDiv 
        type="email"
        name="email"
        displayName="メールアドレス"
        value={ state.values.email ? state.values.email : "" }
        error={ state.messages.email ? state.messages.email : null }
      />
      <InputDiv 
        type="text"
        name="school_name"
        displayName="学校名"
        value={ state.values.schoolName ? state.values.schoolName : "" }
        error={ state.messages.schoolName ? state.messages.schoolName : null }
      />
      <InputDiv 
        type="number"
        name="admission_year"
        displayName="入学年度"
        value={ state.values.admissionYear ? String(state.values.admissionYear) : "" }
        error={ state.messages.admissionYear ? state.messages.admissionYear : null }
      />
      <InputDiv 
        type="number"
        name="student_number"
        displayName="学籍番号"
        value={ String(state.values.studentNumber) }
        error={ state.messages.studentNumber ? state.messages.studentNumber : null }
      />
      <ErrorAlert 
        flag={ !state.success && state.messages.other != null }
        message={ state.messages.other || "" }
      />
      <SuccessAlert
        success={ state.success }
        message={ state.messages.other || ""}
      />
      <div
        className="mt-2 p-1"
      >
        <SubmitButton>
          変更
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
      className="w-full rounded shadow p-2 bg-slate-900 text-slate-50 hover:bg-slate-600 disabled:bg-slate-600"
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
  error: string | null,
}) {
  return (
    <div
      className="mt-2 px-1"
    >
      <label htmlFor={ name }>{ displayName }</label>
      <Input 
        type={ type }
        defaultValue={ value || "" }
        name={ name }
      />
      <ErrorAlert 
        flag={ error != null}
        message={ error || "" }
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