<template>
  <div class="movies-container">
    <div class="row items-center justify-between q-mb-lg">
      <h1 class="text-h4">Movies list here</h1>
      <q-btn color="purple-6" label="add new" />
    </div>

    <div class="movie-list q-mb-md">
      <movie-item
        v-for="movie in paginatedMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>

    <div class="row justify-center">
      <q-pagination
        v-model="pagination.page"
        :max="pagesNumber"
        :max-pages="7"
        direction-links
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import MovieImage from 'assets/movie-image.jpeg';
import MovieItem from 'src/components/movie/movie-item.vue';
import { IMovie } from 'src/types';

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
});

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
    year: '2026',
  },
]);

const paginatedMovies = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.rowsPerPage;
  const end = start + pagination.value.rowsPerPage;
  return movies.value.slice(start, end);
});

const pagesNumber = computed(() => {
  return Math.ceil(movies.value.length / pagination.value.rowsPerPage);
});
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
