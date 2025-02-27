import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignUpButton,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';


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
                Home
              </h1>
            </Link>
          </li>
          <li className="mx-6 font-semibold">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <div className="flex items-center">
                <div className="mr-4">
                  <SignInButton>
                    <div
                      className="bg-white rounded-md text-gray-800 text-center border border-gray-500 p-2 w-24 cursor-pointer text-sm hover:bg-gray-800 hover:text-white"
                    >
                      ログイン
                    </div>
                  </SignInButton>
                </div>
                <div className="mr-4">
                  <SignUpButton>
                    <div
                      className="bg-white rounded-md text-gray-800 text-center border border-gray-500 p-2 w-24 cursor-pointer text-sm hover:bg-gray-800 hover:text-white"
                    >
                      登録
                    </div>
                  </SignUpButton>
                </div>
              </div>
            </SignedOut>
          </li>
        </ul>
      </nav>
    </header>
  );
}