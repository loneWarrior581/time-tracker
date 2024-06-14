import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  taskName!: string;

  constructor(public bsModalRef: BsModalRef) { }

  onCancel(): void {
    this.bsModalRef.hide();
  }

  onSave(): void {
    this.bsModalRef.hide();
    this.bsModalRef.content = this.taskName;
  }
}
