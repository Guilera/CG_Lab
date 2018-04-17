
function init() {

	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	var camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );

	var triangleGeometry = new THREE.Geometry(); 
	
	triangleGeometry.vertices.push(new THREE.Vector3( 0.5,  0.5, 0.0)); 
	triangleGeometry.vertices.push(new THREE.Vector3(-0.5, -0.5, 0.0)); 
	triangleGeometry.vertices.push(new THREE.Vector3( 0.5, -0.5, 0.0)); 

	triangleGeometry.faces.push(new THREE.Face3(1, 2, 0)); 
	
	triangleGeometry.faces[0].vertexColors[0] = new THREE.Color( 1.0, 0.0, 0.0); 
	triangleGeometry.faces[0].vertexColors[1] = new THREE.Color( 0.0,  1.0, 0.0); 
	triangleGeometry.faces[0].vertexColors[2] = new THREE.Color( 0.0,  0.0, 1.0); 

	var triangleMaterial = new THREE.MeshBasicMaterial({ 
		vertexColors:THREE.VertexColors,
		wireframe:false
		}); 
	
	var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial); 

	scene.add( triangleMesh );	
		
	renderer.clear();
	renderer.render(scene, camera);
};


