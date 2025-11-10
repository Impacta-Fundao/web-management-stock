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
    errors,
    message
  } = useLoginModel();
  return (
    <LoginView
    message={message}
      errorsLogin={errosLogin}
      onSubmitRegister={onSubmiteRegister}
      register={register}
      registerLogin={registerLogin}
      handleSubmitLogin={handleSubmitLogin}
      handleSubmit={handleSubmit}
      onSubmitSignIn={onSubmitSignIn}
      loading={loading}
      errors={errosLogin}
    />
  );
}
