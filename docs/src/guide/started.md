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
  />
</template>

<script>
import { ref } from 'vue'
import Tree from 'vue3-tree'

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

    return {
      data,
    }
  },
}
</script>
```
