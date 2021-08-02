export default function updateData(data, context) {
  const { id, checked } = context

  const updateNodes = nodes => {
    nodes.forEach(node => {
      if (node.id === id) {
        node.checked = checked

        const handleRecursive = _nodes => {
          _nodes.forEach(_node => {
            _node.checked = node.checked ? true : false

            if (Array.isArray(_node.nodes)) {
              handleRecursive(_node.nodes)
            }
          })
        }

        if (node.nodes) {
          handleRecursive(node.nodes)
        }
      }

      if (Array.isArray(node.nodes)) {
        updateNodes(node.nodes)
      }
    })

    return nodes
  }

  return updateNodes(data)
}
