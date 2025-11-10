import LoginView from "./view";
import useLoginModel from "./viewModel";

export default function LoginPage() {
  const {
    errosLogin,
    handleSubmitLogin,
    onSubmitSignIn,
    registerLogin,
    loading,
    handleSubmit,
    register,
    onSubmiteRegister,
    message,
    setValue,
    errors,
  } = useLoginModel();
  return (
    <LoginView
      setValue={setValue}
      message={message}
      errorsLogin={errosLogin}
      onSubmitRegister={onSubmiteRegister}
      register={register}
      registerLogin={registerLogin}
      handleSubmitLogin={handleSubmitLogin}
      handleSubmit={handleSubmit}
      onSubmitSignIn={onSubmitSignIn}
      loading={loading}
      errors={errors}
    />
  );
}
