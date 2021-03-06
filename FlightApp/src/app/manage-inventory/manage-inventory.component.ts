import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightDetails } from '../models/FlightDetails';
import { FlightInventoryDetails } from '../models/InventoryDetails';

@Component({
  selector: 'app-manage-inventory',
  templateUrl: './manage-inventory.component.html'
})
export class ManageInventoryComponent implements OnInit {

  flightData: FlightInventoryDetails = new FlightInventoryDetails();
  flightDataArray: Array<FlightInventoryDetails> = new Array<FlightInventoryDetails>();
  AlertMessage:string='';
  SuccessMessage:string='';

  constructor(public httpc: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.flightData = { flightNo: "", flightName: "", fromLocation: "", toLocation: "", departureDateTime: "", arrivalDateTime: "", priceBC: 0,priceNonBC:0, noOfBusinessClassSeats: 0,noOfNonBusinessClassSeats: 0, mealOption: "Y", remarks: "" };
    this.flightDataArray.push(this.flightData);
  }

  addRow(index: any) {
    this.flightData = { flightNo: "", flightName: "", fromLocation: "", toLocation: "", departureDateTime: "", arrivalDateTime: "", priceBC: 0,priceNonBC:0, noOfBusinessClassSeats: 0,noOfNonBusinessClassSeats: 0, mealOption: "Y", remarks: "" };
    this.flightDataArray.push(this.flightData);
    console.log(this.flightDataArray);
    return true;
  }

  deleteRow(index: any) {
    if (this.flightDataArray.length == 1) {
      return false;
    } else {
      this.flightDataArray.splice(index, 1);
      return true;
    }
  }

  addInventory() {
    debugger;
    this.httpc.post("http://localhost:5546/api/airline/inventory/add", this.flightDataArray).subscribe(res => { this.Success(res) }, res => {this.Error(res)});
  }

  Error(res: any) {
    console.log(res);
    this.AlertMessage='Unable to Add flight details!!!';
    this.SuccessMessage='';
  }
  Success(res: any) {
    console.log(res);
    this.flightDataArray = res;
    console.log(this.flightDataArray);
    this.SuccessMessage='Flight details added successfully!!!';
    this.AlertMessage='';
    
  }

}

