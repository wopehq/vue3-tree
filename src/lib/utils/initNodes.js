import updateNodes from './updateNodes';

const initNodes = (data, parentNode) => {
  let newData = [...data];

  newData = newData.map(node => {
    const isCheckedParent = parentNode?.checked;

    let newNode = {
      checked: isCheckedParent ? true : false,
      expanded: false,
      indeterminate: false,
      ...node,
    };

    if (Array.isArray(newNode.nodes)) {
      newNode.nodes = initNodes(newNode.nodes, newNode);
    }

    return newNode;
  });

  return updateNodes(newData);
};

export default initNodes;
