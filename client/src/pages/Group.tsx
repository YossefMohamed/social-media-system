import React from 'react';

const Group = ({ group }) => {
  return (
    <div>
      <h2>{group.group_name}</h2>
      <p>{group.group_description}</p>
    </div>
  );
};

export default Group;