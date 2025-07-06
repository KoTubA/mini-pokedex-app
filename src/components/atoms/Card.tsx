import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "", onClick, "aria-label": ariaLabel, "aria-describedby": ariaDescribedBy }) => {
  const baseClasses = "bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden";
  const clickableClasses = onClick ? "cursor-pointer hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500" : "";

  if (onClick) {
    return (
      <div
        className={`${baseClasses} ${clickableClasses} ${className}`}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`} role="article">
      {children}
    </div>
  );
};

export default Card;
