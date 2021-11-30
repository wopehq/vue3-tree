# Slots

Slots are a feature that we recursively add to the tree structure. 
- We added 
  - 2 icons by default based on tree open or closed status.
  - 1 slot according to the deletion process.
  - 1 slot to customize the checkbox.
  - 1 slot to customize the child count.

If you want to customize it, it is enough to put your own icons instead of these slots.

## Example

### Expanded Icon
```vue
<template #iconActive>
  <custom-active-icon />
</template>
```
```vue
<template #iconInactive>
  <custom-inactive-icon />
</template>
```

### Delete Icon
```vue
<template #deleteIcon>
  <custom-delete-icon />
</template>
```
### Checkbox
```vue
<template #checkbox="{ id, checked, indeterminate, toggleCheckbox }">
  <checkbox
    name="checkbox"
    class="custom-checkbox"
    :checked="checked"
    :indeterminate="indeterminate"
    @click="toggleCheckbox"
  />
</template>
```

### Child Count
```vue
<template #childCount="{ count, checkedCount, childs }">
  <div class="custom-child-count">
    {{`${checkedCount}/${count}`}}
  </div>
</template>
```