"use client";

import Link from "next/link";
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

const links = [
  { label: "Home", href: "/" , active: true},
  { label: "Destinations", href: "/destinations" , active: false},
  { label: "Add Destination", href: "/add-destination", active: false},
  { label: "My Bookings", href: "/my-bookings" , active: false},
  // { label: "Admin", href: "/admin" , active: false},
] as const;

const linkClasses =
  "px-3 py-2 text-neutral-900 transition-colors hover:text-[#17a3b3] lg:px-0 lg:py-0";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <nav className="relative flex h-14 w-full items-center bg-white px-4 text-[15px] shadow-md sm:h-16 sm:px-7 lg:px-10">
        <Link
          href="/"
          className="relative z-10 text-2xl font-bold text-[#17a3b3]"
        >
          Wanderlast
        </Link>

        <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  link.label === "Home"
                    ? "font-medium text-[#17a3b3] transition-colors"
                    : linkClasses
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-7 lg:flex">
          <Link
            href="/profile"
            className="flex items-center gap-1.5 text-neutral-900 transition-colors hover:text-[#17a3b3]"
          >
            <User className="size-4" />
            Profile
          </Link>

          <Link
            href="/login"
            className="text-neutral-900 transition-colors hover:text-[#17a3b3]"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="bg-[#17a3b3] px-4 py-2 font-medium text-white transition-colors hover:bg-[#128d9c]"
          >
            Sign Up
          </Link>
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

          <SheetContent side="right" className="w-80 max-w-[85vw] gap-0">
            <SheetHeader className="border-b border-border">
              <SheetTitle className="text-xl font-bold text-[#17a3b3]">
                Wanderlast
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col p-4 text-[15px]">
              {links.map((link) => (
                <SheetClose
                  key={link.href}
                  render={<Link href={link.href} />}
                  className={
                    link.label === "Home"
                      ? "rounded-md bg-muted px-3 py-2.5 font-medium text-[#17a3b3]"
                      : `${linkClasses} rounded-md`
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>

            <SheetFooter className="mt-auto border-t border-border p-4">
              <SheetClose
                render={<Link href="/profile" />}
                className="flex items-center gap-2 px-3 py-2.5 text-[15px] text-neutral-900 hover:text-[#17a3b3]"
              >
                <User className="size-4" />
                Profile
              </SheetClose>

              <SheetClose
                render={<Link href="/login" />}
                className="border border-border px-3 py-2.5 text-center text-[15px] text-neutral-900 hover:bg-muted"
              >
                Login
              </SheetClose>

              <SheetClose
                render={<Link href="/signup" />}
                className="bg-[#17a3b3] px-3 py-2.5 text-center text-[15px] font-medium text-white hover:bg-[#128d9c]"
              >
                Sign Up
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
