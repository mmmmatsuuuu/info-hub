"use client"
import React, { useEffect, useActionState } from "react";
import { addUserAction, editUserAction } from "@lib/actions/userActions";
import { useRouter } from "next/navigation";
import { UserAndStudent, MessageUserAndStudent, FormState } from "@/types/form";
import { InputDiv, SubmitButton, SuccessTip, ErrorTip } from "@components/ui/formUi";

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
    isSuccess: false,
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
    if (state.isSuccess) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.isSuccess, router]);

  return (
    <form
      action={ formAction }
    >
      <InputDiv 
        type="text"
        name="username"
        displayName="ユーザ名"
        initialValue={ state.values.username ? state.values.username : "" }
        error={ state.messages.username ? state.messages.username : null }
      />
      <InputDiv 
        type="email"
        name="email"
        displayName="メールアドレス"
        initialValue={ state.values.email ? state.values.email : "" }
        error={ state.messages.email ? state.messages.email : null }
      />
      <InputDiv 
        type="text"
        name="school_name"
        displayName="学校名"
        initialValue={ state.values.schoolName ? state.values.schoolName : "" }
        error={ state.messages.schoolName ? state.messages.schoolName : null }
      />
      <InputDiv 
        type="number"
        name="admission_year"
        displayName="入学年度"
        initialValue={ state.values.admissionYear ? String(state.values.admissionYear) : "" }
        error={ state.messages.admissionYear ? state.messages.admissionYear : null }
      />
      <InputDiv 
        type="number"
        name="student_number"
        displayName="学籍番号"
        initialValue={ state.values.studentNumber ? String(state.values.studentNumber) : "" }
        error={ state.messages.studentNumber ? state.messages.studentNumber : null }
      />
      <ErrorTip
        flag={ state.messages.other != null && !state.isSuccess }
        message={ state.messages.other ? state.messages.other : "" }
      />
      <SuccessTip
        success={ state.isSuccess }
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
    isSuccess: false,
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
    if (state.isSuccess) {
      const timer = setTimeout(() => {
        router.push(`/mypage/${ userId }`);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.isSuccess, router]);

  return (
    <form
      action={ formAction }
    >
      <input type="hidden" defaultValue={ state.values.userId } name="user_id" />
      <InputDiv 
        type="text"
        name="username"
        displayName="ユーザ名"
        initialValue={ state.values.username ? state.values.username : "" }
        error={ state.messages.username ? state.messages.username : null }
      />
      <InputDiv 
        type="email"
        name="email"
        displayName="メールアドレス"
        initialValue={ state.values.email ? state.values.email : "" }
        error={ state.messages.email ? state.messages.email : null }
      />
      <InputDiv 
        type="text"
        name="school_name"
        displayName="学校名"
        initialValue={ state.values.schoolName ? state.values.schoolName : "" }
        error={ state.messages.schoolName ? state.messages.schoolName : null }
      />
      <InputDiv 
        type="number"
        name="admission_year"
        displayName="入学年度"
        initialValue={ state.values.admissionYear ? String(state.values.admissionYear) : "" }
        error={ state.messages.admissionYear ? state.messages.admissionYear : null }
      />
      <InputDiv 
        type="number"
        name="student_number"
        displayName="学籍番号"
        initialValue={ String(state.values.studentNumber) }
        error={ state.messages.studentNumber ? state.messages.studentNumber : null }
      />
      <ErrorTip
        flag={ !state.isSuccess && state.messages.other != null }
        message={ state.messages.other || "" }
      />
      <SuccessTip
        success={ state.isSuccess }
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
