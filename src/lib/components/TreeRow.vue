<template>
  <li
    class="tree-row"
    :style="{'padding-left': depth * indentSize + 'px',
             'gap': gap + 'px',
             '--row-hover-background': rowHoverBackground}"
    :indeterminate="indeterminate"
  >
    <div
      class="tree-row-item"
      @click.stop="toggleExpanded(reactiveNode)"
    >
      <template v-if="reactiveNode.nodes && useIcon">
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
      <slot
        name="checkbox"
        :checked="reactiveNode.checked"
        :toggleCheckbox="($event) => toggleCheckbox(reactiveNode, $event)"
        :indeterminate="indeterminate"
      ></slot>
      <input
        v-if="useCheckbox"
        type="checkbox"
        :checked="reactiveNode.checked"
        @click.stop="toggleCheckbox(reactiveNode, $event)"
      >
      <span class="tree-row-txt">
        {{ reactiveNode.label }}
      </span>
    </div>
    <ul
      v-if="reactiveNode.expanded"
      :style="{'gap': gap + 'px'}"
      class="tree-list"
    >
      <tree-row
        v-for="child in reactiveNode.nodes"
        :ref="'tree-row-' + child.id"
        :key="child.id"
        :node="child"
        :depth="depth + 1"
        :use-checkbox="useCheckbox"
        :use-icon="useIcon"
        :gap="gap"
        :expand-row-by-default="expandRowByDefault"
        :indent-size="indentSize"
        :indeterminate="indeterminate"
        :row-hover-background="rowHoverBackground"
        @emitNodeExpanded="emitNodeExpanded"
        @emitOnUpdated="emitOnUpdated"
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
        <template #checkbox>
          <slot
            name="checkbox"
            :checked="child.checked"
            :toggleCheckbox="($event) => toggleCheckbox(child, $event)"
            :indeterminate="indeterminate"
          ></slot>
        </template>
      </tree-row>
    </ul>
  </li>
</template>

<script>
import { ref, nextTick, watch, onUpdated } from 'vue'
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
    useCheckbox: {
      type: Boolean,
      default: false,
    },
    useIcon:{
      type: Boolean,
      default: true,
    },
    rowHoverBackground: {
      type: String,
      default: '#e0e0e0',
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['emitNodeExpanded', 'emitCheckboxToggle', 'emitOnUpdated'],
  setup(props, { emit }) {
    const reactiveNode = ref(props.node)
    const toggleExpanded = node => {
      reactiveNode.value.expanded = reactiveNode.value.nodes ? !reactiveNode.value.expanded : false
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

    const emitOnUpdated = (node, state) => {
      emit('emitOnUpdated', node, state)
    }

    onUpdated(() => {
      emitOnUpdated()
    })

    const toggleCheckbox = (node, event) => {
      event.stopPropagation()
      reactiveNode.value.checked = !reactiveNode.value.checked
      nextTick(()=>{
        emit('emitCheckboxToggle', {
          id: node.id,
          checked: node.checked,
        }, event)
      })
    }

    const emitCheckboxToggle = (context, event) => {
      emit('emitCheckboxToggle', context, event)
    }

    return {
      toggleExpanded,
      emitNodeExpanded,
      emitOnUpdated,
      toggleCheckbox,
      emitCheckboxToggle,
      reactiveNode,
    }
  },
}
</script>

<style lang="scss">
.tree-list, .tree-row {
  display: grid;
  margin: 0;
  padding: 0;
}

.tree-row {
  transform-style: preserve-3d;

  &-item {
    position: relative;
    padding: 5px 10px;

    &:hover:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background-color: var(--row-hover-background);
      transform: translate3d(0, 0, -0.1px);
      width: 200vw;
      margin-left: calc(100% - 100vw);
    }
  }

  &-txt {
    user-select: none;
  }
}
</style>
