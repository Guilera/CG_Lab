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

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById("canvas1").appendChild(renderer.domElement);

	cameraPersp = new THREE.PerspectiveCamera(45.0, window.innerWidth/window.innerHeight, 0.1, 1000.0);
	cameraOrtho = new THREE.OrthographicCamera(-100, 100, 100, -100, 0.1, 100000);

	// Controle de Camera Orbital
	orbitControlsP = new THREE.OrbitControls(cameraPersp, renderer.domElement);
	orbitControlsP.autoRotate = false;
	orbitControlsO = new THREE.OrbitControls(cameraOrtho, renderer.domElement);
	orbitControlsO.autoRotate = false;
	
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
	
	cameraPersp.position.x = box.max.x + 100;
	cameraPersp.position.y = box.max.y;
	cameraPersp.position.z = box.max.z + 100;
	cameraPersp.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
	cameraPersp.zoom /= 1.5;
	cameraPersp.updateProjectionMatrix();


	cameraOrtho.left	= box.min.x;
	cameraOrtho.right = box.max.x;
	cameraOrtho.top = box.max.y;
	cameraOrtho.bottom = box.min.y;
	
	cameraOrtho.position.x = box.max.x + 100;
	cameraOrtho.position.y = box.max.y;
	cameraOrtho.position.z = box.max.z + 100;
	cameraOrtho.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));
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

	var left = 0;
	var top = 0;
	var width = window.innerWidth * 0.5;
	var height = window.innerHeight;

	renderer.setViewport(left, top, width, height);
	renderer.setScissor(left, top, width, height);
	renderer.setScissorTest(true);		
	cameraPersp.aspect = width/height;
	cameraPersp.updateProjectionMatrix();		
	renderer.render(scene, cameraPersp);

	left = window.innerWidth * 0.5;

	renderer.setViewport(left, top, width, height);
	renderer.setScissor(left, top, width, height);
	renderer.setScissorTest(true);	
	cameraOrtho.aspect = width/height;
	cameraOrtho.updateProjectionMatrix();		
	renderer.render(scene, cameraOrtho);

	// var left = window.innerWidth * 0;
	// var top = window.innerHeight * 0;
	// var width = window.innerWidth;
	// var height = window.innerHeight;

	// renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
	// renderer.clear();

	// renderer.setViewport(0, 0, window.innerWidth-2, 0.5*window.innerHeight-2);
	// renderer.setScissor(0, 0, window.innerWidth-2, 0.5*window.innerHeight-2);
	// renderer.setScissorTest(true);		
	// renderer.render(scene, cameraPersp);

	// renderer.setViewport(10, window.innerHeight - 200 - 10, 200, 200 );
	// renderer.setScissor(10, window.innerHeight - 200 - 10, 200, 200 );
	// renderer.setScissorTest(true);		
	// renderer.render(scene, cameraOrtho);

	requestAnimationFrame(render);
}
