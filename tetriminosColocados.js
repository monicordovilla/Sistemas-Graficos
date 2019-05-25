//tetriminosColocados: Representa los bloques de tetriminos ya colocados en la parte inferior de la pantalla

class tetriminosColocados extends THREE.Object3D{
    constructor(){
        super();
        this.contadores = new Array(17);  //Se establencen los contadores que van a determinar si una fila esta completa
    }

    //Función para comprobar y elimiar la fila en caso de estar completa
    comprobarFilas() {

      this.contadores.fill(0);  //Se inician todos los contadores a 0

      //Recorremos las piezas que forman parte del bloque y vamos contando en cada fila las que hay
      for(var i=0; i<this.children.length; i++) {
        this.contadores[this.children[i].posY]++;
      }

      //Se recorre todos los contadores en busca de que fila esta completa y eliminarla
      for(var i=0; i<this.contadores.length; i++) {
        if(this.contadores[i]>11) {
            this.eliminarFila(i);
        }
      }
    }

    //Función para eliminar una fila concreta
    eliminarFila(fila){
        //Se recorren todas las piezas añadidas a este bloque
        for(var i=this.children.length-1; i>=0; i--) {
            if(this.children[i].posY == fila){
                scene.matriz[this.children[i].posX][this.children[i].posY] ='V';  // Vuelve a estar vacia esa posicion
                this.remove(this.children[i]);                                    // Eliminamos la pieza del bloque de piezas colocadas
            }
        }

        //Se recorren todos los elementos pertenecientes al bloque de los colocados y si estaban en posiciones superiores a los bloques eliminados se bajan una posicion
        for(var i=0; i<this.children.length; i++) {
            if( this.children[i].posY < fila ){
                this.children[i].posY++;
                this.children[i].position.y -= 1;
            }
        }

        //Actualizamos los valores de las filas a partir de la borrada con los valores de las filas superiores
        for(var i=0; i<12; i++){
            for(var j=fila; j>0; j--){
            scene.matriz[i][j]=scene.matriz[i][j-1];
            }
        }

        //Para que no haya ningun error estableces los valores de referencia que debe tener la matriz
        for(var i=0; i<12; i++){
            scene.matriz[i][0] ='V';
        }
        scene.matriz[-1][0] = 'X';
        scene.matriz[12][0] = 'X';

        //Se muestra la matriz
        for (var i = 0; i < scene.matriz.length; i++) {
            var un_string = "";
            for (var j = 0; j < 18; j++) {
                un_string += (scene.matriz[i][j] + " ");
            }
            console.log(un_string);
        }

    }
}
