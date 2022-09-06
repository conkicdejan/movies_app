<template>
  <div class="row mb-4">
    <div class="col-12">
      <div class="card h-100">
        <router-link :to="`/movies/${state.movie.id}`">
          <!-- Show cover image -->
          <img
            v-bind:src="state.movie.cover_image"
            alt="`Image: ${movie.cover_image}`"
            class="card-img-top"
          />
        </router-link>
        <div class="card-body">
          <!-- Show title -->
          <h5 class="card-title fw-bolder">{{ state.movie.title }}</h5>
          <!-- Show description -->
          <p class="card-text">
            {{ state.movie.description.substring(0, 40) + '...' }}
          </p>
          <!-- Show category -->
          <p class="badge text-bg-warning my-0 mx-2">
            {{ state.movie.category.name }}
          </p>
          <!-- Show number of visits -->
          <p class="badge text-bg-success my-0 mx-2">
            Visited: {{ state.movie.visited }}
          </p>
          <br />
          <!-- Actions (like, watched...) -->
          <MovieActions :movie="state.movie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MovieActions from './MovieActions.vue';
import { reactive } from 'vue';
const { movie } = defineProps(['movie']);
const state = reactive({ movie });
</script>

<style>
li {
  list-style: none;
}
.img-thumbnail {
  max-width: 200px;
}
.card {
  width: 250px;
}
.card-img-top {
  width: 250px;
  height: 180px;
  object-fit: 'contain';
}
.card-text {
  height: 40px;
}
</style>
