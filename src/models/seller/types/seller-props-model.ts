import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

export interface SellerPropsModel {
  id: number | undefined;
  nome: string | undefined;
  email: string | undefined;
  cnpj: string | undefined;
  celular: string | undefined;
  senha: string | undefined;
  status: boolean | undefined;
}

export interface ApiRespondeSellerRaw {
  data: SellerPropsModel[];
}

export interface FormDataSeller {
  register: UseFormRegister<SellerPropsModel>;
  handleSubmit: UseFormHandleSubmit<SellerPropsModel, SellerPropsModel>;
  status: boolean | null;
  onSubmite: (data: SellerPropsModel) => Promise<void>;
  errors: FieldErrors<SellerPropsModel>;
}

export default interface FormRegisterSeller {
  nome: string | undefined;
  email: string | undefined;
  cnpj: string | undefined;
  celular: string;
  senha: string | undefined;
}

