package com.cameleon.chameleon.configuration.security;

import com.cameleon.chameleon.data.entity.User;
import com.cameleon.chameleon.data.repository.UserRepository;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class MyAuthenticationProvider implements org.springframework.security.authentication.AuthenticationProvider {
    /**
     * Can't be autowired (don't ask me why), so we declare it manually and pass
     * Maybe this can be explained because we instantiate MyAuthenticationProvider manually from
     */
    private UserRepository userRepository;

    public MyAuthenticationProvider(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {


        String mail = authentication.getName();
        String password = authentication.getCredentials().toString();

        System.out.println("Trying to authenticate with " + mail + " - " + password);

        String encryptedPassword = PasswordEncrypter.encryptPassword(password);
        if (encryptedPassword == null) return null;

        if (userRepository == null)
            System.out.println("I have not autowired, i'm a bad bitch");

        User user = userRepository.findByUsernameAndPassword(mail, encryptedPassword);
        if (user == null) return null;


        System.out.println("A user has been found : " + user.toString());

        List<GrantedAuthority> grantedAuthorityList = new ArrayList<>();

        // TODO authorities / status (client / teacher)
//        grantedAuthorityList.add(new SimpleGrantedAuthority(user.getStatus().getAuthorizations()));
        grantedAuthorityList.add(new SimpleGrantedAuthority("ROLE_ADMIN"));

        return new UsernamePasswordAuthenticationToken(user.getMail(), user.getPassword(), grantedAuthorityList);
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(UsernamePasswordAuthenticationToken.class);
    }
}
