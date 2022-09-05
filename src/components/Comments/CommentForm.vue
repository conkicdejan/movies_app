<template>
  <textarea
    required
    class="form-control mt-2 m-0"
    rows="4"
    placeholder="add new comment"
    v-model="content"
  ></textarea>
  <div v-for="error of v$.content.$errors" :key="error.$uid">
    <div class="error">{{ error.$message }}</div>
  </div>

  <button
    @click="handleSubmit"
    type="button"
    class="btn btn-primary btn-sm float-end mt-2 my-5"
  >
    Add comment
  </button>
</template>

<script setup>
import { ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, maxLength } from '@vuelidate/validators';
import CommentsService from '../../services/CommentsService';

const emit = defineEmits(['commentAdded']);

const { movieId } = defineProps(['movieId']);

const content = ref('');

const handleSubmit = async () => {
  const validated = await v$.value.$validate();
  if (validated) {
    try {
      const data = await CommentsService.create(movieId, content.value);
      emit('commentAdded', data);
      v$.value.$reset();
      content.value = '';
    } catch (error) {
      console.log(error);
    }
  }
};

// Vuelidate - rules
const rules = computed(() => ({
  content: { required, maxLength: maxLength(500) },
}));
const v$ = useVuelidate(rules, { content });
</script>

<style>
.error {
  color: red;
}
</style>
