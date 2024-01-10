package com.list.drager.ListDragger.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.list.drager.ListDragger.Entity.Task;

public interface TaskRepo extends JpaRepository<Task, Long> {

}
