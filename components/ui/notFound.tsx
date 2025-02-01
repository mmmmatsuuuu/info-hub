import { InternalLink } from "./myLink";

export function NotFound({
  text
}: {
  text: string;
}) {
  return (
    <div
      className="flex justify-center items-center p-4 text-gray-400"
    >
      { text }
    </div>
  )
}

export function NotFoundWithRedirect({
  text, href
}: {
  text: string;
  href: string;
}) {
  return (
    <div
      className="w-full h-full flex flex-col gap-6 justify-center items-center p-4 text-gray-400"
    >
      { text }
      <InternalLink
        href={ href }
        text="トップに戻る"
      />
    </div>
  )
}