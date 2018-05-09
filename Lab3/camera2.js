var clock;
var scene 		= null;
var renderer	= null;
var camera 		= null;
var angleX		= 0.007;
var angleY		= 0.0;
var angleZ		= 0.0;
var control		= null;

function init() {

	clock = new THREE.Clock();

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);
	aspectRatio = window.innerWidth/window.innerHeight;

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 45.0, aspectRatio, 0.1, 1000.0 );
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	/* QUESTÃO 6
	camera.position.set(0, 100, 320);
	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0)); */
	scene.add( camera );
	
	// control = new THREE.TrackballControls(camera, renderer.domElement);
	// control = new THREE.FlyControls(camera, renderer.domElement);
	control = new THREE.FirstPersonControls(camera, renderer.domElement);
	// control.autoRotate = false;

	var globalAxis = new THREE.AxisHelper(2.0);
	scene.add( globalAxis );

	var loader = new THREE.OBJLoader();
	loader.load('../Assets/Models/city.obj', loadMesh);
		
	renderer.clear();
	render();
};


function render() {
	// FirstPerson
	// control.update(clock.getDelta()); 
	control.update(0.5); 
	// control.update(); 
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

function loadMesh(loadedMesh) {
	loadedMesh.name = "city";
	var material = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe:true} );
	material.bothsides	= false;
	material.side 		= THREE.FrontSide;
	
	loadedMesh.children.forEach(function (child) {
		child.material = material;
	});

	mesh = loadedMesh;
	scene.add(loadedMesh);

	var box = new THREE.Box3();
	box.setFromObject(mesh);
	camera.position.x = box.max.x;
	camera.position.y = box.max.y;
	camera.position.z = box.max.z;
	camera.lookAt(new THREE.Vector3(-5, -5, 0));
	control.object.lookAt(new THREE.Vector3(0, 0, 0));
	control.update(0.5);	
}