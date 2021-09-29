<template>
  <li
    class="tree-row"
    :style="{
      'padding-left': indentSize + 'px',
      'gap': gap + 'px',
      '--row-hover-background': rowHoverBackground
    }"
  >
    <div
      class="tree-row-item"
      @click.stop="toggleExpanded(node)"
    >
      <template v-if="node.nodes && useIcon">
        <template v-if="!node.expanded">
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
        :checked="node.checked"
        :indeterminate="node.indeterminate"
        :id="node.id"
      />
      <input
        v-if="useCheckbox"
        v-model="node.checked"
        type="checkbox"
        :checked="node.checked"
        :indeterminate="node.indeterminate"
        @click.stop="toggleCheckbox"
      >
      <span class="tree-row-txt">
        {{ node.label }}
      </span>
    </div>
    <ul
      v-if="node.expanded"
      :style="{'gap': gap + 'px'}"
      class="tree-list"
    >
      <tree-row
        v-for="child in node.nodes"
        :ref="'tree-row-' + child.id"
        :key="child.id"
        :node="child"
        :use-checkbox="useCheckbox"
        :use-icon="useIcon"
        :gap="gap"
        :expand-row-by-default="expandRowByDefault"
        :indent-size="indentSize"
        :row-hover-background="rowHoverBackground"
        :setNode="setNode"
        :getNode="getNode"
        :updateNode="updateNode"
        :expandable="expandable"
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
        <template #checkbox="{ checked, indeterminate, id }">
          <slot
            name="checkbox" 
            :checked="checked"
            :indeterminate="indeterminate"
            :id="id"
          />
      </template>
      </tree-row>
    </ul>
  </li>
</template>

<script>
import { nextTick, watch } from 'vue'
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
    indentSize: {
      type: Number,
      required: true,
    },
    gap: {
      type: Number,
      required: true,
    },
    getNode: {
      type: Function,
      required: true,
    },
    setNode: {
      type: Function,
      required: true,
    },
    updateNode: {
      type: Function,
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
    expandable: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['emitNodeExpanded', 'emitCheckboxToggle'],
  setup(props, { emit }) {
    const toggleExpanded = node => {
      if (props.expandable) {
        props.node.expanded = props.node.nodes ? !props.node.expanded : false
        nextTick(() => {
          emit('emitNodeExpanded', node, props.node.expanded)
        })
      }
    }

    watch(() => props.expandRowByDefault, newVal => {
      if (props.node.nodes) {
        props.node.expanded = !props.expandable
      }
    }, {
      immediate: true,
    })

    // redirect the event toward the Tree component
    const emitNodeExpanded = (node, state) => {
      emit('emitNodeExpanded', node, state)
    }

    const toggleCheckbox = () => {
      const { node, updateNode } = props;
      updateNode(node.id, { checked: !node.checked });
    }

    const emitCheckboxToggle = (context, event) => {
      emit('emitCheckboxToggle', context, event)
    }

    return {
      toggleExpanded,
      emitNodeExpanded,
      toggleCheckbox,
      emitCheckboxToggle,
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
