import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskService } from './services/task.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TaskModalComponent } from './task-modal/task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    HeaderComponent,
    TaskListComponent,
    AddTaskComponent,
    TaskModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
