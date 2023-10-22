function updateChildNodeStatus(node, checkedStatus) {
  const checked = checkedStatus ?? node.checked;

  node.checked = checked;

  if (node && Array.isArray(node.nodes)) {
    node.nodes = node.nodes.map(item => {
      return updateChildNodeStatus(item, checked)
    });
  } else {
    delete node.nodes;
  }

  return node;
}

export default updateChildNodeStatus;
