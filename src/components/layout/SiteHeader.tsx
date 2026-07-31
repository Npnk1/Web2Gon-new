"use client";

import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "Landscape", href: "#information-landscape" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Demonstration", href: "#demonstration" },
  { label: "Method", href: "#method" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef(true);

  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = menu?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        restoreFocusRef.current = true;
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (restoreFocusRef.current) trigger?.focus();
      restoreFocusRef.current = true;
    };
  }, [isOpen]);

  const closeFromLink = () => {
    restoreFocusRef.current = false;
    setIsOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#top" aria-label="Web2Go home">
          <span>WEB2GO</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <ul>
            {navigation.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <span className="site-header__language" aria-label="Current language: English">
          EN
        </span>

        <a className="header-action" href="#contact">
          Book a consultation
        </a>

        <button
          className="menu-trigger"
          ref={triggerRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span>{isOpen ? "Close" : "Menu"}</span>
          <span className="menu-trigger__icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      <div
        className="mobile-menu"
        id="mobile-menu"
        ref={menuRef}
        hidden={!isOpen}
      >
        <nav aria-label="Compact navigation">
          <ol>
            {navigation.map((item, index) => (
              <li key={item.label}>
                <span aria-hidden="true">0{index + 1}</span>
                <a href={item.href} onClick={closeFromLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mobile-menu__footer">
          <span>[W2G] Source system</span>
          <a href="#contact" onClick={closeFromLink}>
            Book a consultation
          </a>
        </div>
      </div>
    </header>
  );
}
