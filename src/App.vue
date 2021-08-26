<template>
  <Tree :nodes="data" />
</template>

<script>
import { ref } from 'vue'
import Tree from './lib/index'

export default {
  components: {
    Tree,
  },
  setup() {
    const data = ref([
      {
        id: 1,
        label: 'Animal',
        nodes: [
          {
            id: 2,
            label: 'Dog',
          },
          {
            id: 3,
            label: 'Cat',
            nodes: [
              {
                id: 4,
                label: 'Egyptian Mau Cat',
              },
              {
                id: 5,
                label: 'Japanese Bobtail Cat',
              },
            ],
          },
        ],
      },
      {
        id: 6,
        label: 'People',
      },
    ])

    return {
      data,
    }
  },
}
</script>
