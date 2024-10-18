import Link from "next/link";
import { allDocs } from "@/.contentlayer/generated";

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      {allDocs.map((doc) => (
        <Link key={doc._id} href={doc.slug}>
          {doc.title}
        </Link>
      ))}
    </div>
  );
}
