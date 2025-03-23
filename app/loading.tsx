import { LoadingIcon } from "@components/ui/Icons"

export default function Loading() {
  return (
    <div
      className="flex justify-center items-center w-full h-full"
    >
      <div
        className="flex flex-col justify-center items-center"
      >
        <LoadingIcon 
          className="fill-slate-400 animate-spin"
          width={ 50 }
          height={ 50 }
        />
        <p>読み込み中...</p>
      </div>
    </div>
  )
}