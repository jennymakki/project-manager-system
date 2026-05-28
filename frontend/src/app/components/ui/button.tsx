export function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="px-3 py-2 rounded bg-black text-white"
    >
      {children}
    </button>
  );
}