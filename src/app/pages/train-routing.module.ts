import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainListComponent } from './train/train-list/train-list.component';
import { CreateTrainComponent } from './train/create-train/create-train.component';
import { BookSeatsComponent } from './train/book-seats/book-seats.component';
import { SuccessComponent } from './train/success/success.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'train-list',
        pathMatch: 'full',
      },
      {
        path : "train-list",
        component : TrainListComponent
      },
      {
        path : "create-train",
        component : CreateTrainComponent
      },
      {
        path : ":trainId/book-seats",
        component : BookSeatsComponent
      },
      {
        path : "success",
        component : SuccessComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainRoutingModule {}
