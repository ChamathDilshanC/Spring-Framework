package org.example.springwithjwt.service;


import org.example.springwithjwt.dto.UserDTO;


public interface UserService {
    int saveUser(UserDTO userDTO);
    UserDTO searchUser(String username);
}