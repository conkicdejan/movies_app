import { defineStore } from 'pinia';
import CategoriesService from '../services/CategoriesService.js';

export const useCategoriesStore = defineStore('CategoriesStore', {
  state: () => {
    return {
      categories: [],
    };
  },
  actions: {
    setCategories(categories) {
      this.categories = categories;
    },
  },
  getters: {},
});
