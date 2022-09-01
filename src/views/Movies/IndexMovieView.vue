<template>
  <div class="container-fluid">
    <h3>All movies</h3>
    <v-pagination v-if="state.pages"
      v-model="state.page"
      :pages="state.pages"
      active-color="#DCEDFF"
    />
    <MoviesList />
  </div>
</template>

<script setup>
import { onMounted, reactive, watchEffect } from 'vue';
import { useMoviesStore } from '@/store/MoviesStore';
import MoviesService from '../../services/MoviesService';
import VPagination from '@hennge/vue3-pagination';
import '@hennge/vue3-pagination/dist/vue3-pagination.css';
import MoviesList from '@/components/Movies/MoviesList.vue';
import { useRouter } from 'vue-router';

const state = reactive({
  page: 1,
  pages: null,
});

const router = useRouter();

const moviesStore = useMoviesStore();

watchEffect(async () => {
  try {
    const data = await MoviesService.get({ page: state.page });
    moviesStore.setMovies(data);
    state.pages = moviesStore.movies.last_page
  } catch (error) {
    console.log(error);
  }
});
</script>

<style></style>
