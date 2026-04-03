import { FaGithub, FaLinkedin } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t ">
      <div className="container mx-auto px-4 py-1">
        <div className="flex flex-col items-center justify-between gap-x-4 text-sm text-muted-foreground md:flex-row">
          <p className="flex items-center gap-1">
            Built by{" "}
            <Link
              href="https://github.com/alexrms1"
              target="_blank"
              className="inline-flex items-center gap-1 hover:text-foreground transition"
            >
              <FaGithub />
              <span className="underline decoration-dotted">alexrms1</span>
            </Link>{" "}
            using Next.js, shadcn/ui, & DexieJS
          </p>
        </div>
      </div>
    </footer>
  );
}
