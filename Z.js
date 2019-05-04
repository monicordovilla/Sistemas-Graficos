//tetrimino Z
class Z extends THREE.Mesh {
	constructor() {
		super();
		var cuadrado = new THREE.BoxGeometry( 1, 1, 1 );
		var esqueleto = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe:true, blending: THREE.MultiplyBlending});
		var rojo = new THREE.MeshBasicMaterial( {color: 0xFF4A4A });

		var cuadradobsp = new ThreeBSP (cuadrado);
		var partialResult = cuadradobsp;

		for(var i=0; i<1; i++){
		cuadrado.translate (1, 0, 0);
		cuadradobsp = new ThreeBSP ( cuadrado ) ;
		partialResult = partialResult.union ( cuadradobsp ) ;
		}
		
		cuadrado.translate (0, -1, 0);
		cuadradobsp = new ThreeBSP (cuadrado);
		var partialResult2 = cuadradobsp;
		
		for(var i=0; i<1; i++){
		cuadrado.translate (1, 0, 0);
		cuadradobsp = new ThreeBSP ( cuadrado ) ;
		partialResult2 = partialResult2.union ( cuadradobsp ) ;
		}
		
		var finalResult = partialResult2.union(partialResult);
		
		this.material = esqueleto;

		this.result = finalResult.toMesh(this.material);
		this.result.geometry.computeFaceNormals();
		this.result.geometry.computeVertexNormals();

    this.geometry = this.result.geometry;

	}
}