"use client";

import { useCallback, useEffect, useState } from "react";
import { getBlockchain } from "../utils/web3";
import Link from "next/link";

const usePostsList = () => {
  const [posts, setPosts] = useState([]);
  const fetch = useCallback(async () => {
    const { contractProvider } = await getBlockchain();
    const count = await contractProvider.postCount();
    const postsArray = [];
    for (let i = 1; i <= count; i++) {
      const post = await contractProvider.posts(i);
      postsArray.push(post);
    }
    setPosts(postsArray);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    posts,
    fetch,
  };
};

const Home = () => {
  const [content, setContent] = useState("");
  const { posts } = usePostsList();

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const { contractSigner } = await getBlockchain();
    try {
      const transaction = await contractSigner.createPost(content);
      await transaction.wait(); // 等待交易确认
      setContent(""); // 清空输入框
      fetch();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  return (
    <div>
      <h1 className="text-3x1">Social Platform</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <div>{post.content}</div>
          </Link>
          <div>{post.likes}</div>
        </div>
      ))}

      <h1>发布内容</h1>
      <form onSubmit={handleCreatePost}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="输入帖子内容..."
          required
        />
        <button type="submit">发布帖子</button>
      </form>
    </div>
  );
};

export default Home;
