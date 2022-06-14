package com.genspark.gensocial.Services;

import com.genspark.gensocial.Entities.*;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();
    User getUserById(int userId);
    User addUser(User user);
    User updateUser(User user);
    String deleteUserById(int id);
}
