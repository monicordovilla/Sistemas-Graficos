//tetrimino I
class O extends THREE.Mesh {
	constructor() {
		super();
		var sqLength = 1;
		//var cuadrado = new THREE.BoxGeometry();
		var squareShape = new THREE.Shape();
		squareShape.moveTo( 0, 0 );
		squareShape.lineTo( 0, sqLength*2 );
		squareShape.lineTo( sqLength*2, sqLength*2 );
		squareShape.lineTo( sqLength*2, 0 );
		squareShape.lineTo( 0, 0 );

		var cuadrado = new THREE.ShapeGeometry( squareShape );
		//var cuadrado = new THREE.BoxGeometry( 1, 1, 1 );
		var esqueleto = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe:true, blending: THREE.MultiplyBlending});
		var amarillo = new THREE.MeshBasicMaterial( {color: 0xf9f906 });

		cuadrado.translate (-1, -1, 0);

		/*var cuadradobsp = new ThreeBSP (cuadrado);
		var partialResult = cuadradobsp;

		cuadrado.translate (1, 0, 0);
		cuadradobsp = new ThreeBSP ( cuadrado ) ;
		partialResult = partialResult.union ( cuadradobsp ) ;

		cuadrado.translate (0, 1, 0);
		cuadradobsp = new ThreeBSP ( cuadrado ) ;
		partialResult = partialResult.union ( cuadradobsp ) ;

		cuadrado.translate (-1, 0, 0);
		cuadradobsp = new ThreeBSP ( cuadrado ) ;
		partialResult = partialResult.union ( cuadradobsp ) ;

		this.result = partialResult.toMesh(this.material);
		this.result.geometry.computeFaceNormals();
		this.result.geometry.computeVertexNormals();*/

    this.geometry = cuadrado;
		this.material = amarillo;
	}
}
