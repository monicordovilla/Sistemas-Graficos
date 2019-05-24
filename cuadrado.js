//Cuadrado:La clase cuadrado representa los bloques de los que estan compuestas nuestras piezas

class cuadrado extends THREE.Mesh {
	constructor(letra, color) { //Este constructor nos va a permirtir crear los cuadraditos de las diferentes piezas, especificandole la letra y color de cada una
		super();
		var sqLength = 1; 	//Tamaño del cuadrado.

		this.posX = 0;    	//Coordenadas del cuadrado
		this.posY = 0;

		this.letra = letra; //Letra a la que pertenece

		this.tipo = 1;			//Variable utilizada para establecer en que posicion rotada concretamente esta nuestra pieza

		//Se crea el shape
		var squareShape = new THREE.Shape();
		squareShape.moveTo( 0, 0 );
		squareShape.lineTo( 0, sqLength );
		squareShape.lineTo( sqLength, sqLength );
		squareShape.lineTo( sqLength, 0 );
		squareShape.lineTo( 0, 0 );

		//Se crea el cuadrado con el shape creado
		var cuadrado = new THREE.ShapeGeometry( squareShape );

		//Se establece el color del cuadrado
		var azul = new THREE.MeshBasicMaterial({color: color});

		//Se crea el material a partir del color
		this.material = azul;
		//Se crea la geometria
		this.geometry = cuadrado;
	}
}
