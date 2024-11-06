"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBlockchain } from "@/utils/web3";

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return; // Ensure id is available
      const { contractProvider } = await getBlockchain();
      const postDetails = await contractProvider.getPost(id); // 假设有一个获取帖子的函数
      setPost(postDetails);
      setLikes(parseFloat(postDetails.likes));
    };

    if (id) fetchPost();
  }, [id]);

  const handleLikePost = async () => {
    const { contractSigner } = await getBlockchain();
    try {
      const transaction = await contractSigner.likePost(id);
      await transaction.wait(); // 等待交易确认
      setLikes(likes + 1); // 增加点赞数量
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
      <p>点赞数: {likes}</p>
      <button onClick={handleLikePost}>点赞</button>
    </div>
  );
};

export default PostDetailPage;
