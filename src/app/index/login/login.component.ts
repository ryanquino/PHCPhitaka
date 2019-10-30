import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService} from 'src/app/services/user/register/register.service';
import { BlockchainService } from 'src/app/services/blockchain/blockchain.service';
import { SessionStorage, SessionStorageService } from "ngx-webstorage";
import { UserProfile } from 'src/app/models/UserProfile'; 
import { Blockchain } from 'src/app/models/blockchain/blockchain';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  confirmPassword: String;

  walletDetails: any;
  walletAddress: any;
  privateKey: any;
  register: RegisterUser;
  statusCode: any;
  processValidation = false;
  UserProfile: UserProfile = new UserProfile();
  BlockchainProfile: Blockchain = new Blockchain();
  registerForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),

  });
  constructor(
    private registerService: RegisterService,
    private blockchainService: BlockchainService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  onRegisterFormSubmit() {
    this.processValidation = true;
     if (this.registerForm.invalid) {
     return; //Validation failed, exit from method.
     }
    let userRegister = this.registerForm.value;
    this.registerService.registerUsers(userRegister).subscribe(
      successCode => {
        this.statusCode = successCode;        
        this.CreateAccount(userRegister.email);
        this.BlockchainProfile.walletAddress = this.walletAddress;
        this.BlockchainProfile.privateKey = this.privateKey;
        console.log(this.walletDetails);
        this.blockchainService.registerBlockchain(this.BlockchainProfile).subscribe(
          successCode => {
            this.backToCreateArticle();
          },
          errorCode => this.statusCode = errorCode         
        )
      },
      errorCode => this.statusCode = errorCode
    )
  }
  backToCreateArticle() {
    this.registerForm.reset(); 
         this.processValidation = false;
    }
    
    public CreateAccount(email){
      this.walletDetails = this.blockchainService.generateAccount(email);      
      this.walletAddress = this.walletDetails.address;
      this.privateKey = this.walletDetails.privateKey;

    }
    public DoLogin() {
      
      if (this.username && this.password) {
        this.registerService.Login(this.username, this.password).then(
          value => {
            console.log(value);
            if (value == true)
              this.router.navigate(["dashboard"]);
          },
          reason => {
            alert("The username and password are incorrect.");
            console.log(reason.error());     
            
          }
        ).finally(() => {
        });
      }    
    }
}

export class RegisterUser{
  constructor(
    fullname: String,
    email: String,
    contactNumber: String,
    username: String,
    password: String
  ) { }

  registerUsers() : void {}
}