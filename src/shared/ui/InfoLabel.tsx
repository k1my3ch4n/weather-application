interface InfoLabelProps {
  label: string;
  value: string | number;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: { label: "text-xs", value: "text-sm" },
  md: { label: "text-sm", value: "text-base" },
  lg: { label: "text-base", value: "text-lg" },
};

export const InfoLabel = ({ label, value, size = "md" }: InfoLabelProps) => {
  const styles = sizeStyles[size];

  return (
    <span
      role="group"
      aria-label={`${label} ${value}`}
      className={`${styles.label} text-gray-500`}
    >
      <span aria-hidden="true">{label} </span>
      <span
        className={`${styles.value} text-gray-700 font-bold`}
        aria-hidden="true"
      >
        {value}
      </span>
    </span>
  );
};
