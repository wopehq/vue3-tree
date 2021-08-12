# Introduction

* vue3-tree is a nested tree structure used for Vue 3.

  - Single and multiple selection option with nested options support
  - Search by nested structure
  - Adding customizable icons

## Getting Started

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

## Props
Customize your tree structure using scenes.

| Props      | Description | Default |
| :---        |    ----   | :----: |
| nodes    | If there is more than one tree under the tree structure, these trees are defined in the nodes array.|required: true|
| depth   | In cases where trees are formed in the tree designed according to the nested structure, this value increases one at a time and is used to calculate the left padding.|+1|
| indentSize  |When nested trees are opened, it determines how many pixels should be opened from left to right.|10|
| gap |You can activate the spacing feature used in CSS with pixels, using the number format to indicate the spacing between trees.|10|
| expandRowByDefault |If a node has more than one node in the structure you created in the data, you can expand the row by activating this feature.|false|
| expandAllRowsOnSearch | Use this scene when we want to search all data while searching input.|true|

### Props Example

```js
nodes: {
  type: Array,
  required: true,
},
```
```js
indentSize: {
  type: Number,
  default: 10,
},
```
```js
gap: {
  type: Number,
  default: 10,
},
```
```js
expandRowByDefault: {
  type: Boolean,
  default: false,
  },
```
```js
expandAllRowsOnSearch: {
  type: Boolean,
  default: true,
},
```
## Slots
Slots are a feature that we recursively add to the tree structure. We added 2 icons by default based on tree open or closed status. If you want to customize it, it is enough to put your own icons instead of these slots.

### Slots Example
```vue
<template #iconActive>
  <slot name="iconActive"></slot>
</template>
<template #iconInactive>
  <slot name="iconInactive"></slot>
</template>
```

```vue
<template #iconActive>
  <slot name="iconActive">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-corner-down-right"
      ><polyline points="15 10 20 15 15 20" /><path d="M4 4v7a4 4 0 0 0 4 4h12" /></svg>
  </slot>
</template>
<template #iconInactive>
  <slot name="iconInactive">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-corner-left-down"
    ><polyline points="14 15 9 20 4 15" /><path d="M20 4h-7a4 4 0 0 0-4 4v12" /></svg>
  </slot>
</template>
```