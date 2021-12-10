import updateNodes from '../utils/updateNodes';

export default function initData(data, parentNode) {
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
      newNode.nodes = initData(newNode.nodes, newNode);
    }

    return newNode;
  });

  return updateNodes(newData);
}
