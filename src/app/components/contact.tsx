import { Reveal } from "../utils/reveal";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="text-sm">
      <Reveal>
        <span className="font-migra text-xl tracking-widest">Connect</span>
      </Reveal>

      <Reveal>
        <p className="mt-8 font-light tracking-wide">
          Find me&nbsp;
          <Link
            href="https://x.com/sarthkh"
            className="underline underline-offset-4 text-neutral-500 hover:text-neutral-200 transition-colors duration-200"
          >
            @sarthkh
          </Link>
          &nbsp;or&nbsp;
          <Link
            href="mailto:sarthakhandelwal@gmail.com"
            className="underline underline-offset-4 text-neutral-500 hover:text-neutral-200 transition-colors duration-200"
          >
            sarthakhandelwal@gmail.com
          </Link>
        </p>
      </Reveal>
    </div>
  );
}
