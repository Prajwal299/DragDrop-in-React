package com.list.drager.ListDragger.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.list.drager.ListDragger.Entity.ListTable;
import com.list.drager.ListDragger.Repo.ListRepo;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/list")
@CrossOrigin(origins = "http://localhost:3000")
public class ListController {

	@Autowired
	private ListRepo listRepo;
	
	@GetMapping("getAllList")
    public List<ListTable> getAllLists() {
        return listRepo.findAll();
    }
	
	@PostMapping("/createList")
	public ListTable createList(@RequestBody ListTable listTable) {
		return listRepo.save(listTable);
	}
	
	
	
	
	
	
}
