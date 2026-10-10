import { useEffect } from "react";
// One observer manages stacked dialogs, scroll locking and keyboard focus.
export default function useModalAccessibility() {
  useEffect(() => {
    let current = null,
      previous = null,
      oldOverflow = "";
    const selector = ".fixed.inset-0, .gallery-lightbox, .date-panel";
    const focusable = (el) =>
      [
        ...el.querySelectorAll(
          'button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea,[tabindex="0"]',
        ),
      ].filter((x) => x.getClientRects().length);
    const sync = () => {
      const overlays = [...document.querySelectorAll(selector)].filter((el) =>
        el.querySelector("button,input"),
      );
      overlays.sort(
        (a, b) =>
          (Number(getComputedStyle(a).zIndex) || 0) -
          (Number(getComputedStyle(b).zIndex) || 0),
      );
      const next = overlays.at(-1) || null;
      overlays.forEach((el) => {
        const behind = el !== next && !el.contains(next);
        el.inert = behind;
        if (behind) el.setAttribute("aria-hidden", "true");
        else el.removeAttribute("aria-hidden");
      });
      if (next === current) return;
      if (!current && next) {
        previous = document.activeElement;
        oldOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
      }
      if (current) {
        current.removeAttribute("aria-modal");
      }
      current = next;
      if (next) {
        next.setAttribute("role", "dialog");
        next.setAttribute("aria-modal", "true");
        if (!next.hasAttribute("aria-label"))
          next.setAttribute(
            "aria-label",
            next.querySelector("h2,h3,h4")?.textContent || "XASIL",
          );
        (focusable(next)[0] || next).focus();
      } else {
        document.body.style.overflow = oldOverflow;
        if (previous?.isConnected) previous.focus();
      }
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });
    sync();
    const key = (e) => {
      if (!current) return;
      const items = focusable(current);
      if (e.key === "Tab" && items.length) {
        if (e.shiftKey && document.activeElement === items[0]) {
          e.preventDefault();
          items.at(-1).focus();
        } else if (!e.shiftKey && document.activeElement === items.at(-1)) {
          e.preventDefault();
          items[0].focus();
        }
      }
      if (e.key === "Escape") {
        const close = current.querySelector(
          'button[aria-label="Close"],button[aria-label="Close gallery"],button[aria-label="Close calendar"]',
        );
        close?.click();
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", key);
      if (current) document.body.style.overflow = oldOverflow;
    };
  }, []);
}
