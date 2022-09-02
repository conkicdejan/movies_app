<template>
  <div className="container" v-if="state.movie.title">
    <div className="d-flex mt-1">
      <h3 className="flex-grow-1">{{ state.movie.title }}</h3>
    </div>
    <p>{{ state.movie.description }}</p>
    <p class="badge text-bg-warning">{{ state.movie.category.name }}</p>
    <br />
    <img
      v-bind:src="state.movie.cover_image"
      alt="Image"
      class="img-thumbnail h200"
    />
    <br />
    <p class="badge text-bg-success mt-3">Visited: {{ state.movie.visited }}</p>
    <br />
    <!-- Like component -->
    <MovieLike :movie="state.movie" />
  </div>
</template>

<script setup>
import { reactive, computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import MoviesService from '../../services/MoviesService';
import MoviesList from '@/components/Movies/MoviesList.vue';
import MovieLike from '../../components/Movies/MovieLike.vue';
const route = useRoute();

const movieId = route.params.id;

const state = reactive({
  movie: {
    title: '',
    description: '',
    category: { name: '' },
    cover_image: '',
  },
});

onBeforeMount(async () => {
  try {
    state.movie = await MoviesService.show(movieId);
  } catch (error) {
    console.log(error);
  }
});
</script>

<style></style>
