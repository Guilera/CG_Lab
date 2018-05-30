var clock;
var scene 		= null;
var renderer	= null;
var camera 		= null;
var angleX		= 0.007;
var angleY		= 0.0;
var angleZ		= 0.0;
var control		= null;
var views 		= {};
var box;
var arrowMesh;
var context;

function init() {

	var WIDTH = window.innerWidth;
	var HEIGHT = window.innerHeight;
	for(let t of document.getElementsByTagName("h1"))
		HEIGHT -= t.offsetHeight;

	clock = new THREE.Clock();

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setSize(WIDTH, HEIGHT);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	cameras = ["front", "back", "top"];

	views.front = {
		width: WIDTH,
		height: HEIGHT,
		left: 0,
		top: 0,
		camera: new THREE.PerspectiveCamera(45.0, WIDTH / HEIGHT, 0.1, 1000)
	};

	views.back = {
		width: 200,
		height: 200,
		aspect: 200 / 200,
		left: WIDTH - 210,
		top: 10,
		camera: new THREE.PerspectiveCamera(45.0, 200 / 200, 0.1, 1000)
	};

	views.top = {
		width: 200,
		height: 200,
		aspect: 200 / 200,
		left: WIDTH - 210,
		top: HEIGHT - 210,	
		camera: new THREE.OrthographicCamera(-50, 50, 50, -50, 0.1, 100000)
	};


	views.top.camera.aspect = views.top.aspect;

	scene.add(views.front.camera);
	scene.add(views.back.camera);
	scene.add(views.top.camera);

	var arrowGeometry = new THREE.Geometry();
	arrowGeometry.vertices.push(new THREE.Vector3(0, 0, -5)); //0
	arrowGeometry.vertices.push(new THREE.Vector3(0, 0, 5)); //1
	arrowGeometry.vertices.push(new THREE.Vector3(2, 0, 5)); //2
	arrowGeometry.vertices.push(new THREE.Vector3(-2, 0, 5)); //3

	arrowGeometry.faces.push(new THREE.Face3(0, 3, 1));
	arrowGeometry.faces.push(new THREE.Face3(2, 0, 1));

	var arrowMaterial = new THREE.MeshBasicMaterial({color: "yellow"});

	arrowMesh = new THREE.Mesh(arrowGeometry, arrowMaterial);

	// views.front.camera.add(arrowMesh);
	scene.add(arrowMesh);

	var loader = new THREE.OBJLoader();
	loader.load('../Assets/Models/city.obj', loadMesh);
};


function render() {
	control.update(clock.getDelta() * 10);
	
	views.front.camera.position.y = 2;
	
	arrowMesh.matrix.copy(views.front.camera.matrix);
	arrowMesh.applyMatrix(new THREE.Matrix4().makeTranslation(0, box.max.y + 1, 0));
	arrowMesh.updateMatrix();

	views.top.camera.position.set(views.front.camera.position.x, box.max.y + 10, views.front.camera.position.z);	
	views.top.camera.lookAt(views.front.camera.position);

	views.back.camera = views.front.camera.clone();
	views.back.camera.rotateY(Math.PI);

	cameras.forEach(v => {
		//BORDER DEFINITION
		renderer.setScissorTest(true);
		renderer.setScissor(views[v].left - 2, views[v].top - 2, views[v].width + 4, views[v].height + 4);
		renderer.setClearColor(0x000000);
		renderer.clearColor();

		//VIEWPORT DEFINITION
		renderer.setViewport(views[v].left, views[v].top, views[v].width, views[v].height);
		renderer.setScissor(views[v].left, views[v].top, views[v].width, views[v].height);
		renderer.setClearColor(0xb5d0fc);
		renderer.clearColor();

		views[v].camera.updateProjectionMatrix();
		renderer.render(scene, views[v].camera);
	});

	requestAnimationFrame(render);
}

async function loadMesh(loadedMesh) {
	loadedMesh.name = "city";

	var material = new THREE.MeshPhongMaterial();
	material.bothsides	= false;
	material.side 		= THREE.FrontSide;
	
	loadedMesh.children.forEach(function (child) {
		child.material = material;
	});

	mesh = loadedMesh;
	scene.add(loadedMesh);

	box = new THREE.Box3();
	box.setFromObject(mesh);
	views.front.camera.position.set(box.max.x, 2, box.max.z);
	views.front.camera.updateProjectionMatrix();

	var pointLight1 = new THREE.PointLight(new THREE.Color(1.0, 1.0, 1.0));
	pointLight1.distance = 0.0;
	pointLight1.position.set(box.max.x*1.2, box.max.y*1.2, box.max.z*1.2);
	scene.add(pointLight1);

	control = new THREE.FirstPersonControls(views.front.camera, renderer.domElement);
	control.noFly = true;
	control.constrainVertical = true;
	control.verticalMin = 1.2;
	control.verticalMax = 2;
	control.lon = -150;
	control.lat = 120;

	renderer.clear();
	render();
}