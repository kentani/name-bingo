<template>
  <div v-if="items.length !== 0">
    <v-chip
      v-for="(item, i) in items.filter(v => v)"
      :key="i"
      label
      class="grey lighten-4 ma-2">
      {{ item.name }}
    </v-chip>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => ([])
    },
  }
}
</script>