<template>
  <div>
    <ul :style="{'gap': gap + 'px'}">
      <tree-row
        v-for="node in reactiveNodes"
        :ref="'tree-row-' + node.id"
        :key="node.id"
        :node="node"
        :indent-size="indentSize"
        :gap="gap"
        :expand-row-by-default="reactiveExpandRowByDefault"
        @emitNodeExpanded="onNodeExpanded"
        @emitOnUpdated="onDataUpdated"
        @emitCheckboxToggle="onCheckboxToggle"
        @emitToggleParentCheckbox="onToggleParentCheckbox"
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
import { ref, watch, onMounted } from 'vue'
import TreeRow from './TreeRow.vue'
import initData from '../composables/initData'
import useSearch from '../composables/useSearch'
import updateData from '../composables/updateData'
import indeterminateData from '../composables/indeterminateData'

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
  emits: ['onNodeExpanded', 'onCheckboxToggle', 'onDataUpdated', 'onToggleParentCheckbox'],
  setup(props, { emit }) {
    const { searchTree } = useSearch()
    // TODO: the names below should be changed
    const reactiveNodes = ref(props.nodes)
    const reactiveExpandRowByDefault = ref(props.expandRowByDefault)

    onMounted(() => {
      reactiveNodes.value = initData(reactiveNodes.value)
    })

    watch(() => props.searchText, () => {
      if (props.searchText !== '') {
        reactiveNodes.value = searchTree(props.nodes, props.searchText, props.props)
        if (props.expandAllRowsOnSearch) {
          reactiveExpandRowByDefault.value = true
        }
      } else {
        reactiveNodes.value = props.nodes
        reactiveExpandRowByDefault.value = false
      }
    })

    const onNodeExpanded = (node, state) => {
      emit('onNodeExpanded', node, state)
    }

    const onCheckboxToggle = context => {
      reactiveNodes.value = updateData(reactiveNodes.value, context)
      emit('onCheckboxToggle', context)
    }

    const onDataUpdated = () => {
      emit('onDataUpdated', props.nodes)
    }

    const onToggleParentCheckbox = indeterminate => {
      reactiveNodes.value = indeterminateData(reactiveNodes.value, indeterminate)
      emit('onToggleParentCheckbox', indeterminate)
    }

    return {
      onNodeExpanded,
      reactiveNodes,
      reactiveExpandRowByDefault,
      onCheckboxToggle,
      onDataUpdated,
      onToggleParentCheckbox,
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
