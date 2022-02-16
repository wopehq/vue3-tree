export default function expandNodeWithChilds(node) {
  if (!node) return;

  if (node.nodes) node.nodes.forEach(expandNodeWithChilds);
  node.expanded = true;
}
