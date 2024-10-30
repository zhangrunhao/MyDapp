// SocialPlatform.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocialPlatform {
    struct Post {
        uint id;
        address author;
        string content;
        uint likes;
    }

    struct Comment {
        uint postId;
        address commenter;
        string content;
    }

    mapping(uint => Post) public posts;
    mapping(uint => Comment[]) public comments;

    uint public postCount = 0;

    function createPost(string memory _content) public {
        postCount++;
        posts[postCount] = Post(postCount, msg.sender, _content, 0);
    }

    function getPostCount() view public returns(uint) {
        return postCount;
    }

    function likePost(uint _postId) public {
        posts[_postId].likes++;
    }

    function commentOnPost(uint _postId, string memory _content) public {
        comments[_postId].push(Comment(_postId, msg.sender, _content));
    }
}
