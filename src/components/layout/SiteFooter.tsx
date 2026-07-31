const footerNavigation = [
  { label: "Landscape", href: "#information-landscape" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Demonstration", href: "#demonstration" },
  { label: "Method", href: "#method" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="completion-footer">
      <div className="completion-shell completion-footer__inner">
        <a
          className="completion-footer__brand"
          href="#top"
          aria-label="Web2Go home"
        >
          WEB2GO
        </a>
        <p className="completion-footer__descriptor">
          AI-ready websites and visibility systems.
        </p>
        <nav aria-label="Footer navigation">
          <ul>
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="completion-footer__top" href="#top">
          Back to top <span aria-hidden="true">&uarr;</span>
        </a>
      </div>
    </footer>
  );
}
