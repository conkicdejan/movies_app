<template>
  <Navbar />
  <router-view />
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import { onBeforeMount } from 'vue';
import { useCategoriesStore } from '@/store/CategoriesStore';
import CategoriesService from './services/CategoriesService';
const categoryStore = useCategoriesStore();
onBeforeMount(async () => {
  try {
    const data = await CategoriesService.get();
    categoryStore.setCategories(data);
  } catch (error) {
    console.log(error);
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
