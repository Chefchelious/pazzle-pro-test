<template>
  <h4 v-if="!movieId" class="text-h6 q-pa-md text-center">Create new movie</h4>
  <h4 v-else class="text-h6 q-pa-md text-center">Edit movie</h4>

  <q-form ref="form" class="form q-mx-auto" greedy no-error-focus>
    <div>
      <q-input
        dark
        outlined
        v-model="formData.title"
        label="Title"
        dense
        :rules="[(val: string) => val ? !!val.trim() : 'required field']"
        lazy-rules="ondemand"
        no-error-icon
      />
    </div>

    <div>
      <q-input
        readonly
        v-model="formData.year"
        label="Year"
        :rules="[(val: string) => val ? !!val.trim() : 'required field']"
        color="white"
        dark
        dense
        outlined
        lazy-rules="ondemand"
        no-error-icon
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
            v-model="formData.year"
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

    <div>
      <q-input
        v-model="formData.rating"
        label="Rating"
        :rules="ratingRules"
        color="white"
        mask="##"
        dark
        dense
        outlined
        lazy-rules="ondemand"
        no-error-icon
      ></q-input>
    </div>

    <div>
      <q-select
        v-model="formData.genre"
        dark
        outlined
        :options="GENRES"
        :option-label="(opt) => opt.name"
        label="Genre"
        dense
        :rules="[(val: null | IGenre) => val ? !!val : 'required field']"
        lazy-rules="ondemand"
        no-error-icon
      />
    </div>

    <div>
      <q-file
        filled
        bottom-slots
        v-model="file"
        label="Label"
        dark
        counter
        :rules="fileRules"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop.prevent />
        </template>
        <template v-slot:append>
          <q-icon
            name="close"
            @click.stop.prevent="file = null"
            class="cursor-pointer"
          />
        </template>
      </q-file>
    </div>

    <div v-if="formData.image" class="movie__poster-wrapper">
      <img className="movie__poster" :src="formData.image" alt="poster" />
    </div>

    <div style="max-height: 150px" class="q-pb-lg">
      <q-input
        v-model="formData.description"
        dark
        input-style="min-height: 100px; padding: 10px 0; max-height: 150px"
        placeholder="Description"
        class="q-pa-none"
        color="primary"
        outlined
        borderless
        type="textarea"
        autogrow
        lazy-rules="ondemand"
        no-error-icon
        :rules="[(val: string) => val ? !!val.trim() : 'required field']"
      />
    </div>

    <q-btn color="primary" label="save" @click="save" />
  </q-form>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, watch } from 'vue';
import { GENRES } from 'src/mokData';
import { IGenre } from 'src/types';
import { reactive, ref } from 'vue';
import { useMovieStore } from 'src/stores/movie-store';
import { v4 as uuidv4 } from 'uuid';
import { storeToRefs } from 'pinia';

const globalProperties =
  getCurrentInstance()?.appContext.config.globalProperties;

const movieStore = useMovieStore();
const { movie } = storeToRefs(movieStore);

const isDatePickerVisible = ref(false);
const dpKey = ref(Date.now());
const form = ref();
const file = ref<File | null>(null);

const movieId = ref<string>(globalProperties?.$route.params.id as string);

const formData = reactive({
  title: '',
  year: '',
  rating: '',
  description: '',
  genre: null as null | IGenre,
  image: '',
});

watch(
  () => file.value,
  (newFile) => {
    if (newFile) {
      convertFileToBase64(newFile);
    } else {
      formData.image = '';
    }
  }
);

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

const create = () => {
  movieStore.addnewMovie({
    id: uuidv4(),
    ...formData,
    rating: +formData.rating,
    genre: formData.genre as IGenre,
  });

  globalProperties?.$router.go(-1);
};

const update = async () => {
  movieStore.updateMovie(movieId.value, {
    ...formData,
    rating: +formData.rating,
    genre: formData.genre as IGenre,
  });

  globalProperties?.$router.push('/movie');
};

const save = async () => {
  try {
    const is_valid = await form.value.validate();
    if (!is_valid) {
      return;
    }

    if (movieId.value) {
      update();
    } else {
      create();
    }
  } catch (e: unknown) {
    console.error('save', e);
  }
};

const ratingRules = [
  (val: string) => !!val || 'Rating is required',
  (val: string) => +val >= 1 || 'Rating must be at least 1',
  (val: string) => +val <= 10 || 'Rating must be at most 10',
];

const convertFileToBase64 = (file: File) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    formData.image = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

const fileRules = [
  (file: File | null) => !!file || 'File is required',
  (file: File | null) =>
    (file && file.type.startsWith('image/')) || 'File must be an image',
];

const base64ToFile = async (base64: string, filename: string) => {
  const response = await fetch(base64);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};

const getMovie = async () => {
  movieStore.getMovie(movieId.value);

  if (movie.value) {
    (formData.title = movie.value.title),
      (formData.year = movie.value.year),
      (formData.rating = String(movie.value.rating)),
      (formData.description = movie.value.description),
      (formData.genre = movie.value.genre);
  }

  if (movie.value && movie.value.image) {
    formData.image = movie.value.image;
    file.value = await base64ToFile(movie.value.image, 'image.jpg');
  }
};

onMounted(() => {
  if (movieId.value) {
    console.log('yes');
    getMovie();
  }
});
</script>

<style scoped lang="scss">
.form {
  max-width: 500px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.movie__poster-wrapper {
  width: 50%;
}

.movie__poster {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
}
</style>
