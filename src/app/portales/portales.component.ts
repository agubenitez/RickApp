import { RickService } from '../rick.service';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-portales',
  templateUrl: './portales.component.html',
  styleUrls: ['./portales.component.css']
})
export class PortalesComponent implements OnInit {
  currentChar: any = <any>{};
  currentChar2: any = <any>{};
  currentCharId: any = <any>{};
  currentName: any = <any>{};
  currentLoc: any = <any>{};
  currentLocName: any = <any>{};
  mis20: any = <any>{};
  
  currentChar20Id: any = <any>{};
  char: number;
  idChar:number;
  counter=0
  counter2=0
  random: any;
  randomFix: any;
  btnStatus: boolean = false;
  btnStatus2: boolean = false;
  btnStatus3: boolean = false;
  btnName: boolean = false;
  btnLoc: boolean = false;
  btnChar: boolean = true;
  btnLocName: boolean = false;
  btnLocName2: boolean = false;
  btnStatusResident: boolean = false;
  btnMis20: boolean = false;
  btnFav: boolean = false;
  btnMostrarFav: boolean = false;
  name:string;
  c:string;
  check:any;
//Lista de favoritos
  misFav = [];
  
  constructor(private rickService: RickService) { 
  }
 
  ngOnInit(): void { 
    console.log("ngoninit()",this.currentChar);
  }

//guardo las id de los personajes seleccionados en una array  
clickAddFav(id){
  this.misFav.push(id)
  console.log("addFav()",this.misFav);
  localStorage.setItem('Favoritos', JSON.stringify(this.misFav));
 
}

clickRemoveFav(id){
    for( var i = 0; i < this.misFav.length; i++){
    if ( this.misFav[i] === id){
    this.misFav.splice(i, 1); 
    } 
  }

  console.log("RemoveFav()",this.misFav);
}

checkFav(id){
  for( var i = 0; i < this.misFav.length; i++){
    if ( this.misFav[i] === id){
   return true;
    } 
  }
}

mostrarFav(){
this.refresh()
this.misFav = JSON.parse(localStorage.getItem('Favoritos'));
this.currentChar20Id = {};
this.btnMostrarFav = true;
  this.mis20= this.misFav
  
  this.rickService.getMultipleChar(this.mis20).subscribe(
    (res) => {
      this.currentChar20Id = res;
      console.log("mostrar Fav()", this.currentChar20Id)
       },
    (err) => {
      if (err.error && err.error.message) {
       // alert(err.error.message);
      
        return;
      }
      alert("Error el nombre no es valido");
    },
    () => {}
  );
 
}


refresh(){
this.btnStatus3 = !this.btnStatus3;
this.btnStatus = false;
this.btnStatus2 = false;
this.counter=0;
this.counter2=0;
clearTimeout() 
this.currentChar=""
this.currentChar2=""
this.btnStatus  = false;
this.btnStatus2  = false;
this.btnStatus3 = false;
this.btnName  = false;
this.btnLoc  = false;
this.btnChar = true;
this.btnLocName  = false;
this.btnLocName2  = false;
this.btnStatusResident  = false;
this.btnMis20  = false;
this.btnFav  = false;
this.btnMostrarFav = false;
this.currentChar = <any>{};
this.currentChar2 = <any>{};
this.currentCharId = <any>{};
this.currentName = <any>{};
this.currentLoc = <any>{};
this.currentLocName = <any>{};
this.mis20 = <any>{};
console.log("refresh()")
}  

clickChar(event){
this.btnChar=event
this.btnLoc = false
}

clickLoc(event){
this.btnLoc=event
this.btnChar = false
}


clickEvent2() {
this.btnStatus2 = !this.btnStatus2;
setTimeout(() => {this.counter++},1000);
this.searchChar2(this.char)
}
clickEvent3() {
this.btnStatus3 = !this.btnStatus3;
this.btnStatus = false;
this.btnStatus2 = false;
this.counter=0;
this.counter2=0;
clearTimeout() 
this.currentChar=""
this.currentChar2=""
}

searchChar(char) {
this.random =  Math.random() * (671 - 1) + 1;
char = this.random.toFixed();
this.currentChar = {};
this.rickService.getCharacter(char).subscribe(
 (res) => {
    this.currentChar = res;
    },
  (err) => {
    if (err.error && err.error.message) {
       // alert(err.error.message);
    return;
    }
    },
    () => {}
  );
}

searchChar2(char) {
this.random =  Math.random() * (671 - 1) + 1;
char = this.random.toFixed();
this.currentChar2 = {};
this.rickService.getCharacter(char).subscribe(
 (res) => {
   this.currentChar2 = res;
    },
    (err) => {
      if (err.error && err.error.message) {
       // alert(err.error.message);
      
        return;
      }
      alert("Error ");
    },
    () => {}
  );
}

clickEvent() {
  this.btnStatus = !this.btnStatus;
  setTimeout(() => {this.counter2++},1000);
  this.searchChar(this.char)

}

charByName(name){
  this.name=name;
  this.btnName = !this.btnName
  this.currentName = {};
  this.rickService.getCharacterByName(name).subscribe(
    (res) => {
      this.currentName = res;
      console.log(res);
    },
    (err) => { this.random20char()
      if (err.error && err.error.message) {
       // alert(err.error.message);
        return;
      }
      
    },
    () => {}
  );
   
}
randomLoc(loc) {
  this.random =  Math.random() * (671 - 1) + 1;
  loc = this.random.toFixed();
  this.currentLoc = {};
  this.rickService.getRandomLoc(loc).subscribe(
    (res) => {
      this.currentLoc = res;
      console.log(res);

    },
    (err) => {
      if (err.error && err.error.message) {
       // alert(err.error.message);
      
        return;
      }
      alert("Error ");
    },
    () => {}
  );
}
locByName(name){
  this.name=name;
  this.btnLocName = true;
  this.btnLocName2 = !this.btnLocName2
  this.currentLocName = {};
  this.rickService.getLocByName(name).subscribe(
    (res) => {
      this.currentLocName = res;
      console.log(res);
    },
    (err) => {
      if (err.error && err.error.message) {
       // alert(err.error.message);
        return;
      }
      alert("Location Name error");
    },
    () => {}
  );
   
}
charById(idChar) {
  this.currentCharId = {};
  this.btnStatusResident= true
  this.rickService.getCharacter(idChar).subscribe(
    (res) => {
      this.currentCharId = res;
      console.log(idChar);
    },
    (err) => {
      if (err.error && err.error.message) {
       // alert(err.error.message);
      
        return;
      }
      alert("Error el nombre no es valido");
    },
    () => {}
  );
}
//Crea un array con 20 numeros aleatorios entr 1 y 671 que se guardan en la variable mis20
random20id(){
  this.random =  Math.random() * (671 - 1) + 1;
  this.char = this.random.toFixed();
  this.mis20 = {};
  var res = [];
  
  var i = 0;
  while(i<20){
   this.random=  Math.random() * (671 - 1) + 1;
  
  this.char = this.random.toFixed();
  res.push(this.char)
  i++
 
  }
  this.mis20=res
  console.log(this.mis20)

}

//20 personajes aleatorios que se guardan en currentChar20Id
random20char(){
  this.btnMis20 = !this.btnMis20;
  this.random20id()
  this.currentChar20Id = {};
  this.rickService.getMultipleChar(this.mis20).subscribe(
    (res) => {
      this.currentChar20Id = res;
      console.log(this.currentChar20Id)
       },
    (err) => {
      if (err.error && err.error.message) {
       // alert(err.error.message);
      
        return;
      }
      alert("Error el nombre no es valido");
    },
    () => {}
  );
}


resultFound() {
  return Object.keys(this.currentChar).length > 0;
}







}
