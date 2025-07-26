import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, LoginForm, RegisterForm, ApiResponse } from '../types';
import { authService } from '../services/authService';

interface AuthStore extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (user: Partial<User>) => void;
  // New methods for auth actions
  loginWithCredentials: (credentials: LoginForm) => Promise<ApiResponse<{ user: User; token: string }>>;
  loginWithOTP: (email: string, otp: string) => Promise<ApiResponse<{ user: User; token: string }>>;
  register: (userData: RegisterForm) => Promise<ApiResponse<{ user: User; token: string }>>;
  sendLoginOTP: (email: string) => Promise<ApiResponse<{ message: string }>>;
  getProfile: () => Promise<ApiResponse<User>>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      // New auth action methods that integrate with authService
      loginWithCredentials: async (credentials: LoginForm) => {
        set({ isLoading: true });
        try {
          const response = await authService.login(credentials);
          if (response.success && response.data) {
            const { user, token } = response.data;
            get().login(user, token);
          }
          return response;
        } finally {
          set({ isLoading: false });
        }
      },

      loginWithOTP: async (email: string, otp: string) => {
        set({ isLoading: true });
        try {
          const response = await authService.verifyOTP(email, otp);
          if (response.success && response.data) {
            const { user, token } = response.data;
            get().login(user, token);
          }
          return response;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (userData: RegisterForm) => {
        set({ isLoading: true });
        try {
          const response = await authService.register(userData);
          if (response.success && response.data) {
            const { user, token } = response.data;
            get().login(user, token);
          }
          return response;
        } finally {
          set({ isLoading: false });
        }
      },

      sendLoginOTP: async (email: string) => {
        set({ isLoading: true });
        try {
          return await authService.sendLoginOTP(email);
        } finally {
          set({ isLoading: false });
        }
      },

      getProfile: async () => {
        set({ isLoading: true });
        try {
          const response = await authService.getProfile();
          if (response.success && response.data) {
            get().updateUser(response.data);
          }
          return response;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);