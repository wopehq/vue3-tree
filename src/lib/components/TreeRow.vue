<template>
  <li
    class="tree-row"
    :style="{'padding-left': depth * indent + 'px'}"
  >
    <div
      class="tree-row-item"
      @click.stop="toggleExpanded(node)"
    >
      <arrow-icon />
      <span class="tree-row-txt">
        {{ node.label }}
      </span>
    </div>
    <ul v-if="expanded">
      <tree-row
        v-for="child in node.nodes"
        :ref="'tree-row-' + child.id"
        :key="child.id"
        :node="child"
        :depth="depth + 1"
        @emitNodeExpanded="emitNodeExpanded"
      />
    </ul>
  </li>
</template>

<script>
import { ref, nextTick } from 'vue'
import ArrowIcon from './Icon.vue'

export default {
  components: {
    ArrowIcon
  },
  props: {
    node: {
      type: Object,
      required: true
    },
    depth: {
      type: Number,
      default: 0
    },
    indent: {
      type: Number,
      default: 10
    }
  },
  emits: ['emitNodeExpanded'],
  setup (props, { emit }) {
    const expanded = ref(false)
    console.log(props.depth)
    const toggleExpanded = (node, instance) => {
      expanded.value = !expanded.value
      nextTick(() => {
        emit('emitNodeExpanded', node, expanded.value)
      })
    }

    // redirect the event toward the Tree component
    const emitNodeExpanded = (node, state) => { 
      emit('emitNodeExpanded', node, state)
    }

    return {
      expanded,
      toggleExpanded,
      emitNodeExpanded
    }
  }
}
</script>

<style lang="scss" scoped>
li, ul{
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>