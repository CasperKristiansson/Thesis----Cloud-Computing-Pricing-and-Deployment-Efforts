export const Priority: React.FC<{ value: "Low" | "Medium" | "High" | string }> = ({ value }) => {
    const color = value === "Low" ? "green" : value === "Medium" ? "orange" : "red";
    return (
        <span style={{ color: color }}>
            {value}
        </span>
    );
}