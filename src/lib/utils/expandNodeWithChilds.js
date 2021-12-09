export default function expandNodeWithChild(node) {
  if (!node) return;
  node.expanded = true;

  if (node.nodes) node.nodes.forEach(expandNodeWithChild);
}
