package com.genspark.gensocial.Controller;

import com.genspark.gensocial.Entities.*;
import com.genspark.gensocial.Exceptions.UserNotFoundException;
import com.genspark.gensocial.Services.*;
import com.genspark.gensocial.Entities.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

@RestController
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
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

    @PostMapping("/users/delete")
    @CrossOrigin(origins = "http://localhost:3000")
    public User deleteFriend(@RequestBody String info){
        System.out.println("delete method accessed");
        System.out.println(info);
        String friend = info.substring(11, info.indexOf("\",\"username"));
        System.out.println(friend);
        String usernameSubstring = info.substring(info.indexOf("e\":\"") + 4, info.indexOf("\"}"));
        User user = null;
        // See if the friend we want to add has an account
        try {
            // Look for friend's account in database
            User friendUser = userService.getUserByUsername(friend);
            int friendId = Stream.of(userService.getUserByUsername(friend)).map(User::getId).max(Integer::compare).get();
            System.out.println(friendId);
            user = userService.getUserByUsername(usernameSubstring);
            System.out.println("user.getFriends before remove" + user.getFriends());
            user.removeFriend(friendId);
            System.out.println("user.getFriends after remove" + user.getFriends());
        }
        catch(UserNotFoundException ex){
            System.out.println(ex.getMessage());
        }

        return this.userService.updateUser(user);
    }

    @PostMapping("/users")
    public void addUser(@RequestBody String info) throws Exception {
        User user = new User();
        System.out.println(info);
        user.setUsername(info.substring(13, info.indexOf("\",\"email")));
        user.setEmail(info.substring(info.indexOf("\",\"email\":\"") + 11 , info.indexOf("\",\"pass")));
        user.setPassword(info.substring(info.indexOf("\",\"pass\":\"") + 10, info.indexOf("\",\"salt")));
        user.setSalt(info.substring(info.indexOf("salt") + 7, info.indexOf("\"}")));
        System.out.println(user.getPassword());
        this.userService.addUser(user);
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody String info) {
        String usernameSubstring = info.substring(info.indexOf("e\":\"") + 4, info.indexOf("\"}"));
        User user = null;
        System.out.println(info);

        // Updating the email
        if (info.substring(2, 7).matches("email")) {
            user = userService.getUserByUsername(usernameSubstring);
            user.setEmail(info.substring(10, info.indexOf("\",\"")));
        }
        // Updating the username
        if (info.substring(2, 10).matches("username")) {
            String newUsernameSubstring = info.substring(info.indexOf("update") + 9, info.indexOf("\"}"));
            String userSubstring = info.substring(info.indexOf("e\":\"") + 4, info.indexOf("\",\""));
            user = userService.getUserByUsername(userSubstring);
            user.setUsername(newUsernameSubstring);
        }
        // Adding friends
        if(info.substring(2,8).matches("friend")){
            String friend = info.substring(11, info.indexOf("\",\"username"));
            // See if the friend we want to add has an account
            try {
                // Look for friend's account in database
                User friendUser = userService.getUserByUsername(friend);
                int friendId = Stream.of(userService.getUserByUsername(friend)).map(User::getId).max(Integer::compare).get();
                user = userService.getUserByUsername(usernameSubstring);
                user.setFriend(friendId);
            }
            catch(UserNotFoundException ex){
                System.out.println(ex.getMessage());
            }
        }

        // Updating the password
        if(info.substring(2,10).matches("password")){
            usernameSubstring = info.substring(info.indexOf("username") + 11, info.indexOf("\",\"salt"));
            System.out.println("usernamesubstring in update password: " + usernameSubstring);
            String password = info.substring(13, info.indexOf("\",\"username"));
            System.out.println(password);
            String salt = info.substring(info.indexOf("salt") + 7, info.indexOf("\"}"));
            System.out.println(salt);
            user = userService.getUserByUsername(usernameSubstring);
            System.out.println("Previous password: " + user.getPassword());
            user.setPassword(password);
            System.out.println("New Password: " + user.getPassword());
            System.out.println("Previous Salt: " + user.getSalt());
            user.setSalt(salt);
            System.out.println("New Salt: " + user.getSalt());
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
    public Post addPost(@PathVariable(value="userId")String username, @RequestBody Post post) {
        return pServ.addPost(username, post); }

    @PutMapping("/posts")
    public Post updatePostText(@RequestBody String info) {
        System.out.println(info);
        LocalDateTime time = LocalDateTime.now();

        String text = info.substring(info.indexOf(":\"") + 2, info.indexOf("\",\""));
        String postId = info.substring(info.indexOf("Id") + 4, info.indexOf("}"));
        Post temp = pServ.getPost(Integer.parseInt(postId));
        temp.setText(text);
        temp.setTime(time);
        return pServ.updatePost(temp);
    }

    @DeleteMapping("/posts/{id}")
    public String deletePost(@PathVariable(value="id")String id) {return pServ.deletePost(Integer.parseInt(id)); }
}
