package com.genspark.gensocial.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import static java.lang.Integer.parseInt;


@Entity
@Table(name="tbl_users")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private int id;
    private String username;
    @Column(nullable=false)
    private String email;
    @Column(nullable=false)
    private String password;
    @Column(nullable=false)
    private String salt;
    @Column
    private String friends;
    @OneToMany(mappedBy="user")
    @JsonIgnoreProperties("user")
    private List<Post> posts;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.friends = "";
    }

    public User() {

    }

    public String getFriends() {
        return friends;
    }

    public void setFriend(int id) {
        if(this.friends == null){
            this.friends = (String.valueOf(id));
        }
        else {
            this.friends = this.friends.concat("," + id);
        }
    }

    public void removeFriend(int id){
        List<String> friendsList = new LinkedList<>(Arrays.asList(friends.split(",")));
        friendsList.removeIf(s -> s.matches(String.valueOf(id)));
        System.out.println(friendsList);
        if(friendsList.size() == 0){
            friends = null;
        }
        else {
            for (String s : friendsList) {
                friends = s;
            }
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String newUsername) {
        this.username = newUsername;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String newEmail) {
        this.email = newEmail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String newPassword) {
        this.password = newPassword;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public void addPost(Post post) {
        posts.add(post);
    }

    public void removePost(Post post) {
        posts.remove(post);
    }

    public List<Post> getPosts() {
        return posts;
    }

    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }
}
