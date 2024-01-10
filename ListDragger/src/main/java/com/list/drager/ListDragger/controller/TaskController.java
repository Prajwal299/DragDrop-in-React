package com.list.drager.ListDragger.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.list.drager.ListDragger.Entity.Task;
import com.list.drager.ListDragger.Repo.ListRepo;
import com.list.drager.ListDragger.Repo.TaskRepo;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/task")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

	@Autowired
    private ListRepo listRepo;

    @Autowired
    private TaskRepo taskRepo;

    // Get tasks of a specific list
    @GetMapping("/getListTasks/{listId}")
    public List<Task> getListTasks(@PathVariable Long listId) {
        ListTable list = listRepo.findById(listId)
                .orElseThrow(() -> new EntityNotFoundException("List not found"));
        return list.getTasks();
    }

    // Create task within a list
    @PostMapping("/addTask/{listId}")
    public Task addTaskToList(@PathVariable Long listId, @RequestBody Task task) {
        ListTable list = listRepo.findById(listId)
                .orElseThrow(() -> new EntityNotFoundException("List not found"));
        task.setList(list);
        return taskRepo.save(task);
    }
       
    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        try {
            taskRepo.deleteById(id);
            System.out.println("id : "+id);
            System.out.println(getListTasks(id));
            return ResponseEntity.ok().build(); // Return 200 OK if deletion is successful
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete task."); // Return an error message if deletion fails
        }
    }
}
