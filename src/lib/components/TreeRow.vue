<template>
  <li
    class="tree-row"
    :style="{'padding-left': depth * indentSize + 'px',
             'gap': gap + 'px'}"
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
      <input
        type="checkbox"
        @click.stop="toggleCheckbox(node)"
      >
      <span class="tree-row-txt">
        {{ node.label }}
      </span>
    </div>
    <ul
      v-if="expanded"
      :style="{'gap': gap + 'px'}"
    >
      <tree-row
        v-for="child in node.nodes"
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
    const expanded = ref(false)
    const checked = ref(false)
    const toggleExpanded = node => {
      expanded.value = !expanded.value
      nextTick(() => {
        emit('emitNodeExpanded', node, expanded.value)
      })
    }

    watch(() => props.expandRowByDefault, newVal => {
      expanded.value = newVal
    }, {
      immediate: true,
    })

    // redirect the event toward the Tree component
    const emitNodeExpanded = (node, state) => {
      emit('emitNodeExpanded', node, state)
    }

    const toggleCheckbox = node => {
      checked.value = !checked.value
      nextTick(()=>{
        emit('emitCheckboxToggle', {
          id: node.id,
          checked: checked.value,
        })
      })
    }

    const emitCheckboxToggle = context => {
      emit('emitCheckboxToggle', context)
    }

    return {
      expanded,
      toggleExpanded,
      emitNodeExpanded,
      toggleCheckbox,
      emitCheckboxToggle,
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
