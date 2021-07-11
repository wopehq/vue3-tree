<template>
  <div>
    <ul>
      <tree-row
        v-for="node in nodes"
        :ref="'tree-row-' + node.id"
        :key="node.id"
        :node="node"
        :indent-size="indentSize"
        @emitNodeExpanded="onNodeExpanded"
      >
        <template #iconActive>
          <slot name="iconActive"></slot>
        </template>
        <template #iconInactive>
          <slot name="iconInactive"></slot>
        </template>
      </tree-row>
    </ul>
  </div>
</template>

<script>
import TreeRow from './TreeRow.vue'

export default {
  name: 'Tree',
  components:{
    TreeRow,
  },
  props:{
    nodes: {
      type: Array,
      required: true,
    },
    indentSize: {
      type: Number,
      default: 10,
    },
  },
  setup() {
    const onNodeExpanded = (node, state) => {
      console.log('state: ', state)
      console.log('node: ', node)
    }

    return {
      onNodeExpanded,
    }
  },
}
</script>

<style lang="scss" scoped>
li, ul{
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
