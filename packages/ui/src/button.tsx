interface ButtonProps {
  label: string;
    onClick?: () => void;
    loading?: boolean; 
    height?: string;
    width?: string;
    backgroundColor?: string;
}

export function Button({ label , onClick, loading, height, width, backgroundColor }: ButtonProps) {
  return (
    <button
    onClick={onClick}
    style={{ fontFamily:"monospace", height: height || "50px", width: width || "240px", backgroundColor: backgroundColor || "#00aeff", color: "#ffffff", border: "1px solid #000", borderRadius: "6px",alignItems: "center", fontSize: "20px", fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", marginTop:"0px", borderColor:"black",  }}>
    {loading ? "Signing in..." : label}
    </button>
  );
}
