package org.genspark.gensocial.Service;

import org.genspark.gensocial.DAO.UserDAO;
import org.genspark.gensocial.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserServiceInterface {
    @Autowired
    private UserDAO users;

    @Override
    public List<User> getUsers() {
        return users.findAll();
    }

    @Override
    public User getUser(int userId) {
        return users.findById(userId)
                .orElseThrow(()->new RuntimeException());
    }

    @Override
    public User addUser(User user) {
        return users.save(user);
    }

    @Override
    public User updateUser(User user) {
        return users.save(user);
    }

    @Override
    public String deleteUser(int userId) {
        users.deleteById(userId);
        return "User deleted.";
    }
}
