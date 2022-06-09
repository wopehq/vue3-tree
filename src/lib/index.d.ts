import { AllowedComponentProps, ComponentCustomProps, VNode, VNodeProps } from "vue";

/**
 * Available properties of a node object.
 */
export interface TreeNode {
  /**
   * Used to identify the node within the tree. Its value must be unique in a nodes array.
   */
  id: number | string;
  /**
   * Used to display the option.
   */
  label: string;
  /**
   * Determines whether the node is selected.
   */
  checked?: boolean;
  /**
   * Determines whether the node is expanded.
   */
  expanded?: boolean;
  /**
   * Array of node objects.
   */
  nodes?: TreeNode[];
  /**
   * Determines whether the node is hidden.
   */
  hidden?: boolean;
}

export interface TreeProps {
  /**
   * An array of nodes to show.
   */
  nodes: TreeNode[];
  /**
   * Indent size in pixels of tree nodes.
   * @default 10
   */
  indentSize?: number;
  /**
   * Vertical space between tree nodes.
   * @default 10
   */
  gap?: number;
  /**
   * The background style to apply on hover state.
   * @default '#e0e0e0'
   */
  rowHoverBackground: string;
  /**
   * Checkbox availability state.
   * @default false
   */
  useCheckbox?: boolean;
  /**
   * Icon status used for parent nodes according to their extensibility state.
   * @default true
   */
  useIcon?: boolean;
  /**
   * It is used in cases where the ability to delete items in the tree will be added.
   * @default false
   */
  useRowDelete?: boolean;
  /**
   * Value used to display the number of child items below the parent item.
   * @default false
   */
  showChildCount?: boolean;
  /**
   * Determines the extensibility of the items in the tree.
   * @default true
   */
  expandable?: boolean;
  /**
   * Filters tree by a given word.
   * @default ''
   */
  searchText?: string;
  /**
   * This emit is triggered when a node is clicked or selected.
   */
  onNodeClick(node: TreeNode): void;
  /**
   * When you click on an item, you can use the emit "nodeExpanded" if you want to see the current values of that item and the data below it. This way you will only be able to access the data for that item.
   */
  onNodeExpanded(node: TreeNode, state: boolean): void;
  /**
   * Returns the current data of the tree when a data is deleted or a checkbox is clicked in the tree. If you are considering to use @update:nodes for only updating data, you can also use v-model:nodes
   */
  'onUpdate:nodes'(nodes: TreeNode[]): void;
}

export interface ChildCountSlotScope {
  count: number;
  checkedCount: number;
  childs: TreeNode[];
}

export interface CheckboxSlotScope {
  id: TreeNode['id'];
  checked: TreeNode['checked'];
  node: TreeNode;
  indeterminate: boolean;
  toggleCheckbox(): void;
}

declare const Tree: new () => {
  $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & TreeProps;
  $slots: {
    default: () => VNode[],
    iconActive: () => VNode[],
    iconInactive: () => VNode[],
    deleteIcon: () => VNode[],
    checkbox: (arg: CheckboxSlotScope) => VNode[],
    childCount: (arg: ChildCountSlotScope) => VNode[],
  }
};

export declare function getNodeById(nodes: TreeNode[], id: TreeNode['id']): void;
export declare function setNodeById(nodes: TreeNode[], id: TreeNode['id'], node: TreeNode): void;
export declare function setNodeById(nodes: TreeNode[], id: TreeNode['id'], node: TreeNode): void;

export default Tree;
