package com.genspark.gensocial.Services;

import com.genspark.gensocial.Entities.User;
import com.genspark.gensocial.Repositories.PostRepository;
import com.genspark.gensocial.Entities.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostServiceImplementation implements PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserService uServ;

    @Override
    public List<Post> getPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post getPost(int postId) {
        return postRepository.findById(postId).orElseThrow(RuntimeException::new);
    }

    @Override
    public Post addPost(String username, Post post) {
        User user = uServ.addPost(username, post);
        post.setUser(user);

        return postRepository.save(post);
    }

    @Override
    public Post updatePost(Post post) {
        return postRepository.save(post);
    }

    @Override
    public String deletePost(int postId) {
        postRepository.deleteById(postId);
        return "Post deleted";
    }
}
