
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
    this.tiempoAnterior() = Date.now(); //Tiempo en milisegundos
    /*
    V - vacio
    I, J, L, O, S, T, Z - forma de los tetriminos
    */
    var matriz = new Array(12);
    for (var i=0; i<matriz.length; i++){
         matriz[i] = new Array(12);
         for (var j=0; j<matriz.length; j++){
             matriz[i][j] = "V";
         }
     }

    //this.axis = new THREE.AxesHelper (5);
    //this.add (this.axis);

    this.i = new I();
    this.add (this.i);


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
    this.points = [];
    var ancho = 5;
    var alto = 8;
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
  	this.line.applyMatrix (new THREE.Matrix4().makeTranslation(2,0,0));
  	this.add(this.line);
  }

  createCamera (unRenderer) {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set (0, 0, 20);//Cuando mas X mas se aleja
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

  createGround () {
  var ground = new THREE.Mesh ();
  ground.geometry = new THREE.BoxGeometry (50,0.2,50);ground.geometry.applyMatrix (new THREE.Matrix4().makeTranslation(0,-0.1,0));
  var texture = new THREE.TextureLoader().load('../imgs/wood.jpg');
  ground.material = new THREE.MeshPhongMaterial ({map: texture});
  this.add (ground);
}

  getCamera () {
    return this.camera;
  }

  setCameraAspect (ratio) {
    this.camera.aspect = ratio;
    this.camera.updateProjectionMatrix();
  }

  update () {
      /*
      Key code derecha = 37
      Key code arriba = 38
      Key code izquierda = 39
      Key code abajo = 40
      */
      var tecla = event.keyCode; //lee el codigo asociado a una tecla
      switch (tecla) {
          case 37: //right arrow
              //girar 90º
              break;
          case 38: //up arrow
                //girar a la dercha
          break;
          case 39: //left arrow
          break;
          case 40: //down arrow
          break;

      }
  }
}
