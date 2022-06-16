package com.genspark.gensocial.Controller;

import com.genspark.gensocial.Entities.*;
import com.genspark.gensocial.Exceptions.UserNotFoundException;
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

    @PostMapping("/users/")
    public User getUserByUsername(@RequestBody String info) {
        System.out.println(info);
        String username = info.substring(info.indexOf("e\":\"") + 4, info.indexOf("\"}"));
        System.out.println(username);
        User user = this.userService.getUserByUsername(username);
        System.out.println(user);

        if(user == null){
            throw new UserNotFoundException("User not found");
        }

        return user;
    }
    @PostMapping("/users")
    public void addUser(@RequestBody String info) throws Exception {
        User user = new User();
        System.out.println(info);
        user.setUsername(info.substring(13, info.indexOf("\",\"email")));
        user.setEmail(info.substring(info.indexOf("\",\"email\":\"") + 11 , info.indexOf("\",\"pass")));
        user.setPassword(info.substring(info.indexOf("\",\"pass\":\"") + 11, info.indexOf("\",\"salt")));
        user.setSalt(info.substring(info.indexOf("salt") + 7, info.indexOf("\"}")));
        this.userService.addUser(user);
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody String info) {
        String usernameSubstring;
        User user = null;
        System.out.println(info);

        if (info.substring(2, 7).matches("email")) {
            usernameSubstring = info.substring(info.indexOf("e\":\"") + 4, info.indexOf("\"}"));
            user = userService.getUserByUsername(usernameSubstring);
            user.setEmail(info.substring(10, info.indexOf("\",\"")));
        }

        if (info.substring(2, 10).matches("username")) {
            String newUsernameSubstring = info.substring(info.indexOf("update") + 9, info.indexOf("\"}"));
            usernameSubstring = info.substring(info.indexOf("e\":\"") + 4, info.indexOf("\",\""));
            user = userService.getUserByUsername(usernameSubstring);
            user.setUsername(newUsernameSubstring);
        }

        return this.userService.updateUser(user);
    }

    @DeleteMapping("/users")
    public String deleteUser(@RequestBody String info){
        System.out.println(info);
        User user = userService.getUserByUsername(info.substring(info.indexOf("e\":\"") + 4, info.indexOf("\"}")));
        return this.userService.deleteUserByUsername(user);
    }

    //Post API
    @GetMapping("/posts")
    public List<Post> getPosts(){return pServ.getPosts(); }

    @GetMapping("/posts/{id}")
    public Post getPost(@PathVariable(value="id") String id){return pServ.getPost(Integer.parseInt(id)); }

    @PostMapping("/posts/{userId}")
    public Post putPost(@PathVariable(value="userId")String username, @RequestBody Post post) {
        return pServ.addPost(username, post); }

    @PutMapping("/posts")
    public Post putPost(@RequestBody Post post) {
        return pServ.updatePost(post); }

    @DeleteMapping("/posts/{id}")
    public String deletePost(@PathVariable(value="id")String id) {return pServ.deletePost(Integer.parseInt(id)); }
}
