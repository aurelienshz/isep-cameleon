package com.cameleon.chameleon.configuration.security;

import com.cameleon.chameleon.data.entity.User;
import org.bouncycastle.jcajce.provider.digest.SHA3;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class PasswordEncrypter {
    public static void encryptPassword(User user) {
        String password = user.getPassword();
        String encryptedPassword = encryptPassword(password);
        user.setPassword(encryptedPassword);
    }

    public static String encryptPassword(String password) {

        System.out.println("Encrypting the password \"" + password + "\"");

        SHA3.DigestSHA3 sha3Password = new SHA3.DigestSHA3(512);
        try {
            sha3Password.update(password.getBytes("UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return null;
        }

        byte[] digestPassword = sha3Password.digest();
        String encryptedPassword = "";
        for (byte d : digestPassword) {
            encryptedPassword += d;
        }

        System.out.println("Password Encrypted : \"" + encryptedPassword + "\"");
        return encryptedPassword;
    }
}
