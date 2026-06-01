export function Spinner({ size = 14 }: { size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        border: "2px solid rgba(255,255,255,0.4)",
        borderTop: "2px solid white",
        borderRadius: "50%",
        display: "inline-block",
        animation: "spin 0.8s linear infinite",
      }}
    />
  );
}