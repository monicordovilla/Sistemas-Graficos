//tetrimino I
class O extends THREE.Mesh {
	constructor() {
		super();
		var sqLength = 1;
		this.letra = "O";
		var squareShape = new THREE.Shape();
		squareShape.moveTo( 0, 0 );
		squareShape.lineTo( 0, sqLength );
		squareShape.lineTo( sqLength, sqLength );
		squareShape.lineTo( sqLength, 0 );
		squareShape.lineTo( 0, 0 );

		var cuadrado = new THREE.ShapeGeometry( squareShape );
		var amarillo = new THREE.MeshBasicMaterial( {color: 0xf9f906 });

    this.geometry = cuadrado;
		this.material = amarillo;
	}
}
