package com.genspark.gensocial.Services;

import com.genspark.gensocial.Entities.*;
import com.genspark.gensocial.Exceptions.NonUniqueEmailException;
import com.genspark.gensocial.Exceptions.NonUniqueUsernameException;
import com.genspark.gensocial.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;

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

        if (user.isPresent()) {
            temp = user.get();
        } else {
            throw new RuntimeException("User by the ID of " + id + " cannot be found.");
        }
        return temp;
    }

    @Override
    public void addUser(User user) throws Exception {
        AtomicBoolean valid = new AtomicBoolean(true);
        List<String> usernames = userRepository.findByUsername(user.getUsername()).stream().map(User::getUsername).toList();
        List<String> emails = userRepository.findByEmail(user.getEmail()).stream().map(User::getEmail).toList();

        for(String s: usernames){
            if(s.matches(user.getUsername())){
                valid.set(false);
                throw new NonUniqueUsernameException("The username you have requested has already been created: " + user.getUsername());
            }
        }

        for(String s: emails){
            if(s.matches(user.getEmail())){
                valid.set(false);
                throw new NonUniqueEmailException("The email you have entered has already been used " + user.getEmail());
            }
        }

        if(valid.get()){
            System.out.println("Valid is true");
            this.userRepository.save(user);
        }
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

    public void handleException() {

    }
}
