const searchNodes = (nodes, searchText) => {
  const getNodes = (result, node) => {
    const isMatched = node.label.toLowerCase().includes(searchText.toLowerCase());

    if (isMatched) {
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

export default searchNodes;
