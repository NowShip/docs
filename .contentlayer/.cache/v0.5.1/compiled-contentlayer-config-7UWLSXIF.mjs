// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
  },
  headings: {
    type: "array",
    resolve: async (doc) => {
      const headings = [];
      const regex = /^(#{1,6})\s+(.+)$/gm;
      let match;
      while ((match = regex.exec(doc.body.raw)) !== null) {
        headings.push({
          level: match[1].length,
          text: match[2]
        });
      }
      return headings;
    }
  }
};
var Docs = defineDocumentType(() => ({
  name: "Docs",
  filePathPattern: "./**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    }
  },
  computedFields
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./docs",
  documentTypes: [Docs],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-light-default",
          keepBackground: false
        }
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          content: (node) => node.children,
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section"
          }
        }
      ]
    ]
  }
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-7UWLSXIF.mjs.map
