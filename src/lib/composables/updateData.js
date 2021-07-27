export default function updateData(data, context) {
  const { id, checked } = context

  const updateNodes = nodes => {
    nodes.forEach(node => {
      if (node.id === id) {
        node.checked = checked
      }

      if (Array.isArray(node.nodes)) {
        updateNodes(node.nodes)
      }
    })

    return nodes
  }

  return updateNodes(data)
}
