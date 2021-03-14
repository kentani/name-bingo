<template>
  <div>
    <v-chip
      v-if="items.length !== 0"
      v-for="(item, i) in items.filter(v => v)"
      :key="i"
      class="grey lighten-4">
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