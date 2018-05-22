var clock;
var scene 		= null;
var renderer	= null;
var camera 		= null;
var angleX		= 0.007;
var angleY		= 0.0;
var angleZ		= 0.0;
var control		= null;
var views 		= {};

function init() {

	clock = new THREE.Clock();

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color("#b5d0fc"));
	renderer.setSize(window.innerWidth, window.innerHeight*0.9);
	aspectRatio = window.innerWidth/window.innerHeight;

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	
	views.front = {
		width: window.innerWidth,
		height: window.innerHeight,
		aspect: window.innerWidth / window.innerHeight,
		left: 0,
		top: 0
	};

	views.back = {
		width: window.innerWidth,
		height: window.innerHeight,
		aspect: window.innerWidth / window.innerHeight,
		left: 0,
		top: 0
	};

	views.top = {
		width: 200,
		height: 200,
		aspect: 200 / 200,
		left: window.innerWidth - this.width,
		top: window.innerHeight - this.height,	
	};


	views.front.camera = new THREE.PerspectiveCamera(45.0, views.front.aspect, 0.1, 1000.0);

	scene.add(views.front.camera);
	
	var loader = new THREE.OBJLoader();
	loader.load('../Assets/Models/city.obj', loadMesh);

	control = new THREE.FirstPersonControls(views.front.camera, renderer.domElement);
	control.noFly = true;
	control.lookVertical = true;
	control.constrainVertical = true;
	control.verticalMin = 1;
	control.verticalMax = 3;
	control.lon = -150;
	control.lat = 120;

	renderer.clear();
	render();
};


function render() {
	control.update(clock.getDelta() * 10); 
	// control.update(0.5); 
	views.front.camera.position.y = 2;

	renderer.render(scene, views.front.camera);
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
	views.front.camera.position.set(box.max.x, 2, box.max.z);
	views.front.camera.lookAt(new THREE.Vector3(0, 0, 0));
	views.front.camera.updateProjectionMatrix();

	var pointLight1 = new THREE.PointLight(new THREE.Color(1.0, 1.0, 1.0));
	pointLight1.distance = 0.0;
	pointLight1.position.set(box.max.x*1.2, box.max.y*1.2, box.max.z*1.2);
	scene.add(pointLight1);
}