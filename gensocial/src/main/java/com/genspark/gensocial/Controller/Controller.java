package com.genspark.gensocial.Controller;

import com.genspark.gensocial.Entities.*;
import com.genspark.gensocial.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class Controller {

    @Autowired
    private UserService userService;

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
    public User addUser(@RequestBody User order){
        return this.userService.addUser(order);
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User order){
        return this.userService.updateUser(order);
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable int id){
        return this.userService.deleteUserById(id);
    }
}
