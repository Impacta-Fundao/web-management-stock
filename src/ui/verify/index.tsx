"use client";
import VerifyAccountView from "./view";
import VerifyCodeModel from "./viewModel";

export default function VerifyAccountPage() {
  const {
    celular,
    err,
    errors,
    handleSubmit,
    loading,
    onSubmitVerify,
    register,
    setValue,
    message,
  } = VerifyCodeModel();

  return (
    <VerifyAccountView
      message={message}
      setValue={setValue}
      celular={celular}
      err={err}
      errors={errors}
      handleSubmit={handleSubmit}
      loading={loading}
      onSubmitVerify={onSubmitVerify}
      register={register}
    />
  );
}
