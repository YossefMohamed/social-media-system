import React from "react";

const Post = () => {
  return (
    <div className="ui card post-card">
      <div className="content">
        <div className="header">Cute Dog</div>
        <div className="meta">2 days ago</div>
        <div className="description">
          <p>
            Cute dogs come in a variety of shapes and sizes. Some cute dogs are
            cute for their adorable faces, others for their tiny stature, and
            even others for their massive size.
          </p>
          <p>
            Many people also have their own barometers for what makes a cute
            dog.
          </p>
        </div>
      </div>
      <div className="extra content">
        <span className="left floated like">
          <i className="like icon" />
          Like
        </span>
        <span className="right floated star">
          <i className="star icon" />
          Favorite
        </span>
      </div>
    </div>
  );
};

export default Post;
