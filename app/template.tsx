// Re-mounts on every navigation: a brass curtain lifts off the new page.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="curtain" aria-hidden />
      <div className="page-in">{children}</div>
    </>
  );
}
