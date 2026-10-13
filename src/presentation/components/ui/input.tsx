import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  unit?: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  unit,
  error,
  hint,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-baseline">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          {label}
        </label>
        {unit && (
          <span className="text-xs text-zinc-500 font-mono">{unit}</span>
        )}
      </div>

      <div className="relative">
        <input
          id={inputId}
          className={`w-full rounded-lg border bg-white px-3.5 py-3.5 text-sm text-zinc-900 shadow-sm transition-colors
            placeholder:text-zinc-400 focus:outline-none focus:ring-2
            dark:bg-zinc-950 dark:text-zinc-100
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-zinc-300 focus:border-zinc-900 focus:ring-zinc-900/10 dark:border-zinc-800 dark:focus:border-zinc-100 dark:focus:ring-zinc-100/10"
            } ${className}`}
          {...props}
        />
      </div>

      {hint && !error && <p className="text-xs text-zinc-500">{hint}</p>}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
