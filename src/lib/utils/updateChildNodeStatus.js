function updateChildNodeStatus(node, checkedStatus) {
  const checked = checkedStatus ?? node.checked;

  node.checked = checked;

  if (node && Array.isArray(node.nodes)) {
    node.nodes = node.nodes.map(item => {
      const currentNode = {
        ...item,
        checked,
      };

      if (item.nodes) {
        currentNode.nodes.map(childNode => updateChildNodeStatus(childNode, checked));
      } else {
        delete currentNode.nodes;
      }

      return currentNode;
    });
  }

  return node;
}

export default updateChildNodeStatus;
