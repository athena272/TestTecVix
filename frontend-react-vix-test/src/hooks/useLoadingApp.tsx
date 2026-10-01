import { useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useZUserProfile } from "../stores/useZUserProfile";
import { IBrandMasterResponse } from "../types/BrandMasterTypes";
import { useBrandMasterInfos } from "./useBrandMasterInfos";
import { useAuth } from "./useAuth";

export const useLoadingApp = (notLoginPage: boolean = false) => {
  const [loading, setLoading] = useState(true);
  const { idUser, token } = useZUserProfile();
  const { setBrandInfos } = useBrandMasterInfos();
  const { getAuth } = useAuth();
  const path = window.location.pathname;

  const fetchTheme = async () => {
    setLoading(true);
    
    // Só faz a requisição se o usuário estiver autenticado
    if (!token || !idUser) {
      setLoading(false);
      return;
    }

    try {
      const auth = await getAuth();
      const theme = await api.get<IBrandMasterResponse | null>({
        url: "/brand-master/self",
        auth,
      });

      if (theme.error) {
        // Não mostra toast para erro 401 (não autenticado) - é esperado em páginas públicas
        if (theme.message !== "Invalid token" && theme.message !== "Unauthorized") {
          toast.error(theme.message);
        }
        return setLoading(false);
      }

      if (!theme.data) {
        setLoading(false);
        if (notLoginPage) return;
        return;
      }
      await setBrandInfos(theme.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheme();
  }, [path, token, idUser]);

  return {
    loading,
  };
};
