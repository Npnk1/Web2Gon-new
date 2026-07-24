type SectionLabelProps = {
  children: React.ReactNode;
  index?: string;
  inverse?: boolean;
};

export function SectionLabel({
  children,
  index,
  inverse = false,
}: SectionLabelProps) {
  return (
    <p className={`section-label${inverse ? " section-label--inverse" : ""}`}>
      {index ? <span aria-hidden="true">{index}</span> : null}
      {children}
    </p>
  );
}
