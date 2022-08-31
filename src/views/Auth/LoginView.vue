<template>
  <div class="container w-50">
    <h3>Login</h3>

    <form @submit.prevent="handleSubmit">
      <label for="email" class="form-label"> Email </label>
      <input
        class="form-control mb-1"
        type="email"
        id="email"
        name="email"
        v-model="form.email"
      />
      <div v-for="error of v$.email.$errors" :key="error.$uid">
        <div class="error">{{ error.$message }}</div>
      </div>

      <label for="password" class="form-label"> Password </label>
      <input
        class="form-control mb-1"
        type="password"
        id="password"
        name="password"
        v-model="form.password"
      />
      <div v-for="error of v$.password.$errors" :key="error.$uid">
        <div class="error">{{ error.$message }}</div>
      </div>

      <button class="btn btn-primary my-3">Login</button>

      <div v-if="form.error">
        <div class="error">{{ form.error }}</div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/AuthStore';
import AuthService from '../../services/AuthService';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

const authStore = useAuthStore();
const router = useRouter();
const form = reactive({
  email: '',
  password: '',
  error: '',
});

const handleSubmit = async () => {
  form.error = '';
  const validated = await v$.value.$validate();
  if (validated) {
    try {
      const data = await AuthService.login(form);
      authStore.login(data);
      router.push({ name: 'indexMovie', replace: true });
    } catch (error) {
      console.log(error);
      form.error = error?.response?.data?.errors;
    }
  }
};

// Vuelidate - rules
const rules = computed(() => ({
  email: { required, email },
  password: { required, minLength: minLength(1) },
}));
const v$ = useVuelidate(rules, form);
</script>

<style>
.error {
  color: red;
}
</style>
