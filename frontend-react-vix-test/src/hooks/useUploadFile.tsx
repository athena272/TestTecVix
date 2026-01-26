import { toast } from "react-toastify";
import { api } from "../services/api";
import { useAuth } from "./useAuth";
import { useState } from "react";

export const useUploadFile = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { getAuth } = useAuth();

  const uploadFile = async (file: File) => {
    const auth = await getAuth();
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    const response = await api.post<{ objectName: string; url: string }>({
      url: "/uploads/file",
      data: formData,
      timeout: 120000,
      auth: { ...auth, "Content-Type": "multipart/form-data" },
    });
    setIsUploading(false);

    if (response.error) {
      toast.error(response.message);
      return { url: "", objectName: "" };
    }

    return response.data;
  };

  // Função para fazer upload do arquivo
  const handleUpload = async (file: File) => {
    if (!file) {
      return;
    }
    return await uploadFile(file);
  };

  const getFileByObjectName = async (objectName: string) => {
    if (!objectName) return { url: "" };
    if (
      objectName.includes("https://") ||
      objectName.includes("http://") ||
      objectName.includes("/assets")
    )
      return { url: objectName };
    const baseURL =
      import.meta.env.VITE_BASE_URL || "http://localhost:3001/api/v1";
    const url = `${baseURL}/uploads/${objectName}`;
    return { url };
  };

  return { handleUpload, isUploading, getFileByObjectName, isLoading };
};
