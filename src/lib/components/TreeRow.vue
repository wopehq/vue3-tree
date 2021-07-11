<template>
  <li
    class="tree-row"
    :style="{'padding-left': depth * indentSize + 'px'}"
  >
    <div
      class="tree-row-item"
      @click.stop="toggleExpanded(node)"
    >
      <template v-if="node.nodes">
        <template v-if="!expanded">
          <slot name="iconActive">
            <arrow-right />
          </slot>
        </template>
        <template v-else>
          <slot name="iconInactive">
            <arrow-down />
          </slot>
        </template>
      </template>
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
        :indent-size="indentSize"
        @emitNodeExpanded="emitNodeExpanded"
      >
        <template #iconActive>
          <slot name="iconActive">
            <arrow-right />
          </slot>
        </template>
        <template #iconInactive>
          <slot name="iconInactive">
            <arrow-down />
          </slot>
        </template>
      </tree-row>
    </ul>
  </li>
</template>

<script>
import { ref, nextTick } from 'vue'
import ArrowRight from './Icons/ArrowRight.vue'
import ArrowDown from './Icons/ArrowDown.vue'

export default {
  components: {
    ArrowRight,
    ArrowDown,
  },
  props: {
    node: {
      type: Object,
      required: true,
    },
    depth: {
      type: Number,
      default: 0,
    },
    indentSize: {
      type: Number,
      required: true,
    },
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
      emitNodeExpanded,
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
