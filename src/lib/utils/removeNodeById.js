function removeNodeById(nodes, id) {
  if (!Array.isArray(nodes)) return;

  let newNodes = [...nodes];

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (node.id === id) {
      newNodes = newNodes.filter(item => item.id !== id);
    } else if (node.nodes) {
      node.nodes = removeNodeById(node.nodes, id);

      if (!node.nodes.length) delete node.nodes;
    }
  }

  return newNodes;
}

export default removeNodeById;
