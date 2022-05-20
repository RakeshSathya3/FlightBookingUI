import { NgForm,FormGroup,Validators,FormBuilder, FormControl } from "@angular/forms";

export class FlightInventoryDetails {
    flightNo: string = '';
    flightName: string = '';
    fromLocation: string = '';
    toLocation: string = '';
    departureDateTime: string = '';
    arrivalDateTime: string = '';
    priceBC: number = 0;
    noOfBusinessClassSeats:number=0;  
    priceNonBC: number = 0;  
    noOfNonBusinessClassSeats: number=0;    
    mealOption: string = '';
    remarks: string = '';   
}
