package com.list.drager.ListDragger.Repo;



import org.springframework.data.jpa.repository.JpaRepository;

import com.list.drager.ListDragger.Entity.ListTable;

public interface ListRepo extends JpaRepository<ListTable, Long> {

}
