<template>
  <section class="movie">
    <div v-if="movie">
      <div class="control-pannel q-mb-lg row q-gutter-sm justify-end">
        <q-btn
          label="delete"
          icon="delete"
          color="negative"
          no-caps
          no-wrap
          @click="isOpenConfirmModal = true"
        />
        <q-btn
          label="edit"
          icon="edit"
          color="primary"
          no-caps
          no-wrap
          @click="goToEditPage(movie.id)"
        />
      </div>
      <h5 class="movie__title q-mb-lg">{{ movie.title }}</h5>

      <div class="movie__content">
        <div class="movie__poster-wrapper">
          <img className="movie__poster" :src="movie.image" alt="poster" />
        </div>
        <div class="movie__stats">
          <p>
            <strong className="movie__stats-heading">Year:</strong
            >{{ movie.year }}
          </p>
          <p>
            <strong className="movie__stats-heading">Rating:</strong
            >{{ movie.rating }}
          </p>
          <p>
            <strong className="movie__stats-heading">Genre:</strong
            >{{ movie.genre.name }}
          </p>
        </div>

        <div class="movie__description">
          <h5>Description:</h5>
          <p>{{ movie.description }}</p>
        </div>
      </div>
    </div>
  </section>
  <confirm-modal
    v-model="isOpenConfirmModal"
    @close="isOpenConfirmModal = false"
    @click="deleteMovie"
  />
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useMovieStore } from 'src/stores/movie-store';
import ConfirmModal from 'src/components/modals/confirm-modal.vue';

const globalProperties =
  getCurrentInstance()?.appContext.config.globalProperties;

const movieId = ref<string>(globalProperties?.$route.params.id as string);

const movieStore = useMovieStore();
const { movie } = storeToRefs(movieStore);

const isOpenConfirmModal = ref(false);

const goToEditPage = (id: string) => {
  globalProperties?.$router.push(`/movie/edit/${id}`);
};

const deleteMovie = () => {
  movieStore.deleteMovie(movieId.value);
  isOpenConfirmModal.value = false;
  globalProperties?.$router.push('/movie');
};

onMounted(() => {
  movieStore.getMovie(movieId.value);

  if (!movie.value) {
    return globalProperties?.$router.push('/movie');
  }
});
</script>

<style scoped>
.movie {
  width: 95%;
  margin: 0 auto;
}

.movie__content {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.movie__poster-wrapper {
  width: 50%;
}

.movie__poster {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
}

.movie__stats p {
  margin-bottom: 10px;
}

.movie__stats-heading {
  padding-right: 15px;
}

.movie__description {
  width: 100%;
}
</style>
