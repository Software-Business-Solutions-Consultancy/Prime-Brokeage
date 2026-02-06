import { create} from 'zustand'
import { persist } from 'zustand/middleware';
interface UserState {
    userData: {}
    userType: string
    setUserType: (userType: string) => void
    setUserData: (userData: {}) => void
}


export const useUserStore = create(persist<UserState>((set) => ({
   userData: {},
userType: "",

setUserData: (userData: {}) => set({userData}),
setUserType: (userType: string) => set({userType})



  }), {
    name: 'userState'
  }));
