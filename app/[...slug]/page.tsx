import React from "react";

import { allDocs } from "contentlayer/generated";
import { Mdx } from "@/components/MDXContent";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return allDocs.map((docs) => ({
    slug: docs.slugAsParams.split("/"),
  }));
}

type Props = {
  params: { slug: string[] };
};

export default function DocsPage({ params: { slug } }: Props) {
  const findingGoal = allDocs.find(
    (docs) => `/${slug.join("/")}` === docs.slug
  );

  if (!findingGoal) {
    return notFound();
  }

  return <Mdx code={findingGoal.body.code} />;
}
