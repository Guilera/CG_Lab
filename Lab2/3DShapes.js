
function init() {

	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);
	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	var camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );
	
	// Global Axis
	var globalAxis = new THREE.AxisHelper( 1.0 );
	scene.add( globalAxis );

	// Box	
	var box = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );              
	var boxMat = new THREE.MeshBasicMaterial( {color: 0x0000ff,wireframe:true} );
	var cube = new THREE.Mesh( box, boxMat );
	cube.position.set(-0.7, 0.7, 0.0);
	cube.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), -Math.PI/4); 
	scene.add( cube );	
	
	// Sphere
	var sphereGeometry = new THREE.SphereGeometry( 0.2, 10, 10 );                 
	var sphereMat = new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe:true} );
	var sphere = new THREE.Mesh( sphereGeometry, sphereMat );
	sphere.position.set(0.0, 0.7, 0.0);
	scene.add( sphere );	
	
	// Ring
	var ringGeometry = new THREE.RingGeometry( 0.2, 0.1, 15, 3 );                 
	var ringMat = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe:true} );
	var ring = new THREE.Mesh( ringGeometry, ringMat );
	ring.position.set(0.7, 0.7, 0.0);
	scene.add( ring );	
	
	// TorusKnot
	var torusKnotGeometry = new THREE.TorusKnotGeometry( 0.2, 0.03, 60, 20, 3, 2 );                 
	var torusKnotMat = new THREE.MeshBasicMaterial( {color: 0x7070aa, wireframe:true} );
	var torusKnot = new THREE.Mesh( torusKnotGeometry, torusKnotMat );
	torusKnot.position.set(0.7, 0.0, 0.0);
	torusKnot.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), -Math.PI/4); 
	scene.add( torusKnot );	
	
	// Cilinder
	var cilinderGeometry = new THREE.CylinderGeometry( 0.1, 0.1, 0.5, 30);                 
	var cilinderMat = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:true} );
	var cilinder = new THREE.Mesh( cilinderGeometry, cilinderMat );
	cilinder.position.set(0.0, 0.0, 0.0);
	cilinder.rotateOnAxis(new THREE.Vector3(1, 0, 0).normalize(), -Math.PI/4); 
	scene.add( cilinder );	
	
	// Icosahedron
	var icosahedronGeometry = new THREE.IcosahedronGeometry(0.2);                 
	var icosahedronMat = new THREE.MeshBasicMaterial( {color: 0x00ffff, wireframe:true} );
	var icosahedron = new THREE.Mesh( icosahedronGeometry, icosahedronMat );
	icosahedron.position.set(-0.7, 0.0, 0.0);
	scene.add( icosahedron );	
	
	// Plane
	var planeGeometry = new THREE.PlaneBufferGeometry(0.2, 0.5, 10, 10);                 
	var planeMat = new THREE.MeshBasicMaterial( {color: 0xff00ff, wireframe:true} );
	var plane = new THREE.Mesh( planeGeometry, planeMat );
	plane.position.set( 0.7, -0.7, 0.0);
	plane.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), -Math.PI/4); 
	scene.add( plane );	
	
	// Tetrahedron
	var tetrahedronGeometry = new THREE.TetrahedronGeometry(0.2);                 
	var tetrahedronMat = new THREE.MeshBasicMaterial( {color: 0x70aa70, wireframe:true} );
	var tetrahedron = new THREE.Mesh( tetrahedronGeometry, tetrahedronMat );
	tetrahedron.position.set( 0.0, -0.7, 0.0);
	tetrahedron.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), -Math.PI/6); 
	scene.add( tetrahedron );	
	
	// Dodecahedron
	var dodecahedronGeometry = new THREE.DodecahedronGeometry(0.2);                 
	var dodecahedronMat = new THREE.MeshBasicMaterial( {color: 0xaa7070, wireframe:true} );
	var dodecahedron = new THREE.Mesh( dodecahedronGeometry, dodecahedronMat );
	dodecahedron.position.set( -0.7, -0.7, 0.0);
	dodecahedron.rotateOnAxis(new THREE.Vector3(1, 1, 1).normalize(), -Math.PI/6); 
	scene.add( dodecahedron );	
	
	// call the render function
	renderer.clear();
	renderer.render(scene, camera);
};


