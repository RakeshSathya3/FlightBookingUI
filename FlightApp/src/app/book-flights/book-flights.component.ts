import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightBookingDetails, FlightDetails, PassengerDetails } from '../models/FlightDetails';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-book-flights',
  templateUrl: './book-flights.component.html'
})
export class BookFlightsComponent {

  @Input() userFlightData: FlightDetails = new FlightDetails();

  constructor(private _search: SearchService, private _router: Router, private route: ActivatedRoute, public httpc: HttpClient) { }

  //userBookingDetailsArray: Array<FlightBookingDetails> = [];

  bookingInputDetails: any = [];
  TblPassengers: Array<PassengerDetails> = [];
  newPassenger: any = {};
  userBookingData: any = {};

  ngOnInit(): void {
    debugger;

    this._search.obj.subscribe(data => {
      this.userFlightData = data;
    })

    this.newPassenger = { passengerName: "", passengerAge: "", passengerGender: "", isMealOpted: "",SeatType:"", price: 2000 };
    this.TblPassengers.push(this.newPassenger);
  }

  addRow(index: any) {
    this.newPassenger = { passengerName: "", passengerAge: "", passengerGender: "", isMealOpted: "",SeatType:"", price: 2000 };
    
    this.TblPassengers.push(this.newPassenger);
    return true;
  }

  deleteRow(index: any) {
    if (this.TblPassengers.length == 1) {
      return false;
    } else {
      this.TblPassengers.splice(index, 1);
      return true;
    }
  }

  bookFlight() {
    console.log(this.TblPassengers);
    this.userBookingData = { userId: localStorage.getItem('userId'), flightNo: this.userFlightData.flightNo, noOfPassengers: this.TblPassengers.length, departureDateTime: this.userFlightData.departureDateTime, isOneWay: "", returnDateTime: "2022-05-29T00:00:00", TblPassengers: this.TblPassengers }
    this.bookingInputDetails.push(this.userBookingData);
    console.log(this.bookingInputDetails);
    this.httpc.post("http://localhost:25302/api/booking", this.bookingInputDetails).subscribe(res => { this.Success(res) }, res => this.Error);
  }

  Error(res: any) {
    console.log(res);
  }
  Success(res: any) {
    console.log(res.response);
    alert(res.response);
  }
}


