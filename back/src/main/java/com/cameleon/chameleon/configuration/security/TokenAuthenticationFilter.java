package com.cameleon.chameleon.configuration.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class TokenAuthenticationFilter extends OncePerRequestFilter {

    private final String TOKEN_HEADER = "Authorization";
    private final String TOKEN_HEADER_PREFIX = "Bearer ";

    @Autowired
    private UserDetailsService userDetailsService;

    private String getToken(HttpServletRequest req) {
        String authHeader = req.getHeader(TOKEN_HEADER);
        if (authHeader != null && authHeader.startsWith(TOKEN_HEADER_PREFIX)) {
            return authHeader.substring(TOKEN_HEADER_PREFIX.length());
        }
        return null;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException {
        String authToken = getToken(req);

        if (authToken != null) {
            // Get user
            UserDetails userDetails = userDetailsService.loadUserByUsername(authToken);
            if (userDetails != null) {
                // Create authentication object
                TokenBasedAuthentication authentication = new TokenBasedAuthentication(userDetails);

                authentication.setToken(authToken);
                authentication.setAuthenticated(true);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }


        chain.doFilter(req, res);
    }
}
