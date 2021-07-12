export default function useSearch() {
  const searchTree = (nodes, searchText, props) => {
    const getNodes = (result, node) => {
      if (node[props.label].includes(searchText)) {
        result.push(node)
        return result
      }
      if (Array.isArray(node[props.nodes])) {
        const nodes = node[props.nodes].reduce(getNodes, [])
        if (nodes.length) result.push({ ...node, nodes })
      }
      return result
    }

    return nodes.reduce(getNodes, [])
  }

  return {
    searchTree
  }
}