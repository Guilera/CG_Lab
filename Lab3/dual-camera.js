var scene			= null;
var renderer		= null;
var renderer2		= null;
var cameraPersp		= null;
var cameraOrtho		= null;
var mesh			= null;
var orbitControlsP	= null;
var zBuffer 		= true;
var faceCull		= "FrontFace";
var clock;
var guiChanged		= false;
var params;

function init() {
	
	clock = new THREE.Clock();
	
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();
	renderer2 = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.5, window.innerHeight*0.7);

	renderer2.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer2.setSize(window.innerWidth*0.5, window.innerHeight*0.7);

	document.getElementById("canvas1").appendChild(renderer.domElement);
	document.getElementById("canvas2").appendChild(renderer2.domElement);

	cameraPersp = new THREE.PerspectiveCamera(45.0, window.innerWidth/window.innerHeight, 0.1, 1000.0);
	cameraOrtho = new THREE.OrthographicCamera(-100, 100, 100, -100, 0.1, 100000);

	// Controle de Camera Orbital
	orbitControlsP = new THREE.OrbitControls(cameraPersp, renderer.domElement);
	orbitControlsP.autoRotate = false;
	orbitControlsO = new THREE.OrbitControls(cameraOrtho, renderer2.domElement);
	orbitControlsO.autoRotate = false;
	
	// Load Mesh
	var loader = new THREE.OBJLoader();
	loader.load('../Assets/Models/city.obj', loadMesh);

	initGUI();
	
	renderer.clear();
	renderer2.clear();
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
	
	cameraPersp.position.x = box.max.x;
	cameraPersp.position.y = box.max.y;
	cameraPersp.position.z = box.max.z;
	cameraPersp.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
	orbitControlsP.update();

	cameraOrtho.position.x = box.max.x + 100;
	cameraOrtho.position.y = box.max.y;
	cameraOrtho.position.z = box.max.z + 100;
	cameraOrtho.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
	orbitControlsO.update();

	cameraOrtho.left	= box.min.x;
	cameraOrtho.right = box.max.x;
	cameraOrtho.top = box.max.y;
	cameraOrtho.bottom = box.min.y;
	cameraOrtho.zoom /= 1.5;
	cameraOrtho.updateProjectionMatrix();
	
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
    orbitControlsP.update(delta);
    orbitControlsO.update(delta);

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

	renderer.render(scene, cameraPersp);
	renderer2.render(scene, cameraOrtho);
	requestAnimationFrame(render);
}
