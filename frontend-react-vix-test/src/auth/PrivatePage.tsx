import { useNavigate } from "react-router-dom";
import { useZResetAllStates } from "../stores/useZResetAllStates";
import { useZUserProfile } from "../stores/useZUserProfile";
import { FullPage } from "../components/Skeletons/FullPage";
import { useEffect, useState } from "react";

interface IProps {
  children: React.ReactNode;
  onlyManagerOrAdmin?: boolean;
  onlyAdmin?: boolean;
  skeleton?: boolean;
}

export const PrivatePage = ({
  children,
  onlyAdmin = false,
  onlyManagerOrAdmin = false,
}: IProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const { resetAllStates } = useZResetAllStates();
  const { idUser, role, token, _hasHydrated, setHasHydrated } = useZUserProfile();
  const navigate = useNavigate();

  // Considerar hidratado se temos dados válidos OU se a flag está true
  // Isso garante que mesmo se a flag não for atualizada, detectamos que a hidratação está completa
  const isHydrated = _hasHydrated || (idUser && token);

  // useEffect adicional para detectar hidratação completa como rede de segurança
  useEffect(() => {
    // Se temos dados mas _hasHydrated é false, forçar atualização
    if (!_hasHydrated && idUser && token) {
      console.log("[PrivatePage] Hydration detected via data check, forcing _hasHydrated to true");
      // A hidratação está completa, mas a flag não foi atualizada
      // Isso pode acontecer em casos raros
      setHasHydrated(true);
    }
  }, [idUser, token, _hasHydrated, setHasHydrated]);

  useEffect(() => {
    console.log("[PrivatePage] useEffect triggered", { isHydrated, _hasHydrated, idUser, token: !!token, role, isChecking });
    
    // Aguarda hidratação antes de verificar autenticação
    if (!isHydrated) {
      console.log("[PrivatePage] Waiting for hydration...");
      return; // Ainda carregando do localStorage
    }

    console.log("[PrivatePage] Hydration complete, checking authentication...");

    // Agora pode verificar autenticação com segurança
    if (!idUser || !token) {
      console.log("[PrivatePage] No auth credentials, redirecting to login");
      resetAllStates();
      navigate("/login");
      return;
    }

    console.log("[PrivatePage] User authenticated, checking permissions...");

    // Usuário autenticado - verificar permissões
    switch (true) {
      case onlyAdmin && role !== "admin":
        console.log("[PrivatePage] Insufficient permissions (admin required)");
        navigate(-1);
        break;
      case onlyManagerOrAdmin && role !== "admin" && role !== "manager":
        console.log("[PrivatePage] Insufficient permissions (manager/admin required)");
        navigate(-1);
        break;
      default:
        console.log("[PrivatePage] Permissions OK, setting isChecking to false");
        setIsChecking(false);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, idUser, token, role, navigate, onlyAdmin, onlyManagerOrAdmin]);

  console.log("[PrivatePage] Render", { isHydrated, _hasHydrated, idUser, token: !!token, isChecking });

  // Mostrar loading enquanto hidrata ou verifica
  if (!isHydrated || isChecking) {
    console.log("[PrivatePage] Rendering FullPage (hydration or checking)");
    return <FullPage />;
  }

  if (!idUser || !token) {
    console.log("[PrivatePage] Rendering FullPage (no auth)");
    return <FullPage />;
  }

  console.log("[PrivatePage] Rendering children");
  return <>{children}</>;
};
