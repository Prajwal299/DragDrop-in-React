package com.list.drager.ListDragger.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.list.drager.ListDragger.Entity.Task;

@Repository
public interface TaskRepo extends JpaRepository<Task, Long> {

}
