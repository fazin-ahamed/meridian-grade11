import katex from "katex";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export function TeX({
  expr,
  display = false,
  className,
}: {
  expr: string;
  display?: boolean;
  className?: string;
}) {
  const html = useMemo(
    () =>
      katex.renderToString(expr, {
        throwOnError: false,
        displayMode: display,
        output: "html",
      }),
    [expr, display],
  );
  const Tag = display ? "div" : "span";
  return (
    <Tag
      className={cn(display ? "overflow-x-auto" : "inline", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function splitMath(text: string) {
  const parts: { type: "text" | "inline" | "display"; value: string }[] = [];
  const re = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ type: "text", value: text.slice(last, m.index) });
    if (m[1] != null) parts.push({ type: "display", value: m[1] });
    else parts.push({ type: "inline", value: m[2] ?? "" });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ type: "text", value: text.slice(last) });
  return parts;
}

function renderBold(text: string) {
  const bits = text.split(/(\*\*[^*]+\*\*)/g);
  return bits.map((b, i) => {
    if (b.startsWith("**") && b.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-fg">
          {b.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{b}</span>;
  });
}

function MathBits({ text }: { text: string }) {
  return (
    <>
      {splitMath(text).map((part, j) => {
        if (part.type === "inline") return <TeX key={j} expr={part.value} />;
        if (part.type === "display") return <TeX key={j} expr={part.value} display />;
        return <span key={j}>{renderBold(part.value)}</span>;
      })}
    </>
  );
}

export function Prose({
  text,
  className,
  compact = false,
}: {
  text: string;
  className?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <span className={cn("text-[15px] leading-relaxed", className)}>
        <MathBits text={text} />
      </span>
    );
  }
  const paragraphs = text.split(/\n{2,}/);
  return (
    <div className={cn("space-y-3 text-[15px] leading-relaxed text-muted", className)}>
      {paragraphs.map((p, i) => (
        <p key={i} className="text-pretty">
          <MathBits text={p} />
        </p>
      ))}
    </div>
  );
}
