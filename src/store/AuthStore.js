import { defineStore } from 'pinia';
import AuthService from '../services/AuthService.js';

export const useAuthStore = defineStore('AuthStore', {
  state: () => {
    return {
      token: localStorage.getItem('token'),
      user: localStorage.getItem('user'),
    };
  },
  actions: {
    login(data) {
      localStorage.setItem('user', data.user.name);
      this.user = data.user.name;
      localStorage.setItem('token', data.token);
      this.token = data.token;
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('front logout');
    },
    sendToBack() {
      return this.form.values;
    },
  },
  getters: {},
});
