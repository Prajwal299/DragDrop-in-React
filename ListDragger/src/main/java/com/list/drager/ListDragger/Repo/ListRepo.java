package com.list.drager.ListDragger.Repo;





import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.list.drager.ListDragger.Entity.ListTable;
@Repository
public interface ListRepo extends JpaRepository<ListTable, Long> {

	

	
}
