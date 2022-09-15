<template>
  <div class="container w-50">
    <h3>Create movie</h3>

    <!-- Search for movie from OMDB-->
    <div class="my-2">
      <v-select
        @search="fetchOptions"
        :options="form.omdbMovies"
        @change="handleSelectMovie"
        label="Title"
        v-model="form.selectedId"
        value="selectedValue"
        :reduce="(Title) => Title.imdbID"
        :filterable="false"
        :selectOnTab="true"
        :resetOnOptionsChange="false"
        :placeholder="'search for movies'"
        :clearSearchOnSelect="true"
      />
    </div>

    <form @submit.prevent="handleSubmit">
      <label for="title" class="form-label"> Title </label>
      <input
        class="form-control mb-1"
        type="text"
        id="title"
        title="title"
        v-model="form.title"
      />
      <div v-for="error of v$.title.$errors" :key="error.$uid">
        <div class="error">{{ error.$message }}</div>
      </div>

      <label for="description" class="form-label"> Description </label>
      <textarea
        class="form-control mb-3"
        name="description"
        id="description"
        rows="4"
        v-model="form.description"
      />
      <div v-for="error of v$.description.$errors" :key="error.$uid">
        <div class="error">{{ error.$message }}</div>
      </div>

      <label for="category_id" class="form-label"> Category </label>
      <select
        class="form-select mb-3"
        id="category_id"
        name="category_id"
        v-model="form.category_id"
      >
        <option value="" disabled>Select genre</option>
        <option
          v-for="category in categoryStore.categories"
          :value="category.id"
          :key="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <div v-for="error of v$.category_id.$errors" :key="error.$uid">
        <div class="error">{{ error.$message }}</div>
      </div>

      <label for="image" class="form-label"> Image </label>
      <input
        class="form-control mb-3"
        type="file"
        id="image"
        @change="handleImageUpload($event)"
        accept="image/png, image/jpeg"
      />
      <div v-for="error of v$.image.$errors" :key="error.$uid">
        <div class="error">{{ error.$message }}</div>
      </div>

      <button class="btn btn-primary my-3">Create movie</button>

      <div v-for="error of form.errors" :key="error">
        <div class="error">{{ error[0] }}</div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useCategoriesStore } from '@/store/CategoriesStore';
import DebounceComponent from '../../components/DebounceComponent.vue';
import MoviesService from '../../services/MoviesService';
import OmdbService from '../../services/OmdbService';
import { reactive, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import {
  required,
  integer,
  url,
  helpers,
  maxLength,
} from '@vuelidate/validators';

const categoryStore = useCategoriesStore();
const router = useRouter();
const form = reactive({
  title: '',
  description: '',
  category_id: '',
  image: null,
  errors: [],
  omdbMovies: [],
  selectedId: null,
});
const selectedValue = ref('');

//Search & fetch movies
const fetchOptions = (search, loading) => {
  if (search.length) {
    loading(true);
    debounceMethod(search);
    loading(false);
  }
};
const debounceMethod = _.debounce(async (search) => {
  const data = await OmdbService.search(search);
  form.omdbMovies = data.Search;
  console.log('data', data.Search);
}, 750);

//Select movie from OMDB and fill the form
const handleSelectMovie = async () => {
  const data = await OmdbService.get(form.selectedId);
  console.log('data', data);
  form.title = data.Title;
  form.description = data.Plot;
  form.category_id = findCategoryId(data.Genre);
};

//Find category ID from string
const findCategoryId = (stringCategories) => {
  const stringCategory = stringCategories.split(',').shift();
  return categoryStore.categories.filter(
    (category) => category.name === stringCategory
  )[0]?.id;
};

//Handle image upload
const handleImageUpload = (event) => {
  form.image = event.target.files[0];
};

// Create new movie
const handleSubmit = async () => {
  form.errors = [];
  const validated = await v$.value.$validate();
  if (validated) {
    try {
      await MoviesService.create(form);
      router.push({ name: 'indexMovie', replace: true });
    } catch (error) {
      console.log(error);
      form.errors = error?.response?.data?.errors;
    }
  }
};

// Vuelidate - rules
const rules = computed(() => ({
  title: { required, maxLength: maxLength(255) },
  description: { required, maxLength: maxLength(1000) },
  image: {
    required,
    //Validation file type is set in the template : accept="image/png, image/jpeg"
  },
  category_id: { required, integer },
}));
const v$ = useVuelidate(rules, form);
</script>

<style>
.error {
  color: red;
}
</style>
