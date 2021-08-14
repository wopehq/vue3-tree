# Props
Customize your tree structure using scenes.

| Props      | Description | Default |
| :---        |    ----   | :----: |
| nodes    | If there is more than one tree under the tree structure, these trees are defined in the nodes array.|required: true|
| depth   | In cases where trees are formed in the tree designed according to the nested structure, this value increases one at a time and is used to calculate the left padding.|+1|
| indentSize  |When nested trees are opened, it determines how many pixels should be opened from left to right.|10|
| gap |You can activate the spacing feature used in CSS with pixels, using the number format to indicate the spacing between trees.|10|
| expandRowByDefault |If a node has more than one node in the structure you created in the data, you can expand the row by activating this feature.|false|
| expandAllRowsOnSearch | Use this scene when we want to search all data while searching input.|true|

## Example

```js
nodes: {
  type: Array,
  required: true,
},
```
```js
indentSize: {
  type: Number,
  default: 10,
},
```
```js
gap: {
  type: Number,
  default: 10,
},
```
```js
expandRowByDefault: {
  type: Boolean,
  default: false,
  },
```
```js
expandAllRowsOnSearch: {
  type: Boolean,
  default: true,
},
```