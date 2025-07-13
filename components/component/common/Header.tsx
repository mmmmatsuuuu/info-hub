import Link from "next/link";
import { ModeToggle } from "@components/ui/toggle";

export default async function Header() {
  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground">
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
          <li className="mr-6">
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}