package org.genspark.gensocial.Controller;

import org.genspark.gensocial.Entity.User;
import org.genspark.gensocial.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MediaController {
    @Autowired
    private UserService uServ;

    @GetMapping("/users")
    public List<User> getUsers(){return uServ.getUsers(); }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable(value="id") String id) {return uServ.getUser(Integer.parseInt(id)); }

    @PutMapping("/users")
    public User putUser(@RequestBody User user) {return uServ.addUser(user); }

    @PostMapping("/users")
    public User postUser(@RequestBody User user) {return uServ.updateUser(user); }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable(value="id") String id){return uServ.deleteUser(Integer.parseInt(id)); }
}
