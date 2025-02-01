import Link from "@node_modules/next/link";

export function InternalLink({
  href, text
}: {
  href: string,
  text?: string
}) {
  return (
    <Link
      href={ href }
      className="rounded shadow bg-gray-200 text-gray-500 hover:bg-gray-700 hover:text-white px-12 py-4"
    >
      { text || "開く" }
    </Link>
  )
}

export function ExternalLink({
  href, text
}: {
  href: string,
  text?: string
}) {
  return (
    <Link
      href={ href }
      rel="noopener noreferrer" target="_blank"
      className="rounded shadow bg-gray-200 text-gray-500 hover:bg-gray-700 hover:text-white px-12 py-4"
    >
      { text || "開く" }
    </Link>
  )
}