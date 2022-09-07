<template>
  <div class="mt-2">
    <h6 v-for="movie in state.aside" :key="movie.id" type="button">
      <router-link :to="`/movies/${movie.id}`">{{ movie.title }}</router-link>
      {{ movie.likes }}
    </h6>
  </div>
</template>

<script setup>
import MoviesService from '../services/MoviesService';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const { category } = defineProps(['category']);

const state = reactive({ aside: '' });

const fetchAside = async (category) => {
  try {
    if (category) {
      state.aside = await MoviesService.getRelatedMovies({
        category: category,
      });
    } else {
      state.aside = await MoviesService.getTopMovies();
    }
  } catch (error) {
    console.log(error);
  }
};

fetchAside(category);
</script>

<style></style>
