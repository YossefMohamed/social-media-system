import React, { useState } from "react";
import { useCeatePost } from "../api-hooks/useCreatePost";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PostForm() {
  const [content, setContent] = useState("");

  const {
    isLoading,
    mutate: createPost,
    isSuccess,
    isError,
    error,
  } = useCeatePost();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Post created successful!");
      navigate("/");
    }
    isError && toast.error(error);
  }, [isSuccess, isError, navigate, error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPost(content);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="ui form login-form">
        <h1>New Post</h1>
        <div className="field">
          <label>post content</label>
          <input
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          className="ui button"
          type="submit"
          disabled={!!isLoading || !content}
        >
          {isLoading ? "Loading.." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default PostForm;
