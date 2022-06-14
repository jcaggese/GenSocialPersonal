package com.genspark.gensocial.Services;

import com.genspark.gensocial.Entities.*;
import com.genspark.gensocial.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public User getUserById(int id) {
        Optional<User> user = this.userRepository.findById(id);
        User temp = null;

        if(user.isPresent()){
            temp = user.get();
        }
        else{
            throw new RuntimeException("User by the ID of " + id + " cannot be found.");
        }
        return temp;
    }

    @Override
    public User addUser(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {

        return this.userRepository.save(user);
    }

    @Override
    public String deleteUserById(int id) {

        this.userRepository.deleteById(id);
        return "User by the ID of " + id + " has been successfully deleted...";
    }
}
