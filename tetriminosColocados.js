
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
                this.remove(this.children[i]);
                this.children.splice(i,1); //acortar
                scene.matriz[this.children[i].posX][this.children[i].posY] ='V';
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
    }
}
