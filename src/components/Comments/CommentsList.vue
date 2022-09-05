<template>
  <div class="container mt-2">
    <h5 class="text-left mt-2">Comments:</h5>
    <div v-for="comment in comments.data" :key="comment.id">
      <CommentItem :comment="comment" />
    </div>
    <!-- Load more button -->
    <button
      v-if="comments.current_page < comments.last_page"
      @click="handleLoadMore"
      type="button"
      class="btn btn-secondary btn-sm float-end mt-2 my-5"
    >
      Load more...
    </button>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
import CommentItem from './CommentItem.vue';
const { comments } = defineProps(['comments']);
const emit = defineEmits(['loadMore']);

const handleLoadMore = () => {
  emit('loadMore');
};
</script>

<style>
.text-left {
  text-align: left;
}
</style>
