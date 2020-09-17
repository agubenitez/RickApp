import { Injectable } from '@angular/core';

import{HttpClient} from "@angular/common/http";

import { environment } from "src/environments/environment";


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
  getCharacterByName(name: string){
    return this.http.get(
      `${environment.apiUrl}/character/?name=${name}`
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

  getMultipleChar(char: []) {
    return this.http.get(
      `${environment.apiUrl}/character/${char}`
    );
  }

}