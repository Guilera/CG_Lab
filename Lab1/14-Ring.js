var renderer;
var scene;
var camera;

function init() {

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	renderer.setSize(800, 800);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	scene = new THREE.Scene();

	camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );

	// var triangleGeometry = new THREE.RingGeometry(0.5, 0.8, 60, 10, 0, 2*Math.PI); 	
	var triangleGeometry = new THREE.Geometry(); 

	var numVertices = 60;
	var raioInterno = 0.5;
	var raioExterno = 0.8;

	for(var i = 0 ; i < 2*Math.PI ; i+= (2*Math.PI)/numVertices){		
			var x = raioInterno * Math.cos(i); 
			var y = raioInterno * Math.sin(i);

			triangleGeometry.vertices.push(new THREE.Vector3( x,  y, 0.0));

			x = raioExterno * Math.cos(i);
			y = raioExterno * Math.sin(i);
			triangleGeometry.vertices.push(new THREE.Vector3( x,  y, 0.0)); 
	}

	for(var i = 0 ; i <= (numVertices*2) - 1 ; i++){
		triangleGeometry.faces.push(new THREE.Face3(i, i+1, i+2));
	}

	var triangleMaterial = new THREE.MeshBasicMaterial({ 
		wireframe:true
	}); 
	
	var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial); 

	scene.add( triangleMesh );	
		
	renderer.clear();
	renderer.render(scene, camera);
	};
