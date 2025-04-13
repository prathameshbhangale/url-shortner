package com.urlShortner.shortner.servise;

import com.urlShortner.shortner.models.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;

    private Collection<? extends GrantedAuthority> authorities;
    private String username;
    private String password;
    private String email;
    private Long id;

    public UserDetailsImpl(
            Long id,String username,String password, String email,Collection<? extends GrantedAuthority> authorities
    ){
        this.id = id;
        this.username = username;
        this.password=password;
        this.email = email;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(User user) {
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());
        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getPassword(),   // ✅ password
                user.getEmail(),
                Collections.singletonList(authority)
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }
}
