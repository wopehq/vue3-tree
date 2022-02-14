const updateNodes = nodes => nodes.map(node => {
  if (!node.nodes?.length) {
    return { ...node, expanded: false };
  }

  node.nodes = updateNodes(node.nodes);

  const everyChecked = node.nodes.every(item => item.checked);
  const someChecked = node.nodes.some(item => item.checked);
  const anyDeterminate = node.nodes.some(item => item.indeterminate);

  if (everyChecked) {
    node.checked = true;
    node.indeterminate = false;
  } else if (someChecked) {
    node.checked = false;
    node.indeterminate = true;
  } else if (anyDeterminate) {
    node.checked = false;
    node.indeterminate = true;
  } else if (!everyChecked) {
    node.checked = false;
    node.indeterminate = false;
  }

  return node;
});

export default updateNodes;
