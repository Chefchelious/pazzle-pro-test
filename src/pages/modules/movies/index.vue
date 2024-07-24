<template>
  <div class="movies-container">
    <div class="row items-center justify-end q-mb-lg gap-md">
      <q-btn color="purple-6" label="add new" @click="goToCreatePage" />
    </div>

    <div v-if="movies.length">
      <q-expansion-item
        dark
        expand-separator
        icon="filter_alt"
        label="Filters"
        class="q-px-md q-mb-lg"
      >
        <q-card dark class="bg-transparent">
          <q-card-section class="row items-center q-gutter-md">
            <div class="col-sm-3 col-12">
              <q-input
                dark
                outlined
                v-model="filterData.title"
                label="Title"
                dense
              />
            </div>

            <div class="col-sm-3 col-12">
              <q-input
                readonly
                v-model="filterData.year"
                label="Year"
                color="white"
                dark
                dense
                outlined
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer" />
                </template>
                <q-popup-proxy
                  @show="findNavigationButtons"
                  @before-show="findNavigationButtons"
                  v-model:show="isDatePickerVisible"
                  transition-show="scale"
                  transition-hide="scale"
                  anchor="center middle"
                  self="center middle"
                >
                  <q-date
                    v-model="filterData.year"
                    v-close-popup="isDatePickerVisible"
                    @navigation="isDatePickerVisible = false"
                    @update:model-value="onUpdateMv"
                    minimal
                    mask="YYYY"
                    first-day-of-week="1"
                    emit-immediately
                    default-view="Years"
                    dark
                  />
                </q-popup-proxy>
              </q-input>
            </div>

            <div class="col-sm-3 col-12">
              <q-select
                v-model="filterData.rating"
                dark
                outlined
                :options="ratingOptions"
                option-value="value"
                dense
                label="Rating"
                emit-value
                map-options
              />
            </div>

            <div class="row no-wrap">
              <q-btn
                dense
                icon="search"
                color="primary"
                class="q-mr-sm filter-btn"
                @click="search"
              />
              <q-btn
                dense
                icon="refresh"
                color="orange"
                class="filter-btn"
                @click="clearFilter"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <div class="movie-list q-mb-md">
        <movie-item
          v-for="movie in paginatedMovies"
          :key="movie.id"
          :movie="movie"
          @click="goToMoviePage(movie.id)"
        />
      </div>

      <div class="row justify-center" v-show="movies.length">
        <q-pagination
          v-model="pagination.page"
          :max="pagesNumber"
          :max-pages="7"
          direction-links
        />
      </div>
    </div>

    <h4 v-else>здесь пусто :(</h4>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance, reactive, onMounted } from 'vue';
import MovieItem from 'src/components/movie/movie-item.vue';
import { useMovieStore } from 'src/stores/movie-store';
import { storeToRefs } from 'pinia';

interface IFilterData {
  [key: string]: string;
}

const globalProperties =
  getCurrentInstance()?.appContext.config.globalProperties;

const isDatePickerVisible = ref(false);
const dpKey = ref(Date.now());

const pagination = ref({
  page: 1,
  rowsPerPage: 10,
});

const movieStore = useMovieStore();
const { movies, filteredMovies } = storeToRefs(movieStore);

const paginatedMovies = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.rowsPerPage;
  const end = start + pagination.value.rowsPerPage;
  return filteredMovies.value.slice(start, end);
});

const pagesNumber = computed(() => {
  return Math.ceil(filteredMovies.value.length / pagination.value.rowsPerPage);
});

const goToCreatePage = () => globalProperties?.$router.push('/movie/create');
const goToMoviePage = (id: string) =>
  globalProperties?.$router.push(`/movie/${id}`);

const filterData = reactive<IFilterData>({
  title: '',
  year: '',
  rating: '',
});

const clearFilter = () => {
  pagination.value.page = 1;
  Object.keys(filterData).forEach((key) => (filterData[key] = ''));
  filteredMovies.value = movies.value;
};

const search = () => {
  pagination.value.page = 1;
  movieStore.filterMovies(filterData);
};

const ratingOptions = Array.from({ length: 10 }, (_, i) => ({
  label: (i + 1).toString(),
  value: i + 1,
}));

const onUpdateMv = () => {
  dpKey.value = Date.now();
  isDatePickerVisible.value = true;
};

const findNavigationButtons = () => {
  const navigationButtons = document.querySelectorAll(
    '.q-btn.q-btn-item.non-selectable.no-outline.q-btn--flat.q-btn--round.q-btn--actionable.q-focusable.q-hoverable.q-btn--dense'
  );
  navigationButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });
};

onMounted(() => {
  filteredMovies.value = movies.value;
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

.filter-btn {
  padding: 4px;
  width: 30px;
  height: 30px;
}
</style>
