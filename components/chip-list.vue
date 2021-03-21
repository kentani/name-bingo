<template>
  <div v-if="items.length !== 0">
    <v-chip
      v-for="(item, i) in items.filter(v => v)"
      :key="i"
      label
      :dark="accent"
      :class="[ accent ? 'deep-purple' : 'grey lighten-4' ]"
      class="ma-1">
      {{ item.name || 'ゲストユーザー' }}
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
    accent: {
      type: Boolean,
      default: false
    },
  }
}
</script>