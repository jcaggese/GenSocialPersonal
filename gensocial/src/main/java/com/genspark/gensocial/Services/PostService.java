package com.genspark.gensocial.Services;

import com.genspark.gensocial.Entities.Post;

import java.util.List;

public interface PostService {
    List<Post> getPosts();

    Post getPost(int postId);

    Post addPost(String username, Post post);

    Post updatePost(Post post);

    String deletePost(int postId);
}
