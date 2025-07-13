import Link from "next/link";
import { Button } from "@/components/ui/button";

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
  text, href, buttonText
}: {
  text: string;
  href: string;
  buttonText: string;
}) {
  return (
    <div
      className="w-full h-full flex flex-col gap-6 justify-center items-center p-4 text-muted-foreground"
    >
      { text }
      <Button asChild>
        <Link
          href={ href }
        >
          { buttonText }
        </Link>
      </Button>
    </div>
  )
}