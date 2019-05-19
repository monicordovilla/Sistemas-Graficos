
class tetriminosColocados extends THREE.Object3D{
    constructor(){
        super();
        this.contadores = new Array(17);
    }

    comprobarFilas() {

      this.contadores.fill(0);

      console.log(this.children.length)
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
                this.children.splice(i,1); //acortar
            }
        }

        for(var i=0; i<this.children.length; i++) {
            if( this.children[i].posY < fila ){
                this.children[i].posY++;
                this.children[i].position.y -= 1;
            }
        }

        for(var i=fila; i>0; i--){
            scene.matriz[i]=scene.matriz[i-1];
        }
        scene.matriz[0].fill('V');
        scene.matriz[0][-1] = 'X';
        scene.matriz[0][12] = 'X';

        for (var i = 0; i < scene.matriz.length; i++) {
            console.log(scene.matriz[i][0] + " " + scene.matriz[i][1] + " " +
            scene.matriz[i][2] + " " +scene.matriz[i][3] + " " +scene.matriz[i][4] +
            " " + scene.matriz[i][5] + " " +scene.matriz[i][6] + " " +scene.matriz[i][7]
             + " " + scene.matriz[i][8] + " " +scene.matriz[i][9] + " " +
             scene.matriz[i][10] + " " + scene.matriz[i][11] + " " + scene.matriz[i][12]);
        }

    }
}
