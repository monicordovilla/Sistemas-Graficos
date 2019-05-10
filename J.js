//tetrimino I
class J extends THREE.Mesh {
	constructor() {
		super();
		this.letra = "J";
		var sqLength = 1;
		var squareShape = new THREE.Shape();
		squareShape.moveTo( 0, 0 );
		squareShape.lineTo( 0, sqLength );
		squareShape.lineTo( sqLength, sqLength );
		squareShape.lineTo( sqLength, 0 );
		squareShape.lineTo( 0, 0 );

		var cuadrado = new THREE.ShapeGeometry( squareShape );
		var morado = new THREE.MeshBasicMaterial( {color: 0xa488dd });


		this.geometry = cuadrado;
		this.material = morado;

	}
}
