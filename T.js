//tetrimino T
class T extends THREE.Mesh {
	constructor() {
		super();
		var cuadrado = new THREE.BoxGeometry( 1, 1, 1 );
		var esqueleto = new THREE.MeshBasicMaterial( {color: 0x000000, wireframe:true, blending: THREE.MultiplyBlending});
		var rosa = new THREE.MeshBasicMaterial( {color: 0xFF4AB1 });

		var cuadradobsp = new ThreeBSP (cuadrado);
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

    this.geometry = this.result.geometry;

	}
}