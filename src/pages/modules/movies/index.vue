<template>
  <div class="movies-container">
    <h1 class="text-h4 q-mb-lg">Movies list here</h1>

    <div class="movie-list">
      <movie-item v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MovieImage from 'assets/movie-image.jpeg';
import MovieItem from 'src/components/movie/movie-item.vue';
import { IMovie } from 'src/types';

const movies = ref<IMovie[]>([
  {
    id: '123',
    description: 'asdasddsa',
    genre: {
      id: '43',
      name: 'Anime',
    },
    image: MovieImage,
    rating: 3,
    title: 'aidsji ji',
    year: '2025',
  },
  {
    id: '123',
    description: 'asdasddsa',
    genre: {
      id: '43',
      name: 'Anime',
    },
    image: MovieImage,
    rating: 3,
    title: 'aidsji ji',
    year: '2025',
  },
  {
    id: '123',
    description: 'asdasddsa',
    genre: {
      id: '43',
      name: 'Anime',
    },
    image: MovieImage,
    rating: 3,
    title: 'aidsji ji',
    year: '2025',
  },
  {
    id: '123',
    description: 'asdasddsa',
    genre: {
      id: '43',
      name: 'Anime',
    },
    image: MovieImage,
    rating: 3,
    title: 'aidsji ji',
    year: '2025',
  },
  {
    id: '123',
    description: 'asdasddsa',
    genre: {
      id: '43',
      name: 'Anime',
    },
    image: MovieImage,
    rating: 3,
    title: 'aidsji ji',
    year: '2025',
  },
  {
    id: '123',
    description: 'asdasddsa',
    genre: {
      id: '43',
      name: 'Anime',
    },
    image: MovieImage,
    rating: 3,
    title: 'aidsji ji',
    year: '2025',
  },
]);
</script>

<style scoped lang="scss">
.movie-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  align-items: start;
  grid-gap: 30px;
  padding: 0 15px;
}

@media (max-width: 1070px) {
  .movie-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 830px) {
  .movie-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .movie-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
