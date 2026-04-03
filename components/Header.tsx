"use client";

import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import Link from "next/link";
import { LucideMenu } from "lucide-react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { FaLinkedin } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-12 items-center px-4 ">
        {/* Logo */}
        <div className="font-bold text-xl">
          <Link href={"/"}>Noted</Link>
        </div>

        {/* hidden on small */}
        <nav className="hidden md:flex gap-6 items-center ms-auto">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "underline-offset-4 underline decoration-accent-foreground"
                : ""
            }
          >
            Home
          </Link>
          <Link
            href="/about"
            className={
              pathname === "/about"
                ? "underline-offset-4 underline decoration-accent-foreground"
                : ""
            }
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4 ms-auto md:ms-4">
          <ModeToggle />

          <Link
            href="mailto:alexramosiii.dev@gmail.com"
            className="flex items-center gap-1 hover:text-foreground transition"
          >
            <LuMail className="text-xl" />
            <span className="underline decoration-dotted hidden">Gmail</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/alexramosiii-dev/"
            target="_blank"
            className="flex items-center gap-1 hover:text-foreground transition"
          >
            <FaLinkedin className="text-xl" />
            <span className="underline decoration-dotted hidden">LinkedIn</span>
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2  ms-2 ">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <LucideMenu className="text-xl" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="flex flex-col gap-4 mt-6 p-4">
                <Link href="/" onClick={() => setOpen(false)}>
                  Home
                </Link>
                <Link href="/about" onClick={() => setOpen(false)}>
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
