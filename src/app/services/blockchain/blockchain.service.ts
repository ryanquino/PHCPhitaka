import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpUrlEncodingCodec } from '@angular/common/http';
import { Observable } from  'rxjs';
import { Blockchain } from 'src/app/models/blockchain/blockchain';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  baseUrl = 'http://localhost/backend/api/';
  Web3 = require('web3');
  Tx = require('ethereumjs-tx').Transaction;
  web3js = new this.Web3(new this.Web3.providers.HttpProvider(environment.nodeUrl));
  apiOperation = "/insert.php";
  httpUrl = environment.apiUrl + this.apiOperation;

  constructor(private http: HttpClient,) { }

  public generateAccount(email): Observable<Blockchain>{
    return this.web3js.eth.accounts.create(email);
  }
  public registerBlockchain(blockchain: Blockchain): Observable<Blockchain>{
    return this.http.post<Blockchain>(`${this.baseUrl}/insertWallet.php`, blockchain);   
  }
}
