import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Group = ({ groupId }) => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {
      const res = await axios.get(`http://localhost:5000/api/groups/${groupId}`);
      setGroup(res.data);
      setLoading(false);
    };

    fetchGroup();
  }, [groupId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{group.group_name}</h2>
      <p>{group.group_description}</p>
    </div>
  );
};

export default Group;