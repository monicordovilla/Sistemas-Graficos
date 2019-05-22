//tetrimino I
class cuadrado extends THREE.Mesh {
	constructor(letra, color) {
		super();
		var sqLength = 1;

		this.posX = 0;
		this.posY = 0;
		this.letra = letra;
		this.tipo = 1;
		var squareShape = new THREE.Shape();
		squareShape.moveTo( 0, 0 );
		squareShape.lineTo( 0, sqLength );
		squareShape.lineTo( sqLength, sqLength );
		squareShape.lineTo( sqLength, 0 );
		squareShape.lineTo( 0, 0 );

		var cuadrado = new THREE.ShapeGeometry( squareShape );
		var azul = new THREE.MeshBasicMaterial({color: color});

		this.material = azul;
		this.geometry = cuadrado;
	}
}
