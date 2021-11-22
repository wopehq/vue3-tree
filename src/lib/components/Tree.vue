<template>
  <div class="tree">
    <ul :style="{'gap': gap + 'px'}" class="tree-list">
      <tree-row
        v-for="node in state.data"
        :ref="'tree-row-' + node.id"
        :key="node.id"
        :node="node"
        :use-checkbox="useCheckbox"
        :use-icon="useIcon"
        :use-row-delete="useRowDelete"
        :indent-size="indentSize"
        :gap="gap"
        :expand-row-by-default="reactiveExpandRowByDefault"
        :row-hover-background="rowHoverBackground"
        :set-node="setNode"
        :get-node="getNode"
        :update-node="updateNode"
        :expandable="expandable"
        @delete-row="onDeleteRow"
        @node-expanded="onNodeExpanded"
        @checkbox-toggle="onCheckboxToggle"
      >
        <template #checkbox="{ id, checked, indeterminate }">
          <slot
            name="checkbox"
            :checked="checked"
            :indeterminate="indeterminate"
            :toggleCheckbox="() => toggleCheckbox(id)"
          />
        </template>
        <template v-if="useIcon" #iconActive>
          <slot name="iconActive" />
        </template>
        <template v-if="useIcon" #iconInactive>
          <slot name="iconInactive" />
        </template>
        <template v-if="useRowDelete" #closeIcon>
          <slot name="closeIcon" />
        </template>
      </tree-row>
    </ul>
  </div>
</template>

<script>
import { ref, watch, reactive } from 'vue';
import TreeRow from './TreeRow.vue';
import initData from '../composables/initData';
import useSearch from '../composables/useSearch';
import { setNodeById, getNodeById, updateNodeById, updateNodes, removeNodeById } from '../utils';

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
    useIcon:{
      type: Boolean,
      default: true,
    },
    useRowDelete:{
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
  emits: ['nodeExpanded', 'checkboxToggle', 'update'],
  setup(props, { emit }) {
    const { search } = useSearch();
    const state = reactive({ data: initData(props.nodes) });
    const reactiveExpandRowByDefault = ref(props.expandRowByDefault);

    const setNode = (id, node) => {
      state.data.value = setNodeById(state.data, id, node);
    };

    const getNode = id => {
      return getNodeById(state.data, id);
    };

    const updateNode = (id, data) => {
      state.data = updateNodes(updateNodeById(state.data, id, data));
    };

    const toggleCheckbox = id => {
      const { checked } = getNode(id);
      updateNode(id, { checked: !checked });
    };

    watch(()=> state.data, ()=>{
      emit('update', state.data);
    });

    watch(() => props.searchText, () => {
      let newData = state.data;
      if (props.searchText !== '') {
        newData = search(props.nodes, props.searchText, props.props);
        if (props.expandAllRowsOnSearch) {
          reactiveExpandRowByDefault.value = true;
        }
      } else {
        newData = props.nodes;
        reactiveExpandRowByDefault.value = false;
      }
      state.data = updateNodes(newData);
    });

    const onNodeExpanded = (node, state) => {
      emit('nodeExpanded', node, state);
    };

    const onCheckboxToggle = context => {
      emit('checkboxToggle', context);
    };

    const onUpdate = () => {
      emit('update', state.data);
    };

    const onDeleteRow = node => {
      removeNodeById(state.data, node.id);
      state.data = updateNodes(removeNodeById(state.data, node.id));
    };

    return {
      setNode,
      getNode,
      updateNode,
      onNodeExpanded,
      state,
      reactiveExpandRowByDefault,
      onCheckboxToggle,
      onUpdate,
      toggleCheckbox,
      onDeleteRow,
    };
  },
};
</script>

<style lang="scss" scoped>
.tree {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.tree-list {
  margin: 0;
  padding: 0;
  overflow: hidden;

  .tree-row{
    padding-left: 0px !important;
  }
}
</style>
