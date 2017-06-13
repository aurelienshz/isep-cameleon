package com.cameleon.chameleon.service;

import com.cameleon.chameleon.data.dto.LDAPUserDTO;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LDAPServiceTest {
    @Autowired
    private LDAPService ldapService;

    @Test
    @Ignore
    public void testLdapLogin() {
        String user = "aschiltz";
        String password = "";
        LDAPUserDTO aschiltz = ldapService.retrieveUser(user, password);

        System.out.println(aschiltz);
    }
}
