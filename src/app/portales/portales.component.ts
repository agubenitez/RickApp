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
  mis20LocAny: any = <any>{};
  allLocs: any = <any>{};
  misResidentAny: any = <any>{};
  
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
  next: string;
//Lista de favoritos
  misFav = [];
  misPages = [];
  mis20Loc = [];
  misResident = [];
  
  
  constructor(private rickService: RickService) { 
  }
 
  ngOnInit(): void { 
   
   }
//** FAVORITOS FAVORITOS FAVORITOS FAVORITOS FAVORITOS FAVORITOS  */

//guardo las id de los personajes seleccionados en una array y en localstorage
clickAddFav(id){
  this.misFav.push(id)
  console.log("favorito agregado",this.misFav);
  localStorage.setItem('Favoritos', JSON.stringify(this.misFav));
}
clickRemoveFav(id){
 for( var i = 0; i < this.misFav.length; i++){
  if ( this.misFav[i] === id){this.misFav.splice(i, 1);} 
}
localStorage.setItem('Favoritos', JSON.stringify(this.misFav));
console.log("Favorito eliminado",this.misFav);
}
//Chequea si el id pertenece al array de favoritos
checkFav(id){
  if(this.misFav==[]){
    return false
  }
  else{
  for( var i = 0; i < this.misFav.length; i++){
   if ( this.misFav[i] === id){return true;} 
  }
}

}
//Muestro los favoritos, reutilizo "currentChar20Id", utilizo mis20 para hacer misFav un objeto
mostrarFav(){
this.refresh()
var mijson = JSON.parse(localStorage.getItem('Favoritos'));
if(mijson == null){
  this.misFav = [];
}else{
this.misFav = JSON.parse(localStorage.getItem('Favoritos'));
this.currentChar20Id = {};
this.btnMostrarFav = true;
  this.mis20= this.misFav
  this.rickService.getMultipleChar(this.mis20).subscribe(
    (res) => {
      this.currentChar20Id = res;
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
}
//** CHARACTER */
//portal 1
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
// portal 2
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

//Get con url completa que utilizo para cargar siguiente pagina cuya url viene dentro del objeto currentName.info.next o  currentName.info.prev
//Puedo utilizar esto para location.url y origin.url
charByNext(next){ 
  this.next=next;
  this.rickService.getNextPage(next).subscribe(
    (res) => {
      this.currentName = res;
      this.currentLocName=res;
    },
    (err) => { 
      if (err.error && err.error.message) {
        alert(err.error.message);
        return;
      }
  },
    () => {}
  );
}

//Busqueda por nombre
charByName(name){
  this.refresh()
  this.name=name;
  if(name==undefined){
    name="";
  }
  console.log(name)
  this.btnName = !this.btnName
  this.currentName = {};
  this.rickService.getCharacterByName(name).subscribe(
    (res) => {
      this.currentName = res;
      console.log((this.currentName).results);
      this.currentPage((this.currentName).info.pages);
      this.random20Loc((this.currentName).results);
     
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
//Busqueda por nombre y pagina
charByPage(name,page){
  if(name==undefined){
    name="";
  }
  this.rickService.getCharacterByName(name,page).subscribe(
    (res) => {
      this.currentName = res;
     
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
//post busqueda por id
charById(idChar) {
  this.currentCharId = {};
  this.btnStatusResident= true
  this.rickService.getCharacter(idChar).subscribe(
    (res) => {
      this.currentCharId = res;
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


//20 personajes aleatorios que se guardan en currentChar20Id
  random20char(){
  this.btnMis20 = true;
  this.random20id()
  this.currentChar20Id = {};
  this.rickService.getMultipleChar(this.mis20).subscribe(
    (res) => {
      this.currentChar20Id = res;
      this.random20Loc(res);
     // this.allLoc();
          
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



//**LOCALIDAD */

//por nombre
locByName(name){
  this.name=name;
  this.btnLocName = true;
  this.btnLocName2 = !this.btnLocName2
  this.currentLocName = {};
  this.rickService.getLocByName(name).subscribe(
    (res) => {
      this.currentLocName = res;
      console.log("locByName", res)
      console.log("(this.currentLocName).results.residents)", ((this.currentLocName).results).residents)
      console.log("(this.currentLocName).results)", (this.currentLocName).results)
      this.getResidentsId((this.currentLocName).results)
      
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

allLoc(){
  this.allLocs = {};
  this.rickService.getAllLoc().subscribe(
    (res) => {
      this.allLocs = res;
       this.random20Loc(res);
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

allIdLoc(objet){
  for (let n of objet)
  {this.mis20Loc.push( (n.location.url).slice(41));}
   this.mis20LocAny = this.mis20Loc
  this.rickService.getMultipleLoc(this.mis20LocAny).subscribe(
    (res) => {
      this.currentLoc = res;
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


random20Loc(objet){
  this.currentLoc =  {};
  for (let n of objet)
  {this.mis20Loc.push((n.location.url).slice(41));}
   this.mis20LocAny = this.mis20Loc
  this.rickService.getMultipleLoc(this.mis20LocAny).subscribe(
    (res) => {
      this.currentLoc = res;
      console.log("random20Loc",res)
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

getResidentsId(objet){
  for (let n of objet){
console.log("n:",n)
    for(let y of n.residents){
      this.misResident.push(y.slice(42));
      console.log("y:", y)
      console.log("y.slice(42):", y.slice(42))
    }
    console.log(" this.misResident",  this.misResident)
  }
 
  console.log(" this.misResident",  this.misResident)
  console.log(" this.misResidentAny",  this.misResidentAny)
  this.getResidents()
}

getResidents(){
  this.currentChar =  {};
  this.misResidentAny = this.misResident
   console.log("misResidentAny",this.misResidentAny)
  this.rickService.getMultipleChar(this.misResidentAny).subscribe(
    (res) => {
      this.currentChar = res;
      console.log("CurrentChar",this.currentChar)
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


///** UTILIDADES */

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
  this.misPages = [];
  this.mis20Loc = [];
  console.log("refresh()")
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
}

//guardo la cantidad de paginas en un array para luego poder recorrerlo en el html
currentPage(max){
  this.misPages = [];
  var i = 1;
  while(i<=max){
  this.misPages.push(i)
  i++
  }
}

//Clicks 

clickEvent() {
  this.btnStatus = !this.btnStatus;
  setTimeout(() => {this.counter2++},1000);
  this.searchChar(this.char)
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

resultFound() {
  return Object.keys(this.currentName).length > 0;
 
}




randomLoc(loc) {
  this.random =  Math.random() * (671 - 1) + 1;
  loc = this.random.toFixed();
  this.currentLoc = {};
  this.rickService.getRandomLoc(loc).subscribe(
    (res) => {
      this.currentLoc = res;
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






}
