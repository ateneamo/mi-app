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
private plano!:THREE.PlaneGeometry;
private mapa!: THREE.Mesh;
private banderaDibuja:number=0;
private pointOfIntersection !: THREE.Vector3;

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

    this.plano = new THREE.PlaneGeometry( 50, 50 );
    this.mapa = new THREE.Mesh( this.plano, img );
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
    const geometry = new THREE.BoxGeometry(largo, 1,ancho);
    const material = new THREE.MeshBasicMaterial({color: color1});
   
    const temp: THREE.Mesh=new THREE.Mesh(geometry, material);
    this.stands.push(temp);
    temp.position.set(x,y,z);
    this.scene.add(temp);
    console.log("agregando cubo:",x, y ,z,largo, ancho);
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

  
  public dibujaStand(x:number, y:number)
  {
    this.pointOfIntersection = new THREE.Vector3();
    var res:boolean= false;
    var rC :any;
    this.mouse.x = (x / window.innerWidth) * 2 - 1;
        this.mouse.y = -(y / window.innerHeight) * 2 + 1;
        this.rayCaster.setFromCamera(this.mouse, this.camera);
        rC=this.rayCaster.intersectObject(this.mapa, res);
        //console.log("raycaster:",rC,rC[0].point.x, rC[0].point.y, rC[0].object.name);
       
    if (rC[0].object.name=="mapa"){ // se revisa que intersecte el plano
        if(this.banderaDibuja==0  )
        {
          
            this.mouseStartPosition.x = rC[0].point.x;
            this.mouseStartPosition.y = rC[0].point.z;
            
            this.banderaDibuja=1;
          }
          
  
   
   
        else if(this.banderaDibuja==1)
        {
          this.mouseEndPosition.x = rC[0].point.x;
          this.mouseEndPosition.y = rC[0].point.z;
          
          
          console.log("punto1:", this.mouseStartPosition,
                      "punto2", this.mouseEndPosition,
                      "ancho x", Math.abs(this.mouseEndPosition.x-this.mouseStartPosition.x),
                      "largo z", Math.abs(this.mouseEndPosition.y-this.mouseStartPosition.y),
                      this.banderaDibuja
                      );
          var largo=Math.abs(this.mouseEndPosition.y-this.mouseStartPosition.y)
          var ancho=Math.abs(this.mouseEndPosition.x-this.mouseStartPosition.x)
          
          var medioy=(this.mouseEndPosition.y-this.mouseStartPosition.y)/2;
          var mediox=(this.mouseEndPosition.x-this.mouseStartPosition.x)/2;
          var signx:number=1;
          var signy:number=1;
          
          
          
          this.agregaStand2(this.mouseStartPosition.x+mediox,0.5,this.mouseStartPosition.y+medioy,parseInt("0xb5b5b5",16),ancho,largo);
                     this.banderaDibuja=0;
        } 
}
  }

  
   public modificaStatusStand(x:number, y:number):void{
      console.log(x,y);
    
   } 
    
}
