<template>
  <li
    class="tree-row"
    :style="{'padding-left': depth * indentSize + 'px',
             'gap': gap + 'px'}"
  >
    <div
      class="tree-row-item"
      @click.stop="toggleExpanded(reactiveNode)"
    >
      <template v-if="reactiveNode.nodes">
        <template v-if="!reactiveNode.expanded">
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
      <input
        type="checkbox"
        :checked="reactiveNode.checked"
        @click.stop="toggleCheckbox(reactiveNode)"
      >
      <span class="tree-row-txt">
        {{ reactiveNode.label }}
      </span>
    </div>
    <ul
      v-if="reactiveNode.expanded"
      :style="{'gap': gap + 'px'}"
    >
      <tree-row
        v-for="child in reactiveNode.nodes"
        :ref="'tree-row-' + child.id"
        :key="child.id"
        :node="child"
        :depth="depth + 1"
        :gap="gap"
        :expand-row-by-default="expandRowByDefault"
        :indent-size="indentSize"
        @emitNodeExpanded="emitNodeExpanded"
        @emitCheckboxToggle="emitCheckboxToggle"
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
import { ref, nextTick, watch } from 'vue'
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
    gap: {
      type: Number,
      required: true,
    },
    expandRowByDefault: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['emitNodeExpanded', 'emitCheckboxToggle'],
  setup(props, { emit }) {
    const reactiveNode = ref(props.node)

    const toggleExpanded = node => {
      reactiveNode.value.expanded = !reactiveNode.value.expanded
      nextTick(() => {
        emit('emitNodeExpanded', node, reactiveNode.value.expanded)
      })
    }

    watch(() => props.expandRowByDefault, newVal => {
      reactiveNode.value.expanded = newVal
    }, {
      immediate: true,
    })

    watch(() => props.node, newVal => {
      reactiveNode.value.checked = newVal.checked
    }, {
      deep: true,
    })

    // redirect the event toward the Tree component
    const emitNodeExpanded = (node, state) => {
      emit('emitNodeExpanded', node, state)
    }

    const toggleCheckbox = node => {
      reactiveNode.value.checked = !reactiveNode.value.checked
      nextTick(()=>{
        emit('emitCheckboxToggle', {
          id: node.id,
          checked: node.checked,
        })
      })
    }

    const emitCheckboxToggle = context => {
      emit('emitCheckboxToggle', context)
    }

    return {
      toggleExpanded,
      emitNodeExpanded,
      toggleCheckbox,
      emitCheckboxToggle,
      reactiveNode,
    }
  },
}
</script>

<style lang="scss" scoped>
ul, li {
  display: grid;
  margin: 0;
  padding: 0;
}
</style>
