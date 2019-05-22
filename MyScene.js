
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
    this.colocados = new tetriminosColocados();
    this.add(this.colocados);
    /*
    V - vacio
    I, J, L, O, S, T, Z - forma de los tetriminos
    X - borde(ocupado)
    */
    var i, j;
    this.matriz = new Array(13);
    for (i=-1; i<this.matriz.length; i++){
        //console.log(i + "\n");
         this.matriz[i] = new Array(19);
         for (j=-1; j<this.matriz[i].length; j++){
             if(i==-1 || j==-1 || i==12 || j==18)
                this.matriz[i][j] = "X";
             else
               this.matriz[i][j] = "V";

             //console.log(this.matriz[i][j] + " " + j);
         }
        // console.log("\n");
     }

    /*this.axis = new THREE.AxesHelper (5);
    this.add (this.axis);*/

    this.createtetrimino();

    //Creacion del entorno tetris
    this.createCaja(); //11 ancho * 17 largo

  }

  createtetrimino(){
      this.tetrimino = new THREE.Object3D();
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
      this.tetrimino.position.set(0 , 8, 0);


  }

  createtetriminoI(){
      this.cuadrado1 = new I();
      this.cuadrado2 = new I();
      this.cuadrado3 = new I();
      this.cuadrado4 = new I();

      //posicion tetrimino en la matriz
      this.cuadrado1.posX = 5;
      this.cuadrado1.posY = 0;

      this.cuadrado2.posX = 5;
      this.cuadrado2.posY = 1;

      this.cuadrado3.posX = 5;
      this.cuadrado3.posY = 2;

      this.cuadrado4.posX = 5;
      this.cuadrado4.posY = 3;

      this.tetrimino.add(this.cuadrado1);
      this.tetrimino.add(this.cuadrado2);
      this.tetrimino.add(this.cuadrado3);
      this.tetrimino.add(this.cuadrado4);
      this.add(this.tetrimino);
  }

  createtetriminoJ(){
      this.cuadrado1 = new J();
      this.cuadrado2 = new J();
      this.cuadrado3 = new J();
      this.cuadrado4 = new J();

      //posicion tetrimino en la matriz
      this.cuadrado1.posX = 5;
      this.cuadrado1.posY = 0;

      this.cuadrado2.posX = 5;
      this.cuadrado2.posY = 1;

      this.cuadrado3.posX = 5;
      this.cuadrado3.posY = 2;

      this.cuadrado4.posX = 6;
      this.cuadrado4.posY = 2;

      this.tetrimino.add(this.cuadrado1);
      this.tetrimino.add(this.cuadrado2);
      this.tetrimino.add(this.cuadrado3);
      this.tetrimino.add(this.cuadrado4);
      this.add(this.tetrimino);
  }

  createtetriminoL(){
    this.cuadrado1 = new L();
    this.cuadrado2 = new L();
    this.cuadrado3 = new L();
    this.cuadrado4 = new L();

    //posicion tetrimino en la matriz
    this.cuadrado1.posX = 5;
    this.cuadrado1.posY = 0;

    this.cuadrado2.posX = 5;
    this.cuadrado2.posY = 1;

    this.cuadrado3.posX = 5;
    this.cuadrado3.posY = 2;

    this.cuadrado4.posX = 4;
    this.cuadrado4.posY = 2;

    this.tetrimino.add(this.cuadrado1);
    this.tetrimino.add(this.cuadrado2);
    this.tetrimino.add(this.cuadrado3);
    this.tetrimino.add(this.cuadrado4);
    this.add(this.tetrimino);
  }
  createtetriminoO(){
    this.cuadrado1 = new O();
    this.cuadrado2 = new O();
    this.cuadrado3 = new O();
    this.cuadrado4 = new O();

    //posicion tetrimino en la matriz
    this.cuadrado1.posX = 5;
    this.cuadrado1.posY = 0;

    this.cuadrado2.posX = 5;
    this.cuadrado2.posY = 1;

    this.cuadrado3.posX = 6;
    this.cuadrado3.posY = 0;

    this.cuadrado4.posX = 6;
    this.cuadrado4.posY = 1;

    this.tetrimino.add(this.cuadrado1);
    this.tetrimino.add(this.cuadrado2);
    this.tetrimino.add(this.cuadrado3);
    this.tetrimino.add(this.cuadrado4);
    this.add(this.tetrimino);
  }
  createtetriminoS(){
    this.cuadrado1 = new S();
    this.cuadrado2 = new S();
    this.cuadrado3 = new S();
    this.cuadrado4 = new S();

    //posicion tetrimino en la matriz
    this.cuadrado1.posX = 5;
    this.cuadrado1.posY = 0;

    this.cuadrado2.posX = 6;
    this.cuadrado2.posY = 0;

    this.cuadrado3.posX = 5;
    this.cuadrado3.posY = 1;

    this.cuadrado4.posX = 4;
    this.cuadrado4.posY = 1;

    this.tetrimino.add(this.cuadrado1);
    this.tetrimino.add(this.cuadrado2);
    this.tetrimino.add(this.cuadrado3);
    this.tetrimino.add(this.cuadrado4);
    this.add(this.tetrimino);
  }
  createtetriminoZ(){
      this.cuadrado1 = new Z();
      this.cuadrado2 = new Z();
      this.cuadrado3 = new Z();
      this.cuadrado4 = new Z();

      //posicion tetrimino en la matriz
      this.cuadrado1.posX = 5;
      this.cuadrado1.posY = 0;

      this.cuadrado2.posX = 6;
      this.cuadrado2.posY = 0;

      this.cuadrado3.posX = 5;
      this.cuadrado3.posY = 1;

      this.cuadrado4.posX = 4;
      this.cuadrado4.posY = 1;

      this.tetrimino.add(this.cuadrado1);
      this.tetrimino.add(this.cuadrado2);
      this.tetrimino.add(this.cuadrado3);
      this.tetrimino.add(this.cuadrado4);
      this.add(this.tetrimino);
  }
  createtetriminoT(){
      this.cuadrado1 = new T();
      this.cuadrado2 = new T();
      this.cuadrado3 = new T();
      this.cuadrado4 = new T();

      //posicion tetrimino en la matriz
      this.cuadrado1.posX = 5;
      this.cuadrado1.posY = 0;

      this.cuadrado2.posX = 4;
      this.cuadrado2.posY = 0;

      this.cuadrado3.posX = 6;
      this.cuadrado3.posY = 0;

      this.cuadrado4.posX = 5;
      this.cuadrado4.posY = 1;

      this.tetrimino.add(this.cuadrado1);
      this.tetrimino.add(this.cuadrado2);
      this.tetrimino.add(this.cuadrado3);
      this.tetrimino.add(this.cuadrado4);
      this.add(this.tetrimino);
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
      if(this.matriz[this.cuadrado1.posX][this.cuadrado1.posY+1] != "V" ||
        this.matriz[this.cuadrado2.posX][this.cuadrado2.posY+1] != "V" ||
        this.matriz[this.cuadrado3.posX][this.cuadrado3.posY+1] != "V" ||
        this.matriz[this.cuadrado4.posX][this.cuadrado4.posY+1] != "V")
        {
              puedeBajar = false;
          }
      return puedeBajar;
  }

  puedeIzquierda(){
      var puedeIzquierda = true;

      if(this.matriz[this.cuadrado1.posX+1][this.cuadrado1.posY] != "V" ||
        this.matriz[this.cuadrado2.posX+1][this.cuadrado2.posY] != "V" ||
        this.matriz[this.cuadrado3.posX+1][this.cuadrado3.posY] != "V" ||
        this.matriz[this.cuadrado4.posX+1][this.cuadrado4.posY] != "V")
        {
              puedeIzquierda = false;
      }
      return puedeIzquierda;
  }

  puedeDerecha(){
      var puedeDerecha = true;

      if(this.matriz[this.cuadrado1.posX-1][this.cuadrado1.posY] != "V" ||
        this.matriz[this.cuadrado2.posX-1][this.cuadrado2.posY] != "V" ||
        this.matriz[this.cuadrado3.posX-1][this.cuadrado3.posY] != "V" ||
        this.matriz[this.cuadrado4.posX-1][this.cuadrado4.posY] != "V")
        {
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
        case 37: //Izquerda
            if( this.puedeIzquierda() ){
              this.cuadrado1.posX += 1;
              this.cuadrado2.posX += 1;
              this.cuadrado3.posX += 1;
              this.cuadrado4.posX += 1;
            }
          break;
        case 38: //ROTA
            switch (this.cuadrado1.letra) {
                case "I":
                if(this.cuadrado1.tipo == 1) {
                    this.cuadrado1.posX -= 2;
                    this.cuadrado1.posY -= 0;

                    this.cuadrado2.posX -= 1;
                    this.cuadrado2.posY -= 1;

                    this.cuadrado3.posX -= 0;
                    this.cuadrado3.posY -= 2;

                    this.cuadrado4.posX += 1;
                    this.cuadrado4.posY -= 3;

                    this.cuadrado1.tipo = 2;
                    this.cuadrado2.tipo = 2;
                    this.cuadrado3.tipo = 2;
                    this.cuadrado4.tipo = 2;
              }
              else if(this.cuadrado1.tipo == 2) {
                    this.cuadrado1.posX += 2;
                    this.cuadrado1.posY += 0;

                    this.cuadrado2.posX += 1;
                    this.cuadrado2.posY += 1;

                    this.cuadrado3.posX += 0;
                    this.cuadrado3.posY += 2;

                    this.cuadrado4.posX -= 1;
                    this.cuadrado4.posY += 3;

                    this.cuadrado1.tipo = 1;
                    this.cuadrado2.tipo = 1;
                    this.cuadrado3.tipo = 1;
                    this.cuadrado4.tipo = 1;
                }

                case "L":
                if(this.cuadrado1.tipo == 1) {
                  this.cuadrado1.posX -= 1;
                  this.cuadrado1.posY -= 0;

                  this.cuadrado2.posX -= 0;
                  this.cuadrado2.posY -= 1;

                  this.cuadrado3.posX += 1;
                  this.cuadrado3.posY -= 2;

                  this.cuadrado4.posX += 2;
                  this.cuadrado4.posY -= 1;

                  this.cuadrado1.tipo = 2;
                  this.cuadrado2.tipo = 2;
                  this.cuadrado3.tipo = 2;
                  this.cuadrado4.tipo = 2;
              }
              else if(this.cuadrado1.tipo == 2) {
                  this.cuadrado1.posX += 0;
                  this.cuadrado1.posY += 1;

                  this.cuadrado2.posX -= 1;
                  this.cuadrado2.posY -= 0;

                  this.cuadrado3.posX -= 2;
                  this.cuadrado3.posY -= 1;

                  this.cuadrado4.posX -= 1;
                  this.cuadrado4.posY -= 2;

                  this.cuadrado1.tipo = 3;
                  this.cuadrado2.tipo = 3;
                  this.cuadrado3.tipo = 3;
                  this.cuadrado4.tipo = 3;
                }

                else if(this.cuadrado1.tipo == 3) {
                    this.cuadrado1.posX += 1;
                    this.cuadrado1.posY -= 0;

                    this.cuadrado2.posX += 0;
                    this.cuadrado2.posY += 1;

                    this.cuadrado3.posX -= 1;
                    this.cuadrado3.posY += 2;

                    this.cuadrado4.posX -= 2;
                    this.cuadrado4.posY += 1;

                    this.cuadrado1.tipo = 4;
                    this.cuadrado2.tipo = 4;
                    this.cuadrado3.tipo = 4;
                    this.cuadrado4.tipo = 4;
                  }

                  else if(this.cuadrado1.tipo == 4) {
                      this.cuadrado1.posX += 0;
                      this.cuadrado1.posY -= 1;

                      this.cuadrado2.posX += 1;
                      this.cuadrado2.posY += 0;

                      this.cuadrado3.posX += 2;
                      this.cuadrado3.posY += 1;

                      this.cuadrado4.posX += 1;
                      this.cuadrado4.posY += 2;

                      this.cuadrado1.tipo = 1;
                      this.cuadrado2.tipo = 1;
                      this.cuadrado3.tipo = 1;
                      this.cuadrado4.tipo = 1;
                    }
                    break;

                case "J":
                if(this.cuadrado1.tipo == 1) {
                  this.cuadrado1.posX -= 1;
                  this.cuadrado1.posY -= 0;

                  this.cuadrado2.posX -= 0;
                  this.cuadrado2.posY -= 1;

                  this.cuadrado3.posX += 1;
                  this.cuadrado3.posY -= 2;

                  this.cuadrado4.posX += 0;
                  this.cuadrado4.posY -= 3;

                  this.cuadrado1.tipo = 2;
                  this.cuadrado2.tipo = 2;
                  this.cuadrado3.tipo = 2;
                  this.cuadrado4.tipo = 2;
              }
              else if(this.cuadrado1.tipo == 2) {
                  this.cuadrado1.posX += 0;
                  this.cuadrado1.posY += 1;

                  this.cuadrado2.posX -= 1;
                  this.cuadrado2.posY -= 0;

                  this.cuadrado3.posX -= 2;
                  this.cuadrado3.posY -= 1;

                  this.cuadrado4.posX -= 3;
                  this.cuadrado4.posY -= 0;

                  this.cuadrado1.tipo = 3;
                  this.cuadrado2.tipo = 3;
                  this.cuadrado3.tipo = 3;
                  this.cuadrado4.tipo = 3;
                }

                else if(this.cuadrado1.tipo == 3) {
                    this.cuadrado1.posX += 1;
                    this.cuadrado1.posY -= 0;

                    this.cuadrado2.posX += 0;
                    this.cuadrado2.posY += 1;

                    this.cuadrado3.posX -= 1;
                    this.cuadrado3.posY += 2;

                    this.cuadrado4.posX -= 0;
                    this.cuadrado4.posY += 3;

                    this.cuadrado1.tipo = 4;
                    this.cuadrado2.tipo = 4;
                    this.cuadrado3.tipo = 4;
                    this.cuadrado4.tipo = 4;
                  }

                  else if(this.cuadrado1.tipo == 4) {
                      this.cuadrado1.posX += 0;
                      this.cuadrado1.posY -= 1;

                      this.cuadrado2.posX += 1;
                      this.cuadrado2.posY += 0;

                      this.cuadrado3.posX += 2;
                      this.cuadrado3.posY += 1;

                      this.cuadrado4.posX += 3;
                      this.cuadrado4.posY += 0;

                      this.cuadrado1.tipo = 1;
                      this.cuadrado2.tipo = 1;
                      this.cuadrado3.tipo = 1;
                      this.cuadrado4.tipo = 1;
                    }
                    break;

                case "Z":
                  if(this.cuadrado1.tipo == 1) {
                    this.cuadrado1.posX += 0;
                    this.cuadrado1.posY += 2;
                    this.cuadrado2.posX -= 2;
                    this.cuadrado2.posY += 0;
                    this.cuadrado3.posX += 0;
                    this.cuadrado3.posY -= 0;
                    this.cuadrado4.posX += 0;
                    this.cuadrado4.posY += 0;

                    this.cuadrado1.tipo = 2;
                    this.cuadrado2.tipo = 2;
                    this.cuadrado3.tipo = 2;
                    this.cuadrado4.tipo = 2;
                }
                else if(this.cuadrado1.tipo == 2) {
                  this.cuadrado1.posX -= 0;
                  this.cuadrado1.posY -= 2;
                  this.cuadrado2.posX += 2;
                  this.cuadrado2.posY -= 0;
                  this.cuadrado3.posX += 0;
                  this.cuadrado3.posY -= 0;
                  this.cuadrado4.posX += 0;
                  this.cuadrado4.posY += 0;


                  this.cuadrado1.tipo = 1;
                  this.cuadrado2.tipo = 1;
                  this.cuadrado3.tipo = 1;
                  this.cuadrado4.tipo = 1;
                  }

                  break;
            }
            break;

        case 39: //Derecha
            if( this.puedeDerecha() ){
              this.cuadrado1.posX -= 1;
              this.cuadrado2.posX -= 1;
              this.cuadrado3.posX -= 1;
              this.cuadrado4.posX -= 1;
            }
          break;
        case 40: //BAJA
            if( this.puedeBajar() ){
                this.cuadrado1.posY += 1;
                this.cuadrado2.posY += 1;
                this.cuadrado3.posY += 1;
                this.cuadrado4.posY += 1;
            }
          break;
      }
  };

  update () {
    this.cameraControl.update();

    var i=0;
    var tiempoActual = Date.now(); //Tiempo en milisegundos
    var segundosTranscurridos = (tiempoActual - this.tiempoAnterior)/1000;

    if(segundosTranscurridos >= 1){ //Si no ha transcurrido X segundo(s)
        var puedeBajar = this.puedeBajar();
        if(puedeBajar){
            /*this.cuadrado1.posY += 1;
            this.cuadrado2.posY += 1;
            this.cuadrado3.posY += 1;
            this.cuadrado4.posY += 1;*/
        }
        else{

            if(this.cuadrado1.posY == 0 || this.cuadrado2.posY == 0 || this.cuadrado3.posY == 0 || this.cuadrado4.posY == 0){
                //se acaba el juego
            }
            else{

                this.matriz[this.cuadrado1.posX][this.cuadrado1.posY] = this.cuadrado1.letra;
                this.matriz[this.cuadrado2.posX][this.cuadrado2.posY] = this.cuadrado2.letra;
                this.matriz[this.cuadrado3.posX][this.cuadrado3.posY] = this.cuadrado3.letra;
                this.matriz[this.cuadrado4.posX][this.cuadrado4.posY] = this.cuadrado4.letra;

                this.remove(this.cuadrado1);
                this.colocados.add(this.cuadrado1);
                this.cuadrado1.position.set(5-this.cuadrado1.posX, 8-this.cuadrado1.posY, 0);
                this.remove(this.cuadrado2);
                this.colocados.add(this.cuadrado2);
                this.cuadrado2.position.set(5-this.cuadrado2.posX, 8-this.cuadrado2.posY, 0);
                this.remove(this.cuadrado3);
                this.colocados.add(this.cuadrado3);
                this.cuadrado3.position.set(5-this.cuadrado3.posX, 8-this.cuadrado3.posY, 0);
                this.remove(this.cuadrado4);
                this.colocados.add(this.cuadrado4);
                this.cuadrado4.position.set(5-this.cuadrado4.posX, 8-this.cuadrado4.posY, 0);
                this.createtetrimino();

                this.colocados.comprobarFilas();
            }
        }

        this.cuadrado1.position.set(5-this.cuadrado1.posX, -this.cuadrado1.posY, 0);
        this.cuadrado2.position.set(5-this.cuadrado2.posX, -this.cuadrado2.posY, 0);
        this.cuadrado3.position.set(5-this.cuadrado3.posX, -this.cuadrado3.posY, 0);
        this.cuadrado4.position.set(5-this.cuadrado4.posX, -this.cuadrado4.posY, 0);


    }//si ha pasado tiempo

  }//cierre update()

}//cierre MyScene
