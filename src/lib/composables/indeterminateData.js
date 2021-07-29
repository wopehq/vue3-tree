export default function indeterminateData(data, indeterminate) {

  const anyNodesChecked = nodes => {
    const checkStatus = nodes.map(check => check.checked)
    const every = checkStatus.every(Boolean)
    const some = checkStatus.some(Boolean)

    nodes.forEach(node => {
      if (node.id === indeterminate.id) {
        if (node?.nodes) {
          node.checked = every
          node.indeterminate = !every && every !== some

          console.log('~ child node.id', node, node.indeterminate)
        }

        const handleRecursive = _nodes => {
          _nodes.forEach(_node => {
            _node.indeterminate = node.checked ? false : true

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
        anyNodesChecked(node.nodes)
      }
    })

    return nodes
  }

  return anyNodesChecked(data)
}


