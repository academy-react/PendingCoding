import { ErrorMessage } from "@hookform/error-message";

export const InputErrorMessage = ({ errors, name }) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <p className="text-danger text-lg dark:text-danger/70">{message}</p>
      )}
    />
  );
};
