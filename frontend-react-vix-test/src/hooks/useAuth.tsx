import { useZUserProfile } from "../stores/useZUserProfile";
import { useZGlobalVar } from "../stores/useZGlobalVar";
import moment from "moment";
import { api } from "../services/api";

const REFRESH_TIME = 50;

export const useAuth = () => {
  const { token, setUser, idUser } = useZUserProfile();
  const { loginTime, setLoginTime } = useZGlobalVar();

  const fetchNewUserToken = async () => {
    if (!idUser) return null;
    try {
      const response = await api.get<{ token: string | null }>({
        url: `/user/token/${idUser}`,
        auth: { Authorization: `Bearer ${token}` },
        tryRefetch: true,
      });
      if (response.error || !response.data?.token) {
        return null; // Retorna null, não ""
      }
      return response.data.token;
    } catch {
      return null; // Em caso de exceção, retorna null
    }
  };

  const getAuth = async (force = false) => {
    if (
      !force &&
      token &&
      loginTime &&
      moment(loginTime).add(REFRESH_TIME, "minutes") > moment()
    ) {
      return { Authorization: `Bearer ${token}` };
    }

    setLoginTime(new Date());

    const newToken = await fetchNewUserToken();

    // Só atualiza se tiver um novo token válido
    if (newToken) {
      setUser({ token: newToken });
      return { Authorization: `Bearer ${newToken}` };
    }

    // Se não conseguiu renovar, usa o token atual (não limpa)
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }

    return {};
  };

  return {
    getAuth,
  };
};
