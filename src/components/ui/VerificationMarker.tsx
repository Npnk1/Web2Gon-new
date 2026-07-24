type VerificationMarkerProps = {
  children: React.ReactNode;
  inverse?: boolean;
};

export function VerificationMarker({
  children,
  inverse = false,
}: VerificationMarkerProps) {
  return (
    <span
      className={`verification-marker${inverse ? " verification-marker--inverse" : ""}`}
    >
      <span className="verification-marker__signal" aria-hidden="true" />
      {children}
    </span>
  );
}
