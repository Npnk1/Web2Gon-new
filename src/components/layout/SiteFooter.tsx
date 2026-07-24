import { navigation } from "@/data/homepage";
import { VerificationMarker } from "@/components/ui/VerificationMarker";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <a className="brand brand--inverse" href="#top" aria-label="Web2Go home">
          <span className="brand__signal" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>WEB2GO</span>
        </a>
        <p>AI-ready websites and visibility systems.</p>
        <VerificationMarker inverse>Answer-ready</VerificationMarker>
      </div>

      <div className="site-footer__nav">
        <nav aria-label="Footer navigation">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <span>Web2Go / Europe / English</span>
        <span>Legal and contact details pending verification.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
