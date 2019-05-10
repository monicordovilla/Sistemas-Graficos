//tetrimino I
class L extends THREE.Mesh {
	constructor() {
		super();
		this.letra = "L";
		var sqLength = 1;
		//var cuadrado = new THREE.BoxGeometry();
		var squareShape = new THREE.Shape();
		squareShape.moveTo( 0, 0 );
		squareShape.lineTo( 0, sqLength );
		squareShape.lineTo( sqLength, sqLength );
		squareShape.lineTo( sqLength, 0 );
		squareShape.lineTo( 0, 0 );

		var cuadrado = new THREE.ShapeGeometry( squareShape );
		var naranja = new THREE.MeshBasicMaterial( {color: 0xf5993d});

		cuadrado.translate (-0.5, -0.5, 0);

    this.geometry = cuadrado;
		this.material = naranja;
	}
}
