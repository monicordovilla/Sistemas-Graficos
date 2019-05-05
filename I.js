//tetrimino I
class I extends THREE.Mesh {
	constructor() {
		super();
		this.letra = "I";
		var sqLength = 1;
		//var cuadrado = new THREE.BoxGeometry();
		var squareShape = new THREE.Shape();
		squareShape.moveTo( 0, 0 );
		squareShape.lineTo( 0, sqLength*4 );
		squareShape.lineTo( sqLength, sqLength*4 );
		squareShape.lineTo( sqLength, 0 );
		squareShape.lineTo( 0, 0 );

		var cuadrado = new THREE.ShapeGeometry( squareShape );

		var esqueleto = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, wireframe:true, blending: THREE.MultiplyBlending});
		var azul = new THREE.MeshBasicMaterial( {color: 0x33cccc });

		cuadrado.translate (-0.5, -2, 0);
/*
		var cuadradobsp = new ThreeBSP (cuadrado);
		var partialResult = cuadradobsp;

		for(var i=0; i<3; i++){
			cuadrado.translate (0, 1, 0);
			cuadradobsp = new ThreeBSP ( cuadrado ) ;
			partialResult = partialResult.union ( cuadradobsp ) ;
		}

		this.result = partialResult.toMesh(this.material);

		this.result.geometry.computeFaceNormals();
		this.result.geometry.computeVertexNormals();*/

		this.material = azul;
    	//this.geometry = this.result.geometry;
		this.geometry = cuadrado;
	}

	moverIzquierda(matriz, posx, posy){
		if(posx > 0 &&
		matriz[posx-1][posy] == "V" &&
		matriz[posx-1][posy+1] == "V" &&
		matriz[posx-1][posy+2] == "V" &&
		matriz[posx-1][posy+3] == "V")
		{
			return true;
		}
		else
			return false;
	}

	moverDerecha(matriz, posx, posy){
		if(posx < 10 &&
		matriz[posx+1][posy] == "V" &&
		matriz[posx+1][posy+1] == "V" &&
		matriz[posx+1][posy+2] == "V" &&
		matriz[posx+1][posy+3] == "V")
		{
			return true;
		}
		else
			return false;
	}

	moverAbajo(matriz, posx, posy){
		if(posy < 16 && matriz[posx][posy+3+1] == "V"){
			return true;
		}
		return false;
	}
}
