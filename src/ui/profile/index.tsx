"use client";
import ProfileView from "./view";
import useProfileModel from "./viewModel";

export default function ProfilePage() {
  const {
    seller,
    loading,
    createOnSubmitEdit,
    errors,
    handleSubmit,
    register,
    message,
    setMessage

  } = useProfileModel();
  return (
    <ProfileView
    setMessage={setMessage}
    message={message}
      seller={seller}
      loading={loading}
      createOnSubmitEdit={createOnSubmitEdit}
      errors={errors}
      handleSubmit={handleSubmit}
      register={register}
      
    />
  );
}
