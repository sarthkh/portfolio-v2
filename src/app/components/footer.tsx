import Link from "next/link";
import {
  FiCode,
  FiGithub,
  FiSmile,
  FiTriangle,
  FiLinkedin,
} from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="border-t border-neutral-200 flex flex-col sm:flex-row space-y-12 sm:space-y-0 justify-between items-start pt-8 text-sm font-light tracking-tighter text-neutral-500">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-1">
          <FiSmile />
          <p>
            Built by{" "}
            <Link
              href="https://github.com/sarthakz25"
              className="underline underline-offset-4 hover:text-neutral-200 transition-colors duration-200"
            >
              Sarthak
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-1">
          <FiCode />
          <p>
            Built with&nbsp;
            <Link
              href="https://nextjs.org/"
              className="underline underline-offset-4 hover:text-neutral-200 transition-colors duration-200"
            >
              Next.js
            </Link>
            ,&nbsp;
            <Link
              href="https://tailwindcss.com/"
              className="underline underline-offset-4 hover:text-neutral-200 transition-colors duration-200"
            >
              Tailwind
            </Link>
            , &&nbsp;
            <Link
              href="https://www.convex.dev/"
              className="underline underline-offset-4 hover:text-neutral-200 transition-colors duration-200"
            >
              Convex
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-1">
          <FiTriangle />
          <p>
            Hosted on{" "}
            <Link
              href="https://vercel.com"
              className="underline underline-offset-4 hover:text-neutral-200 transition-colors duration-200"
            >
              Vercel
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="https://github.com/sarthakz25"
          className="border border-neutral-500 p-1 rounded-sm hover:text-neutral-200 hover:border-neutral-200 transition-colors duration-200"
        >
          <FiGithub />
        </Link>
        <Link
          href="https://www.linkedin.com/in/sarthakhandelwal"
          className="border border-neutral-500 p-1 rounded-sm hover:text-neutral-200 hover:border-neutral-200 transition-colors duration-200"
        >
          <FiLinkedin />
        </Link>
        <Link
          href="https://twitter.com/sarthakz25"
          className="border border-neutral-500 p-1 rounded-sm hover:text-neutral-200 hover:border-neutral-200 transition-colors duration-200"
        >
          <FaXTwitter />
        </Link>
      </div>
    </div>
  );
}
