import { create } from 'zustand';
import Cookies from 'js-cookie';
import axios from 'axios';

export const useAuthStore = create((set, get) => ({
  token: Cookies.get('auth_token') || null,
  user: null,
  error: null,

  login: async (email, password) => {
    try {
      const response = await axios.post(
        'https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token',
        { email, password, isEmployee: true }
      );
      const { token } = response.data;
      console.log('Login successful, token:', token);
      Cookies.set('auth_token', token, { secure: true, sameSite: 'Strict' });
      set({ token, error: null }); // تحديث الـ token في الـ state
      console.log('State updated with token:', get().token);
      await get().fetchUserInfo(token); // استدعاء fetchUserInfo بعد تحديث الـ state
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Invalid credentials';
      console.error('Login error:', errorMessage, err.response?.status);
      set({ error: errorMessage });
    }
  },

  fetchUserInfo: async (token) => {
    try {
      const authToken = token || Cookies.get('auth_token'); // استخدام token الممرر أو من Cookies
      console.log('Fetching user info with token:', authToken);
      if (!authToken) {
        throw new Error('No token found');
      }
      const response = await axios.get(
        'https://api-yeshtery.dev.meetusvr.com/v1/user/info',
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('User info fetched:', response.data);
      set({ user: response.data, error: null });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to fetch user info';
      console.error('Fetch user info error:', errorMessage, err.response?.status);
      set({ error: errorMessage });
    }
  },

  logout: () => {
    Cookies.remove('auth_token');
    set({ token: null, user: null, error: null });
  },
}));