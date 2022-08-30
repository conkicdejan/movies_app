<template>
  <nav class="navbar navbar-expand sticky-top navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="navbar-nav align-items-baseline">
        <h4 class="navbar-brand">Movies app</h4>

        <!-- public route -->
        <router-link class="nav-link" to="/">Home</router-link>
      </div>

      <!-- private route -->
      <div class="navbar-nav" v-if="authStore.user">
        <a class="nav-link">{{ authStore.user }}</a>
        <a class="nav-link pointer" @click="logout">Logout</a>
      </div>

      <!-- public route -->
      <div v-if="!authStore.user" class="navbar-nav">
        <router-link class="nav-link" to="/register">Register</router-link>
        <router-link class="nav-link" to="/login">Login</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/store/AuthStore';
import AuthService from '../services/AuthService';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();

const logout = async () => {
  try {
    await AuthService.logout();
  } catch (error) {
    console.log(error);
  } finally {
    authStore.logout();
    router.push({ name: 'login', replace: true });
  }
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
