<template>
  <div class="container row">
    <div class="col-10">
      <div class="comment">
        <div class="d-flex justify-content-between">
          <h6 class="fw-bold text-primary mb-1 text-left">
            {{ comment.user.name }}
          </h6>
          <p class="text-muted small mb-0">
            {{ formatDate(comment.created_at) }}
          </p>
        </div>
        <p class="m-0 text-left">{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import formatDate from '../../composables/FormatDate';
const { comment } = defineProps(['comment']);
</script>

<style>
.text-left {
  text-align: left;
}
.comment {
  margin-bottom: 20px;
  border-bottom: solid 1px gray;
}
</style>
