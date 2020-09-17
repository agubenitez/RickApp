import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  btnChar: boolean = true;
  btnStatus: boolean = false;
  btnStatus20: boolean = false;
  btnLoc: boolean = false;
  btnStatusLoc: boolean = false;
  name:string;
  locName:string;
  constructor() { }
  @Output()
  clickGo = new EventEmitter()
  @Output()
  clickRefresh = new EventEmitter()
  @Output()
  clickLoc= new EventEmitter()
  @Output()
  clickChar= new EventEmitter()
  @Output()
  clickGoLoc = new EventEmitter()
  @Output()
  clickDame20 = new EventEmitter()
  @Output()
  clickMisFav = new EventEmitter()

  
  ngOnInit(): void {
  }

  clickEvent(){
    this.clickRefresh.emit(this.btnStatus);
   }
  clickEventGo(){
    this.clickGo.emit(this.name);
    this.btnStatus=!this.btnStatus;
       
  }
  clickEvent20(){
    this.clickDame20.emit(this.name);
    this.btnStatus20=!this.btnStatus20;
  }

  clickEventMisFav(){
    this.clickMisFav.emit(this.name);
    this.btnStatus20=!this.btnStatus20;
  }

  clickEventGoLoc(){
    this.btnStatusLoc=!this.btnStatusLoc;
    this.clickGoLoc.emit(this.locName);
        
  }
  clickEventLoc(){
    this.btnLoc = true
    this.btnChar = false
    this.clickLoc.emit(this.btnLoc);
  
   }
   clickEventChar(){
    this.btnLoc = false
    this.btnChar = true
    this.clickChar.emit(this.btnChar);

   }

   c



}
