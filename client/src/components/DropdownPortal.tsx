import { createPortal } from "react-dom";
import type { ReactNode } from "react";

export function DropdownPortal({ children }: { children: ReactNode }) {
  return createPortal(children, document.body);
}
