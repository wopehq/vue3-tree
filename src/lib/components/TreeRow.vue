<template>
  <li
    class="tree-row"
    :style="{
      gap: `${gap}px`,
      paddingLeft: `${indentSize}px`,
      '--row-hover-background': rowHoverBackground,
    }"
  >
    <div
      class="tree-row-item"
      @click.stop="handleClick(node)"
    >
      <div v-if="showExpandIcon" class="tree-row-item-icon-wrapper">
        <template v-if="childCount">
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
        :node="node"
        :checked="node.checked"
        :indeterminate="node.indeterminate"
      >
        <input
          v-if="showCheckbox"
          v-model="node.checked"
          type="checkbox"
          :checked="node.checked"
          :indeterminate="node.indeterminate"
          @click.stop="onToggleCheckbox(node)"
        />
      </slot>
      <span class="tree-row-txt">
        {{ node.label }}
      </span>
      <template v-if="childCount && showChildCount">
        <slot
          name="childCount"
          :count="childCount"
          :checkedCount="checkedChildCount"
          :childs="node.nodes"
        >
          <span class="child-count">
            {{ childCount }}
          </span>
        </slot>
      </template>
      <template v-if="node && showDeleteIcon">
        <div class="delete-icon" @click.stop="removedRow(node)">
          <slot name="deleteIcon">
            <delete-icon />
          </slot>
        </div>
      </template>
    </div>
    <ul
      v-if="node.expanded"
      class="tree-list"
      :style="{ gap: `${gap}px` }"
    >
      <tree-row
        v-for="child in node.nodes"
        :key="child.id"
        :ref="`tree-row-${child.id}`"
        :node="child"
        :show-checkbox="showCheckbox"
        :show-expand-icon="showExpandIcon"
        :show-delete-icon="showDeleteIcon"
        :show-child-count="showChildCount"
        :gap="gap"
        :expand-row-by-default="expandRowByDefault"
        :indent-size="indentSize"
        :row-hover-background="rowHoverBackground"
        :set-node="setNode"
        :get-node="getNode"
        :update-node="updateNode"
        :expandable="expandable"
        @delete-row="removedRow"
        @node-click="(item) => handleClick(item, true)"
        @toggle-checkbox="onToggleCheckbox"
        @node-expanded="onNodeExpanded"
      >
        <template #childCount="{ count, checkedCount, childs }">
          <slot
            name="childCount"
            :count="count"
            :checked-count="checkedCount"
            :childs="childs"
          />
        </template>
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
        <template #deleteIcon>
          <slot name="deleteIcon">
            <delete-icon />
          </slot>
        </template>
        <template #checkbox="{ node: slotNode, checked, indeterminate }">
          <slot
            :id="slotNode.id"
            name="checkbox"
            :node="slotNode"
            :checked="checked"
            :indeterminate="indeterminate"
          />
        </template>
      </tree-row>
    </ul>
  </li>
</template>

<script>
import { computed, nextTick } from 'vue';
import ArrowRight from './Icons/ArrowRight.vue';
import ArrowDown from './Icons/ArrowDown.vue';
import DeleteIcon from './Icons/DeleteIcon.vue';

export default {
  components: {
    ArrowRight,
    ArrowDown,
    DeleteIcon,
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
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    showExpandIcon: {
      type: Boolean,
      default: true,
    },
    showDeleteIcon: {
      type: Boolean,
      default: false,
    },
    showChildCount: {
      type: Boolean,
      default: false,
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
  emits: ['nodeClick', 'toggleCheckbox', 'nodeExpanded', 'deleteRow'],
  setup(props, { emit }) {
    const childCount = computed(() => props.node.nodes?.length);
    const checkedChildCount = computed(
      () => props.node.nodes?.filter(item => item.checked).length,
    );

    const toggleExpanded = node => {
      props.node.expanded = props.node.nodes ? !props.node.expanded : false;
      nextTick(() => {
        emit('nodeExpanded', node, props.node.expanded);
      });
    };

    const handleClick = (node, passExpand) => {
      if (!passExpand && props.expandable && childCount.value) {
        toggleExpanded(node);
      }

      emit('nodeClick', { ...node });
    };

    const onNodeExpanded = (node, state) => {
      emit('nodeExpanded', node, state);
    };

    const onToggleCheckbox = node => {
      emit('toggleCheckbox', node);
    };

    const removedRow = node => {
      emit('deleteRow', node);
    };

    return {
      childCount,
      checkedChildCount,
      handleClick,
      onNodeExpanded,
      onToggleCheckbox,
      removedRow,
    };
  },
};
</script>

<style lang="scss">
.tree-list,
.tree-row {
  display: grid;
  margin: 0;
  padding: 0;
}

.tree-row {
  transform-style: preserve-3d;

  &-item {
    display: flex;
    align-items: center;
    position: relative;
    padding: 5px 10px;

    &:hover:before {
      content: "";
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

    .child-count {
      color: gray;
      margin-left: 6px;
    }

    .delete-icon {
      color: red;
      opacity: 0;
      display: flex;
      align-items: center;
      width: 16px;
      height: 16px;
    }

    &-icon-wrapper {
      width: 15px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }

  &-item:hover {
    .delete-icon {
      opacity: 1;
    }
  }

  &-txt {
    user-select: none;
  }
}
</style>
