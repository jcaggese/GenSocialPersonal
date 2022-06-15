package com.genspark.gensocial.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.I_AM_A_TEAPOT, reason = "Username has already been taken")
public class NonUniqueUsernameException extends RuntimeException{
    public NonUniqueUsernameException(String t){
        super(t);
    }
}
