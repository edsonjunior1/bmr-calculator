import { ComponentProps } from "react";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

interface SelectProps extends ComponentProps<"select"> {
  label: string;
  options: SelectOption[];
  error?: string;
}

export function Select({
  label,
  options,
  error,
  id,
  className = "",
  value,
  onChange,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label
        htmlFor={selectId}
        className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
      >
        {label}
      </label>

      <select
        id={selectId}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-zinc-900 shadow-sm transition-colors 
          focus:outline-none focus:ring-2 dark:bg-zinc-950 dark:text-zinc-100
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : "border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900/10 dark:border-zinc-800 dark:focus:border-zinc-100 dark:focus:ring-zinc-100/10"
          } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
          >
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
