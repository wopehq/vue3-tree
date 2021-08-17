# Props

### `nodes`

**type:** Array

**required:** `true`

**description:** An array of nodes to show. Available properties of a node object:

| Key                                 |       Type       | Description                                                                           |
| ----------------------------------- | :--------------: | ------------------------------------------------------------------------------------- |
| id <small>**(required)**</small>    | number \| string | Used to identify the node within the tree. Its value must be unique in a nodes array. |
| label <small>**(required)**</small> |      string      | Used to display the option.                                                           |
| nodes                               |      Array       | Array of node objects.                                                                |

### `indentSize`

**type:** number

**default:** `10`

**description:** Indent size in pixels of tree nodes.

### `gap`

**type:** number

**default:** `10`

**description:** Vertical space between tree nodes.
