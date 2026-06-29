interface StampTagProps {
  tag: string;
  index: number;
}

const StampTag = ({ tag }: StampTagProps) => {
  return (
    <span
      className="inline-flex items-center whitespace-nowrap"
      style={{
        border: "2px solid #7A6A60",
        borderRadius: 3,
        background: "rgba(113, 81, 79, 0.10)",
        padding: "2px 8px",
        fontFamily: "'Noto Sans', sans-serif",
        fontWeight: 700,
        fontSize: "9px",
        textTransform: "uppercase" as const,
        letterSpacing: "0.08em",
        color: "#7A6A60",
        lineHeight: 1.4,
      }}
    >
      {tag}
    </span>
  );
};

export default StampTag;
