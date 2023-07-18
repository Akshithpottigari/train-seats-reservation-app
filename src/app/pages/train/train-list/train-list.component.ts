import { Component, OnInit } from '@angular/core';
import { TrainService } from '../train.service';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.scss']
})
export class TrainListComponent  implements OnInit{
  trains : any[] = [];
  constructor(
    private trainService: TrainService,
  ){

  }

  ngOnInit(): void {
    this.getAllTrains();
  }

  //getting train information;
  getAllTrains(){
    this.trainService.getAllTrains().subscribe((res : any) => {
      if(res.success){
        this.trains = res.data
      } else {
        console.log("error while getting all trains");
      }
    })
  }
}
