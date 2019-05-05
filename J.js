//tetrimino I
class J extends THREE.Mesh {
	constructor() {
		super();
		var sqLength = 1;
		//var cuadrado = new THREE.BoxGeometry();
		var squareShape = new THREE.Shape();
		squareShape.moveTo( 0, 0 );
		squareShape.lineTo( 0, sqLength );
		squareShape.lineTo( sqLength, sqLength );
		squareShape.lineTo( sqLength, sqLength*3 );
		squareShape.lineTo( sqLength*2, sqLength*3 );
		squareShape.lineTo( sqLength*2, 0 );
		squareShape.lineTo( 0, 0 );

		var cuadrado = new THREE.ShapeGeometry( squareShape );

		var esqueleto = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe:true, blending: THREE.MultiplyBlending});
		var morado = new THREE.MeshBasicMaterial( {color: 0xa488dd });

		cuadrado.translate (-1.5, -1.5, 0);
		/*var cuadradobsp = new ThreeBSP (cuadrado);
		var partialResult = cuadradobsp;

		cuadrado.translate (1, 0, 0);
		cuadradobsp = new ThreeBSP ( cuadrado ) ;
		partialResult = partialResult.union ( cuadradobsp ) ;

		for(var i=0; i<2; i++){
		cuadrado.translate (0, 1, 0);
		cuadradobsp = new ThreeBSP ( cuadrado ) ;
		partialResult = partialResult.union ( cuadradobsp ) ;
		}

		this.material = azul;

		this.result = partialResult.toMesh(this.material);
		this.result.geometry.computeFaceNormals();
		this.result.geometry.computeVertexNormals();*/

		this.geometry = cuadrado;
		this.material = morado;

	}
}
