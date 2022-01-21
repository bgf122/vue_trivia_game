<script setup>
defineProps({
    question: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    curQ: {
        type: Number,
        required: true
    }
})
</script>

<template>  
    <li v-if="curQ === index">{{question.question}}</li>
</template>

<style scoped>
</style>
