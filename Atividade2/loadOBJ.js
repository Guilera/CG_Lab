var mesh;
var renderer;
var scene;
var camera;
var BBox;
var maxDim;
var loader;

var option = {
	"bulba" : {
		path : '../Assets/Models/Bulbasaur.obj',
		camera : new THREE.OrthographicCamera( -10.0, 10.0, 10.0, -10.0, -10.0, 10.0) 
	},
	"bunny" : {
		path : '../Assets/Models/bunnyExp.obj',
		camera : new THREE.OrthographicCamera( -400.0, 400.0, 400.0, -400.0, -400.0, 400.0)
	},
	"teapot" : {
		path : '../Assets/Models/teapot.obj',
		camera : new THREE.OrthographicCamera( -120.0, 120.0, 120.0, -120.0, -120.0, 120.0)
	},
	"cow" : {
		path : '../Assets/Models/cow.obj',
		camera : new THREE.OrthographicCamera( -8.0, 8.0, 8.0, -8.0, -8.0, 8.0)
	}
};

function init() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	renderer.setSize(750, 750);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.OrthographicCamera( -400.0, 400.0, 400.0, -400.0, -400.0, 400.0);
	
	scene.add(camera);
	
	// Load Mesh
	loader = new THREE.OBJLoader();
	load("bunny");
	
	renderer.clear();
	render();
	}

function render() {

	if (mesh) {
		requestAnimationFrame(render);

		mesh.rotation.y += 0.01;
		renderer.render(scene, camera);
	}
	else
		requestAnimationFrame(render);	
}

function load(obj) {
	loader.load(option[obj].path, loadMesh);
	camera = option[obj].camera;
}

function loadMesh(loadedMesh) {
	while(scene.children.length > 0)
		scene.remove(scene.children[0]); 

	var material = new THREE.MeshBasicMaterial({color: 0x2194ce, wireframe: true});
	loadedMesh.children.forEach(function (child) {
		child.material = material;
	});
	mesh = loadedMesh;
	scene.add(loadedMesh);	
};
