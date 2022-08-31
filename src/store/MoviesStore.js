import { defineStore } from 'pinia';
import MoviesService from '../services/MoviesService.js';

export const useMoviesStore = defineStore('MoviesStore', {
  state: () => {
    return {
      movies: [],
    };
  },
  actions: {
    setMovies(movies) {
      this.movies = movies;
    },
  },
  getters: {},
});
