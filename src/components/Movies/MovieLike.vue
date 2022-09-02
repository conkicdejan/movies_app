<template>
  <!-- Show number of likes -->
  <span class="badge text-bg-primary mx-3"
    >likes:{{ state.movie.total_likes }}</span
  >
  <!-- Show number of dislikes -->
  <span class="badge text-bg-danger mx-3"
    >dislikes:{{ state.movie.total_dislikes }}</span
  >
  <!-- Like / Dislike buttons -->
  <div v-if="state.movie" class="mt-2">
    <button
      value="true"
      class="btn btn-sm mx-3"
      :class="state.movie.like === 1 ? 'btn-primary' : 'btn-light'"
      @click="handleLike"
    >
      like
    </button>
    <button
      value="false"
      class="btn btn-sm mx-3"
      :class="state.movie.like === 0 ? 'btn-danger' : 'btn-light'"
      @click="handleLike"
    >
      dislike
    </button>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import MoviesService from '../../services/MoviesService';

const { movie } = defineProps(['movie']);
const state = reactive({ movie });
const handleLike = (event) => {
  if (event.target.value === 'true') {
    if (state.movie.like !== 1) {
      state.movie.like = 1;
      updateLike();
      return;
    }
  } else if (event.target.value === 'false') {
    if (state.movie.like !== 0) {
      state.movie.like = 0;
      updateLike();
      return;
    }
  }
  state.movie.like = null;
  updateLike();
};

const updateLike = async () => {
  try {
    state.movie = await MoviesService.update(state.movie.id, {
      like: state.movie.like,
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
