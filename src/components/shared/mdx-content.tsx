import { useMDXComponents } from "@/app/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { Options } from "rehype-pretty-code";
import remarkFgm from "remark-gfm";
import recmaMdxHtmlOverride from "recma-mdx-html-override";

interface MDXContentProps {
  source: string;
}

const rehypePrettyCodeOptions: Partial<Options> = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
  defaultLang: "plaintext",
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and allow empty
    // lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className?.push("highlighted");
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ["word"];
  },
};

export function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [[remarkFgm, { strict: true, throwOnError: true }]],
          rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
          recmaPlugins: [[recmaMdxHtmlOverride, { tags: ["img"] }]],
        },
      }}
      components={useMDXComponents({})}
    />
  );
}
