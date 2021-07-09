<template>
  <Tree 
    :data="data"
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
      children: [{
        id: '4',
        label: 'aa'
      }, {
        id: '5',
        label: 'ab'
      }]
    }, {
      id: '2',
      label: 'b',
      children: [{
        id: '6',
        label: 'ba'
      },{
        id: '7',
        label: 'bb'
      }]
    }, {
      id: '3',
      label: 'c'
    }])

    return{
      data
    }
  }
}
</script>

<style>

</style>
