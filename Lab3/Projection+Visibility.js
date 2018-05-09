var scene 			= null;
var renderer		= null;
var camera 			= null;
var mesh			= null;
var orbitControls	= null;
var zBuffer 		= true;
var faceCull		= "FrontFace";
var clock;
var guiChanged		= false;
var params;

function init() {
	
	clock = new THREE.Clock();
	
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(45.0, window.innerWidth/window.innerHeight, 0.1, 1000.0);

	// Controle de Camera Orbital
	orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
	orbitControls.autoRotate = false;
	
	// Load Mesh
	var loader = new THREE.OBJLoader();
	loader.load('../Assets/Models/city.obj', loadMesh);

	initGUI();
	
	renderer.clear();
	render();
};

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
	
	box = new THREE.Box3();
	box.setFromObject(mesh);
	console.log(box);
	
	camera.position.x = box.max.x;
	camera.position.y = box.max.y;
	camera.position.z = box.max.z;
	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
	orbitControls.update();
	
	//Add point light Source
	var pointLight1 = new THREE.PointLight(new THREE.Color(1.0, 1.0, 1.0));
	pointLight1.distance = 0.0;
	pointLight1.position.set(box.max.x*1.2, box.max.y*1.2, box.max.z*1.2);
	scene.add(pointLight1);
	
	// Global Axis
	var globalAxis = new THREE.AxisHelper	( Math.max(	(box.max.x - box.min.x),
														(box.max.y - box.min.y),
														(box.max.z - box.min.z)
				  									  )
											);
	scene.add( globalAxis );
};


function initGUI() {
	
	params = 	{	zBuffer		: true,
					faceCulling	: "FrontFace"
				};

	var gui = new dat.GUI();	
	gui.add( params, 'zBuffer').onChange(function(){
				guiChanged = true;
    			});
	gui.add( params, 'faceCulling', [ "FrontFace", "BackFace", "DoubleSide" ] ).onChange(function(){
				guiChanged = true;
    			});
	gui.open();
		
};

function render() {
	var delta = clock.getDelta();
    orbitControls.update(delta);

    if (guiChanged) {

		guiChanged = false;
		
		if (zBuffer !== params.zBuffer) 
			zBuffer = params.zBuffer;
			
		if (faceCull !== params.faceCulling) 
			faceCull = params.faceCulling;
			
		if (mesh) {
			scene.getObjectByName("city").children.forEach(function (child) {
				child.material.depthTest = zBuffer;
				switch( faceCull ) {
					case "FrontFace"	: 	child.material.side = THREE.FrontSide; 
											break;
					case "BackFace"		: 	child.material.side = THREE.BackSide; 
											break;
					case "DoubleSide"	: 	child.material.side = THREE.DoubleSide; 
											break;
					}
				});
			}
		}

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}
