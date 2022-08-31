<template>
  <div class="container-fluid">
    <h3>All movies</h3>
    <MoviesList />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMoviesStore } from '@/store/MoviesStore';
import MoviesService from '../../services/MoviesService';

import MoviesList from '@/components/Movies/MoviesList.vue';

const moviesStore = useMoviesStore();

onMounted(async () => {
  try {
    const data = await MoviesService.get();
    moviesStore.setMovies(data);
  } catch (error) {
    console.log(error);
  }
});
</script>

<style></style>
