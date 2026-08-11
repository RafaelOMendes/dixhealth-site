/**
 * The DIX mark, redrawn as vectors so it stays crisp at any size and inherits
 * the current text colour instead of shipping a white-only bitmap.
 * The X's rising arm carries the swoosh, as in the original.
 */
export function Wordmark({
  className,
  title = "DixHealth",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 146 44"
      role="img"
      aria-label={title}
      className={className}
      fill="currentColor"
    >
      {/* D */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 6h16c8.9 0 16 7.2 16 16s-7.1 16-16 16H4V6Zm7.4 7v18H20c4.9 0 8.6-3.9 8.6-9s-3.7-9-8.6-9h-8.6Z"
      />
      {/* I */}
      <path d="M43.4 6h7.4v32h-7.4z" />
      {/* X — falling arm */}
      <path d="M59.4 6h8.9l31 32h-8.9z" />
      {/* X — rising arm, extended into the swoosh */}
      <path d="M59.4 38c9.6-11.6 21.6-21.6 35.4-28.6C107.4 3.1 121.6-.2 136 .6c-14 2.6-27.3 7.3-39.3 14.2-11.4 6.5-21.4 15.2-29.4 25.6l-7.9-2.4Z" />
    </svg>
  );
}

/** Wordmark + name, for the footer and hero. */
export function Logotype({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2.5 ${className ?? ""}`}>
      <Wordmark className="h-6 w-auto translate-y-[3px]" />
      <span className="text-[15px] font-semibold tracking-[0.14em] text-[color:var(--ink-2)] uppercase">
        Health
      </span>
    </span>
  );
}
