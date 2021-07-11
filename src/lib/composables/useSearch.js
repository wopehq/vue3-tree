
export default function useSearch() {
  const searchTree = (nodes, searchKey, searchText) => {
    const getNodes = (result, node) => {
      if (node[searchKey].includes(searchText)) {
        result.push(node)
        return result
      }
      if (Array.isArray(node.nodes)) {
        const nodes = node.nodes.reduce(getNodes, [])
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