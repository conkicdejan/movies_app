<template>
  <div class="row mb-4">
    <div class="col-12">
      <div class="card h-100">
        <router-link :to="`/movies/${movie.id}`">
          <img
            v-bind:src="movie.cover_image"
            alt="`Image: ${movie.cover_image}`"
            class="card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title fw-bolder">{{ movie.title }}</h5>
            <p class="card-text">
              {{ movie.description }}
            </p>
            <p class="badge text-bg-warning m-0">{{ movie.category.name }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
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
