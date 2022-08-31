<template>
  <ul>
    <div className="card-group container-fluid mt-2">
      <div v-for="movie in moviesStore.movies" :key="movie.id">
        <MovieItem :movie="movie" />
      </div>
    </div>
  </ul>
</template>

<script setup>
import { useMoviesStore } from '@/store/MoviesStore';
import MovieItem from './MovieItem.vue';
const moviesStore = useMoviesStore();
</script>

<style></style>
