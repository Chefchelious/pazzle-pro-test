<template>
  <q-item
    clickable
    :to="link"
    :class="{
      'bg-purple-14 text-white': checkIsActiveRoute(link),
      'q-item--active': checkIsActiveRoute(link),
    }"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
defineOptions({
  name: 'EssentialLink',
});

export interface EssentialLinkProps {
  id: string;
  title: string;
  link?: string;
  icon?: string;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  link: '#',
  icon: '',
});

const globalProperties =
  getCurrentInstance()?.appContext.config.globalProperties;

const checkIsActiveRoute = (link: string) => {
  if (link === '' && globalProperties?.$route.fullPath === '/') {
    return true;
  }

  return link === globalProperties?.$route.path;
};
</script>
