"use client";

import { useEffect, useState } from "react";
import { Contract } from "ethers";
import { getBlockchainProvider } from "../utils/web3";
import Link from "next/link";

import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../utils/contract-config";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { provider } = await getBlockchainProvider();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const count = await contract.getPostCount();
      console.log('count', count);
      
      const postsArray = [];
      for (let i = 1; i <= count; i++) {
        const post = await contract.posts(i);
        postsArray.push(post);
      }
      setPosts(postsArray);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Social Platform</h1>
      {posts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <a>
            <h2>{post.content}</h2>
            <p>Likes: {post.likes}</p>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Home;
