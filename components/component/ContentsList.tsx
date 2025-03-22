"use client"
import Link from "next/link";
// import { useState, useEffect } from "react";
import { ContentWithLessons } from "@/types/form";
import { TypeIcon } from "./contentType";
import { EditContentForm, DeleteContentForm } from "./forms/contentForms";

export default function ContentsList({
  contents
}: {
  contents: ContentWithLessons[] | null
}) {
  if (contents == null) {
    return (
      <div
        className="flex justify-center items-center"
      >
        データがありません。
      </div>
    );
  } else {
    // フィルター、ソート機能を実装する
    // const [ contents, setContents ] = useState(initialContents);
    

    return (
      <div
        className="flex flex-col gap-1 w-full overflow-y-scroll"
      >
        <div
          className="flex gap-1 items-center border-b p-1"
        >
          <div
            className="w-[64px] shrink-0 text-center"
          >
            公開
          </div>
          <div
            className="w-[96px] shrink-0 text-center"
          >
            タイプ
          </div>
          <div
            className="w-[64px] shrink-0 text-center"
          >
            ID
          </div>
          <div
            className="grow"
          >
            名称
          </div>
          <div
            className="w-[192px] shrink-0"
          >
          </div>
        </div>
        <div
          className="overflow-y-scroll"
        >
          {
            contents.map(c => {
              return (
                <DataColumn 
                  key={ c.contentId }
                  content={ c }
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

function DataColumn({
  content
}: {
  content: ContentWithLessons
}) {
  return (
    <div
      className="flex gap-1 items-center border-b p-1"
      key={ content.contentId }
    >
      <div
        className="w-[64px] shrink-0 text-center px-1 text-sm"
      >
        {
          content.isPublic
          ?
          <div
            className="rounded p-1 border border-green-500 text-green-500 bg-green-50"
          >
            公開
          </div>
          :
          <div
            className="rounded p-1 border border-red-500 text-red-500 bg-red-50"
          >
            非公開
          </div>
        }
      </div>
      <div
        className="w-[96px] shrink-0 text-center px-1 text-sm"
      >
        <TypeIcon type={ content.type } />
      </div>
      <div
        className="w-[64px] shrink-0 text-center"
      >
        { content.contentId }
      </div>
      <div
        className="grow flex flex-col gap-1"
      >
        <div
          className="font-bold text-sm"
        >
          { content.title }
        </div>
        <div
          className="text-xs"
        >
          { content.description }
        </div>
        <div
          className="text-xs"
        >
          <Link
            href={ content.url }
            className="hover:underline hover:text-blue-400"
            target="_blank" rel="noopener noreferrer"
          >
            { content.url }
          </Link>
        </div>
        <div
          className="text-xs p-1"
        >
          登録授業:
          {
            content.lessons.map(l => {
              return (
                <span 
                  key={ l.lessonId }
                  className="border border-gray-400 text-gray-400 rounded p-1 mx-1"
                >
                  { l.lessonId } - { l.title }
                </span>
              )
            })
          }
        </div>
      </div>
      <div
        className="w-[192px] shrink-0 flex justify-center items-center gap-2"
      >
        <div
          className="w-[64px]"
        >
          <EditContentForm 
            content={ content }
          />
        </div>
        <div
          className="w-[64px]"
        >
          <DeleteContentForm 
            contentId={ content.contentId }
          />
        </div>
      </div>
    </div>
  )
}