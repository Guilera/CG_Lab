// Desenhando uma Geometria 2D simples em Three.js

function init() {

	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);
	
	var camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );

	var geometry = new THREE.Geometry();

	geometry.vertices.push(	new THREE.Vector3( -1.0,  0.5, 0.0 ),
							new THREE.Vector3( -0.5, -0.5, 0.0 ),
							new THREE.Vector3(  0.0,  0.5, 0.0 ),
							new THREE.Vector3(  0.5, -0.5, 0.0 ),
							new THREE.Vector3(  1.0,  0.5, 0.0 )
							);

	
	var line = new THREE.Line( geometry);
	scene.add( line );	

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	renderer.clear();
	renderer.render(scene, camera);
};


