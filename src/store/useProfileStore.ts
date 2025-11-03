import { create } from 'zustand';
import type { TToken } from "@/src/api/tokener"
import type { TContactKeysList } from "@/src/api/schemas"


type TProfile = Partial<TToken & {
    [key in TContactKeysList ]?:string
}>

type TProfileStore = {
    Profile:TProfile;
    updateProfile: (newProfile: TProfile) => void;
}

const useProfileStore = create<TProfileStore>((set,get) => ({
  Profile:{},
  updateProfile: (newProfile) => {
    const currentProfile = get().Profile; // get latest state
    // use set to update the state
    set((_state) => ({
      Profile: {
        // ...state.Profile,
        ...currentProfile,
        ...newProfile
      },
    }));
  }
}));

export default useProfileStore;


export {
  type TProfileStore,
  type TProfile
}