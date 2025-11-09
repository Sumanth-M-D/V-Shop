import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<TFieldValues extends FieldValues = FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  type?: string;
  register: UseFormRegister<TFieldValues>;
  validation?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  error?: FieldError;
}

function Input<TFieldValues extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  validation,
  error,
}: InputProps<TFieldValues>) {
  return (
    <div className="flex flex-col mb-4 w-60">
      <label htmlFor={name} className="text-base text-secondary--shade__2 mb-1">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name, validation)} // Register the input with validation rules
        className="text-sm px-2 py-1 border-[1px] border-solid border-secondary--shade__1 rounded w-full focus:outline-none"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}

export default Input;
