import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainRoutingModule } from '../train-routing.module';
import { CreateTrainComponent } from './create-train/create-train.component';
import { TrainListComponent } from './train-list/train-list.component';
import { BookSeatsComponent } from './book-seats/book-seats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SuccessComponent } from './success/success.component';


@NgModule({
  declarations: [
    CreateTrainComponent,
    TrainListComponent,
    BookSeatsComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    TrainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class TrainModule { }
