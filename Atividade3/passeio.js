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

	cameras = ["front", "back", "topper"];

	views.front = {
		width: window.innerWidth,
		height: window.innerHeight,
		aspect: window.innerWidth / window.innerHeight,
		left: 0,
		top: 0
	};

	views.back = {
		width: 200,
		height: 200,
		aspect: 200 / 200,
		left: window.innerWidth - 200,
		top: window.innerHeight - 400
	};

	views.topper = {
		width: 200,
		height: 200,
		aspect: 200 / 200,
		left: window.innerWidth - 200,
		top: window.innerHeight - 200,	
	};


	views.front.camera = new THREE.PerspectiveCamera(45.0, views.front.aspect, 0.1, 1000);
	views.back.camera = new THREE.PerspectiveCamera(45.0, views.front.aspect, 0.1, 1000);
	// views.top.camera = new THREE.OrthographicCamera(views.top.width * -1, views.top.width, views.top.height * -1, views.top.height, 0.1, 1000);
	views.topper.camera = new THREE.OrthographicCamera(-100, 100, 100, -100, 0.1, 100000);	
	views.topper.camera.aspect = views.topper.aspect;
	


	scene.add(views.front.camera);
	scene.add(views.back.camera);
	scene.add(views.topper.camera);
	
	var loader = new THREE.OBJLoader();
	loader.load('../Assets/Models/city.obj', loadMesh);
	loader.load('../Assets/Models/porsche.obj', m => {
		m.name = "car";
		var material = new THREE.MeshPhongMaterial();
		material.bothsides	= true;
		material.side 		= THREE.DoubleSide;
		m.children.forEach(c => c.material = material);
		var mat = new THREE.Matrix4();
		mat.makeScale(2, 2, 2);
		m.geometry.applyMatrix(mat);
		m.position.set(260, 0, 240);

		scene.add(m);
	});

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
	
	views.front.camera.position.y = 2;
	
	views.topper.camera.position.set(views.front.camera.position.x, views.front.camera.position.y + 200, views.front.camera.position.z);	
	views.topper.camera.lookAt(views.front.camera.position);
	views.back.camera = views.front.camera.clone();
	views.back.camera.rotateY(Math.PI);
	views.back.camera.updateProjectionMatrix();

	cameras.forEach(v => {
		renderer.setViewport(views[v].left, views[v].top, views[v].width, views[v].height);
		renderer.setScissor(views[v].left, views[v].top, views[v].width, views[v].height);
		renderer.setScissorTest(true);
		renderer.render(scene, views[v].camera);
	});
	requestAnimationFrame(render);
}

function loadMesh(loadedMesh) {
	loadedMesh.name = "city";

	var material = new THREE.MeshPhongMaterial();
	material.bothsides	= false;
	material.side 		= THREE.FrontSide;
	
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