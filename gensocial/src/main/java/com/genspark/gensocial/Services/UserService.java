package com.genspark.gensocial.Services;

import com.genspark.gensocial.Entities.*;
import com.genspark.gensocial.Exceptions.NonUniqueUsernameException;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();
    User getUserById(int userId);
    void addUser(User user) throws Exception;
    User updateUser(User user);
    String deleteUserById(int id);
    User addPost(int id, Post post);
}
