import updateChildNodeStatus from './updateChildNodeStatus';

const updateNodeById = (nodes, id, newNode) => nodes.map(node => {
  let currentNode = node;

  if (currentNode.id === id) {
    currentNode = updateChildNodeStatus({ ...node, ...newNode });
  } else if (Array.isArray(currentNode.nodes)) {
    currentNode.nodes = updateNodeById(node.nodes, id, newNode);
  }

  return currentNode;
});

export default updateNodeById;
