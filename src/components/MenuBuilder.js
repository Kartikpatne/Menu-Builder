import React, { useState } from 'react';
import Node from './Node';
import NodeForm from './NodeForm';

const MenuBuilder = () => {
  const [nodes, setNodes] = useState([
    {
      id: 1,
      title: 'Category 1',
      children: [
        {
          id: 2,
          title: 'Subcategory 1.1',
          children: [{ id: 3, title: 'spam', children: [] }],
        },
        {
          id: 4,
          title: 'Subcategory 1.2',
          children: [],
        },
      ],
    },
    {
      id: 5,
      title: 'Category 2',
      children: [
        {
          id: 6,
          title: 'Subcategory 2.1',
          children: [],
        },
      ],
    },
  ]);

  const addNode = (parentId, title) => {
    const newNode = { id: Date.now(), title, children: [] };
    
    const addNodeRecursively = (nodeList) => {
      return nodeList.map((node) => {
        if (node.id === parentId) {
          return { ...node, children: [...node.children, newNode] };
        }
        return { ...node, children: addNodeRecursively(node.children) };
      });
    };
    
    setNodes(addNodeRecursively(nodes));
  };

  const editNode = (nodeId, newTitle) => {
    const editNodeRecursively = (nodeList) => {
      return nodeList.map((node) => {
        if (node.id === nodeId) {
          return { ...node, title: newTitle };
        }
        return { ...node, children: editNodeRecursively(node.children) };
      });
    };

    setNodes(editNodeRecursively(nodes));
  };

  const deleteNode = (nodeId) => {
    const deleteNodeRecursively = (nodeList) => {
      return nodeList
        .map((node) => ({
          ...node,
          children: deleteNodeRecursively(node.children),
        }))
        .filter((node) => node.id !== nodeId);
    };

    setNodes(deleteNodeRecursively(nodes));
  };

  return (
    <div>
      <NodeForm addNode={(title) => addNode(null, title)} />
      {nodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          addNode={addNode}
          editNode={editNode}
          deleteNode={deleteNode}
        />
      ))}
    </div>
  );
};

export default MenuBuilder;
