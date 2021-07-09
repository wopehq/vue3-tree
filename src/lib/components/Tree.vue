<template>
  <div>
    <ul>
      <tree-row
        v-for="node in nodes"
        :ref="'tree-row-' + node.id"
        :key="node.id"
        :node="node"
        @emitNodeExpanded="onNodeExpanded"
      />
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import TreeRow from './TreeRow.vue'

export default {
  name: 'Tree',
  components:{
    TreeRow
  },
  props:{
    nodes: {
      type: Array,
      required: true
    }
  },
  setup() {
    const activeItems = ref([])

    const onNodeExpanded = (node, state) => {
      console.log('state: ', state)
      console.log('node: ', node)
    }

    return {
      activeItems,
      onNodeExpanded
    }
  }
}
</script>

<style lang="scss" scoped>
.tree {
  &-item {
    align-items: center;
    cursor: auto;
    display: flex;
    user-select: none;
  }
}

</style>
