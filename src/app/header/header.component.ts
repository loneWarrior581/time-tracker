import { AfterViewInit, Component, Input } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit{
  @Input() image!: string;
  timeSpent: string = '';
  
  constructor(private taskService: TaskService) { }

  ngAfterViewInit(): void {
    this.timeSpent = this.taskService.getTotalTime();
  }
}
