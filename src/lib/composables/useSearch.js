export default function useSearch() {
  const search = (nodes, searchText) => {
    const getNodes = (result, node) => {
      if (node.label.toLowerCase().includes(searchText.toLowerCase())) {
        result.push(node);
        return result;
      }
      if (Array.isArray(node.nodes)) {
        const nodes = node.nodes.reduce(getNodes, []);
        if (nodes.length) result.push({ ...node, nodes });
      }
      return result;
    };

    return nodes.reduce(getNodes, []);
  };

  return {
    search,
  };
}
