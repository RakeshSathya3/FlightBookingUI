import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FlightDetails, SearchInputData } from '../models/FlightDetails';
import { AuthService } from '../services/auth.service';
import { SearchService } from '../services/search.service';

@Injectable()

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html'
})

export class SearchFlightsComponent implements OnInit {

  searchInputData: SearchInputData = new SearchInputData();
  flightDetails: Array<FlightDetails> = new Array<FlightDetails>();
  AlertMessage:string='';
  SuccessMessage:string='';


  constructor(public httpc: HttpClient, private router: Router, private _searchService: SearchService, private _authService: AuthService) {
  }

  ngOnInit(): void {
    //this._searchService.getSearchResults().subscribe(res => this.flightDetails = res, err => console.log(err))
  }

  searchFlights() {
    debugger;    

    var searchdto = {
      fromLocation: this.searchInputData.fromLocation,
      toLocation: this.searchInputData.toLocation,
      noOfPassengers: this.searchInputData.noOfPassengers,
      departureDate:this.searchInputData.departureDate,
      returnDate:this.searchInputData.returnDate
    }
    this.httpc.post("http://localhost:25302/api/search", searchdto).subscribe(res => { this.Success(res) }, res => { this.Error(res) });

  }

  bookFlight(obj: FlightDetails) {
    this._searchService.UserBookingObj(obj);
    this.router.navigate(['/bookFlight']);      
  }
  
  Error(res: any) {
    console.log(res);    
    this.SuccessMessage='';
    this.AlertMessage='No flights Found in this Route!!';
  }
  Success(res: any) {
    console.log(res);    
    this.flightDetails = res;
    this.AlertMessage='';
    this.SuccessMessage='Searched the flight details successfully!!';    
  }

  userLoggedIn(input:boolean):boolean{
    if(input){
      return this._authService.userLoggedIn();
    }
    else{
      return !this._authService.userLoggedIn();
    }
  }

}



