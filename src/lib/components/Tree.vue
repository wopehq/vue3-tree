<template>
  <div class="tree">
    <ul class="tree-list" :style="{ gap: `${gap}px` }">
      <tree-row
        v-for="node in filteredData"
        :key="node.id"
        :ref="`tree-row-${node.id}`"
        :node="node"
        :use-checkbox="useCheckbox"
        :use-icon="useIcon"
        :use-row-delete="useRowDelete"
        :show-child-count="showChildCount"
        :indent-size="indentSize"
        :gap="gap"
        :row-hover-background="rowHoverBackground"
        :set-node="setNode"
        :get-node="getNode"
        :update-node="updateNode"
        :expandable="expandable"
        @delete-row="onDeleteRow"
        @node-click="onNodeClick"
        @node-expanded="onNodeExpanded"
        @toggle-checkbox="onToggleCheckbox"
      >
        <template #checkbox="{ node: slotNode, checked, indeterminate }">
          <slot
            name="checkbox"
            :node="slotNode"
            :checked="checked"
            :indeterminate="indeterminate"
            :toggle-checkbox="() => onToggleCheckbox(slotNode)"
          />
        </template>
        <template v-if="useIcon" #iconActive>
          <slot name="iconActive" />
        </template>
        <template v-if="useIcon" #iconInactive>
          <slot name="iconInactive" />
        </template>
        <template v-if="useRowDelete" #deleteIcon>
          <slot name="deleteIcon" />
        </template>
        <template
          v-if="showChildCount"
          #childCount="{ count, checkedCount, childs }"
        >
          <slot
            name="childCount"
            :count="count"
            :checked-count="checkedCount"
            :childs="childs"
          />
        </template>
      </tree-row>
    </ul>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import TreeRow from './TreeRow.vue';
import initNodes from '../utils/initNodes';
import searchNodes from '../utils/searchNodes';
import {
  setNodeById,
  getNodeById,
  updateNodeById,
  updateNodes,
  removeNodeById,
  expandNodeWithChilds,
} from '../utils';

export default {
  name: 'Tree',
  components: {
    TreeRow,
  },
  props: {
    nodes: {
      type: Array,
      required: true,
    },
    props: {
      type: Object,
      default() {
        return {
          nodes: 'nodes',
          label: 'label',
        };
      },
    },
    indentSize: {
      type: Number,
      default: 24,
    },
    gap: {
      type: Number,
      default: 10,
    },
    searchText: {
      type: String,
      default: '',
    },
    expandRowByDefault: {
      type: Boolean,
      default: false,
    },
    expandAllRowsOnSearch: {
      type: Boolean,
      default: true,
    },
    useCheckbox: {
      type: Boolean,
      default: false,
    },
    useIcon: {
      type: Boolean,
      default: true,
    },
    useRowDelete: {
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
  emits: ['nodeClick', 'nodeExpanded', 'checkboxToggle', 'update:nodes'],
  setup(props, { emit }) {
    onMounted(() => emit('update:nodes', initNodes(props.nodes)));

    const filteredData = computed(() => {
      let newData = props.nodes;

      if (props.searchText) {
        newData = searchNodes(props.nodes, props.searchText);

        if (props.expandAllRowsOnSearch) {
          newData.forEach(expandNodeWithChilds);
        }
      }

      return updateNodes(newData);
    });

    const getNode = id => getNodeById(props.nodes, id);

    const setNode = (id, node) => {
      emit('update:nodes', setNodeById(props.nodes, id, node));
    };

    const updateNode = (id, data) => {
      emit('update:nodes', updateNodes(updateNodeById(props.nodes, id, data)));
    };

    const onToggleCheckbox = node => {
      const checked = !node.checked;
      updateNode(node.id, { checked });
      emit('nodeClick', { ...node, checked });
    };

    const onNodeClick = node => {
      emit('nodeClick', node);
    };

    const onNodeExpanded = (node, state) => {
      emit('nodeExpanded', node, state);
    };

    const onUpdate = () => {
      emit('update:nodes', props.nodes);
    };

    const onDeleteRow = node => {
      removeNodeById(props.nodes, node.id);
      emit('update:nodes', updateNodes(removeNodeById(props.nodes, node.id)));
    };

    return {
      setNode,
      getNode,
      updateNode,
      onNodeClick,
      onNodeExpanded,
      onUpdate,
      onToggleCheckbox,
      onDeleteRow,
      filteredData,
    };
  },
};
</script>

<style lang="scss" scoped>
.tree {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.tree-list {
  margin: 0;
  padding: 0;
  overflow: hidden;

  .tree-row {
    padding-left: 0px !important;
  }
}
</style>
