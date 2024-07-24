<template>
  <q-dialog ref="isOpenConfirmModal">
    <q-card class="bg-grey-9 modal-content">
      <q-card-section class="text-center">
        <q-icon name="warning" color="orange" size="xl" />
      </q-card-section>
      <q-card-section class="text-center">
        <div class="text-h6">Are u shure?</div>
      </q-card-section>
      <q-card-section class="text-center">
        <q-btn label="no" color="blue" @click="emit('close', false)" />
        <q-btn
          label="yes"
          class="q-ml-md"
          color="negative"
          @click="emit('click', true)"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['click', 'close']);
</script>

<style scoped>
.modal-content {
  width: 40%;
}
</style>
