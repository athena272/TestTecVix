import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type TRole = "admin" | "manager" | "member";

export interface IUserProfile {
  idUser: string | null;
  profileImgUrl: string | null;
  objectName?: string;
  imageUrl?: string;
  username: string | null;
  isActive?: boolean;
  lastLoginDate?: string | Date;
  userEmail: string | null;
  token: string | null;
  idBrand: number | null;
  role: TRole | null;
  _hasHydrated: boolean;
}
const INIT_STATE: IUserProfile = {
  idUser: null,
  profileImgUrl: null,
  objectName: "",
  imageUrl: "",
  username: null,
  userEmail: null,
  token: null,
  idBrand: null,
  lastLoginDate: "",
  role: null,
  _hasHydrated: false,
};

interface IUserProfileState extends IUserProfile {
  setUser: (user: Partial<IUserProfile>) => void;
  setImage: ({
    imageUrl,
    objectName,
  }: {
    imageUrl: string;
    objectName: string;
  }) => void;
  setHasHydrated: (value: boolean) => void;
  resetAll: () => void;
}

export const useZUserProfile = create<IUserProfileState>()(
  persist(
    (set) => ({
      ...INIT_STATE,
      setUser: (user: Partial<IUserProfile>) => set((state) => ({ ...state, ...user })),
      setImage: ({ imageUrl, objectName }: { imageUrl: string; objectName: string }) =>
        set((state) => ({
          ...state,
          imageUrl,
          objectName,
          profileImgUrl: objectName?.trim() ? objectName : null,
        })),
      setHasHydrated: (value: boolean) => {
        console.log("[useZUserProfile] setHasHydrated called with:", value);
        set({ _hasHydrated: value });
      },
      resetAll: () => set((state) => ({ ...state, ...INIT_STATE })),
    }),
    {
      name: "userProfile",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        // Exclui _hasHydrated da persistência
        const { _hasHydrated, ...rest } = state;
        return rest;
      },
      onRehydrateStorage: () => (state, error) => {
        console.log("[useZUserProfile] onRehydrateStorage called", { state: !!state, error, hasState: !!state });
        if (state) {
          console.log("[useZUserProfile] State before setHasHydrated:", { _hasHydrated: state._hasHydrated, idUser: state.idUser, token: !!state.token });
          // Atualiza diretamente usando set, não setTimeout
          // O Zustand garante que isso acontece após a reidratação
          state.setHasHydrated(true);
          console.log("[useZUserProfile] State after setHasHydrated:", { _hasHydrated: state._hasHydrated });
        } else {
          console.log("[useZUserProfile] No state available in onRehydrateStorage");
        }
      },
    }
  )
);
