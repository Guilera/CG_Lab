
function init() {

	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	renderer.setSize(500, 500);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	var camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );

	var triangleGeometry = new THREE.Geometry(); 
	
	var numVertices = 60;
	var raio = 0.8;
	
	triangleGeometry.vertices.push(new THREE.Vector3( 0.0,  0.0, 0.0)); 
	
	for (i = 0 ; i < 2*Math.PI ; i+= (2*Math.PI)/numVertices) {
		var x = raio * Math.cos(i);
		var y = raio * Math.sin(i);
	
		triangleGeometry.vertices.push(new THREE.Vector3( x,  y, 0.0)); 
		}

	for (i = 0 ; i <= numVertices ; i++) {
		triangleGeometry.faces.push(new THREE.Face3(0, i, i+1)); 
		triangleGeometry.faces[i].vertexColors[0] = new THREE.Color( 1.0, 1.0, 1.0); 
		triangleGeometry.faces[i].vertexColors[1] = new THREE.Color( 0.0,  i/numVertices, 1.0 - i/numVertices); 
		triangleGeometry.faces[i].vertexColors[2] = new THREE.Color( 0.0,  (i+1)/numVertices, 1.0 - (i+1)/numVertices);
		}

	var triangleMaterial = new THREE.MeshBasicMaterial({ 
		color:0xffffff, 
		vertexColors:THREE.VertexColors,
		side:THREE.DoubleSide,
		wireframe:true
		}); 
	
	var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial); 

	scene.add( triangleMesh );	
		
	renderer.clear();
	renderer.render(scene, camera);
};


