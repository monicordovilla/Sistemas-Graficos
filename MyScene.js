
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
    this.tetrimino = new THREE.Object3D();
    this.posicionY = new Array();
    this.posicionX = new Array();
    this.colocado = false;
    /*
    V - vacio
    I, J, L, O, S, T, Z - forma de los tetriminos
    X - borde(ocupado)
    */
    var i, j;
    this.matriz = new Array(13);
    for (i=-1; i<this.matriz.length; i++){
        console.log(i + "\n");
         this.matriz[i] = new Array(19);
         for (j=-1; j<this.matriz[i].length; j++){
             if(i==-1 || j==-1 || i==12 || j==18)
                this.matriz[i][j] = "X";
             else
               this.matriz[i][j] = "V";

             console.log(this.matriz[i][j] + " " + j);
         }
         console.log("\n");
     }

    /*this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);*/

    this.createtetrimino();

    //Creacion del entorno tetris
    this.createCaja(); //11 ancho * 17 largo
  }

  createtetrimino(){
      var random = Math.floor(Math.random() * 7) + 1;

      switch (random) {
          case 1: //tetrimino I
            this.createtetriminoI();
            break;
          case 2: //tetrimino J
            this.createtetriminoJ();
            break;
          case 3: //tetrimino L
            this.createtetriminoL();
            break;
          case 4: //tetrimino S
            this.createtetriminoS();
            break;
          case 5: //tetrimino Z
            this.createtetriminoZ();
            break;
          case 6: //tetrimino O
            this.createtetriminoO();
            break;
          case 7: //tetrimino T
            this.createtetriminoT();
            break;

      }
  }

  createtetriminoI(){
      this.cuadrado1 = new I();
      this.cuadrado2 = new I();
      this.cuadrado3 = new I();
      this.cuadrado4 = new I();

      //posicion tetrimino en la matriz
      this.posicionX[0] = 5;
      this.posicionY[0] = 0;

      this.posicionX[1] = 5;
      this.posicionY[1] = 1;
      this.cuadrado2.applyMatrix (new THREE.Matrix4().makeTranslation(0,1,0));

      this.posicionX[2] = 5;
      this.posicionY[2] = 2;
      this.cuadrado3.applyMatrix (new THREE.Matrix4().makeTranslation(0,2,0));

      this.posicionX[3] = 5;
      this.posicionY[3] = 3;
      this.cuadrado4.applyMatrix (new THREE.Matrix4().makeTranslation(0,3,0));

      this.tetrimino.add(this.cuadrado1);
      this.tetrimino.add(this.cuadrado2);
      this.tetrimino.add(this.cuadrado3);
      this.tetrimino.add(this.cuadrado4);
      this.add(this.tetrimino);

      this.tetrimino.applyMatrix(new THREE.Matrix4().makeTranslation(0,5,0));
  }

  createtetriminoJ(){
      this.cuadrado1 = new J();
      this.cuadrado2 = new J();
      this.cuadrado3 = new J();
      this.cuadrado4 = new J();

      //posicion tetrimino en la matriz
      this.posicionX[0] = 5;
      this.posicionY[0] = 0;

      this.posicionX[1] = 5;
      this.posicionY[1] = 1;
      this.cuadrado2.applyMatrix (new THREE.Matrix4().makeTranslation(0,1,0));

      this.posicionX[2] = 5;
      this.posicionY[2] = 2;
      this.cuadrado3.applyMatrix (new THREE.Matrix4().makeTranslation(0,2,0));

      this.posicionX[3] = 4;
      this.posicionY[3] = 2;
      this.cuadrado4.applyMatrix (new THREE.Matrix4().makeTranslation(1,2,0));

      this.tetrimino.add(this.cuadrado1);
      this.tetrimino.add(this.cuadrado2);
      this.tetrimino.add(this.cuadrado3);
      this.tetrimino.add(this.cuadrado4);
      this.add(this.tetrimino);
      this.tetrimino.applyMatrix(new THREE.Matrix4().makeTranslation(0,6,0));
  }
  createtetriminoL(){
    this.cuadrado1 = new L();
    this.cuadrado2 = new L();
    this.cuadrado3 = new L();
    this.cuadrado4 = new L();

    //posicion tetrimino en la matriz
    this.posicionX[0] = 5;
    this.posicionY[0] = 0;

    this.posicionX[1] = 5;
    this.posicionY[1] = 1;
    this.cuadrado2.applyMatrix (new THREE.Matrix4().makeTranslation(0,1,0));

    this.posicionX[2] = 5;
    this.posicionY[2] = 2;
    this.cuadrado3.applyMatrix (new THREE.Matrix4().makeTranslation(0,2,0));

    this.posicionX[3] = 6;
    this.posicionY[3] = 2;
    this.cuadrado4.applyMatrix (new THREE.Matrix4().makeTranslation(-1,2,0));

    this.tetrimino.add(this.cuadrado1);
    this.tetrimino.add(this.cuadrado2);
    this.tetrimino.add(this.cuadrado3);
    this.tetrimino.add(this.cuadrado4);
    this.add(this.tetrimino);
    this.tetrimino.applyMatrix(new THREE.Matrix4().makeTranslation(0.5,6.5,0));
  }
  createtetriminoO(){
    this.cuadrado1 = new O();
    this.cuadrado2 = new O();
    this.cuadrado3 = new O();
    this.cuadrado4 = new O();

    //posicion tetrimino en la matriz
    this.posicionX[0] = 5;
    this.posicionY[0] = 0;

    this.posicionX[1] = 5;
    this.posicionY[1] = 1;

    this.cuadrado2.applyMatrix (new THREE.Matrix4().makeTranslation(0,1,0));

    this.posicionX[2] = 6;
    this.posicionY[2] = 0;
    this.cuadrado3.applyMatrix (new THREE.Matrix4().makeTranslation(1,0,0));

    this.posicionX[3] = 6;
    this.posicionY[3] = 1;
    this.cuadrado4.applyMatrix (new THREE.Matrix4().makeTranslation(1,1,0));

    this.tetrimino.add(this.cuadrado1);
    this.tetrimino.add(this.cuadrado2);
    this.tetrimino.add(this.cuadrado3);
    this.tetrimino.add(this.cuadrado4);
    this.add(this.tetrimino);
    this.tetrimino.applyMatrix(new THREE.Matrix4().makeTranslation(0,7,0));
  }
  createtetriminoS(){
    this.cuadrado1 = new S();
    this.cuadrado2 = new S();
    this.cuadrado3 = new S();
    this.cuadrado4 = new S();

    //posicion tetrimino en la matriz
    this.posicionX[0] = 5;
    this.posicionY[0] = 0;

    this.posicionX[1] = 6;
    this.posicionY[1] = 0;
    this.cuadrado2.applyMatrix (new THREE.Matrix4().makeTranslation(-1,0,0));

    this.posicionX[2] = 5;
    this.posicionY[2] = 1;
    this.cuadrado3.applyMatrix (new THREE.Matrix4().makeTranslation(0,1,0));

    this.posicionX[3] = 4;
    this.posicionY[3] = 1;
    this.cuadrado4.applyMatrix (new THREE.Matrix4().makeTranslation(1,1,0));

    this.tetrimino.add(this.cuadrado1);
    this.tetrimino.add(this.cuadrado2);
    this.tetrimino.add(this.cuadrado3);
    this.tetrimino.add(this.cuadrado4);
    this.add(this.tetrimino);
    this.tetrimino.applyMatrix(new THREE.Matrix4().makeTranslation(0,7,0));
  }
  createtetriminoZ(){
      this.cuadrado1 = new Z();
      this.cuadrado2 = new Z();
      this.cuadrado3 = new Z();
      this.cuadrado4 = new Z();

      //posicion tetrimino en la matriz
      this.posicionX[0] = 5;
      this.posicionY[0] = 0;

      this.posicionX[1] = 4;
      this.posicionY[1] = 0;
      this.cuadrado2.applyMatrix (new THREE.Matrix4().makeTranslation(1,0,0));

      this.posicionX[2] = 5;
      this.posicionY[2] = 1;
      this.cuadrado3.applyMatrix (new THREE.Matrix4().makeTranslation(0,1,0));

      this.posicionX[3] = 6;
      this.posicionY[3] = 1;
      this.cuadrado4.applyMatrix (new THREE.Matrix4().makeTranslation(-1,1,0));

      this.tetrimino.add(this.cuadrado1);
      this.tetrimino.add(this.cuadrado2);
      this.tetrimino.add(this.cuadrado3);
      this.tetrimino.add(this.cuadrado4);
      this.add(this.tetrimino);
      this.tetrimino.applyMatrix(new THREE.Matrix4().makeTranslation(0,7,0));
  }
  createtetriminoT(){
      this.cuadrado1 = new T();
      this.cuadrado2 = new T();
      this.cuadrado3 = new T();
      this.cuadrado4 = new T();

      //posicion tetrimino en la matriz
      this.posicionX[0] = 5;
      this.posicionY[0] = 0;

      this.posicionX[1] = 4;
      this.posicionY[1] = 0;
      this.cuadrado2.applyMatrix (new THREE.Matrix4().makeTranslation(1,0,0));

      this.posicionX[2] = 6;
      this.posicionY[2] = 0;
      this.cuadrado3.applyMatrix (new THREE.Matrix4().makeTranslation(-1,0,0));

      this.posicionX[3] = 5;
      this.posicionY[3] = 1;

      this.cuadrado4.applyMatrix (new THREE.Matrix4().makeTranslation(0,-1,0));

      this.tetrimino.add(this.cuadrado1);
      this.tetrimino.add(this.cuadrado2);
      this.tetrimino.add(this.cuadrado3);
      this.tetrimino.add(this.cuadrado4);
      this.add(this.tetrimino);
      this.tetrimino.applyMatrix(new THREE.Matrix4().makeTranslation(0,8,0));
  }

  createCaja(){
      this.points = [];
      var ancho = 6;
      var alto = 9;
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

  puedeBajar(){
      var puedeBajar = true;
      var i=0;
      console.log("Veo si puede bajar");
      for (i=0; i<4; i++){
        console.log("posicionX: " + [this.posicionX[i]] + "posicionY: " + [this.posicionY[i]] );
        console.log("posicion matriz: " + this.matriz[this.posicionX[i]][this.posicionY[i]] + " posicion matriz +1: " + this.matriz[this.posicionX[i]][this.posicionY[i]+1] );
        if( this.matriz[this.posicionX[i]][this.posicionY[i]+1] != "V"){
              puedeBajar = false;
          }
          else if ( this.matriz[this.posicionX[i]][this.posicionY[i]+1] == "X") {
              this.colocado = true;
          }
      }
      return puedeBajar;
  }

  puedeIzquierda(){
      var puedeIzquierda = true;
      var i=0;
      console.log("Veo si puede izquierda");
      for (i=0; i<4; i++){
        console.log("posicionX: " + [this.posicionX[i]] + "posicionY: " + [this.posicionY[i]] );
        console.log("posicion matriz: " + this.matriz[this.posicionX[i]][this.posicionY[i]] + " posicion matriz +1: " + this.matriz[this.posicionX[i]+1][this.posicionY[i]] );
          if( this.matriz[this.posicionX[i]+1][this.posicionY[i]] != "V"){
              puedeIzquierda = false;
          }
           if ( this.colocado == true)
              puedeIzquierda = false;
      }
      return puedeIzquierda;
  }

  puedeDerecha(){
      var puedeDerecha = true;
      var i=0;
      console.log("Veo si puede derecha");
      for (i=0; i<4; i++){
        console.log("posicionX: " + [this.posicionX[i]] + "posicionY: " + [this.posicionY[i]] );
        console.log("posicion matriz: " + this.matriz[this.posicionX[i]][this.posicionY[i]] + " posicion matriz -1: " + this.matriz[this.posicionX[i]-1][this.posicionY[i]] );
          if( this.matriz[this.posicionX[i]-1][this.posicionY[i]] != "V"){
              puedeDerecha = false;
          }
          if ( this.colocado == true)
             puedeDerecha = false;

      }
      return puedeDerecha;
  }

  /*
  Key code derecha = 37
  Key code arriba = 38
  Key code izquierda = 39
  Key code abajo = 40
  */
  onDocumentKeyDown() {
      var i;
      var tecla = event.keyCode;
      switch (tecla) {
        case 37: //IIzquerda
            if( this.puedeIzquierda() ){
              this.tetrimino.position.x -= 1;
              for (i=0; i<4; i++){
                  this.posicionX[i] += 1;
              }
            }
          break;
        case 38: //ROTA
            this.tetrimino.rotation.z += THREE.Math.degToRad(90);
            //this.tetrimino.applyMatrix (new THREE.Matrix4().makeRotationZ(THREE.Math.degToRad(90)));
          break;
        case 39: //Derecha
            if( this.puedeDerecha() ){
              this.tetrimino.position.x += 1;
              for (i=0; i<4; i++){
                  this.posicionX[i] -= 1;
              }
            }
          break;
        case 40: //BAJA
            if( this.puedeBajar() ){
                this.tetrimino.position.y -= 1;
                for (i=0; i<4; i++){
                    this.posicionY[i] += 1;
                }
            }
          break;
      }
  };

  update () {
  }
}//cierre MyScene
