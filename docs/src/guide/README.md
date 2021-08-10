# Introduction

vue3-tree is a nested tree structure used for Vue 3.

  - Single and multiple selection option with nested options support
  - Search by nested structure
  - Adding customizable icons

# Getting Started

to install via npm

```sh
npm install vue3-tree
```

This example shows how to integrate vue3-tree into Vue3 components.

```vue
<template>
  <Tree
    :nodes="data"
    :search-text="searchText"
    @onNodeExpanded="onNodeExpanded"
    @onCheckboxToggle="onCheckboxToggle"
    @onDataUpdated="onDataUpdated"
    @onToggleParentCheckbox="onToggleParentCheckbox"
  />
</template>

<script>
import { ref } from 'vue'
import Tree from './lib/index'

export default {
  components: {
    Tree,
  },
  setup() {
    const data = ref([{
      id: '1',
      label: 'a',
      nodes: [{
        id: '4',
        label: 'aa',
      }, {
        id: '5',
        label: 'ab',
      }],
    }, {
      id: '2',
      label: 'b',
      nodes: [{
        id: '6',
        label: 'ba',
        nodes: [{
          id: '11',
          label: 'aaaa',
          nodes: [{
            id: '15',
            label: 'aaaa',
          },{
            id: '16',
            label: 'bbbb',
          }],
        },{
          id: '12',
          label: 'bbbb',
        }],
      },{
        id: '7',
        label: 'bb',
        nodes: [{
          id: '13',
          label: 'cccc',
        },{
          id: '14',
          label: 'dddd',
        }],
      }],
    }, {
      id: '3',
      label: 'c',
    }])

    const onNodeExpanded = (node, state) => {
      // console.log('state: ', state)
      // console.log('node: ', node)
    }

    const onCheckboxToggle = (node, state) => {
      // console.log('checkbox state: ', state)
      // console.log('checkbox node: ', node)
    }

    const onToggleParentCheckbox = (node, state) => {
      // console.log('parent checkbox state: ', state)
      // console.log('parent checkbox node: ', node)
    }

    const onDataUpdated = updatedData => {
      document.querySelector('#codeBlock').innerText =
      prettier.format(JSON.stringify(updatedData), {
        parser: 'babel',
        plugins: [parserBabel],
      })
    }

    return {
      data,
      onNodeExpanded,
      onCheckboxToggle,
      onToggleParentCheckbox,
      onDataUpdated,
    }
  },
}
</script>

```