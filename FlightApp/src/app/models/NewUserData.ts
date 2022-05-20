import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
export class NewUserData {
    userName: string = '';
    emailId: string = '';
    password: string = '';
    contactNo: string = '';
    gender: string = '';
    age: number = 0;
    roleId: number = 2;
    formRegisterGroup:FormGroup;//Create

    constructor() {
        var _builder=new FormBuilder();
        this.formRegisterGroup=_builder.group({});
        
        var validationcollection=[];
        validationcollection.push(Validators.required);
        validationcollection.push(Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"));
        var mobilevalidationcollection=[];
        mobilevalidationcollection.push(Validators.required);
        mobilevalidationcollection.push(Validators.pattern("[789][0-9]{9}"));
        
        //Control==>validation
        this.formRegisterGroup.addControl("passwordControl",new FormControl('',Validators.required));
        this.formRegisterGroup.addControl("userNameControl",new FormControl('',Validators.required));
        this.formRegisterGroup.addControl("mobileControl",new FormControl('',Validators.compose(mobilevalidationcollection)));
        this.formRegisterGroup.addControl("emailControl",new FormControl('',Validators.compose(validationcollection)));
     }
}