<template>
  <q-card dark class="card" flat bordered>
    <q-card-section>
      <div class="text-h6 q-mb-xs row items-center justify-between">
        <h6 class="card-title">{{ movie.title }}</h6>
        <span>{{ movie.year }}</span>
      </div>
      <div class="row no-wrap items-center">
        <span class="text-caption text-grey">Rating: {{ movie.rating }}</span>
      </div>
    </q-card-section>

    <img class="poster-image" :src="movie.image" />
  </q-card>
</template>

<script setup lang="ts">
import { IMovie } from 'src/types';

defineProps<{ movie: IMovie }>();
</script>

<style scoped>
.card {
  user-select: none;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.04);
  transition: 0.3s;
}

.card-title {
  width: 70%;
}

.card img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.container {
  width: 100%;
}
</style>
