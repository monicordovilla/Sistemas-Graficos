//tetrimino Z
class Z extends THREE.Mesh {
	constructor() {
		super();
		this.letra = "Z";
		var sqLength = 1;
		var squareShape = new THREE.Shape();
		squareShape.moveTo( 0, 0 );
		squareShape.lineTo( 0, sqLength );
		squareShape.lineTo( sqLength, sqLength );
		squareShape.lineTo( sqLength, 0 );
		squareShape.lineTo( 0, 0 );

		var cuadrado = new THREE.ShapeGeometry( squareShape );
		var rojo = new THREE.MeshBasicMaterial( {color: 0xFF4A4A });

		this.geometry = cuadrado;
		this.material = rojo;

	}
}
