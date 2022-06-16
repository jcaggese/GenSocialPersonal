package com.genspark.gensocial.Services;

import com.genspark.gensocial.Entities.*;
import com.genspark.gensocial.Exceptions.NonUniqueUsernameException;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();
    User getUserByUsername(String username);
    void addUser(User user) throws Exception;
    User updateUser(User user);
    String deleteUserByUsername(User user);
    User addPost(String username, Post post);
}
