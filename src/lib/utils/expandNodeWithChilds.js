export default function expandNodeWithChilds(node) {
  if (!node) return;
  node.expanded = true;

  if (node.nodes) node.nodes.forEach(expandNodeWithChilds);
}
