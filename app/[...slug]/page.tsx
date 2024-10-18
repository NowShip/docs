import React from "react";

import { allDocs } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-content";
import { notFound } from "next/navigation";
import Link from "next/link";
import TableOfContents from "@/components/table-of-contents";

export async function generateStaticParams() {
  return allDocs.map((docs) => ({
    slug: docs.slugAsParams.split("/"),
  }));
}

type Props = {
  params: { slug: string[] };
};

export default function DocsPage({ params: { slug } }: Props) {
  const currentDoc = allDocs.find((doc) => `/${slug.join("/")}` === doc.slug);

  if (!currentDoc) {
    return notFound();
  }

  console.log(currentDoc.headings);

  return (
    <div className="flex gap-12 items-start">
      <div className="flex flex-col gap-2 sticky top-0 shrink-0 w-64">
        {allDocs.map((doc) => (
          <Link key={doc._id} href={doc.slug}>
            {doc.title}
          </Link>
        ))}
      </div>
      <Mdx code={currentDoc.body.code} />
      <TableOfContents headings={currentDoc.headings} />
    </div>
  );
}
