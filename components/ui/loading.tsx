import { LoadingIcon } from "@components/ui/Icons"

export function Loading({
  size,
  message,
}: {
  size?: number;
  message?:string;
}) {
  return (
    <div
      className="flex justify-center items-center gap-2 w-full h-full"
    >
      <div
        className="flex flex-col justify-center items-center"
      >
        <LoadingIcon 
          className="fill-slate-400 animate-spin"
          width={ size || 30 }
          height={ size || 30 }
        />
      </div>
      { message && <p>{ message }</p>}
    </div>
  )
}