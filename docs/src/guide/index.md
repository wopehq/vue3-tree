# Getting Started

## Installation

Install the `vue3-tree` package:

```sh
npm install vue3-tree
```

or

```sh
yarn add vue3-tree
```

## Quick Start

After installiation, you need to **import** it in the component and define it in the **template** as shown below. If you want to see your own data in the tree structure, you can define your **data** here by adhering to certain parameters in the data.
```vue
<template>
  <Tree :nodes="data" />
</template>

<script>
import { ref } from "vue";
import Tree from "vue3-tree";

export default {
  components: {
    Tree,
  },
  setup() {
    const data = ref([
      {
        id: 1,
        label: "Animal",
        nodes: [
          {
            id: 2,
            label: "Dog",
          },
          {
            id: 3,
            label: "Cat",
            nodes: [
              {
                id: 4,
                label: "Egyptian Mau Cat",
              },
              {
                id: 5,
                label: "Japanese Bobtail Cat",
              },
            ],
          },
        ],
      },
      {
        id: 6,
        label: "People",
      },
    ]);

    return {
      data,
    };
  },
};
</script>

```
