// Re-mounts on every navigation: the new page fades and rises in once.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
