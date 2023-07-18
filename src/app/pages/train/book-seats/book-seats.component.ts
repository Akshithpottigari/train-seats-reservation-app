import { Component, OnInit } from '@angular/core';
import { TrainService } from '../train.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-seats',
  templateUrl: './book-seats.component.html',
  styleUrls: ['./book-seats.component.scss']
})
export class BookSeatsComponent implements OnInit {
  trainInfo : any = {};
  counter : number = 0;
  numberOfSeatsBooking : number = 1;
  constructor(
    private trainService: TrainService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private toastrService: ToastrService
  ){}

  ngOnInit(): void {
    this.getTrainSeatsInfomation();
  }

  // Getting the train info using _id of train
  getTrainSeatsInfomation(){
    this.trainService.getTrainSeatsInfomation(this.activatedRoute.snapshot.params["trainId"]).subscribe((res : any) => {
      if(res.success){
        this.trainInfo = res.data;
      } else {
        this.toastrService.error("Something went wrong");
      }
    })
  }

  //Booking train seats

  bookTrainSeat(){
    this.trainService.bookTrainSeat(this.trainInfo._id, this.numberOfSeatsBooking).subscribe((res : any) => {
      if(res.success){
        this.toastrService.success("Success");
        this.router.navigateByUrl("/train/success");
      } else {
        this.toastrService.error("Error");
        console.log("Failed!");
      }
    })
  }


  // this is used for UI purpose in order to display seats in row-wise order;
  generateNestedSeatsArray(seats: any[]): any[] {
    const nestedSeats = [];
    const seatsPerRow = 7;
    const rows = Math.ceil(seats.length / seatsPerRow);
    const seatsInCenter = 3;
  
    let seatIndex = 0;
    for (let i = 0; i < rows; i++) {
      const row = [];
      if (i === rows - 1) {
        for (let j = 0; j < seatsInCenter; j++) {
          row.push(seats[seatIndex]);
          seatIndex++;
        }
      } else {
        for (let j = 0; j < seatsPerRow; j++) {
          if (j < 3) {
            row.push(seats[seatIndex]);
          } else {
            row.push(seats[seatIndex]);
          }
          seatIndex++;
        }
      }
      nestedSeats.push(row);
    }
  
    return nestedSeats;
  }
}
