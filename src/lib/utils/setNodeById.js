const setNodeById = (nodes, id, newNode) => nodes.map(node => {
  if (node.id === id) {
    node = { id, ...newNode };
  } else if (Array.isArray(node.nodes)) {
    node.nodes = setNodeById(node.nodes, id, newNode);
  }

  return node;
});

export default setNodeById;
