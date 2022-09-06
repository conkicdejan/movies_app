<template>
  <!-- Like, Watch components -->
  <MovieLike :movie="state.movie" @update="updateMovie" />
  <MovieWatch :movie="state.movie" @update="updateMovie" />
</template>

<script setup>
import MovieLike from './MovieLike.vue';
import MovieWatch from './MovieWatch.vue';
import { reactive } from 'vue';
import MoviesService from '@/services/MoviesService';
import { useMoviesStore } from '@/store/MoviesStore';
const moviesStore = useMoviesStore();
const { movie } = defineProps(['movie']);
const state = reactive({ movie });

// Update movie
const updateMovie = async (data) => {
  try {
    // Database update
    state.movie = await MoviesService.update(state.movie.id, data);
    // Store update
    if (moviesStore.my_movies && data.watched === null) {
      moviesStore.movies.data = moviesStore.movies.data.filter(
        (movie) => movie.id !== state.movie.id
      );
      moviesStore.movies.total--;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
