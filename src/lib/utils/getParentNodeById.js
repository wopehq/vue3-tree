function getParentNodeById(nodes, id) {
  if (!Array.isArray(nodes)) return;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (node.nodes) {
      const isFound = node.nodes.find(item => item.id === id);

      if (isFound) return node;
      return getParentNodeById(node.nodes, id);
    }
  }

  return null;
}
