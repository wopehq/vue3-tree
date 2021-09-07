function updateNodeById(nodes, id, newNode) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.id === id) {
      nodes[i] = { ...node, ...newNode };
    } else if (Array.isArray(node.nodes)) {
      nodes[i].nodes = updateNodeById(node.nodes, id, newNode);
    }
  }

  return nodes;
}

export default updateNodeById;
