import  {
  SellerPropsModel,
} from "@/models/seller/types/seller-props-model";
import { useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

export default function useSellerModel() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [seller, setSeller] = useState<Array<SellerPropsModel>>([]);

  useEffect(() => {
    getSellers();
  }, []);

  const apiRequest = useCallback(
    async (url: string, options: RequestInit = {}) => {
      setLoading(true);
      setError(null);

      try {
        const resp = await fetch(url, {
          credentials: "include",
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
        });

        if (resp.status === 401) {
          router.push("/");
          return;
        }

        if (!resp.ok) {
          throw new Error(`Erro ${resp.status}`);
        }

        return await resp.json();
      } catch (error) {
        const err =
          error instanceof Error ? error.message : "Erro desconhecido";
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const getSellers = useCallback(async (): Promise<SellerPropsModel[]> => {
    try {
      const data = await apiRequest("/api/sellers");
      setSeller(data.data);
      return data.data;
    } catch (error) {
      console.error("Erro ao carregar sellers:", error);
      return [];
    }
  }, [apiRequest]);

  return {
    loading,
    error,
    getSellers,
    seller,
  };
}
