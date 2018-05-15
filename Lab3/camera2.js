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
	renderer.setSize(window.innerWidth, window.innerHeight*0.9);
	aspectRatio = window.innerWidth/window.innerHeight;

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 45.0, aspectRatio, 0.1, 1000.0 );

	/* QUESTÃO 6
	camera.position.set(0, 100, 320);
	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0)); */
	scene.add( camera );
	
	var loader = new THREE.OBJLoader();
	loader.load('../Assets/Models/city.obj', loadMesh);

	// control = new THREE.TrackballControls(camera, renderer.domElement);
	// control = new THREE.FlyControls(camera, renderer.domElement);
	control = new THREE.FirstPersonControls(camera, renderer.domElement);
	// control.movementSpeed = 20;
	control.noFly = true;
	control.lookVertical = true;
	control.constrainVertical = true;
	control.verticalMin = 1.5;
	control.verticalMax = 1.8;
	control.lon = -150;
	control.lat = 120;

	// control.autoRotate = false;

	var globalAxis = new THREE.AxisHelper(2.0);
	scene.add( globalAxis );

		
	renderer.clear();
	render();
};


function render() {
	// FirstPerson
	// control.update(clock.getDelta()); 
	control.update(0.5); 
	camera.position.y = 2;
	// control.update(); 
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

function loadMesh(loadedMesh) {
	loadedMesh.name = "city";
	var material = new THREE.MeshPhongMaterial({
		bothsides: true,
		side: THREE.DoubleSide
	});
	
	loadedMesh.children.forEach(function (child) {
		child.material = material;
	});

	mesh = loadedMesh;
	scene.add(loadedMesh);

	var box = new THREE.Box3();
	box.setFromObject(mesh);
	camera.position.set(box.max.x, 2, box.max.z);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	camera.updateProjectionMatrix();

	var pointLight1 = new THREE.PointLight(new THREE.Color(1.0, 1.0, 1.0));
	pointLight1.distance = 0.0;
	pointLight1.position.set(box.max.x*1.2, box.max.y*1.2, box.max.z*1.2);
	scene.add(pointLight1);
}