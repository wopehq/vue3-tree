# Slots

Slots are a feature that we recursively add to the tree structure. We added 2 icons by default based on tree open or closed status. If you want to customize it, it is enough to put your own icons instead of these slots.

## Example

Basic status of slots

```vue
<template #iconActive>
	<slot name="iconActive"></slot>
</template>
<template #iconInactive>
	<slot name="iconInactive"></slot>
</template>
```

Customized slot example

```vue
<template #iconActive>
	<slot name="iconActive">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-corner-down-right"
		>
			<polyline points="15 10 20 15 15 20" />
			<path d="M4 4v7a4 4 0 0 0 4 4h12" />
		</svg>
	</slot>
</template>
<template #iconInactive>
	<slot name="iconInactive">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="feather feather-corner-left-down"
		>
			<polyline points="14 15 9 20 4 15" />
			<path d="M20 4h-7a4 4 0 0 0-4 4v12" />
		</svg>
	</slot>
</template>
```
