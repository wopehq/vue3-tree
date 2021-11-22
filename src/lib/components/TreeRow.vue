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
      <div v-if="useIcon" class="tree-row-item-icon-wrapper">
        <template v-if="node.nodes">
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
      </div>
      <slot
        :id="node.id"
        name="checkbox"
        :checked="node.checked"
        :indeterminate="node.indeterminate"
      />
      <input
        v-if="useCheckbox"
        v-model="node.checked"
        type="checkbox"
        :checked="node.checked"
        :indeterminate="node.indeterminate"
        @click.stop="toggleCheckbox"
      />
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
        :set-node="setNode"
        :get-node="getNode"
        :update-node="updateNode"
        :expandable="expandable"
        @node-expanded="onNodeExpanded"
        @checkbox-toggle="onCheckboxToggle"
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
            :id="id"
            name="checkbox"
            :checked="checked"
            :indeterminate="indeterminate"
          />
        </template>
      </tree-row>
    </ul>
  </li>
</template>

<script>
import { nextTick, watch } from 'vue';
import ArrowRight from './Icons/ArrowRight.vue';
import ArrowDown from './Icons/ArrowDown.vue';

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
  emits: ['nodeExpanded', 'checkboxToggle'],
  setup(props, { emit }) {
    const toggleExpanded = node => {
      if (props.expandable) {
        props.node.expanded = props.node.nodes ? !props.node.expanded : false;
        nextTick(() => {
          emit('nodeExpanded', node, props.node.expanded);
        });
      }
    };

    watch(() => props.expandRowByDefault, newVal => {
      if (props.node.nodes) {
        props.node.expanded = !props.expandable;
      }
    }, {
      immediate: true,
    });

    // redirect the event toward the Tree component
    const onNodeExpanded = (node, state) => {
      emit('nodeExpanded', node, state);
    };

    const toggleCheckbox = () => {
      const { node, updateNode } = props;
      updateNode(node.id, { checked: !node.checked });
    };

    const onCheckboxToggle = (context, event) => {
      emit('checkboxToggle', context, event);
    };

    return {
      toggleExpanded,
      onNodeExpanded,
      toggleCheckbox,
      onCheckboxToggle,
    };
  },
};
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
      z-index: -1;
    }

    &-icon-wrapper {
      width: 15px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }

  &-txt {
    user-select: none;
  }
}
</style>
