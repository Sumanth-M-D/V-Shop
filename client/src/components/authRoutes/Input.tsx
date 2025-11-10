import { ReactNode, useMemo, useState } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputProps<TFieldValues extends FieldValues = FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  type?: string;
  register: UseFormRegister<TFieldValues>;
  validation?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  error?: FieldError;
  icon?: ReactNode;
  helperText?: string;
}

function Input<TFieldValues extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  validation,
  error,
  icon,
  helperText,
}: InputProps<TFieldValues>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = useMemo(() => {
    if (type === "password") {
      return isPasswordVisible ? "text" : "password";
    }
    return type;
  }, [isPasswordVisible, type]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const hasError = Boolean(error);
  const paddingLeftClass = icon ? "pl-12" : "pl-4";
  const paddingRightClass = type === "password" ? "pr-12" : "pr-4";
  const labelLeftClass = icon ? "left-12" : "left-4";

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`relative rounded-2xl border ${
          hasError
            ? "border-red-400 ring-1 ring-red-200"
            : "border-secondary--shade__0"
        } bg-white/90 shadow-sm transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30`}
      >
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-secondary--shade__3">
            {icon}
          </span>
        )}
        <input
          id={name}
          type={inputType}
          placeholder=" "
          {...register(name, validation)}
          className={`peer block w-full rounded-2xl bg-transparent ${paddingLeftClass} ${paddingRightClass} py-4 text-sm text-secondary placeholder-transparent focus:outline-none ${
            hasError ? "text-red-500" : ""
          }`}
          aria-invalid={hasError}
        />
        <label
          htmlFor={name}
          className={`pointer-events-none absolute ${labelLeftClass} top-1/2 -translate-y-1/2 bg-white/90 px-1 text-sm text-secondary--shade__3 transition-all duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs`}
        >
          {label}
        </label>

        {type === "password" && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-secondary--shade__3 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>

      {helperText && !error && (
        <p className="text-xs text-secondary--shade__3">{helperText}</p>
      )}

      {error && (
        <p className="text-xs font-medium text-red-500">{error.message}</p>
      )}
    </div>
  );
}

export default Input;
