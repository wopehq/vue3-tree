const setNodeById = (nodes, id, newNode) => nodes.map(node => {
  let currentNode = node;

  if (node.id === id) {
    currentNode = { id, ...newNode };
  } else if (Array.isArray(node.nodes)) {
    currentNode.nodes = setNodeById(node.nodes, id, newNode);
  }

  return currentNode;
});

export default setNodeById;
