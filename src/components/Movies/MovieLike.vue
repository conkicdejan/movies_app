<template>
  <!-- Show number of likes -->
  <span class="badge text-bg-primary mx-3">likes:{{ movie.total_likes }}</span>
  <!-- Show number of dislikes -->
  <span class="badge text-bg-danger mx-3"
    >dislikes:{{ movie.total_dislikes }}</span
  >
  <!-- Like / Dislike buttons -->
  <div v-if="movie" class="mt-2">
    <button
      :value="like"
      class="btn btn-sm mx-3"
      :class="movie.like == like ? 'btn-primary' : 'btn-light'"
      @click="handleLike"
    >
      like
    </button>
    <button
      :value="dislike"
      class="btn btn-sm mx-3"
      :class="movie.like == dislike ? 'btn-danger' : 'btn-light'"
      @click="handleLike"
    >
      dislike
    </button>
  </div>
</template>

<script setup>
const like = 1;
const dislike = 0;
const undefined = null;
const { movie } = defineProps(['movie']);
const emit = defineEmits(['update']);

const handleLike = (event) => {
  if (event.target.value == like) {
    if (movie.like != like) {
      movie.like = like;
      updateMovie();
      return;
    }
  } else if (event.target.value == dislike) {
    if (movie.like != dislike) {
      movie.like = dislike;
      updateMovie();
      return;
    }
  }
  movie.like = undefined;
  updateMovie();
};

const updateMovie = () => {
  emit('update', { like: movie.like });
};
</script>

<style></style>
