function getNodeById(nodes, id) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.id === id) {
      return node;
    } else if (Array.isArray(node.nodes)) {
      const currentNode = getNodeById(node.nodes, id);
      if (currentNode) {
        return currentNode;
      }
    }
  }
}

export default getNodeById;
