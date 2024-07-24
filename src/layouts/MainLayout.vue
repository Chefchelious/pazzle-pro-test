<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-dark">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title
          class="cursor-pointer"
          @click="globalProperties?.$router.push('/movie')"
        >
          Movies
        </q-toolbar-title>

        <div class="cursor-pointer">
          <q-btn label="Hello, Dim" unelevated>
            <q-menu anchor="bottom end" self="top right">
              <q-list style="min-width: 100px">
                <q-item dense clickable v-close-popup>
                  <q-item-section>Logout</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" dark overlay>
      <q-list>
        <q-item-label header
          ><q-btn icon="close" @click="toggleLeftDrawer"
        /></q-item-label>

        <q-item
          clickable
          to="/"
          :class="[
            { 'text-white': globalProperties?.$route.path !== '/' },
            {
              'bg-purple-14 text-white': globalProperties?.$route.path === '/',
            },
          ]"
        >
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>

        <essential-link
          v-for="link in linksList"
          :key="link.id"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <main class="q-pa-sm">
        <router-view />
      </main>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

defineOptions({
  name: 'MainLayout',
});

const globalProperties =
  getCurrentInstance()?.appContext.config.globalProperties;

const linksList: EssentialLinkProps[] = [
  {
    id: '2',
    title: 'Movies',
    link: '/movie',
  },
];

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
