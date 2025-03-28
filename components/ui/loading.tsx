import { LoadingIcon } from "@components/ui/Icons"

export function Loading({
  size
}: {
  size?: number
}) {
  return (
    <div
      className="flex justify-center items-center w-full h-full"
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
    </div>
  )
}