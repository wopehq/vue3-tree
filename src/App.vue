<template>
  <input
    v-model="searchText"
    type="text"
  >
  <Tree 
    :nodes="data"
    :search-text="searchText"
    @onNodeExpanded="onNodeExpanded"
  />
</template>

<script>
import { ref } from 'vue'
import Tree from './lib/index'

export default {
  components: {
    Tree
  },
  setup(){
    const data = ref([{
      id: '1',
      label: 'a',
      nodes: [{
        id: '4',
        label: 'aa'
      }, {
        id: '5',
        label: 'ab'
      }]
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
            label: 'aaaa'
          },{
            id: '16',
            label: 'bbbb'
          }]
        },{
          id: '12',
          label: 'bbbb'
        }]
      },{
        id: '7',
        label: 'bb',
        nodes: [{
          id: '13',
          label: 'cccc'
        },{
          id: '14',
          label: 'dddd'
        }]
      }]
    }, {
      id: '3',
      label: 'c'
    }])
    const searchText = ref('')

    const onNodeExpanded = (node, state) => {
      console.log('state: ', state)
      console.log('node: ', node)
    }

    return {
      data,
      searchText,
      onNodeExpanded
    }
  }
}
</script>
