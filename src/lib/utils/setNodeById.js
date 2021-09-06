function setNodeById(nodes, id, newNode) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.id === id) {
      nodes[i] = { id, ...newNode };
    } else if (Array.isArray(node.nodes)) {
      nodes[i].nodes = setNodeById(node.nodes, id, newNode);
    }
  }

  return nodes;
}

export default setNodeById;
