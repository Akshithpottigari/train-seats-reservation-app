import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backend_URL } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  trainsController : string = 'trains'
  constructor(
    private httpClient : HttpClient
  ) { }

  createTrain(payload : any){
    return this.httpClient.post(`${backend_URL}/${this.trainsController}`, payload);
  }

  getTrainSeatsInfomation(trainId : string){
    return this.httpClient.get(`${backend_URL}/${this.trainsController}/${trainId}/seats`);
  }

  bookTrainSeat(trainId : string, numSeats : number){
    return this.httpClient.post(`${backend_URL}/${this.trainsController}/${trainId}/seats/reserve`, {numSeats});
  }

  getAllTrains(){
    return this.httpClient.get(`${backend_URL}/${this.trainsController}`);
  }
}
