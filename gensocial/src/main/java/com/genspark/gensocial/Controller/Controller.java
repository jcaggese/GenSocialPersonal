package com.genspark.gensocial.Controller;

import com.genspark.gensocial.Entities.*;
import com.genspark.gensocial.Services.*;
import com.genspark.gensocial.Entities.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {

    @Autowired
    private UserService userService;
    @Autowired
    private PostService pServ;

    @GetMapping("/")
    public String homePage(){
        return "<HTML><H1>Welcome to the User Access Homepage</H1></HTML>";
    }

    @GetMapping("/users")
    public List<User> getUsers(){
        return this.userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable int id) {
        return this.userService.getUserById(id);
    }
    @PostMapping("/users")
    public void addUser(@RequestBody String info) throws Exception {
        User user = new User();
        System.out.println(info);
        user.setUsername(info.substring(13, info.indexOf("\",\"email")));
        user.setEmail(info.substring(info.indexOf("\",\"email\":\"") + 11 , info.indexOf("\",\"pass")));
        user.setPassword(info.substring(info.indexOf("\",\"pass\":\"") + 11, info.indexOf("\"}")));
        this.userService.addUser(user);
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User order){
        return this.userService.updateUser(order);
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable int id){
        return this.userService.deleteUserById(id);
    }

    //Post API
    @GetMapping("/posts")
    public List<Post> getPosts(){return pServ.getPosts(); }

    @GetMapping("/posts/{id}")
    public Post getPost(@PathVariable(value="id") String id){return pServ.getPost(Integer.parseInt(id)); }

    @PostMapping("/posts/{userId}")
    public Post putPost(@PathVariable(value="userId")String userId, @RequestBody Post post) {
        return pServ.addPost(Integer.parseInt(userId), post); }

    @PutMapping("/posts")
    public Post putPost(@RequestBody Post post) {
        return pServ.updatePost(post); }

    @DeleteMapping("/posts/{id}")
    public String deletePost(@PathVariable(value="id")String id) {return pServ.deletePost(Integer.parseInt(id)); }
}
