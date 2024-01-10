package com.list.drager.ListDragger.Entity;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class ListTable {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "list", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Task> tasks;

	public ListTable() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ListTable(String name, List<Task> tasks) {
		super();
		this.name = name;
		this.tasks = tasks;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}
    
    
    
}
