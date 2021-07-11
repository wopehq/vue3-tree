<template>
  <Tree
    :nodes="data"
  >
    <template #iconActive>
      deneme
    </template>
    <template #iconInactive>
      deneme
    </template>
  </Tree>
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

    return {
      data,
    }
  },
}
</script>

<style>

</style>
