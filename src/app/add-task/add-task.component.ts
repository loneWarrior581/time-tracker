import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../services/task.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TaskModalComponent } from '../task-modal/task-modal.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  newTaskName: string = '';
  bsModalRef!: BsModalRef;
  @Output() taskAdded = new EventEmitter<void>();

  constructor(private taskService: TaskService, private modalService: BsModalService) { }

  openTaskModal() {
    this.bsModalRef = this.modalService.show(TaskModalComponent);
    this.bsModalRef.content = {};
    
    this.bsModalRef?.onHidden?.subscribe(() => {
      const taskName = this.bsModalRef.content;
      if (taskName) {
        this.newTaskName = taskName;
        this.addTask();
      }
    });
  } 

  addTask(): void {
    if (this.newTaskName.trim()) {
      this.taskService.addTask(this.newTaskName);
      this.taskAdded.emit();
      this.newTaskName = '';
    }
  }
}
