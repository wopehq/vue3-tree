<template>
  <div class="tree">
    <ul :style="{'gap': gap + 'px'}" class="tree-list">
      <tree-row
        v-for="node in reactiveNodes"
        :ref="'tree-row-' + node.id"
        :key="node.id"
        :node="node"
        :use-checkbox="useCheckbox"
        :use-icon="useIcon"
        :indent-size="indentSize"
        :gap="gap"
        :expand-row-by-default="reactiveExpandRowByDefault"
        :row-hover-background="rowHoverBackground"
        :indeterminate-status="isIndeterminate.status"
        @emitNodeExpanded="onNodeExpanded"
        @emitOnUpdated="onDataUpdated"
        @emitCheckboxToggle="onCheckboxToggle"
      >
        <template #checkbox="{ toggleCheckbox, checked, indeterminateStatus }">
          <slot
            name="checkbox"
            :checked="checked"
            :toggleCheckbox="toggleCheckbox"
            :indeterminateStatus="indeterminateStatus"
          ></slot>
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
import { ref, watch, onMounted, reactive } from 'vue'
import TreeRow from './TreeRow.vue'
import initData from '../composables/initData'
import useSearch from '../composables/useSearch'
import updateData from '../composables/updateData'

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
    const reactiveNodes = ref(props.nodes)
    const reactiveExpandRowByDefault = ref(props.expandRowByDefault)
    const isIndeterminate = reactive({ status: false })
    onMounted(() => {
      reactiveNodes.value = initData(reactiveNodes.value)
    })


    const nodeArray = (selector, parent=document) => {
      return [].slice.call(parent.querySelectorAll(selector))
    }

    //	checkboxes of interest

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

    const onCheckboxToggle = (context, event) => {
      reactiveNodes.value = updateData(reactiveNodes.value, context)

      let check = event.target
      const allThings = nodeArray('input')

      if (allThings.indexOf(check) === -1) return

      const children = nodeArray('input', check.parentNode.parentNode)
      children.forEach(child => child.checked = check.checked)

      while (check) {
        const parent = (check.parentNode.parentNode.closest(['ul']).parentNode).querySelector('input')

        if (!parent.parentNode.parentNode.querySelector(['ul'])) {
          check = false
          return
        }
        const siblings = nodeArray('input', parent.parentNode.parentNode.querySelector(['ul']))

        const checkStatus = siblings.map(check => check.checked)
        const every = checkStatus.every(Boolean)
        const some = checkStatus.some(Boolean)

        parent.checked = every
        parent.indeterminate = !every && every !== some

        check = check != parent ? parent : 0

        isIndeterminate.status = parent.indeterminate
      }
      emit('onCheckboxToggle', context)
    }

    const onDataUpdated = () => {
      emit('onDataUpdated', props.nodes)
    }

    return {
      onNodeExpanded,
      reactiveNodes,
      reactiveExpandRowByDefault,
      onCheckboxToggle,
      onDataUpdated,
      isIndeterminate,
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
