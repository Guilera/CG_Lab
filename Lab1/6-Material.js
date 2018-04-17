// Desenhando uma Geometria 2D simples com Material em Three.js

function init() {

	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	
	var camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );
	
	// Global Axis
	var globalAxis = new THREE.AxisHelper( 1.0 );
	scene.add( globalAxis );

	var geometry = new THREE.Geometry();
	geometry.vertices.push(	new THREE.Vector3( -1.0,  0.5, 0.0 ),
							new THREE.Vector3( -0.5, -0.5, 0.0 ),
							new THREE.Vector3(  0.0,  0.5, 0.0 ),
							new THREE.Vector3(  0.5, -0.5, 0.0 ),
							new THREE.Vector3(  1.0,  0.5, 0.0 )
							);
	
	var line = new THREE.Line(geometry);
	scene.add( line );	
	
	var geometry2 = new THREE.Geometry();
	geometry2.vertices.push(	new THREE.Vector3( -1.0,  0.75, 0.0 ),
								new THREE.Vector3( -0.5, -0.25, 0.0 ),
								new THREE.Vector3(  0.0,  0.75, 0.0 ),
								new THREE.Vector3(  0.5, -0.25, 0.0 ),
								new THREE.Vector3(  1.0,  0.75, 0.0 )
								);
	geometry2.colors.push(	new THREE.Color(1.0, 1.0, 1.0),
							new THREE.Color(1.0, 1.0, 0.0),
							new THREE.Color(1.0, 0.0, 0.0),
							new THREE.Color(0.0, 1.0, 0.0),
							new THREE.Color(0.0, 1.0, 1.0)
							);
	
	var material = new THREE.LineBasicMaterial({color:0xff0000});
	var line2 = new THREE.Line(geometry2, material);
	
	scene.add( line2 );	
	
	var Tmaterial = new THREE.LineBasicMaterial( { 	
				linewidth: 2.0,
				color: 0xffffff,
				vertexColors: THREE.VertexColors } );
	
	var line3 = new THREE.Line(geometry2, Tmaterial);
	line3.translateY(-0.5);
	
	scene.add( line3 );	
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	renderer.clear();
	renderer.render(scene, camera);
};
