<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const answers = computed(() => store.state.answers);
</script>

<template>
<h1>Results</h1>
</template>

<style scoped>

</style>
