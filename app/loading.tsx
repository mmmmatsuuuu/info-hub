import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div
      className="flex justify-center items-center w-full h-full"
    >
      <div
        className="flex flex-col justify-center items-center"
      >
        <Loader2 
          className="text-primary animate-spin"
          width={ 50 }
          height={ 50 }
        />
        <p
          className="text-slate-500"
        >
          読み込み中...
        </p>
      </div>
    </div>
  )
}