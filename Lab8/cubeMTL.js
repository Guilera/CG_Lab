var renderer;
var scene;
var camera;
var cameraControl;
var objMesh;
var objGeometry;

function init() {
	clock = new THREE.Clock();
	
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);

	cameraControl = new THREE.OrbitControls(camera);

	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load 	('cube.mtl',  function( materials ) 
	{
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
						
		objLoader.load 	('cube.obj', function ( object ) 
		{
			objMesh = object;
			buildScene(objMesh);
			scene.add( objMesh );
		});

	});

	// cria luz ambiente
	var ambientLight = new THREE.AmbientLight(0x555555);
	ambientLight.name='ambient';
	scene.add(ambientLight);
	
    // Luz principal
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set( 0, 30, 30 ).normalize;
    directionalLight.name = 'directional';
    scene.add(directionalLight);

	render();
}

function render() {

	cameraControl.update();

	if (objMesh) {
		objMesh.rotation.y+=0.005;
	}

	renderer.render(scene, camera);

	requestAnimationFrame(render);
}
	
function buildScene(loadedMesh) {

	// Bounding Box	
	var box = new THREE.Box3();
	box.setFromObject(loadedMesh);	

	// Adjust Camera Position and LookAt	
	var maxCoord = Math.max(box.max.x,box.max.y,box.max.z);
	
	camera.position.x 	= 
	camera.position.y 	= 
	camera.position.z 	= maxCoord*2.5;
	camera.far 			= new THREE.Vector3(	maxCoord*5, 
												maxCoord*5, 
												maxCoord*5).length();

	camera.lookAt(new THREE.Vector3(	(box.max.x + box.min.x)/2.0,
										(box.max.y + box.min.y)/2.0,
										(box.max.z + box.min.z)/2.0));
	camera.updateProjectionMatrix();

	// Global Axis
	var globalAxis = new THREE.AxisHelper(maxCoord*1.3);
	scene.add( globalAxis );
	
}

