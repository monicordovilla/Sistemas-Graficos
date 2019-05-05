
/// La clase fachada del modelo
/**
 * Usaremos una clase derivada de la clase Scene de Three.js para llevar el control de la escena y de todo lo que ocurre en ella.
 */

class MyScene extends THREE.Scene {
  constructor (unRenderer) {
    super();
    this.createGUI ();
    this.createLights ();
    this.createCamera (unRenderer);
    this.tiempoAnterior = Date.now(); //Tiempo en milisegundos
    /*
    V - vacio
    I, J, L, O, S, T, Z - forma de los tetriminos
    */
    var i, j;
    this.matriz = new Array(17);
    for (i=0; i<this.matriz.length; i++){
        console.log(i + "\n");
         this.matriz[i] = new Array(11);
         for (j=0; j<this.matriz[i].length; j++){
             this.matriz[i][j] = "V";
             console.log(this.matriz[i][j] + " " + j);
             //document.write(this.matriz[i][j] + " ");
         }
         console.log("\n");
         //document.writeln("\nsalto de linea\n");
     }
     //posicion tetramino en la matriz
     this.posy = 0;
     this.posx = 5;

    this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);

    this.tetramino = new I();
    this.add (this.tetramino);

    if(this.tetramino.letra == "T"){
     this.tetramino.applyMatrix (new THREE.Matrix4().makeTranslation(0,8,0));
    }
    else if(this.tetramino.letra == "I"){
     this.tetramino.applyMatrix (new THREE.Matrix4().makeTranslation(0,6.5,0));
    }

    //var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //var material = new THREE.MeshBasicMaterial( {color: 0x0000FF, wireframe:true, wireframeLinewidth: 2.0});
    //var cube = new THREE.Mesh( geometry, material );
    //this.add( cube );
    /*
    var matriz = [[V,V,V,V,V,V,V,V,V,V,V,V],[V,V,V,V,V,V,V,V,V,V,V,V],[V,V,V,V,V,V,V,V,V,V,V,V],
                    [V,V,V,V,V,V,V,V,V,V,V,V],[V,V,V,V,V,V,V,V,V,V,V,V],[V,V,V,V,V,V,V,V,V,V,V,V],
                    [V,V,V,V,V,V,V,V,V,V,V,V],[V,V,V,V,V,V,V,V,V,V,V,V],[V,V,V,V,V,V,V,V,V,V,V,V],
                    [V,V,V,V,V,V,V,V,V,V,V,V],[V,V,V,V,V,V,V,V,V,V,V,V],[V,V,V,V,V,V,V,V,V,V,V,V],
                    [V,V,V,V,V,V,V,V,V,V,V,V],[V,V,V,V,V,V,V,V,V,V,V,V],[V,V,V,V,V,V,V,V,V,V,V,V],
                    [V,V,V,V,V,V,V,V,V,V,V,V],[V,V,V,V,V,V,V,V,V,V,V,V],[V,V,V,V,V,V,V,V,V,V,V,V],
                ];*/


    //Creacion del entorno tetris
        this.createCaja(); //11 ancho * 17 largo
  }

  createCaja(){
      this.points = [];
      var ancho = 5.5;
      var alto = 8.5;
      this.points.push( new THREE.Vector3(-ancho,  alto));
      this.points.push( new THREE.Vector3(ancho,  alto));
      this.points.push( new THREE.Vector3(ancho,  -alto));
      this.points.push( new THREE.Vector3(-ancho,  -alto));
      this.points.push( new THREE.Vector3(-ancho,  alto));

      var material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

      this.lineGeometry = new THREE.Geometry();
      this.lineGeometry.vertices = this.points;
      this.material = new THREE.MeshNormalMaterial({color: 0xCF0000});
      this.line = new THREE.Line (this.lineGeometry, this.material);

      //this.line.applyMatrix (new THREE.Matrix4().makeTranslation(0,0,0));

      this.add(this.line);
  }

  createCamera (unRenderer) {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set (0, 0, 22);//Cuando mas X mas se aleja
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);
    this.add (this.camera);
    this.cameraControl = new THREE.TrackballControls (this.camera, unRenderer);
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;
    this.cameraControl.target = look;
  }

  createGUI () {
    this.guiControls = new function() {
    }
  }

  createLights () {
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    this.add (ambientLight);

    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }

  getCamera () {
    return this.camera;
  }

  setCameraAspect (ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }

  /*
  Key code derecha = 37
  Key code arriba = 38
  Key code izquierda = 39
  Key code abajo = 40
  */
  onDocumentKeyDown() {
      var tecla = event.keyCode;
      switch (tecla) {
        case 37: //DERECHA
          if( this.tetramino.letra == "I" && this.tetramino.moverIzquierda(this.matriz, this.posx, this.posy) ){
              this.tetramino.position.x -= 1;
              this.posx--;
          }
          else if(this.tetramino.letra != "I"){
              this.tetramino.position.x -= 1;
          }
          break;
        case 38: //ROTA
          this.tetramino.rotation.z += THREE.Math.degToRad(90);
          break;
        case 39: //IZQUIERDA
            if( this.tetramino.letra == "I" && this.tetramino.moverDerecha(this.matriz, this.posx, this.posy) ){
                this.tetramino.position.x += 1;
                this.posx++;
            }
            else if(this.tetramino.letra != "I"){
                this.tetramino.position.x += 1;
            }
          //this.tetramino.position.x += 1;
          break;
        case 40: //BAJA
            console.log(this.posy + this.matriz[this.posx][this.posy+3+1]);
            if( this.tetramino.letra == "I" && this.tetramino.moverAbajo(this.matriz, this.posx, this.posy) ){
                this.tetramino.position.y -= 1;
                this.posy++;
            }
            else if(this.tetramino.letra != "I"){
                this.tetramino.position.y -= 1;
            }
          break;
      }
  };

  update () {
      this.cameraControl.update();

      if(this.tetramino.letra == "I"){
          //Comprobar si puedo bajar
          if( this.posy < 17 ){
              if(this.matriz[this.posx][this.posy+1] == "V"){
                  /*var velocidad = 0.5;
                  var tiempoActual = Date.now(); //Tiempo en milisegundos
                  var segundosTranscurridos = (tiempoActual - this.tiempoAnterior)/1000;
                  this.tetramino.position.y -= (velocidad*segundosTranscurridos);
                  this.tiempoAnterior = tiempoActual;*/
              }
          }
      }
  }
}
