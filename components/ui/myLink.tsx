import Link from "@node_modules/next/link";

const btnClass = "rounded shadow p-2 bg-slate-900 text-slate-50 hover:bg-slate-600"

export function InternalLink({
  href, text, cls,
}: {
  href: string,
  text?: string,
  cls?: string,
}) {
  return (
    <Link
      href={ href }
      className={ `${btnClass} ${cls}` }
    >
      { text || "開く" }
    </Link>
  )
}

export function ExternalLink({
  href, text, cls
}: {
  href: string,
  text?: string,
  cls?:string,
}) {
  return (
    <Link
      href={ href }
      rel="noopener noreferrer" target="_blank"
      className={ `${btnClass} ${cls}` }
    >
      { text || "開く" }
    </Link>
  )
}