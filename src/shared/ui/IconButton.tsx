interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: "primary" | "success" | "danger" | "neutral" | "transparent";
  size?: "sm" | "md" | "lg" | "xl";
  title?: string;
}

const variantStyles = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  success: "bg-green-500 hover:bg-green-600 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  neutral: "bg-gray-200 hover:bg-gray-300 text-gray-600",
  transparent: "bg-transparent hover:bg-gray-100",
};

const sizeStyles = {
  sm: "w-6 h-6 text-xs",
  md: "w-7 h-7 text-sm",
  lg: "w-8 h-8 text-base",
  xl: "w-10 h-10 text-lg",
};

export const IconButton = ({
  icon,
  variant = "neutral",
  size = "md",
  title,
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center rounded-md transition-colors ${variantStyles[variant]} ${sizeStyles[size]}`}
      title={title}
      aria-label={title}
      {...props}
    >
      {icon}
    </button>
  );
};
