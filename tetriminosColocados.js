
class tetriminosColocados extends THREE.Object3D{
    constructor(){
        super();
        this.contadores = new Array(17);
    }

    comprobarFilas() {

      this.contadores.fill(0);

      //console.log(this.children.length)
      for(var i=0; i<this.children.length; i++) {
        this.contadores[this.children[i].posY]++;
      }

      for(var i=0; i<this.contadores.length; i++) {
        if(this.contadores[i]>11) {
            this.eliminarFila(i);
        }
      }
    }


    eliminarFila(fila){
        for(var i=this.children.length-1; i>=0; i--) {
            if(this.children[i].posY == fila){
                scene.matriz[this.children[i].posX][this.children[i].posY] ='V';
                this.remove(this.children[i]);
                //this.children.splice(i,1); //acortar
            }
        }

        for(var i=0; i<this.children.length; i++) {
            if( this.children[i].posY < fila ){
                this.children[i].posY++;
                this.children[i].position.y -= 1;
            }
        }

        for(var i=0; i<12; i++){
            for(var j=fila; j>0; j--){
            scene.matriz[i][j]=scene.matriz[i][j-1];
            }
        }

        for(var i=0; i<12; i++){
            scene.matriz[i][0] ='V';
        }
        scene.matriz[-1][0] = 'X';
        scene.matriz[12][0] = 'X';

        for (var i = 0; i < scene.matriz.length; i++) {
            var un_string = "";
            for (var j = 0; j < 18; j++) {
                un_string += (scene.matriz[i][j] + " ");
            }
            console.log(un_string);
        }

    }
}
