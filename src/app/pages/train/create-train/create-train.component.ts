import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainService } from '../train.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-train',
  templateUrl: './create-train.component.html',
  styleUrls: ['./create-train.component.scss']
})
export class CreateTrainComponent implements OnInit {
  addTrainForm!: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private trainService: TrainService,
    private toastrService: ToastrService,
    private router: Router
  ){

  }
  
  ngOnInit(): void {
    this.createTrainForm();
  }

// creating reactive form
  createTrainForm(){
    this.addTrainForm = this.formBuilder.group({
      trainName : [null, [Validators.required, Validators.minLength(1)]]
    });
  }

  //Making a train
  createTrain(){
    this.trainService.createTrain({trainName : this.addTrainForm.get("trainName")?.value}).subscribe((res : any) => {
      if(res.success) {
        this.router.navigateByUrl("/home");
        this.toastrService.success("Success");
      } else{
        console.log("Error");
        this.toastrService.error("Error");
      }
    })
  }
}
