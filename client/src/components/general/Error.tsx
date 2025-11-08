// Error component to display error messages
interface ErrorProps {
  errorMessage: string;
}

function Error({ errorMessage }: ErrorProps) {
  return (
    <div className="py-40 flex justify-center text-primary--shade__1">
      <h1 className="text-5xl">{errorMessage}</h1>
    </div>
  );
}

export default Error;
