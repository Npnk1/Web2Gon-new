type LinkActionProps = {
  children: React.ReactNode;
  href: `#${string}`;
  variant?: "primary" | "secondary" | "inverse";
};

export function LinkAction({
  children,
  href,
  variant = "secondary",
}: LinkActionProps) {
  return (
    <a className={`link-action link-action--${variant}`} href={href}>
      <span>{children}</span>
      <span className="link-action__mark" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
