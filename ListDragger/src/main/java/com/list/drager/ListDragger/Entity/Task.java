package com.list.drager.ListDragger.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;



@Entity
public class Task {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "list_id")
    private ListTable list;

	public Task() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Task(String name, ListTable list) {
		super();
		this.name = name;
		this.list = list;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public ListTable getList() {
		return list;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setList(ListTable list) {
		this.list = list;
	}

	@Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }

    
    

}
