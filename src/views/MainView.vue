<template>
    <div>
    </div>

</template>

<script setup>

import Footer from '@/components/common/Footer.vue';
import Header from '@/components/common/Header.vue';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

onMounted(()=>{
    console.log(123);
})

</script>

<style scoped>

</style>