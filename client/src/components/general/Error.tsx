import { HiOutlineExclamationTriangle } from "react-icons/hi2";

interface ErrorProps {
  errorMessage: string;
  subtitle?: string;
  ctaLabel?: string;
  onRetry?: () => void;
}

function Error({
  errorMessage,
  subtitle = "Something went wrong. Please try again in a moment.",
  ctaLabel,
  onRetry,
}: ErrorProps) {
  const showCta = Boolean(onRetry);

  return (
    <section className="flex min-h-[320px] flex-col items-center justify-center gap-4 px-4 text-center text-secondary">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <HiOutlineExclamationTriangle className="text-3xl" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-secondary">
          {errorMessage}
        </h1>
        {subtitle && (
          <p className="max-w-md text-sm text-secondary--shade__3">
            {subtitle}
          </p>
        )}
      </div>
      {showCta && (
        <button
          type="button"
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-primary--shade__1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          onClick={onRetry}
        >
          {ctaLabel ?? "Retry"}
        </button>
      )}
    </section>
  );
}

export default Error;
