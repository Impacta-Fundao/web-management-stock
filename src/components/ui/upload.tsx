// components/ImageUpload.tsx
"use client";
import { ProdutosFormRegister } from "@/models/produtos/types/produtos-props-mpdel";
import { useState } from "react";
type imgUpload = {postProduct({ imagem, nome, preco, quantidade, }: ProdutosFormRegister): Promise<any>}

export default function ImageUpload({postProduct}:imgUpload) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setImageUrl(result.imageUrl);
        // Aqui você pode salvar a URL no banco de dados
        await postProduct(result.imageUrl);
      }
    } catch (error) {
      console.error("Erro no upload:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
        disabled={uploading}
      />
      {uploading && <p>Fazendo upload...</p>}
      {imageUrl && <img src={imageUrl} alt="Preview" className="max-w-xs" />}
    </div>
  );
}
