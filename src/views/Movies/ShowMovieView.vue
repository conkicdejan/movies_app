<template>
  <div class="container" v-if="state.movie.title">
    <div class="d-flex mt-1">
      <h3 class="flex-grow-1">{{ state.movie.title }}</h3>
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
    <MovieActions :movie="state.movie" />
    <CommentsList :comments="state.comments" @loadMore="handleLoadMore" />
    <CommentForm :movieId="movieId" @commentAdded="update" />
  </div>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import MoviesService from '../../services/MoviesService';
import CommentsList from '@/components/Comments/CommentsList.vue';
import CommentForm from '@/components/Comments/CommentForm.vue';
import MovieActions from '../../components/Movies/MovieActions.vue';

const route = useRoute();

const movieId = route.params.id;

const state = reactive({
  movie: {
    title: '',
    description: '',
    category: { name: '' },
    cover_image: '',
  },
  comments: [],
  current_page: 1,
});

const handleLoadMore = () => {
  state.current_page++;
  update();
};

const update = async (data) => {
  //Add new commments to list
  if (data) {
    return state.comments.data.unshift(data);
  }
  //Fetch data
  try {
    const { movie, comments } = await MoviesService.show({
      id: movieId,
      page: state.current_page,
    });
    state.movie = movie;
    //Append more commments pages to list
    if (state.current_page > 1) {
      state.comments.data.push(...comments.data);
      state.comments.current_page = comments.current_page;
      return;
    }
    //Set comments first page
    state.comments = comments;
  } catch (error) {
    console.log(error);
  }
};

onBeforeMount(() => {
  update();
});
</script>

<style></style>
