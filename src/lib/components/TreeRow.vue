<template>
  <li class="tree-row">
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
    }
  },
  emits: ['emitNodeExpanded'],
  setup (props, { emit }) {
    const expanded = ref(false)

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

</style>