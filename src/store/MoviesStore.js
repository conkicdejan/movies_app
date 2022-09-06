import { defineStore } from 'pinia';
import MoviesService from '../services/MoviesService.js';

export const useMoviesStore = defineStore('MoviesStore', {
  state: () => {
    return {
      movies: [],
      current_page: 1,
      search: null,
      category: null,
      my_movies: false,
    };
  },
  actions: {
    setMovies(movies) {
      this.movies = movies;
    },
  },
  getters: {},
});
