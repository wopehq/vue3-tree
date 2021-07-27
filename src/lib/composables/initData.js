export default function initData(data) {
  const updateNodes = nodes => {
    nodes.forEach(node => {
      node.checked = false

      if (Array.isArray(node.nodes)) {
        updateNodes(node.nodes)
      }
    })

    return nodes
  }

  return updateNodes(data)
}
