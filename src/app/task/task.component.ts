import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input() task!: Task;
  @Output() updateList = new EventEmitter<void>()
  private intervalId: any;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  get isTaskHistoryEmpty(): boolean {
    return this.task.history.length === 0;
  }

  private startTimer(): void {
    this.intervalId = setInterval(() => {
      if (this.task.startTime) {
        const startTime = new Date(this.task.startTime).getTime();
        this.task.elapsedTime = Date.now() - startTime;
      }
    }, 1000);
  }

  private loadList() {
    this.updateList.emit();
  }

  start(): void {
    this.taskService.startTask(this.task.id);
    this.task.startTime = new Date().toISOString(); // Update the local task to reflect the start
    this.startTimer();
    this.loadList();
  }

  stop(): void {
    this.taskService.stopTask(this.task.id);
    this.task.startTime = null; // Update the local task to reflect the stop
    // this.task.elapsedTime = 0;
    clearInterval(this.intervalId);
    this.loadList();
  }

  delete(): void {
    this.taskService.deleteTask(this.task.id);
    this.loadList();
  }

  getElapsedTime(): string {
    if (this.task.elapsedTime == 0) {
      return '00:00:00';
    }
    const seconds = Math.floor(this.task.elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes % 60).padStart(2, '0');
    const formattedSeconds = String(seconds % 60).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
}
