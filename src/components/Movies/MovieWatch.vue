<template>
  <!-- Buttons - Add / Remove from watch list -->
  <div v-if="movie" class="mt-2">
    <button
      :value="onList"
      class="btn btn-sm mx-2 p-0"
      :class="movie.watched == notOnList ? 'btn-danger' : 'btn-info'"
      @click="handleWatched"
    >
      {{ movie.watched == notOnList ? 'add to list' : 'remove from list' }}
    </button>
      <!-- Buttons - watched yes/no -->
    <button
      :value="watched"
      class="btn btn-sm mx-2 p-0"
      :class="movie.watched == watched ? 'btn-info' : 'btn-danger'"
      @click="handleWatched"
    >
      {{ movie.watched == watched ? 'watched' : 'unwatched' }}
    </button>
  </div>
</template>

<script setup>
const watched = 1;
const onList = 0;
const notOnList = null;
const { movie } = defineProps(['movie']);
const emit = defineEmits(['update']);

const handleWatched = (event) => {
  if (event.target.value == watched) {
    if (movie.watched != watched) {
      movie.watched = watched;
    } else {
      movie.watched = onList;
    }
  } else if (event.target.value == onList) {
    if (movie.watched == notOnList) {
      movie.watched = onList;
    } else {
      movie.watched = notOnList;
    }
  }
  updateMovie();
};

const updateMovie = () => {
  emit('update', { watched: movie.watched });
};
</script>

<style></style>
