//tetrimino T
class T extends THREE.Mesh {
	constructor() {
		super();
		var sqLength = 1;
		//var cuadrado = new THREE.BoxGeometry();
		var squareShape = new THREE.Shape();
		squareShape.moveTo( 0, sqLength );
		squareShape.lineTo( 0, sqLength*2 );
		squareShape.lineTo( sqLength*3, sqLength*2 );
		squareShape.lineTo( sqLength*3, sqLength );
		squareShape.lineTo( sqLength*2, sqLength );
		squareShape.lineTo( sqLength*2, 0 );
		squareShape.lineTo( sqLength, 0 );
		squareShape.lineTo( sqLength, sqLength );
		squareShape.lineTo( 0, sqLength );

		var cuadrado = new THREE.ShapeGeometry( squareShape );

		var esqueleto = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe:true, blending: THREE.MultiplyBlending});
		var rosa = new THREE.MeshBasicMaterial( {color: 0xFF4AB1 });
		cuadrado.translate (-1.5, -1.5, 0);
		/*var cuadradobsp = new ThreeBSP (cuadrado);
		var partialResult = cuadradobsp;

		for(var i=0; i<2; i++){
		cuadrado.translate (1, 0, 0);
		cuadradobsp = new ThreeBSP ( cuadrado ) ;
		partialResult = partialResult.union ( cuadradobsp ) ;
		}

		cuadrado.translate (-1, -1, 0);
		cuadradobsp = new ThreeBSP (cuadrado);
		partialResult = partialResult.union ( cuadradobsp ) ;

		this.material = esqueleto;

		this.result = partialResult.toMesh(this.material);
		this.result.geometry.computeFaceNormals();
		this.result.geometry.computeVertexNormals();

    this.geometry = this.result.geometry;*/

		this.geometry = cuadrado;
		this.material = rosa;

	}
}
