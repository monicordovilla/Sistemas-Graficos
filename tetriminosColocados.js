
class tetriminosColocados extends THREE.Object3D{
    constructor(){
        super();
        this.componentes = new Array();
        this.contadores = new Array(17);
    }

    comprobarFilas() {

      this.contadores.fill(0);

      for(var i=0; i<this.componentes.length; i++) {
        this.contadores[this.componentes[i].posY]++;
      }

      for(var i=0; i<this.contadores.length; i++) {
        if(this.contadores[i]>11) {
            this.eliminarFila(i);
        }
      }
    }


    eliminarFila(fila){
        for(var i=this.componentes.length; i>0; i--) {
            if(this.componentes[i].posY == fila){
                this.remove(this.componentes[i]);
                this.componentes.splice(i,1); //acortar
            }
        }

        for(var i=0; i<this.componentes.length; i++) {
            if( this.componentes[i].posY < fila ){
                this.componentes[i].posY++;
            }
        }
    }
}
