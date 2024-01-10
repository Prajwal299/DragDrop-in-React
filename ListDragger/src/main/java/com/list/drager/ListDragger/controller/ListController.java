package com.list.drager.ListDragger.controller;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.list.drager.ListDragger.Entity.ListTable;
import com.list.drager.ListDragger.Repo.ListRepo;
import com.list.drager.ListDragger.Repo.TaskRepo;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/list")
@CrossOrigin(origins = "http://localhost:3000")
public class ListController {

	@Autowired
	private ListRepo listRepo;
	
	@Autowired
	private TaskRepo taskRepo;
	
	@GetMapping("getAllList")
    public List<ListTable> getAllLists() {
        return listRepo.findAll();
    }
	
	
	
	@GetMapping("/hello")
	public ResponseEntity<List<ListTable>> getAllListWithTask() {
        List<ListTable> course = listRepo.findAll();
        return ResponseEntity.ok().body(course);
    }
	
	
	@PostMapping("/createList")
	public ListTable createList(@RequestBody ListTable listTable) {
		return listRepo.save(listTable);
	}
	
   	
	
	
}
