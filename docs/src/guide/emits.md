# Emits

You can access up-to-date data in the operations you perform for the tree with the `emit`'s we use in the package.

### `nodeClick`

This emit is triggered when a node is clicked or selected.

#### Usage

```vue
<Tree :nodes="data" @nodeClick="onNodeClick" />
```

```js
const onNodeClick = (node) => {
  console.log(node);
};
```

### `nodeExpanded`

When you click on an item, you can use the emit "nodeExpanded" if you want to see the current values of that item and the data below it. This way you will only be able to access the data for that item.

#### Usage

```vue
<Tree :nodes="data" @nodeExpanded="onNodeExpanded" />
```

```js
const onNodeExpanded = (node, state) => {
  console.log('node: ', node);
  console.log('state: ', state);
};
```

### `update:nodes`

Returns the current data of the tree when a data is deleted or a checkbox is clicked in the tree.
If you are considering to use `@update:nodes` for only updating data, you can also use `v-model:nodes`

#### Usage

```vue
<Tree :nodes="data" @update:nodes="onUpdate" />
```

```js
const onUpdate = (nodes) => {
  console.log('nodes: ', nodes);
};
```
