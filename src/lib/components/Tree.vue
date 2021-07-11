<template>
  <div>
    <ul>
      <tree-row
        v-for="node in _nodes"
        :ref="'tree-row-' + node.id"
        :key="node.id"
        :node="node"
        :indent-size="indentSize"
        :expand-row-by-default="_expandRowByDefault"
        @emitNodeExpanded="onNodeExpanded"
      >
        <template #iconActive>
          <slot name="iconActive" />
        </template>
        <template #iconInactive>
          <slot name="iconInactive" />
        </template>
      </tree-row>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import TreeRow from './TreeRow.vue'
import useSearch from '../composables/useSearch'

export default {
  name: 'Tree',
  components: {
    TreeRow
  },
  props: {
    nodes: {
      type: Array,
      required: true
    },
    props: {
      type: Object,
      default() {
        return {
          nodes: 'nodes',
          label: 'label'
        }
      }
    },
    indentSize: {
      type: Number,
      default: 10
    },
    searchText: {
      type: String,
      default: ''
    },
    expandRowByDefault: {
      type: Boolean,
      default: false
    },
    expandAllRowsOnSearch: {
      type: Boolean,
      default: true
    }
  },
  emits: ['onNodeExpanded'],
  setup(props, { emit }) {
    const { searchTree } = useSearch()
    const _nodes = ref(props.nodes)
    const _expandRowByDefault = ref(props.expandRowByDefault)

    watch(() => props.searchText, () => {
      if (props.searchText !== '') {
        _nodes.value = searchTree(props.nodes, props.searchText, props.props)
        if (props.expandAllRowsOnSearch) {
          _expandRowByDefault.value = true
        }
      } else {
        _nodes.value = props.nodes
        _expandRowByDefault.value = false
      }
    })

    const onNodeExpanded = (node, state) => {
      emit('onNodeExpanded', node, state)
    }

    return {
      onNodeExpanded,
      _nodes,
      _expandRowByDefault
    }
  }
}
</script>

<style lang="scss" scoped>
li, ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
