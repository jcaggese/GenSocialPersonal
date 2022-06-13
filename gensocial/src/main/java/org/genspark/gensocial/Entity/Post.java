package org.genspark.gensocial.Entity;

import java.time.LocalDateTime;

public class Post {
    private int id;
    private String text;
    private LocalDateTime time;

    public Post(String text) {
        this.text = text;
        time = LocalDateTime.now();
    }
}
