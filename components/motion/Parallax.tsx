import type { ReactNode } from 'react';

/** Static media frame. Scroll parallax was removed in the unslop pass. */
export function Parallax({ children, className = '' }: { children: ReactNode; amount?: number; className?: string }) {
  return <div className={`absolute inset-0 ${className}`}>{children}</div>;
}
