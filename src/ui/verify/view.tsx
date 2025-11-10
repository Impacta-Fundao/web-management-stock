import CardTxt from "@/components/ui/cardMessage";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { VerifyCode } from "@/models/auth/types/auth-login-props-model";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useEffect, useState } from "react";
import {
  FieldErrors,
  useFormContext,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface VerifyAccountProps {
  celular: string;
  loading: boolean;
  err: string | null;
  register: UseFormRegister<VerifyCode>;
  handleSubmit: UseFormHandleSubmit<VerifyCode, VerifyCode>;
  errors: FieldErrors<VerifyCode>;
  onSubmitVerify: (data: VerifyCode) => Promise<void>;
  message: string | null;
  setValue:  UseFormSetValue<VerifyCode>; 
}

export default function VerifyAccountView({
  celular,
  err,
  errors,
  handleSubmit,
  loading,
  onSubmitVerify,
  register,
  message,
  setValue
}: VerifyAccountProps) {
  
  const [otpValue, setOtpValue] = useState("");

 

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
    setValue("codigo", value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <>
      {/* {message  && <CardTxt message={message} />} */}

      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4 text-black">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-center mb-6 text-3xl font-bold text-gray-800">
            Verificação
          </h1>

          {celular && (
            <p className="text-center text-gray-600 text-sm">
              Enviamos um código SMS para:
              <br />
              <strong className="text-lg">{celular}</strong>
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmitVerify)} className="space-y-4">
            <div>
              <label
                htmlFor="codigo"
                className="block text-sm font-medium text-gray-700"
              >
                Código de Verificação
              </label>
              <InputOTP
                maxLength={4}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={otpValue}
                onChange={handleOtpChange}
              >
                <InputOTPGroup className="mt-1 flex items-center justify-center w-full px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
             
              <input
                type="hidden"
                {...register("codigo", {
                  required: "Código é obrigatório",
                  minLength: {
                    value: 4,
                    message: "O código deve ter 4 dígitos",
                  },
                  maxLength: {
                    value: 4,
                    message: "O código deve ter 4 dígitos",
                  },
                })}
              />
              {errors.codigo && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.codigo.message} {err && `- ${err}`}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Verificando..." : "Verificar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
