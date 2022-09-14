<template>
  <div class="container">
    <div class="row">
      <!-- Aside list -->
      <div class="col-2 mt-4">
        <h4>Related movies</h4>
        <Aside
          :category="state.movie.category?.id"
          :key="state.movie.category?.id"
        />
      </div>
      <div class="container- col-10" v-if="state.movie.title">
        <div class="d-flex mt-1">
          <h3 class="flex-grow-1">{{ state.movie.title }}</h3>
        </div>
        <p>{{ state.movie.description }}</p>
        <p class="badge text-bg-warning">
          {{
            state.movie.category?.name ? state.movie.category.name : 'undefined'
          }}
        </p>
        <br />
        <img
          v-bind:src="state.movie.cover_image"
          alt="Image"
          class="img-thumbnail h200"
        />
        <br />
        <p class="badge text-bg-success mt-3">
          Visited: {{ state.movie.visited }}
        </p>
        <br />
        <!-- Like component -->
        <MovieActions :movie="state.movie" :key="state.movie.total_likes" />
        <CommentsList :comments="state.comments" @loadMore="handleLoadMore" />
        <CommentForm :movieId="state.movieId" @commentAdded="update" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  reactive,
  onBeforeMount,
  watch,
  onMounted,
  onUpdated,
  onAfterUpdated,
  onBeforeUnmount,
} from 'vue';
import { useRoute } from 'vue-router';
import MoviesService from '../../services/MoviesService';
import CommentsList from '@/components/Comments/CommentsList.vue';
import CommentForm from '@/components/Comments/CommentForm.vue';
import MovieActions from '../../components/Movies/MovieActions.vue';
import Aside from '@/components/Aside.vue';

const route = useRoute();

const state = reactive({
  movie: {
    title: '',
    description: '',
    category: { id: null, name: '' },
    cover_image: '',
  },
  comments: [],
  current_page: 1,
  movieId: route.params.id,
});

watch(route, (to) => {
  if (to.params.id) {
    Echo.leave(`movie.${state.movieId}`);
    state.movieId = to.params.id;
    update();
    listen();
  }
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
      id: state.movieId,
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

const listen = () => {
  Echo.channel(`movie.${state.movieId}`)
    .listen('NewComment', ({ comment }) => {
      state.comments.data.unshift(comment);
    })
    .listen('LikeUpdate', ({ movie }) => {
      state.movie.total_likes = movie.total_likes;
      state.movie.total_dislikes = movie.total_dislikes;
      console.log(state.movie.total_likes);
      console.log(state.movie.total_dislikes);
    });
};

onMounted(() => {
  listen();
});

onBeforeMount(() => {
  update();
});
</script>

<style></style>
