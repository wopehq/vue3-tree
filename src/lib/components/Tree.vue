<template>
  <div>
    <div
      v-for="(tag, index) in data"
      :key="tag.id"
      @click.stop="tag.children ? updateActiveItems(index) : ''"
    >
      <div>
        <div class="tree-item">
          <div
            v-if="tag.children"
            class="tree-icon"
          >
            <arrow-icon name="triangle-right" />
          </div>
          <div>
            {{ tag.label }}
          </div>
        </div>
        <tree
          v-if="activeItems.includes(index) && tag.children"
          :data="tag.children"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ArrowIcon from './Icon.vue'

export default {
  name: 'Tree',
  components:{
    ArrowIcon
  },
  props:{
    data: {
      type: Array,
      required: true
    }
  },
  setup() {
    const activeItems = ref([])

    const updateActiveItems = (index) => {
      if (activeItems.value.includes(index)) {
        activeItems.value = activeItems.value.filter((e) => e !== index)
      } else {
        activeItems.value.push(index)
      }
    }

    return {
      activeItems,
      updateActiveItems
    }
  }
}
</script>

<style lang="scss" scoped>
.tree {
  &-item {
    align-items: center;
    cursor: auto;
    display: flex;
    user-select: none;
  }
}

</style>
