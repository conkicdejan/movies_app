<template>
  <div class="container-fluid">
    <!-- Page title -->
    <h3 v-if="moviesStore.movies.total == 0">Movies not found</h3>
    <h3 v-else-if="moviesStore.category">
      {{ categoryStore.getCategoryNameById(moviesStore.category) }} movies
    </h3>
    <h3 v-else>All genres</h3>

    <!-- Pagination -->
    <v-pagination
      v-if="moviesStore.movies.last_page > 1"
      v-model="moviesStore.current_page"
      :pages="moviesStore.movies.last_page"
      active-color="#DCEDFF"
    />

    <div class="container">
      <div class="row">
        <!-- Movies list -->
        <div class="col-9">
          <MoviesList />
        </div>

        <!-- Categories, Search, Result -->
        <div class="col-3">
          <!-- Result (total movies found)-->
          Movies found: {{ moviesStore.movies.total }}

          <!-- Search movies -->
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="search"
              v-model="search"
              @input="debounceSearch"
            />
            <div class="input-group-append">
              <button
                class="btn btn-primary"
                type="button"
                @click="handleClearSearch"
              >
                clear
              </button>
            </div>
          </div>

          <!-- Categories selector -->
          <div class="list-group mt-2">
            <button
              type="button"
              class="list-group-item list-group-item-action"
              :class="{
                active: moviesStore.category === null,
                disabled: false,
              }"
              @click="handleCategoryChange(null)"
            >
              All genres
            </button>
            <button
              v-for="category in categoryStore.categories"
              :key="category.id"
              type="button"
              class="list-group-item list-group-item-action"
              :class="{
                active: category.id === moviesStore.category,
                disabled: false,
              }"
              @click="handleCategoryChange(category.id)"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watchEffect, ref, onBeforeMount } from 'vue';
import { useMoviesStore } from '@/store/MoviesStore';
import MoviesService from '../../services/MoviesService';
import VPagination from '@hennge/vue3-pagination';
import '@hennge/vue3-pagination/dist/vue3-pagination.css';
import MoviesList from '@/components/Movies/MoviesList.vue';
import { useCategoriesStore } from '@/store/CategoriesStore';

//Stores define
const categoryStore = useCategoriesStore();
const moviesStore = useMoviesStore();

//Search handler
const search = ref(null);
const debounceSearch = (event) => {
  setTimeout(() => {
    moviesStore.search = event.target.value;
    moviesStore.current_page = 1;
  }, 750);
};
const handleClearSearch = () => {
  search.value = null;
  moviesStore.search = null;
};

//Category change handler
const handleCategoryChange = (id) => {
  moviesStore.category = id;
  moviesStore.current_page = 1;
};

//Fetch from service and set to state
watchEffect(async () => {
  try {
    const data = await MoviesService.get({
      page: moviesStore.current_page,
      category: moviesStore.category,
      search: moviesStore.search,
    });
    moviesStore.setMovies(data);
  } catch (error) {
    console.log(error);
  }
});
</script>

<style>
.search {
  width: 200px;
  height: 40px;
}
</style>
