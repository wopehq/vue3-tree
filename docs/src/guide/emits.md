# Emits

You can access up-to-date data in the operations you perform for the tree with the `emit`'s we use in the package.

### `nodeExpanded`
When you click on an item, you can use the emit "nodeExpanded" if you want to see the current values of that item and the data below it. This way you will only be able to access the data for that item.

#### Usage

```vue
<template>
  <Tree
    :nodes="data"
    @nodeExpanded="onNodeExpanded"
  />
</template>

<script>
import { ref } from "vue";
import Tree from "vue3-tree";
import "vue3-tree/dist/style.css";

export default {
  components: {
    Tree,
  },
  setup() {
    const data = ref([
      {
        id: 1,
        label: "Animal",
        .
        .
        .
    ]);
    const onNodeExpanded = (node, state) => {
      console.log("state: ", state);
      console.log("node: ", node);
    };

    return {
      data,
      onNodeExpanded,
    };
  },
};
</script>
```

### `update`
Returns the current data of the tree when a data is deleted or a checkbox is clicked in the tree.

#### Usage

```vue
<template>
  <Tree
    :nodes="data"
    @update="onUpdate"
  />
</template>

<script>
import { ref } from "vue";
import Tree from "vue3-tree";
import "vue3-tree/dist/style.css";

export default {
  components: {
    Tree,
  },
  setup() {
    const data = ref([
      {
        id: 1,
        label: "Animal",
        .
        .
        .
    ]);
    const onUpdate = (nodes) => {
      console.log("nodes: ", nodes);
    };

    return {
      data,
      onUpdate,
    };
  },
};
</script>
```