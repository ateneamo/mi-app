

// componente
import * as THREE from 'three';
import {Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';
import {MapService} from './map.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  imports:[FormsModule ]
})
export class MapComponent implements OnInit {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas!: ElementRef<HTMLCanvasElement>;

   @Input () public x:number=0;
   @Input () public y:number=0;
   @Input () public z:number=0;
   @Input () public colorInput:string="0xff0000";
   @Input () public ancho:number=1;
   @Input () public largo:number=1;
    
  public constructor(private engServ: MapService) {
  }

  public ngOnInit(): void {
    

    this.engServ.createScene(this.rendererCanvas);
    this.engServ.addControls();
    this.engServ.agregaMapa();
       
    
    this.engServ.renderer.domElement.addEventListener('mouseenter', this.onMouseEnter.bind(this), false);
    this.engServ.renderer.domElement.addEventListener('click', this.onMouseClick.bind(this), false);
    
    


  }


 public onMouseEnter():void {
}
  public onMouseClick(event: MouseEvent) {
    
    this.engServ.dibujaStand(event.clientX,event.clientY);
  
  }
 public createCube():void{
  
  this.engServ.agregaStand2(this.x,this.y,this.z,parseInt(this.colorInput,16),this.largo,this.ancho);
 }
 
}