"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer2/hooks";

const components = {
  h1: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props}>{children}</h1>
  ),
  h2: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props}>{children}</h2>
  ),
  h3: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props}>{children}</h3>
  ),
  h4: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 {...props}>{children}</h4>
  ),
  h5: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 {...props}>{children}</h5>
  ),
  h6: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 {...props}>{children}</h6>
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <p {...props} />
  ),
  span: ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code {...props}></code>
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote {...props}></blockquote>
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <table {...props} />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th {...props} />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td {...props} />
  ),
  figure: ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {}) => {
    const [showCopy, setShowCopy] = useState(false);
    const [copied, setCopied] = useState(false);

    const figureRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (figureRef.current?.querySelector("figcaption")) {
        setShowCopy(true);
      }
    }, []);

    return (
      <figure ref={figureRef} {...props}>
        {!showCopy && (
          <button
            disabled={copied}
            onClick={async () => {
              const text =
                figureRef.current?.querySelector("code")?.textContent;
              if (text) {
                navigator.clipboard.writeText(text as string);
                setCopied(true);
              }
              await new Promise((resolve) => setTimeout(resolve, 1000));
              setCopied(false);
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}

        {children}
      </figure>
    );
  },
  figcaption: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLPreElement> & {}) => {
    const [copied, setCopied] = useState(false);
    const copyTextRef = useRef<HTMLPreElement>(null);

    return (
      <figcaption ref={copyTextRef} {...props}>
        {children}
        <button
          disabled={copied}
          onClick={async () => {
            const text = copyTextRef.current?.nextElementSibling?.textContent;
            if (text) {
              navigator.clipboard.writeText(text as string);
              setCopied(true);
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setCopied(false);
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </figcaption>
    );
  },
  a: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link {...props} />
  ),
  img: ({ className, alt, ...props }: React.ComponentProps<typeof Image>) => (
    <Image width={800} height={800} alt={alt} {...props} />
  ),
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components as any} />
    </div>
  );
}
