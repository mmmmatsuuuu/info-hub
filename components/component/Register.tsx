"use client"
import { Button } from "@components/ui/button";
import { useRef, useState, useEffect, useActionState } from "react";
import { Input } from "@components/ui/input";
import { addUserAction } from "@lib/actions";
import { useRouter } from "next/navigation";

export default function UserRegister({
  username, email,
}: {
  username: string,
  email: string,
}) {
  const router = useRouter();
  const initialState = {
    error: "",
    success: false,
  };
  const formRef = useRef<HTMLFormElement>(null);
  const year = new Date().getFullYear().toString();
  const [state, formAction] = useActionState(addUserAction, initialState);
  
  useEffect(() => {
    if (state.success) {
      if (formRef.current) {
        formRef.current.reset();
      }
      console.log(state.values);
      router.push(`/mypage/${ state.values.user_id }`);
    }
  }, [state.success, state.values, router]);
  
  return (
    <div
      className="my-8"
    >
      <form ref={ formRef } action={ formAction }>
        <div
          className="mt-2"
        >
          <label htmlFor="username">ユーザ名</label>
          <Input 
            type="text"
            defaultValue={ username }
            name="username"
          />
        </div>
        <div
          className="mt-2"
        >
          <label>メールアドレス</label>
          <Input 
            type="email"
            defaultValue={ email }
            name="email"
          />
        </div>
        <div
          className="mt-2"
        >
          <label>学校名</label>
          <Input 
            type="text"
            name="school_name"
          />
        </div>
        <div
          className="mt-2"
        >
          <label>入学年度</label>
          <Input 
            type="number"
            min={1900}
            defaultValue={ year }
            name="admission_year"
          />
        </div>
        <div
          className="mt-2"
        >
          <label>学籍番号</label>
          <Input 
            type="number"
            defaultValue={1101}
            name="student_number"
          />
        </div>
        <Button
          className="w-full my-4"
        >
          登録
        </Button>
      </form>
        { state.error && 
          <div
            className="p-2 rounded bg-yellow-200 text-yellow-600"
          >
            <p className="text-destructive mt-1">
              <span className="rounded-full py-2 px-4 mr-2 bg-yellow-500 text-yellow-50">!</span>
              { state.error }
            </p> 
          </div>
        }
    </div>
  )
}