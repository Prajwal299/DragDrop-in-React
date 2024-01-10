package com.list.drager.ListDragger.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.list.drager.ListDragger.Entity.Users;
import com.list.drager.ListDragger.Repo.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public Users createUser(Users user) {

		return userRepository.save(user);
	}

	public Users getUserById(Long id) {
		return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
	}

	public Users updateUser(Long id, Users updatedUser) {
		Users user = getUserById(id);
		user.setUsername(updatedUser.getUsername());
		user.setPassword(updatedUser.getPassword());
		user.setEmail(updatedUser.getEmail());
		user.setAdmin(updatedUser.isAdmin());
		return userRepository.save(user);
	}

	public void deleteUser(Long id) {
		Users user = getUserById(id);
		// Perform any necessary validation or business logic
		userRepository.delete(user);
	}

	public List<Users> getAllUsers() {
		return userRepository.findAll();
	}
}
