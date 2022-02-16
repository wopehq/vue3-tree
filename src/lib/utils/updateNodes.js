const updateNodes = nodes => nodes.map(node => {
  if (!node.nodes?.length) {
    return { ...node, expanded: false };
  }

  node.nodes = updateNodes(node.nodes);

  const everyChecked = node.nodes.every(item => item.checked);
  const someChecked = node.nodes.some(item => item.checked);
  const anyDeterminate = node.nodes.some(item => item.indeterminate);

  node.checked = everyChecked;
  node.indeterminate = !everyChecked && (someChecked || anyDeterminate);

  return node;
});

export default updateNodes;
