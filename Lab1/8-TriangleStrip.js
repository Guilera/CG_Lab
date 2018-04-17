var renderer;
var scene;
var camera;

function init() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	renderer.setSize(500, 500);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	scene = new THREE.Scene();

	camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );

	var triangleGeometry = new THREE.Geometry(); 
	
	var numVertices = 7;
	var dx = 1.6/(numVertices-1);
	
	for (x = -0.8 ; x <= 0.8; x+= dx) 
		for (y = -0.8 ; y <= 0.8 ; y+= dx) 
			triangleGeometry.vertices.push(new THREE.Vector3( x,  y, 0.0));
	
	var countFaces=0;
	for (i = 0 ; i < numVertices-1 ; i++) 
		for (j = 0 ; j < numVertices-1 ; j++) {
			triangleGeometry.faces.push(new THREE.Face3(i*numVertices+j, (i+1)*numVertices+j, (i+1)*numVertices+j+1)); 
			triangleGeometry.faces[countFaces].vertexColors[0] = new THREE.Color( 1.0 - i/numVertices, i/numVertices, j/numVertices); 
			triangleGeometry.faces[countFaces].vertexColors[1] = new THREE.Color( 1.0 - i/numVertices, (i+1)/numVertices, j/numVertices); 
			triangleGeometry.faces[countFaces].vertexColors[2] = new THREE.Color( 1.0 - i/numVertices, (i+1)/numVertices, (j+1)/numVertices);
			countFaces++;
		
			triangleGeometry.faces.push(new THREE.Face3(i*numVertices+j, (i+1)*numVertices+(j+1), i*numVertices+(j+1))); 

			triangleGeometry.faces[countFaces].vertexColors[0] = new THREE.Color( 1.0 - i/numVertices, i/numVertices, j/numVertices); 
			triangleGeometry.faces[countFaces].vertexColors[1] = new THREE.Color( 1.0 - i/numVertices, (i+1)/numVertices, (j+1)/numVertices); 
			triangleGeometry.faces[countFaces].vertexColors[2] = new THREE.Color( 1.0 - i/numVertices, i/numVertices, (j+1)/numVertices);
			countFaces++;
			}

	var triangleMaterial = new THREE.MeshBasicMaterial({ 
		vertexColors:THREE.VertexColors,
		wireframe:true
		}); 
	
	var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial); 

	scene.add( triangleMesh );	
		
	renderer.clear();
	renderer.render(scene, camera);
	};
