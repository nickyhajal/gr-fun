import React from "react";
import { Option } from "../../types";

interface Props {
  options: Option[];
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  id?: string;
}

export function Select({
  options,
  label,
  className,
  onChange,
  ...props
}: Props) {
  return (
    <select
      aria-label={label}
      className={`focus:ring-pink focus:border-black focus:ring-2 ${className}`}
      onChange={onChange}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
