export const Status: React.FC<{value: "Open" | "In Progress" | "Closed" | string}> = ({ value }) => {
    const color = value === "Open" ? "green" : value === "In Progress" ? "blue" : "red";
    return (
        <span style={{color: color}}>
            {value}
        </span>
    );
}