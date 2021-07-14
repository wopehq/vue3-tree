<template>
  <div>
    <ul :style="{'gap': gap + 'px'}">
      <tree-row
        v-for="node in refNodes"
        :ref="'tree-row-' + node.id"
        :key="node.id"
        :node="node"
        :indent-size="indentSize"
        :gap="gap"
        :expand-row-by-default="refExpandRowByDefault"
        @emitNodeExpanded="onNodeExpanded"
        @emitCheckboxToggle="onCheckboxToggle"
      >
        <template #iconActive>
          <slot name="iconActive"></slot>
        </template>
        <template #iconInactive>
          <slot name="iconInactive"></slot>
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
  },
  emits: ['onNodeExpanded', 'onCheckboxToggle'],
  setup(props, { emit }) {
    const { searchTree } = useSearch()
    // TODO: the names below should be changed
    const refNodes = ref(props.nodes)
    const refExpandRowByDefault = ref(props.expandRowByDefault)

    watch(() => props.searchText, () => {
      if (props.searchText !== '') {
        refNodes.value = searchTree(props.nodes, props.searchText, props.props)
        if (props.expandAllRowsOnSearch) {
          refExpandRowByDefault.value = true
        }
      } else {
        refNodes.value = props.nodes
        refExpandRowByDefault.value = false
      }
    })

    const onNodeExpanded = (node, state) => {
      emit('onNodeExpanded', node, state)
    }

    const onCheckboxToggle = (node, state)=>{
      emit('onCheckboxToggle', node, state)
    }

    return {
      onNodeExpanded,
      refNodes,
      refExpandRowByDefault,
      onCheckboxToggle,
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
