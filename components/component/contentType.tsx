import { MovieIcon, QuizIcon, OtherContentIcon } from "@components/ui/Icons";

export function TypeIcon({
  type
}: {
  type:string
}) {
  switch (type) {
    case "movie":
      return (
        <div
          className="flex justify-center items-center gap-1 text-xs rounded p-1 border"
        >
          <MovieIcon className="fill-slate-400" width={15} />
          動画
        </div>
      );
    case "quiz":
      return (
        <div
          className="flex justify-center items-center gap-1 text-xs rounded p-1 border"
        >
          <QuizIcon className="fill-slate-400" width={15} />
          小テスト
        </div>
      );
    case "other":
      return (
        <div
          className="flex justify-center items-center gap-1 text-xs rounded p-1 border"
        >
          <OtherContentIcon className="fill-slate-400" width={15} />
          その他
        </div>
      );
    default:
      return (
        <></>
      );
  }
}