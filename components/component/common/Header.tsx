import Link from "next/link";
import { InternalLink } from "@components/ui/myLink";

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-800 text-white">
      <nav>
        <ul className="flex items-center h-[64px]">
          <li className="grow mx-6">
            <Link href="/">
              <h1
                className="cursor-pointer text-lg font-bold"
              >
                info-hub
              </h1>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}