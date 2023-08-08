import React, { useState } from 'react';
import axios from 'axios';

const NewGroupForm = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/groups', {
        group_name: groupName,
        group_description: groupDescription,
      });

      setGroupName('');
      setGroupDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Group Name:
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </label>
      <label>
        Group Description:
        <input
          type="text"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
        />
      </label>
      <button type="submit">Create Group</button>
    </form>
  );
};

export default NewGroupForm;