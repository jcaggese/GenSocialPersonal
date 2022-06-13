package org.genspark.gensocial.Service;

import org.genspark.gensocial.Entity.User;

import java.util.List;

public interface UserServiceInterface {

    List<User> getUsers();

    User getUser(int userId);

    User addUser(User user);

    User updateUser(User user);

    String deleteUser(int userId);
}
