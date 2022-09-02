<template>
  <div class="row mb-4">
    <div class="col-12">
      <div class="card h-100">
        <router-link :to="`/movies/${movie.id}`">
          <!-- Show cover image -->
          <img
            v-bind:src="movie.cover_image"
            alt="`Image: ${movie.cover_image}`"
            class="card-img-top"
          />
        </router-link>
        <div class="card-body">
          <!-- Show title -->
          <h5 class="card-title fw-bolder">{{ movie.title }}</h5>
          <!-- Show description -->
          <p class="card-text">
            {{ movie.description }}
          </p>
          <!-- Show category -->
          <p class="badge text-bg-warning my-0 mx-2">
            {{ movie.category.name }}
          </p>
          <!-- Show number of visits -->
          <p class="badge text-bg-success my-0 mx-2">
            Visited: {{ movie.visited }}
          </p>
          <br />
          <!-- Like component -->
          <MovieLike :movie="movie" :key="movie.like" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MovieLike from './MovieLike.vue';
const { movie } = defineProps(['movie']);
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
