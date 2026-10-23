import { User } from "lucide-react";

const links = ["Home", "Destinations", "My Bookings", "Admin"] as const;

export function Navbar() {
  return (
    <header className="mx-5 mt-4 bg-white">
      <nav className="relative flex h-14 items-center px-7 text-[15px]">
        <ul className="flex items-center gap-7">
          {links.map((link) => (
            <li key={link}>
              <a
                href="#"
                className={
                  link === "Home"
                    ? "font-medium text-[#17a3b3]"
                    : "text-neutral-900 hover:text-[#17a3b3]"
                }
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#17a3b3]"
        >
          Wanderlast
        </a>

        <div className="ml-auto flex items-center gap-7">
          <a
            href="#"
            className="flex items-center gap-1.5 hover:text-[#17a3b3]"
          >
            <User className="size-4" />
            Profile
          </a>
          <a href="#" className="hover:text-[#17a3b3]">
            Login
          </a>
          <a href="#" className="hover:text-[#17a3b3]">
            Sign Up
          </a>
        </div>
      </nav>
    </header>
  );
}
