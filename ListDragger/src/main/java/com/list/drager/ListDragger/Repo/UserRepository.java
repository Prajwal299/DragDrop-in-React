package com.list.drager.ListDragger.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.list.drager.ListDragger.Entity.Users;

public interface UserRepository extends JpaRepository<Users, Long>{
	public List<Users> findByUsername(String username);
}
