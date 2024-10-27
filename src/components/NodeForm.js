import React, { useState } from 'react';

const NodeForm = ({ addNode, initialTitle = '', isEdit = false }) => {
  const [title, setTitle] = useState(initialTitle);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addNode(title);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginLeft: 20 }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New node title"
      />
      <button type="submit" style={{ marginLeft: 5 }}>
        {isEdit ? 'Save' : 'Add Node'}
      </button>
    </form>
  );
};

export default NodeForm;
