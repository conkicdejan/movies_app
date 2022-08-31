<template>
  <div class="container w-50">
    <h3>Register</h3>

    <form @submit.prevent="handleSubmit">
      <label for="name" class="form-label"> Name </label>
      <input
        class="form-control mb-1"
        type="text"
        id="name"
        name="name"
        v-model="form.name"
      />
      <div v-for="error of v$.name.$errors" :key="error.$uid">
        <div class="error">{{ error.$message }}</div>
      </div>

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

      <label for="password_confirmation" class="form-label">
        Confirm password
      </label>
      <input
        class="form-control mb-1"
        type="password"
        id="password_confirmation"
        name="password_confirmation"
        v-model="form.password_confirmation"
      />
      <div v-for="error of v$.password_confirmation.$errors" :key="error.$uid">
        <div class="error">{{ error.$message }}</div>
      </div>

      <button class="btn btn-primary my-3">Register</button>

      <div v-for="error of form.errors" :key="error">
        <div class="error">{{ error[0] }}</div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../../services/AuthService';
import useVuelidate from '@vuelidate/core';
import {
  required,
  email,
  sameAs,
  minLength,
  maxLength,
} from '@vuelidate/validators';

const router = useRouter();
const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  errors: [],
});

const handleSubmit = async () => {
  form.errors = [];
  const validated = await v$.value.$validate();
  if (validated) {
    try {
      const data = await AuthService.register(form);
      router.push({ name: 'login', replace: true });
    } catch (error) {
      console.log(error);
      form.errors = error?.response?.data?.errors;
    }
  }
};

// Vuelidate - rules
const rules = computed(() => ({
  name: { required, maxLength: maxLength(255) },
  email: { required, email },
  password: { required, minLength: minLength(8) },
  password_confirmation: {
    required,
    sameAsPassword: sameAs(form.password),
  },
}));
const v$ = useVuelidate(rules, form);
</script>

<style>
.error {
  color: red;
}
</style>
