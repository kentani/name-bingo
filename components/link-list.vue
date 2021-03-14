<template>
  <v-list>
    <v-list-item-group color="deep-purple">
      <v-list-item
        nuxt
        v-if="items.length !== 0"
        v-for="(item, i) in items.filter(v => v)"
        :key="i"
        :to="item.to">
        <v-list-item-icon v-if="withIcon">
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    withIcon: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => ([])
    },
  }
}
</script>