import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

marked.setOptions({ gfm: true, breaks: true });

export function renderMarkdown(source: string): string {
  const rawHtml = marked.parse(source, { async: false }) as string;
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "del", "code", "pre", "blockquote",
      "h1", "h2", "h3", "h4", "ul", "ol", "li", "a", "img", "hr",
      "table", "thead", "tbody", "tr", "th", "td",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel"],
  });
}
