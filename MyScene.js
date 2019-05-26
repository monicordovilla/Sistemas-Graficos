//MyScene: Clase fachada del modelo, derivada de la clase Scene de Three.js, la usaremos para llevar el control de la escena y de todo lo que ocurre en ella.

class MyScene extends THREE.Scene {
  constructor (unRenderer) {
    super();

    // Se crea la gui de la escena
    this.createGUI();

    // Se crean las luces de la escena
    this.createLights ();

    // Se crea la camara de la escena
    this.createCamera (unRenderer);

    // Tiempos en milisegundos
    this.tiempoAnterior = Date.now();
    this.tiempoInicial = Date.now();

    // Tetriminos que ya estan colocados como bloque en la parte inferior del juego
    this.colocados = new tetriminosColocados();
    this.add(this.colocados);                     //Los añadimos a la escena

    // Se crea una matriz que va a representar de forma logica el juego, con valores:
    // V                     - Representa una posicion vacia
    // I, J, L, O, S, T, Z   - Representa una posicion ocupada por algun tetrimino
    // X                     - Representa el limite de la escena de juego

    //Se inicializa la matriz en V, excepto los limites como X
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

    // Creamos el tetrimino del juego
    this.createtetrimino();

    // Creamos el entorno de juego: 11 ancho * 17 largo
    this.createCaja();

    //Creamos la musica de ambiente
    this.createAudio();
  }

  // Funcion para la creacion del audio
  createAudio(){

      // Se crea un AudioListener y se añade a la cámara
      var listener = new THREE.AudioListener();
      this.camera.add( listener );

      // Se crea una fuente de audio global
      var sound = new THREE.Audio( listener );

      // Se carga el sonido
      var audioLoader = new THREE.AudioLoader();
      audioLoader.load( 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Tetris_theme.ogg', function( buffer ) {
          sound.setBuffer( buffer );   // Se configura como el búfer de objeto de audio
          sound.setLoop( true );       // Se establece que se repite en bucle
          sound.setVolume( 0.5 );      // Se establece el volumen
          sound.play();                // Se reproduce
      });

      //sacado de documentación three.js webaudio / sandbox
      //https://github.com/mrdoob/three.js/blob/master/examples/webaudio_sandbox.html
      // Se establecen los controles de sonido
      var SoundControls = function () {
          this.master = listener.getMasterVolume();
          this.Ambient = sound.getVolume();
     };

     // Se crean los controles del sonido
      var soundControls = new SoundControls();

      // Se crea una seccion para los controles de sonido
      var folder = gui.addFolder ('Control de volumen');

