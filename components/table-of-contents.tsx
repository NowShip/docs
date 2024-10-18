"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import slugify from "slugify";

type Props = {
  headings: {
    level: number;
    text: string;
  }[];
};

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(
        slugify(heading.text, { lower: true, strict: true })
      );
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <div className="flex flex-col sticky top-0 gap-2 shrink-0 w-64">
      {headings.map((heading) => {
        const slug = slugify(heading.text, { lower: true, strict: true });
        return (
          <Link
            key={heading.text}
            href={`#${slug}`}
            className={`${activeId === slug ? "text-black" : "text-black/50"}`}
          >
            {heading.text}
          </Link>
        );
      })}
    </div>
  );
}
