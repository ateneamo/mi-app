import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {ElementRef, Injectable, NgZone, OnDestroy} from '@angular/core';

@Injectable({providedIn: 'root'})
export class MapService implements OnDestroy {
  private canvas!: HTMLCanvasElement;
  public renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private light!: THREE.AmbientLight;
  private controls!:OrbitControls;
  private cube!: THREE.Mesh;
  private stands:any = [];
  private frameId: number = 0;
  private axesHelper = new THREE.AxesHelper( 20 );
  public mouse= new THREE.Vector2(0,0);
  public mouseStartPosition= new THREE.Vector2(0,0);
  public mouseEndPosition= new THREE.Vector2(0,0);
public rayCaster = new THREE.Raycaster();
private geometry!:THREE.PlaneGeometry;
private mapa!: THREE.Mesh;
  public constructor(private ngZone: NgZone) {
  }

  public ngOnDestroy(): void {
    
   
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void 
  {
    // The first step is to get the reference of the canvas element from our HTML document
        this.canvas = canvas.nativeElement;

        this.renderer = new THREE.WebGLRenderer({
          canvas: this.canvas,
          alpha: true,    // transparent background
          antialias: true // smooth edges
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

         
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
          65, window.innerWidth / window.innerHeight, 1, 400
        );
        this.camera.position.z = 5;
        this.camera.position.y =2;
        this.camera.position.x=3;
        this.scene.add(this.camera);

        
        this.light = new THREE.AmbientLight(0x404040);
        this.light.position.z = 10;
        this.scene.add(this.light);

        this.scene.add( this.axesHelper );
        this.renderer.render(this.scene, this.camera);
        console.log('fin crear escena');
  }

  public animate(): void {
     
    console.log('entrando animar');
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(): void {
     
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  public agregaMapa(){
   
    const material = new THREE.MeshBasicMaterial({color:0x0000F1});

    var texture = new THREE.TextureLoader().load('./assets/img/plano.png');
    var img = new THREE.MeshBasicMaterial
                  ({
                  map: texture
                  });

    this.geometry = new THREE.PlaneGeometry( 50, 50 );
    this.mapa = new THREE.Mesh( this.geometry, img );
    this.mapa.name="mapa";
    this.mapa.rotation.x = - Math.PI / 2;
    this.mapa.position.y = 0;
    this.scene.add( this.mapa );
    this.renderer.render(this.scene, this.camera);
    console.log(this.mapa);
    }

  public agregaStand(x:number, y:number,z:number, color1:number){
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: color1});
    const temp: THREE.Mesh=new THREE.Mesh(geometry, material);
    this.stands.push(temp);
    temp.position.set(x,y,z);
    this.scene.add(temp);
    console.log("agregando cubo:",x, y ,z,color1);
    this.renderer.render(this.scene, this.camera);
    console.log(this.stands);
  }
  public agregaStand2(x:number, y:number,z:number, color1:number, largo:number, ancho:number){
    const geometry = new THREE.BoxGeometry(ancho, largo,1);
    const material = new THREE.MeshBasicMaterial({color: color1});
   
    const temp: THREE.Mesh=new THREE.Mesh(geometry, material);
    this.stands.push(temp);
    temp.position.set(x,y,z);
    this.scene.add(temp);
    console.log("agregando cubo:",x, y ,z,color1);
    this.renderer.render(this.scene, this.camera);
    console.log(this.stands);
  }

  public addControls()
  {
      this.controls=new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.25;
      this.controls.enableZoom = true;
      this.controls.enablePan = false;
      this.controls.addEventListener('change', this.render.bind(this)) ;
      console.log("se agregaron controles");

  }

  
  public puntoInicial(x:number, y:number)
  {
    this.mouse.x = x;
    this.mouse.y = y;
    console.log("inicio stand",this.mouse);
    this.rayCaster.setFromCamera(this.mouse, this.camera);
    const intersects= this.rayCaster.intersectObjects(this.scene.children);
    for(let i=0; i<intersects.length;i++)
    {
        if (intersects[i].object.name==="mapa")
        {
          this.mouseStartPosition.x=intersects[i].point.x;
          this.mouseStartPosition.y=intersects[i].point.y;
          console.log("inicio stand",this.mouseStartPosition);
        }
    }
  }

  
   public dibujaStand(x:number, y:number):void{
      console.log(x,y);
    //agregaStand2(x:number, y:number,z:number, 0xCEC9C8, largo:number, ancho:number)
   } 
    
}