      // Se le añade un control para cambiar el volumen del sonido
      folder.add( soundControls, 'Ambient' ).min( 0.0 ).max( 1.0 ).step( 0.01 ).onChange( function () {
          sound.setVolume( soundControls.Ambient );
      } );

  }

  // Funcion para la creacion del tetrimino
  createtetrimino(){

      //Creamos el tetrimino con un valor aleatorio de juego
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

      //Establecemos la posicion del tetrimino
      this.tetrimino.position.set(0 , 8, 0);
  }

  //Funciones para crear tetriminos concretos
  createtetriminoI(){

      // Se crean los cuadrados de la clase del tetrimino
      this.cuadrado1 = new I();
      this.cuadrado2 = new I();
      this.cuadrado3 = new I();
      this.cuadrado4 = new I();

      // Se establece la posicion tetrimino en la matriz (de cada cuadrado)
      this.cuadrado1.posX = 5;
      this.cuadrado1.posY = 0;

      this.cuadrado2.posX = 5;
      this.cuadrado2.posY = 1;

      this.cuadrado3.posX = 5;
      this.cuadrado3.posY = 2;

      this.cuadrado4.posX = 5;
      this.cuadrado4.posY = 3;

      // Se añaden los cuadrados al tetrimino
      this.tetrimino.add(this.cuadrado1);
      this.tetrimino.add(this.cuadrado2);
      this.tetrimino.add(this.cuadrado3);
      this.tetrimino.add(this.cuadrado4);

      // Se añade el tetrimino a la escena
      this.add(this.tetrimino);
  }

  createtetriminoJ(){

      // Se crean los cuadrados de la clase del tetrimino
      this.cuadrado1 = new J();
      this.cuadrado2 = new J();
      this.cuadrado3 = new J();
      this.cuadrado4 = new J();

      // Se establece la posicion tetrimino en la matriz (de cada cuadrado)
      this.cuadrado1.posX = 5;
      this.cuadrado1.posY = 0;

      this.cuadrado2.posX = 5;
      this.cuadrado2.posY = 1;

      this.cuadrado3.posX = 5;
      this.cuadrado3.posY = 2;

      this.cuadrado4.posX = 6;
      this.cuadrado4.posY = 2;

      // Se añaden los cuadrados al tetrimino
      this.tetrimino.add(this.cuadrado1);
      this.tetrimino.add(this.cuadrado2);
      this.tetrimino.add(this.cuadrado3);
      this.tetrimino.add(this.cuadrado4);

      // Se añade el tetrimino a la escena
      this.add(this.tetrimino);
  }

  createtetriminoL(){

    // Se crean los cuadrados de la clase del tetrimino
    this.cuadrado1 = new L();
    this.cuadrado2 = new L();
    this.cuadrado3 = new L();
    this.cuadrado4 = new L();

    // Se establece la posicion tetrimino en la matriz (de cada cuadrado)
    this.cuadrado1.posX = 5;
    this.cuadrado1.posY = 0;

    this.cuadrado2.posX = 5;
    this.cuadrado2.posY = 1;

    this.cuadrado3.posX = 5;
    this.cuadrado3.posY = 2;

    this.cuadrado4.posX = 4;
    this.cuadrado4.posY = 2;

    // Se añaden los cuadrados al tetrimino
    this.tetrimino.add(this.cuadrado1);
    this.tetrimino.add(this.cuadrado2);
    this.tetrimino.add(this.cuadrado3);
    this.tetrimino.add(this.cuadrado4);

    // Se añade el tetrimino a la escena
    this.add(this.tetrimino);
  }

  createtetriminoO(){

    // Se crean los cuadrados de la clase del tetrimino
    this.cuadrado1 = new O();
    this.cuadrado2 = new O();
    this.cuadrado3 = new O();
    this.cuadrado4 = new O();

    // Se establece la posicion tetrimino en la matriz (de cada cuadrado)
    this.cuadrado1.posX = 5;
    this.cuadrado1.posY = 0;

    this.cuadrado2.posX = 5;
    this.cuadrado2.posY = 1;

    this.cuadrado3.posX = 6;
    this.cuadrado3.posY = 0;

    this.cuadrado4.posX = 6;
    this.cuadrado4.posY = 1;

    // Se añaden los cuadrados al tetrimino
    this.tetrimino.add(this.cuadrado1);
    this.tetrimino.add(this.cuadrado2);
    this.tetrimino.add(this.cuadrado3);
    this.tetrimino.add(this.cuadrado4);

    // Se añade el tetrimino a la escena
    this.add(this.tetrimino);
  }

  createtetriminoS(){

    // Se crean los cuadrados de la clase del tetrimino
    this.cuadrado1 = new S();
    this.cuadrado2 = new S();
    this.cuadrado3 = new S();
    this.cuadrado4 = new S();

    // Se establece la posicion tetrimino en la matriz (de cada cuadrado)
    this.cuadrado1.posX = 5;
    this.cuadrado1.posY = 0;

    this.cuadrado2.posX = 4;
    this.cuadrado2.posY = 0;

    this.cuadrado3.posX = 5;
    this.cuadrado3.posY = 1;

    this.cuadrado4.posX = 6;
    this.cuadrado4.posY = 1;

    // Se añaden los cuadrados al tetrimino
    this.tetrimino.add(this.cuadrado1);
    this.tetrimino.add(this.cuadrado2);
    this.tetrimino.add(this.cuadrado3);
    this.tetrimino.add(this.cuadrado4);

    // Se añade el tetrimino a la escena
    this.add(this.tetrimino);
  }

  createtetriminoZ(){

      // Se crean los cuadrados de la clase del tetrimino
      this.cuadrado1 = new Z();
      this.cuadrado2 = new Z();
      this.cuadrado3 = new Z();
      this.cuadrado4 = new Z();

      // Se establece la posicion tetrimino en la matriz (de cada cuadrado)
      this.cuadrado1.posX = 5;
      this.cuadrado1.posY = 0;

      this.cuadrado2.posX = 6;
      this.cuadrado2.posY = 0;

      this.cuadrado3.posX = 5;
      this.cuadrado3.posY = 1;

      this.cuadrado4.posX = 4;
      this.cuadrado4.posY = 1;

      // Se añaden los cuadrados al tetrimino
      this.tetrimino.add(this.cuadrado1);
      this.tetrimino.add(this.cuadrado2);
      this.tetrimino.add(this.cuadrado3);
      this.tetrimino.add(this.cuadrado4);

      // Se añade el tetrimino a la escena
      this.add(this.tetrimino);
  }

  createtetriminoT(){

      // Se crean los cuadrados de la clase del tetrimino
      this.cuadrado1 = new T();
      this.cuadrado2 = new T();
      this.cuadrado3 = new T();
      this.cuadrado4 = new T();

      // Se establece la posicion tetrimino en la matriz (de cada cuadrado)
      this.cuadrado1.posX = 5;
      this.cuadrado1.posY = 0;

      this.cuadrado2.posX = 4;
      this.cuadrado2.posY = 0;

      this.cuadrado3.posX = 6;
      this.cuadrado3.posY = 0;

      this.cuadrado4.posX = 5;
      this.cuadrado4.posY = 1;

      // Se añaden los cuadrados al tetrimino
      this.tetrimino.add(this.cuadrado1);
      this.tetrimino.add(this.cuadrado2);
      this.tetrimino.add(this.cuadrado3);
      this.tetrimino.add(this.cuadrado4);

      // Se añade el tetrimino a la escena
      this.add(this.tetrimino);
  }

  //Funcion que crea el entorno de juego
  createCaja(){
      this.points = [];
      var ancho = 6;
      var alto = 9;

      //Se establecen las coordenadas del cuadrado a crear
      this.points.push( new THREE.Vector3(-ancho,  alto));
      this.points.push( new THREE.Vector3(ancho,  alto));
      this.points.push( new THREE.Vector3(ancho,  -alto));
      this.points.push( new THREE.Vector3(-ancho,  -alto));
      this.points.push( new THREE.Vector3(-ancho,  alto));

      //Se establecen las coordenadas a la geometria del cuadrado
      this.lineGeometry = new THREE.Geometry();
      this.lineGeometry.vertices = this.points;

      //Se crea el material
      this.material = new THREE.MeshNormalMaterial({color: 0xCF0000});

      //Se crea el entorno con la geometria y el material establecido
      this.line = new THREE.Line (this.lineGeometry, this.material);

      //Se añade el entorno a la escena
      this.add(this.line);
  }

  //Funcion para crear la camara
  createCamera (unRenderer) {

    // Para crear una cámara le indicamos
    //   El ángulo del campo de visión en grados sexagesimales
    //   La razón de aspecto ancho/alto
    //   Los planos de recorte cercano y lejano
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // También se indica dónde se coloca
    this.camera.position.set (0, 0, 22);

    // Y hacia dónde mira
    var look = new THREE.Vector3 (0,0,0);
    this.camera.lookAt(look);

    // La añadimos a la escena
    this.add (this.camera);

    // Para el control de cámara usamos una clase que ya tiene implementado los movimientos de órbita
    this.cameraControl = new THREE.TrackballControls (this.camera, unRenderer);

    // Se configuran las velocidades de los movimientos
    this.cameraControl.rotateSpeed = 5;
    this.cameraControl.zoomSpeed = -2;
    this.cameraControl.panSpeed = 0.5;

    // Debe orbitar con respecto al punto de mira de la cámara
    this.cameraControl.target = look;
  }

  //Funcion para crear la gui de la escena
  createGUI() {
      this.guiControls = new function() {
      }
  }

  //Funcion para crear las luces de la escena
  createLights () {

    // Se crea una luz ambiental, evita que se vean complentamente negras las zonas donde no incide de manera directa una fuente de luz
    // La luz ambiental solo tiene un color y una intensidad
    // Se declara como var y va a ser una variable local a este método
    //    se hace así puesto que no va a ser accedida desde otros métodos
    var ambientLight = new THREE.AmbientLight(0xccddee, 0.35);

    // La añadimos a la escena
    this.add (ambientLight);

    // Se crea una luz focal que va a ser la luz principal de la escena
    // La luz focal, además tiene una posición, y un punto de mira
    // Si no se le da punto de mira, apuntará al (0,0,0) en coordenadas del mundo
    // En este caso se declara como   this.atributo   para que sea un atributo accesible desde otros métodos.
    this.spotLight = new THREE.SpotLight( 0xffffff, this.guiControls.lightIntensity );
    this.spotLight.position.set( 60, 60, 40 );
    this.add (this.spotLight);
  }

  //Funcion para obtener la camara
  getCamera () {
    // En principio se devuelve la única cámara que tenemos
    // Si hubiera varias cámaras, este método decidiría qué cámara devuelve cada vez que es consultado
    return this.camera;
  }

  //Funcion para establecer el aspecto de la camara
  setCameraAspect (ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }

  //Funcion que determina si el tetrimino puede bajar
  puedeBajar(){
      var puedeBajar = true;

      //Si las posiciones de la forntera inferior de todos los cuadrados estan vacias puede bajar, en caso contrario no
      if(this.matriz[this.cuadrado1.posX][this.cuadrado1.posY+1] != "V" ||
         this.matriz[this.cuadrado2.posX][this.cuadrado2.posY+1] != "V" ||
         this.matriz[this.cuadrado3.posX][this.cuadrado3.posY+1] != "V" ||
         this.matriz[this.cuadrado4.posX][this.cuadrado4.posY+1] != "V") {
              puedeBajar = false;
      }

      return puedeBajar;
  }

  //Funcion que determina si el tetrimino puede desplazarse hacia la izquierda
  puedeIzquierda(){
      var puedeIzquierda = true;

      //Si las posiciones de la frontera izquierda de todos los cuadrados estan vacias puede desplazarse, en caso contrario no
      if(this.matriz[this.cuadrado1.posX+1][this.cuadrado1.posY] != "V" ||
         this.matriz[this.cuadrado2.posX+1][this.cuadrado2.posY] != "V" ||
         this.matriz[this.cuadrado3.posX+1][this.cuadrado3.posY] != "V" ||
         this.matriz[this.cuadrado4.posX+1][this.cuadrado4.posY] != "V") {
              puedeIzquierda = false;
      }

      return puedeIzquierda;
  }

  //Funcion que determina si el tetrimino puede desplazarse hacia la derecha
  puedeDerecha(){
      var puedeDerecha = true;

      //Si las posiciones de la frontera derecha de todos los cuadrados estan vacias puede desplazarse, en caso contrario no
      if(this.matriz[this.cuadrado1.posX-1][this.cuadrado1.posY] != "V" ||
         this.matriz[this.cuadrado2.posX-1][this.cuadrado2.posY] != "V" ||
         this.matriz[this.cuadrado3.posX-1][this.cuadrado3.posY] != "V" ||
         this.matriz[this.cuadrado4.posX-1][this.cuadrado4.posY] != "V") {
              puedeDerecha = false;
      }

      return puedeDerecha;
  }

  //Funcion que determina si el tetrimino puede rotar
  puedeRotar(m1x, m1y, m2x, m2y, m3x, m3y, m4x, m4y){

      // Si el tetrimino al rotar no supera los limites de la escena de juego puede rotar, en caso contrario no
      if(this.cuadrado1.posX+m1x <= 0 && this.cuadrado1.posX+m1x > 12 &&
         this.cuadrado1.posX+m2x <= 0 && this.cuadrado1.posX+m2x > 12 &&
         this.cuadrado1.posX+m3x <= 0 && this.cuadrado1.posX+m3x > 12 &&
         this.cuadrado1.posX+m4x <= 0 && this.cuadrado1.posX+m4x > 12 ){
            return false
      }

      // El tetrimino solo puede rotar si al rotar todas sus posiciones siguen en posiciones vacias, en caso contrario no
      if(this.matriz[this.cuadrado1.posX+m1x][this.cuadrado1.posY+m1y] != "V" ||
         this.matriz[this.cuadrado2.posX+m2x][this.cuadrado2.posY+m2y] != "V" ||
         this.matriz[this.cuadrado3.posX+m3x][this.cuadrado3.posY+m3y] != "V" ||
         this.matriz[this.cuadrado4.posX+m4x][this.cuadrado4.posY+m4y] != "V" ){
              return false;
      }

      return true;
  }

  /*
  Key code derecha = 37
  Key code arriba = 38
  Key code izquierda = 39
  Key code abajo = 40
  */

  //Funcion que procesa los eventos de las teclas
  onDocumentKeyDown() {
      var i;
      var tecla = event.keyCode;

      //Dependiendo de la tecla que ha generado el evento se realiza una funcionalidad u otra
      switch (tecla) {
        //Evento producido por la tecla izquierda, DESPLAZAMIENTO HACIA LA IZQUIERDA
        case 37:
            if( this.puedeIzquierda() ){  //Se comprueba si se puede mover hacia la izquierda y se actualiza la posicion
              this.cuadrado1.posX += 1;
              this.cuadrado2.posX += 1;
              this.cuadrado3.posX += 1;
              this.cuadrado4.posX += 1;
            }
          break;

        //Evento producido por la tecla arriba, ROTACION
        case 38:
        var angulo = THREE.Math.degToRad(90);
            //En funcion de la letra y la posicion en la que este va a rotar de una u otra forma, SIEMPRE comprobandose si se puede
            switch (this.cuadrado1.letra) {
                case "I":
                    //Si esta en la posicion 1
                    if(this.cuadrado1.tipo == 1 && this.puedeRotar(-2,0,-1,-1,0,-2,1,-3)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX -= 2;
                      this.cuadrado1.posY -= 0;

                      this.cuadrado2.posX -= 1;
                      this.cuadrado2.posY -= 1;

                      this.cuadrado3.posX += 0;
                      this.cuadrado3.posY -= 2;

                      this.cuadrado4.posX += 1;
                      this.cuadrado4.posY -= 3;

                      //Pasamos a la posicion 2
                      this.cuadrado1.tipo = 2;
                      this.cuadrado2.tipo = 2;
                      this.cuadrado3.tipo = 2;
                      this.cuadrado4.tipo = 2;

                    }
                    //Si esta en la posicion 2
                    else if(this.cuadrado1.tipo == 2 && this.puedeRotar(2,0,1,1,0,2,-1,3)){
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX += 2;
                      this.cuadrado1.posY -= 0;

                      this.cuadrado2.posX += 1;
                      this.cuadrado2.posY += 1;

                      this.cuadrado3.posX += 0;
                      this.cuadrado3.posY += 2;

                      this.cuadrado4.posX -= 1;
                      this.cuadrado4.posY += 3;

                      //Pasamos de nuevo a la posicion 1
                      this.cuadrado1.tipo = 1;
                      this.cuadrado2.tipo = 1;
                      this.cuadrado3.tipo = 1;
                      this.cuadrado4.tipo = 1;
                    }

                    break;

                case "J":
                    //Si esta en la posicion 1
                    if(this.cuadrado1.tipo == 1 && this.puedeRotar(-1,0,0,-1,1,-2,0,-3)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX -= 1;
                      this.cuadrado1.posY -= 0;

                      this.cuadrado2.posX -= 0;
                      this.cuadrado2.posY -= 1;

                      this.cuadrado3.posX += 1;
                      this.cuadrado3.posY -= 2;

                      this.cuadrado4.posX += 0;
                      this.cuadrado4.posY -= 3;

                      //Pasamos a la posicion 2
                      this.cuadrado1.tipo = 2;
                      this.cuadrado2.tipo = 2;
                      this.cuadrado3.tipo = 2;
                      this.cuadrado4.tipo = 2;
                  }
                  //Si esta en la posicion 2
                  else if(this.cuadrado1.tipo == 2 && this.puedeRotar(0,1,-1,0,-2,-1,-3,0)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX += 0;
                      this.cuadrado1.posY += 1;

                      this.cuadrado2.posX -= 1;
                      this.cuadrado2.posY -= 0;

                      this.cuadrado3.posX -= 2;
                      this.cuadrado3.posY -= 1;

                      this.cuadrado4.posX -= 3;
                      this.cuadrado4.posY -= 0;

                      //Pasamos a la posicion 3
                      this.cuadrado1.tipo = 3;
                      this.cuadrado2.tipo = 3;
                      this.cuadrado3.tipo = 3;
                      this.cuadrado4.tipo = 3;
                  }

                  //Si esta en la posicion 3
                  else if(this.cuadrado1.tipo == 3 && this.puedeRotar(1,0,0,1,-1,2,0,3)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX += 1;
                      this.cuadrado1.posY += 0;

                      this.cuadrado2.posX += 0;
                      this.cuadrado2.posY += 1;

                      this.cuadrado3.posX -= 1;
                      this.cuadrado3.posY += 2;

                      this.cuadrado4.posX -= 0;
                      this.cuadrado4.posY += 3;

                      //Pasamos a la posicion 4
                      this.cuadrado1.tipo = 4;
                      this.cuadrado2.tipo = 4;
                      this.cuadrado3.tipo = 4;
                      this.cuadrado4.tipo = 4;
                  }

                  //Si esta en la posicion 4
                  else if(this.cuadrado1.tipo == 4 && this.puedeRotar(0,-1,1,0,2,1,3,0)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX += 0;
                      this.cuadrado1.posY -= 1;

                      this.cuadrado2.posX += 1;
                      this.cuadrado2.posY += 0;

                      this.cuadrado3.posX += 2;
                      this.cuadrado3.posY += 1;

                      this.cuadrado4.posX += 3;
                      this.cuadrado4.posY += 0;

                      //Pasamos de nuevo a la posicion 1
                      this.cuadrado1.tipo = 1;
                      this.cuadrado2.tipo = 1;
                      this.cuadrado3.tipo = 1;
                      this.cuadrado4.tipo = 1;
                  }

                  break;

              case "L":
                  //Si esta en la posicion 1
                  if(this.cuadrado1.tipo == 1 && this.puedeRotar(-1,0,0,-1,1,-2,2,-1)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX -= 1;
                      this.cuadrado1.posY -= 0;

                      this.cuadrado2.posX -= 0;
                      this.cuadrado2.posY -= 1;

                      this.cuadrado3.posX += 1;
                      this.cuadrado3.posY -= 2;

                      this.cuadrado4.posX += 2;
                      this.cuadrado4.posY -= 1;

                      //Pasamos a la posicion 2
                      this.cuadrado1.tipo = 2;
                      this.cuadrado2.tipo = 2;
                      this.cuadrado3.tipo = 2;
                      this.cuadrado4.tipo = 2;
                  }

                  //Si esta en la posicion 2
                  else if(this.cuadrado1.tipo == 2 && this.puedeRotar(0,1,-1,0,-2,-1,-1,-2)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX += 0;
                      this.cuadrado1.posY += 1;

                      this.cuadrado2.posX -= 1;
                      this.cuadrado2.posY -= 0;

                      this.cuadrado3.posX -= 2;
                      this.cuadrado3.posY -= 1;

                      this.cuadrado4.posX -= 1;
                      this.cuadrado4.posY -= 2;

                      //Pasamos a la posicion 3
                      this.cuadrado1.tipo = 3;
                      this.cuadrado2.tipo = 3;
                      this.cuadrado3.tipo = 3;
                      this.cuadrado4.tipo = 3;
                    }

                  //Si esta en la posicion 3
                  else if(this.cuadrado1.tipo == 3 && this.puedeRotar(1,0,0,1,-1,2,-2,1)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX += 1;
                      this.cuadrado1.posY += 0;

                      this.cuadrado2.posX += 0;
                      this.cuadrado2.posY += 1;

                      this.cuadrado3.posX -= 1;
                      this.cuadrado3.posY += 2;

                      this.cuadrado4.posX -= 2;
                      this.cuadrado4.posY += 1;

                      //Pasamos a la posicion 4
                      this.cuadrado1.tipo = 4;
                      this.cuadrado2.tipo = 4;
                      this.cuadrado3.tipo = 4;
                      this.cuadrado4.tipo = 4;
                  }

                  //Si esta en la posicion 4
                  else if(this.cuadrado1.tipo == 4 && this.puedeRotar(0,-1,1,0,2,1,1,2)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX += 0;
                      this.cuadrado1.posY -= 1;

                      this.cuadrado2.posX += 1;
                      this.cuadrado2.posY += 0;

                      this.cuadrado3.posX += 2;
                      this.cuadrado3.posY += 1;

                      this.cuadrado4.posX += 1;
                      this.cuadrado4.posY += 2;

                      //Pasamos de nuevo a la posicion 1
                      this.cuadrado1.tipo = 1;
                      this.cuadrado2.tipo = 1;
                      this.cuadrado3.tipo = 1;
                      this.cuadrado4.tipo = 1;
                  }

                  break;

              case "Z":
                  //Si esta en la posicion 1
                  if(this.cuadrado1.tipo == 1 && this.puedeRotar(0,2,-2,0,0,0,0,0)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX += 0;
                      this.cuadrado1.posY += 2;

                      this.cuadrado2.posX -= 2;
                      this.cuadrado2.posY += 0;

                      this.cuadrado3.posX += 0;
                      this.cuadrado3.posY -= 0;

                      this.cuadrado4.posX += 0;
                      this.cuadrado4.posY += 0;

                      //Pasamos a la posicion 2
                      this.cuadrado1.tipo = 2;
                      this.cuadrado2.tipo = 2;
                      this.cuadrado3.tipo = 2;
                      this.cuadrado4.tipo = 2;
                  }

                  //Si esta en la posicion 2
                  else if(this.cuadrado1.tipo == 2 && this.puedeRotar(0,-2,+2,0,0,0,0,0)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX -= 0;
                      this.cuadrado1.posY -= 2;

                      this.cuadrado2.posX += 2;
                      this.cuadrado2.posY -= 0;

                      this.cuadrado3.posX += 0;
                      this.cuadrado3.posY -= 0;

                      this.cuadrado4.posX += 0;
                      this.cuadrado4.posY += 0;

                      //Pasamos de nuevo a la posicion 1
                      this.cuadrado1.tipo = 1;
                      this.cuadrado2.tipo = 1;
                      this.cuadrado3.tipo = 1;
                      this.cuadrado4.tipo = 1;
                  }

                  break;

              case "S":
                  //Si esta en la posicion 1
                  if(this.cuadrado1.tipo == 1 && this.puedeRotar(1,0,1,2,0,0,0,0)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX += 1;
                      this.cuadrado1.posY += 0;

                      this.cuadrado2.posX += 1;
                      this.cuadrado2.posY += 2;

                      this.cuadrado3.posX += 0;
                      this.cuadrado3.posY -= 0;

                      this.cuadrado4.posX += 0;
                      this.cuadrado4.posY += 0;

                      //Pasamos a la posicion 2
                      this.cuadrado1.tipo = 2;
                      this.cuadrado2.tipo = 2;
                      this.cuadrado3.tipo = 2;
                      this.cuadrado4.tipo = 2;
                  }

                  //Si esta en la posicion 2
                  else if(this.cuadrado1.tipo == 2 && this.puedeRotar(-1,0,-1,-2,0,0,0,0)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX -= 1;
                      this.cuadrado1.posY -= 0;

                      this.cuadrado2.posX -= 1;
                      this.cuadrado2.posY -= 2;

                      this.cuadrado3.posX += 0;
                      this.cuadrado3.posY -= 0;

                      this.cuadrado4.posX += 0;
                      this.cuadrado4.posY += 0;

                      //Pasamos de nuevo a la posicion 1
                      this.cuadrado1.tipo = 1;
                      this.cuadrado2.tipo = 1;
                      this.cuadrado3.tipo = 1;
                      this.cuadrado4.tipo = 1;
                  }

                  break;

              case "T":
                  //Si esta en la posicion 1
                  if(this.cuadrado1.tipo == 1 && this.puedeRotar(0,0,1,-1,-1,1,1,-1)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX += 0;
                      this.cuadrado1.posY += 0;

                      this.cuadrado2.posX += 1;
                      this.cuadrado2.posY -= 1;

                      this.cuadrado3.posX -= 1;
                      this.cuadrado3.posY += 1;

                      this.cuadrado4.posX += 1;
                      this.cuadrado4.posY -= 1;

                      //Pasamos a la posicion 2
                      this.cuadrado1.tipo = 2;
                      this.cuadrado2.tipo = 2;
                      this.cuadrado3.tipo = 2;
                      this.cuadrado4.tipo = 2;
                  }

                  //Si esta en la posicion 2
                  else if(this.cuadrado1.tipo == 2 && this.puedeRotar(0,0,1,1,-1,-1,-1,-1)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX -= 0;
                      this.cuadrado1.posY -= 0;

                      this.cuadrado2.posX += 1;
                      this.cuadrado2.posY += 1;

                      this.cuadrado3.posX -= 1;
                      this.cuadrado3.posY -= 1;

                      this.cuadrado4.posX -= 1;
                      this.cuadrado4.posY -= 1;

                      //Pasamos a la posicion 3
                      this.cuadrado1.tipo = 3;
                      this.cuadrado2.tipo = 3;
                      this.cuadrado3.tipo = 3;
                      this.cuadrado4.tipo = 3;
                  }

                  //Si esta en la posicion 3
                  else if(this.cuadrado1.tipo == 3 && this.puedeRotar(0,0,-1,1,1,-1,-1,1)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX -= 0;
                      this.cuadrado1.posY -= 0;

                      this.cuadrado2.posX -= 1;
                      this.cuadrado2.posY += 1;

                      this.cuadrado3.posX += 1;
                      this.cuadrado3.posY -= 1;

                      this.cuadrado4.posX -= 1;
                      this.cuadrado4.posY += 1;

                      //Pasamos a la posicion 4
                      this.cuadrado1.tipo = 4;
                      this.cuadrado2.tipo = 4;
                      this.cuadrado3.tipo = 4;
                      this.cuadrado4.tipo = 4;
                    }

                  //Si esta en la posicion 4
                  else if(this.cuadrado1.tipo == 4 && this.puedeRotar(0,0,-1,-1,1,1,1,1)) {
                      //Se establecen las nuevas posiciones
                      this.cuadrado1.posX -= 0;
                      this.cuadrado1.posY -= 0;

                      this.cuadrado2.posX -= 1;
                      this.cuadrado2.posY -= 1;

                      this.cuadrado3.posX += 1;
                      this.cuadrado3.posY += 1;

                      this.cuadrado4.posX += 1;
                      this.cuadrado4.posY += 1;

                      //Pasamos de nuevo a la posicion 1
                      this.cuadrado1.tipo = 1;
                      this.cuadrado2.tipo = 1;
                      this.cuadrado3.tipo = 1;
                      this.cuadrado4.tipo = 1;
                  }

                  break;
            } //Ciere switch tipo de letra

          break; //Break rotacion

        //Evento producido por la tecla derecha, DESPLAZAMIENTO HACIA LA DERECHA
        case 39:
            if( this.puedeDerecha() ){    //Se comprueba si se puede mover hacia la derecha y se actualiza la posicion
              this.cuadrado1.posX -= 1;
              this.cuadrado2.posX -= 1;
              this.cuadrado3.posX -= 1;
              this.cuadrado4.posX -= 1;
            }
          break;

        //Evento producido por la tecla abajo, DESPLAZAMIENTO HACIA ABAJO
        case 40:
            if( this.puedeBajar() ){    //Se comprueba si se puede mover hacia abajo y se actualiza la posicion
                this.cuadrado1.posY += 1;
                this.cuadrado2.posY += 1;
                this.cuadrado3.posY += 1;
                this.cuadrado4.posY += 1;
            }
          break;
      } //Fin switch tipo de tecla

  }; //Fin funcion onDocumentKeyDown

  //Funcion para actualizar la escena en cada frame
  update () {

    var i=0;

    //Tiempo en milisegundos
    var tiempoActual = Date.now();

    //Tiempo en segundos
    var segundosTranscurridos = (tiempoActual - this.tiempoAnterior)/1000;

    //Movimiento continuo de la pieza
    if(segundosTranscurridos >= time) {  //Si no ha transcurrido X segundo(s)
        var puedeBajar = this.puedeBajar();

        //Si puede bajar
        if(puedeBajar){

            //Se actualzia el tiempo
            this.tiempoAnterior = tiempoActual;

            //Se establece la nueva posicion
            this.cuadrado1.posY += 1;
            this.cuadrado2.posY += 1;
            this.cuadrado3.posY += 1;
            this.cuadrado4.posY += 1;
        }

        //En caso de no poder bajar
        else{
            //Si alguno de los cuadrados ha tocado la parte superior
            if(this.cuadrado1.posY == 0 || this.cuadrado2.posY == 0 || this.cuadrado3.posY == 0 || this.cuadrado4.posY == 0){
                var tiempoFinal = Date.now(); //Tiempo en milisegundos
                var segundos = (tiempoFinal - this.tiempoInicial)/1000;

                //Si hemos superado el tiempo establecido se aumenta la velocidad de juego
                if(segundos >= 3){
                    time -= 0.1;
                }

                //Se reinicia el juego
                if(time > 0){
                    reiniciarJuego();
                }
            }

            //En caso de no poder bajar pero no terminar el juego
            else{
                //Se modifican los valores de la matriz
                this.matriz[this.cuadrado1.posX][this.cuadrado1.posY] = this.cuadrado1.letra;
                this.matriz[this.cuadrado2.posX][this.cuadrado2.posY] = this.cuadrado2.letra;
                this.matriz[this.cuadrado3.posX][this.cuadrado3.posY] = this.cuadrado3.letra;
                this.matriz[this.cuadrado4.posX][this.cuadrado4.posY] = this.cuadrado4.letra;

                //Eliminan de la escena los cuadrados, se añaden al bloque de los colocados y se coloca en su posicion
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

                //Se crea un nuevo tetrimino
                this.createtetrimino();

                //Se comprueba si se ha de eliminar alguna fila
                this.colocados.comprobarFilas();
            }

        } //Cierre else en caso de no poder bajar

        //Se colocan los cuadrados en la escena mientras avanzan sus posiciones
        this.cuadrado1.position.set(5-this.cuadrado1.posX, -this.cuadrado1.posY, 0);
        this.cuadrado2.position.set(5-this.cuadrado2.posX, -this.cuadrado2.posY, 0);
        this.cuadrado3.position.set(5-this.cuadrado3.posX, -this.cuadrado3.posY, 0);
        this.cuadrado4.position.set(5-this.cuadrado4.posX, -this.cuadrado4.posY, 0);

    }//si ha pasado tiempo

  }//cierre update()

}//cierre MyScene
