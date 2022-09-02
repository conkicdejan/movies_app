<template>
  <div>
    <h1>Debounced Events</h1>
    <button @click="debounceMethod()">
      Click this button as fast as you can!
    </button>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  methods: {
    debounceMethod: _.debounce(() => {
      console.log('Debounce button clicked!');
    }, 2000),
  },
};
</script>
