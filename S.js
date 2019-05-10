//tetrimino S
class S extends THREE.Mesh {
	constructor() {
		super();
		this.letra = "S";
		var sqLength = 1;
		var squareShape = new THREE.Shape();
		squareShape.moveTo( 0, 0 );
		squareShape.lineTo( 0, sqLength );
		squareShape.lineTo( sqLength, sqLength );
		squareShape.lineTo( sqLength, 0 );
		squareShape.lineTo( 0, 0 );

		var cuadrado = new THREE.ShapeGeometry( squareShape );
		var verde = new THREE.MeshBasicMaterial( {color: 0x4AFF7D });

    	this.geometry = cuadrado;
		this.material = verde;
	}
}
