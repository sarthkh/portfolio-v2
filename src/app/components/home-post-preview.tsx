import { PostMetadata } from "../utils/post-metadata";
import Link from "next/link";
import { Reveal } from "../utils/reveal";

const HomePostPreview = (props: PostMetadata) => {
  return (
    <Reveal>
      <Link
        key={props.slug}
        className="flex justify-between w-full items-center my-6 group"
        href={`/blog/posts/${props.slug}`}
      >
        <div className="">
          <p className="font-light tracking-wider underline underline-offset-4 text-sm group-hover:text-neutral-500 transition-colors duration-200">
            {props.title}
          </p>
        </div>
        <span className="text-xs tracking-wider font-light text-right text-neutral-500">
          {props.date}
        </span>
      </Link>
    </Reveal>
  );
};

export default HomePostPreview;
