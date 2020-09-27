import { Injectable } from '@angular/core';

import{HttpClient} from "@angular/common/http";

import { environment } from "src/environments/environment";
import { HomePageComponent } from './home-page/home-page.component';


@Injectable({
  providedIn: 'root'
})
export class RickService {

  constructor(private http: HttpClient) {}

  getCharacter(char: number) {
    return this.http.get(
      `${environment.apiUrl}/character/${char}`
    );
  }
  getCharacterByName(name: string, page=1){
    return this.http.get(
      `${environment.apiUrl}/character/?page=${page}&name=${name}`
    );
  }
  
  getRandomLoc(loc: number) {
    return this.http.get(
      `${environment.apiUrl}/location/${loc}`
    );
  }
  getLocByName(loc: string) {
    return this.http.get(
      `${environment.apiUrl}/location/?name=${loc}`
    );
  }

  getMultipleChar(char: [], page=1) {
    return this.http.get(
      `${environment.apiUrl}/character/${char}/?page=${page}`
    );
  }

  getMultipleLoc(char: []) {
    return this.http.get(
      `${environment.apiUrl}/location/${char}`
    );
  }

  getAllLoc(){
    return this.http.get(
      `${environment.apiUrl}/location/`
    );
  }


  getNextPage(next:string){
  
    return this.http.get(
      `${next}`
    );
 
  }
}  