import React, { useState } from 'react';
import NodeForm from './NodeForm';

const Node = ({ node, addNode, editNode, deleteNode }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDelete = () => {
    deleteNode(node.id);
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <div>
        <span>{node.title}</span>
        <button onClick={handleEdit} style={{ marginLeft: 10 }}>✏️</button>
        <button onClick={handleDelete} style={{ marginLeft: 5 }}>🗑️</button>
      </div>
      {isEditing && (
        <NodeForm
          addNode={(title) => {
            editNode(node.id, title);
            setIsEditing(false);
          }}
          initialTitle={node.title}
          isEdit={true}
        />
      )}
      <NodeForm addNode={(title) => addNode(node.id, title)} />
      {node.children.map((child) => (
        <Node
          key={child.id}
          node={child}
          addNode={addNode}
          editNode={editNode}
          deleteNode={deleteNode}
        />
      ))}
    </div>
  );
};

export default Node;
