import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksKey = 'tasks';

  getTasks(): Task[] {
    const tasks = localStorage.getItem(this.tasksKey);
    return tasks ? JSON.parse(tasks) : [];
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
  }

  addTask(name: string): void {
    const tasks = this.getTasks();
    const newTask: Task = {
      id: Date.now().toString(),
      name,
      startTime: null,
      duration: 0,
      elapsedTime: 0,
      history: []
    };
    tasks.push(newTask);
    this.saveTasks(tasks);
  }

  startTask(id: string): void {
    const tasks = this.getTasks();
    const task = tasks.find(task => task.id === id);
    if (task) {
      task.startTime = new Date().toISOString();
      task.history.push({startTime: task.startTime});
      this.saveTasks(tasks);
    }
  }

  stopTask(id: string): void {
    const tasks = this.getTasks();
    const task = tasks.find(task => task.id === id);
    if (task && task.startTime) {
      const startTime = new Date(task.startTime).getTime();
      const endTime = Date.now();
      const duration = endTime - startTime;
      task.history.splice(-1);
      task.history.push({ startTime: task.startTime, endTime: new Date().toISOString(), duration });
      task.duration += duration;
      task.startTime = null;
      task.elapsedTime = 0;
      this.saveTasks(tasks);
    }
  }

  deleteTask(id: string): void {
    const tasks = this.getTasks();
    const updatedTasks = tasks.filter(task => task.id !== id);
    this.saveTasks(updatedTasks);
  }


  getTotalTime(): string {
    const totalTime = this.getTasks().reduce((cumulativeTime,task) => cumulativeTime + task.duration, 0);
    return this.getFloorTime(totalTime);
  }

  private getFloorTime(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return hours.toString() + ' hr';
    } else if (minutes > 0) {
      return minutes.toString() + ' min';
    } else {
      return seconds.toString() + ' sec';
    }
  }
}
