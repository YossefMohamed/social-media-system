import React from "react";
import { Link } from "react-router-dom";

const Post: React.FC<{
  username: string;
  author_id: number;
  content: string;
}> = (props) => {
  return (
    <div className="ui post">
      <div className="ui header">
        <div className="ui author header dividing">
          <Link to={`/users./${props.author_id}`}>{props.username}</Link>
        </div>
      </div>
      <div className="ui content">{props.content}</div>
    </div>
  );
};

export default Post;
