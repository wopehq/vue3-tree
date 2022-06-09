# Props

### `nodes`

**type:** Array

**required:** `true`

**description:** An array of nodes to show. Available properties of a node object:

| Key                                 |       Type       | Description                                                                           |
| ----------------------------------- | :--------------: | ------------------------------------------------------------------------------------- |
| id <small>**(required)**</small>    | number \| string | Used to identify the node within the tree. Its value must be unique in a nodes array. |
| label <small>**(required)**</small> |      string      | Used to display the option.                                                           |
| checked                             |      boolean     | Determines whether the node is selected.                                              |
| expanded                            |      boolean     | Determines whether the node is expanded.                                              |
| hidden                              |      boolean     | Determines whether the node is hidden.                                                                 |
| nodes                               |      Array       | Array of node objects.                                                                |

### `indentSize`

**type:** number

**default:** `10`

**description:** Indent size in pixels of tree nodes.

### `gap`

**type:** number

**default:** `10`

**description:** Vertical space between tree nodes.

### `rowHoverBackground`

**type:** string

**default:** `#e0e0e0`

**description:** The background style to apply on hover state.

### `useCheckbox`

**type:** boolean

**default:** `false`

**description:** Checkbox availability state.

### `useIcon`

**type:** boolean

**default:** `true`

**description:** Icon status used for parent nodes according to their extensibility state.

### `useRowDelete`

**type:** boolean

**default:** `false`

**description:** It is used in cases where the ability to delete items in the tree will be added.

### `showChildCount`

**type:** boolean

**default:** `false`

**description:** Value used to display the number of child items below the parent item.

### `expandable`

**type:** boolean

**default:** `true`

**description:** Determines the extensibility of the items in the tree.

### `searchText`

**type:** string

**default:** `""`

**description:** Filters tree by a given word.