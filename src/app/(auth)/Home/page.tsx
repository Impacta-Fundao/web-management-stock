"use client";

import { useEffect } from "react";

export default function PowerBIRedirect() {
  useEffect(() => {
    const url =
      "https://app.powerbi.com/groups/me/reports/61872be7-6313-4f5f-89cc-0534ddf5aca7?ctid=c0205eec-f970-4c93-ab97-fe08a313bdab&pbi_source=linkShare";

    // Abre em nova aba
    window.open(url, "_blank");

    // Opcional: redireciona a aba atual de volta pra home
    // window.location.href = "/";
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">
        Abrindo dashboard do Power BI em uma nova guia...
      </h1>
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}
