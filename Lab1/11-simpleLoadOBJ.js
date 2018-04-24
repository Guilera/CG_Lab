var mesh;
var renderer;
var scene;
var camera;
var BBox;
var maxDim;

function init() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	renderer.setSize(750, 750);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	// camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0);
	camera = new THREE.OrthographicCamera( -400.0, 400.0, 400.0, -400.0, -400.0, 400.0);
	
	scene.add( camera );
	
	// Load Mesh
	var loader = new THREE.OBJLoader();
	// loader.load('../../Assets/Models/bunnyPlastic.obj', loadMesh);
	loader.load('../../Assets/Models/bunnyExp.obj', loadMesh);

	renderer.clear();
	// Global Axis
	var globalAxis = new THREE.AxisHelper( 5.0 );
	scene.add( globalAxis );
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

function loadMesh(loadedMesh) {
	var material = new THREE.MeshBasicMaterial({color: 0x2194ce, wireframe: true});
	var vertices = loadedMesh.children[0].geometry.getAttribute('position');
	var size = vertices.count;
	console.log("vertices = ", vertices.array[0]);
	var colors = [];
	vertices.array.forEach(v => {
		colors.push(0.5, 0.5, 0.5);
	});
	console.log("quantidade de cores " + colors.legth);
	loadedMesh.children.forEach(function (child) {
		child.material = material;
		});

	mesh = loadedMesh;
	
	scene.add(loadedMesh);
	
	};

