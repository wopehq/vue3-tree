# Emits

You can access up-to-date data in the operations you perform for the tree with the `emit`'s we use in the package.

### `nodeExpanded`
When you click on an item, you can use the emit "nodeExpanded" if you want to see the current values of that item and the data below it. This way you will only be able to access the data for that item.

#### Usage

```vue
<Tree
  :nodes="data"
  @nodeExpanded="onNodeExpanded"
/>
```
```js
const onNodeExpanded = (node, state) => {
  console.log("node: ", node);
  console.log("state: ", state);
};
```

### `update`
Returns the current data of the tree when a data is deleted or a checkbox is clicked in the tree.

#### Usage

```vue
<Tree
  :nodes="data"
  @update="onUpdate"
/>
```
```js
const onUpdate = (nodes) => {
  console.log("nodes: ", nodes);
};
```