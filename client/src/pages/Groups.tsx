import React, { useEffect, useState } from "react";
import axios from "axios";
import Group from "../components/Group";

const Groups = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/groups");
        setGroups(res.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGroups();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {groups.map((group) => (
        <Group key={group.group_id} group={group} />
      ))}
    </div>
  );
};

export default Groups;