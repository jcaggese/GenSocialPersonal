package com.genspark.gensocial.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.BAD_REQUEST, reason = "That email has already been registered")
public class NonUniqueEmailException extends Exception{
    public NonUniqueEmailException(String t){
        super(t);
    }
}
