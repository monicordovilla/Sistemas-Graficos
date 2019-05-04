//tetrimino I
class L extends THREE.Mesh {
	constructor() {
		super();
		var cuadrado = new THREE.BoxGeometry( 1, 1, 1 );
		var esqueleto = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe:true, blending: THREE.MultiplyBlending});
		var azul = new THREE.MeshBasicMaterial( {color: 0x33cccc });

		cuadrado.translate (0.5, -1.5, 0);
		var cuadradobsp = new ThreeBSP (cuadrado);
		var partialResult = cuadradobsp;

		cuadrado.translate (-1, 0, 0);
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
		this.result.geometry.computeVertexNormals();

    this.geometry = this.result.geometry;

	}
}
