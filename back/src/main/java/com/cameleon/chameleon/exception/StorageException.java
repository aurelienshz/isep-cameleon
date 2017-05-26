package com.cameleon.chameleon.exception;

public class StorageException extends RuntimeException {
    public StorageException(String s) {
    }

    public StorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
