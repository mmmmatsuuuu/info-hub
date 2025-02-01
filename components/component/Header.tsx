import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignUpButton,
  SignedOut,
  UserButton
} from '@clerk/nextjs';


export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-800 text-white p-4">
      <nav>
        <ul className="flex items-center">
          <li className="grow mx-6">
            <Link href="/">
              <h1
                className="cursor-pointer text-lg font-bold"
              >
                Home
              </h1>
            </Link>
          </li>
          <li className="mx-6 font-semibold">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              {/* <div className="flex items-center">
                <div className="mr-4">
                  <SignInButton />
                </div>
                <div className="mr-4">
                  <SignUpButton />
                </div>
              </div> */}
            </SignedOut>
          </li>
        </ul>
      </nav>
    </header>
  );
}