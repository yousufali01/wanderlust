"use client";

import { Menu, User } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const links = ["Home", "Destinations", "My Bookings", "Admin"] as const;

const linkClasses =
  "text-neutral-900 transition-colors hover:text-[#17a3b3] px-3 py-2 lg:px-0 lg:py-0";

export function Navbar() {
  return (
    <header className="sticky top-3 z-40 mx-3 sm:mx-5">
      <nav className="relative flex h-14 items-center bg-white px-4 text-[15px] shadow-sm sm:h-16 sm:px-7">
        <a
          href="#"
          className="relative z-10 text-2xl font-bold text-[#17a3b3]"
        >
          Wanderlast
        </a>

        <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link}>
              <a
                href="#"
                className={
                  link === "Home"
                    ? "font-medium text-[#17a3b3]"
                    : linkClasses
                }
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-7 lg:flex">
          <a href="#" className="flex items-center gap-1.5 hover:text-[#17a3b3]">
            <User className="size-4" />
            Profile
          </a>
          <a href="#" className="hover:text-[#17a3b3]">
            Login
          </a>
          <a
            href="#"
            className="bg-[#17a3b3] px-4 py-2 font-medium text-white transition-colors hover:bg-[#128d9c]"
          >
            Sign Up
          </a>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="ml-auto text-neutral-900 lg:hidden"
              />
            }
          >
            <Menu className="size-6" />
          </SheetTrigger>

          <SheetContent side="right" className="max-w-[85vw] w-80 gap-0">
            <SheetHeader className="border-b border-border">
              <SheetTitle className="text-xl font-bold text-[#17a3b3]">
                Wanderlast
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col p-4 text-[15px]">
              {links.map((link) => (
                <SheetClose
                  key={link}
                  render={<a href="#" />}
                  className={
                    link === "Home"
                      ? "bg-muted font-medium text-[#17a3b3] rounded-md px-3 py-2.5"
                      : `${linkClasses} rounded-md`
                  }
                >
                  {link}
                </SheetClose>
              ))}
            </nav>

            <SheetFooter className="mt-auto border-t border-border p-4">
              <a href="#" className="flex items-center gap-2 px-3 py-2.5 text-[15px] text-neutral-900 hover:text-[#17a3b3]">
                <User className="size-4" />
                Profile
              </a>
              <a
                href="#"
                className="border border-border px-3 py-2.5 text-center text-[15px] font-medium text-neutral-900 hover:bg-muted"
              >
                Login
              </a>
              <a
                href="#"
                className="bg-[#17a3b3] px-3 py-2.5 text-center text-[15px] font-medium text-white hover:bg-[#128d9c]"
              >
                Sign Up
              </a>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
