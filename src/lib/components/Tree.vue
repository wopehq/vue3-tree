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
        :indent-size="indentSize"
        :gap="gap"
        :expand-row-by-default="reactiveExpandRowByDefault"
        :row-hover-background="rowHoverBackground"
        :setNode="setNode"
        :getNode="getNode"
        :updateNode="updateNode"
        @emitNodeExpanded="onNodeExpanded"
        @emitOnUpdated="onDataUpdated"
        @emitCheckboxToggle="onCheckboxToggle"
      >
        <template #checkbox="{ toggleCheckbox, checked, indeterminate }">
          <slot
            name="checkbox"
            :checked="checked"
            :indeterminate="indeterminate"
            :toggleCheckbox="toggleCheckbox"
          />
        </template>
        <template v-if="useIcon" #iconActive>
          <slot name="iconActive"></slot>
        </template>
        <template v-if="useIcon" #iconInactive>
          <slot name="iconInactive"></slot>
        </template>
      </tree-row>
    </ul>
  </div>
</template>

<script>
import { ref, watch, reactive } from 'vue'
import TreeRow from './TreeRow.vue'
import initData from '../composables/initData'
import useSearch from '../composables/useSearch'
import { setNodeById, getNodeById, updateNodeById, updateNodes } from '../utils'

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
        }
      },
    },
    indentSize: {
      type: Number,
      default: 10,
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
    rowHoverBackground: {
      type: String,
      default: '#e0e0e0',
    },
  },
  emits: ['onNodeExpanded', 'onCheckboxToggle', 'onDataUpdated'],
  setup(props, { emit }) {
    const { searchTree } = useSearch()
    const state = reactive({ data: initData(props.nodes)})
    const reactiveExpandRowByDefault = ref(props.expandRowByDefault)

    const setNode = (id, node) => {
      state.data.value = setNodeById(state.data, id, node)
    }

    const getNode = (id) => {
      return getNodeById(state.data, id)
    }

    const updateNode = (id, data) => {
      state.data = updateNodes(updateNodeById(state.data, id, data))
    }


    watch(() => props.searchText, () => {
      if (props.searchText !== '') {
        state.data = searchTree(props.nodes, props.searchText, props.props)
        if (props.expandAllRowsOnSearch) {
          reactiveExpandRowByDefault.value = true
        }
      } else {
        state.data = props.nodes
        reactiveExpandRowByDefault.value = false
      }
    })

    const onNodeExpanded = (node, state) => {
      emit('onNodeExpanded', node, state)
    }

    const onCheckboxToggle = (context, event) => {
      emit('onCheckboxToggle', context)
    }

    const onDataUpdated = () => {
      emit('onDataUpdated', props.nodes)
    }

    return {
      setNode,
      getNode,
      updateNode,
      onNodeExpanded,
      state,
      reactiveExpandRowByDefault,
      onCheckboxToggle,
      onDataUpdated,
    }
  },
}
</script>

<style lang="scss" scoped>
.tree {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.tree-list {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
