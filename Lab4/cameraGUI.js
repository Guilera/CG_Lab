var scene 		= null;
var renderer	= null;
var camera 		= null;
var angleX 		= 0.007;
var angleY		= 0.003;
var angleZ		= 0.001;
var stats;

function init() {
		
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);
	aspectRatio = window.innerWidth/window.innerHeight;
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera();
	camera.fov 			= 60.0;
	camera.aspect 		= aspectRatio;
	camera.near 		= 0.01;
	camera.far			= 1000.0;
	
	scene.add( camera );
	
	var globalAxis = new THREE.AxisHelper(2.0);
	scene.add( globalAxis );

	var objGeometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );                 
	var objMatSolid = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe:true} );
	var objMatLines = new THREE.MeshBasicMaterial( {color: 0x0000aa, wireframe:false} );
	var myObj = new THREE.Object3D();
	myObj.add(new THREE.Mesh( objGeometry, objMatSolid ));
	myObj.add(new THREE.Mesh( objGeometry, objMatLines ));
	myObj.name = "myObj";
	scene.add( myObj );

	initGUI();
		
	renderer.clear();
	render();
};

function render() {

	var obj = scene.getObjectByName("myObj");
	obj.rotateX(angleX);
	obj.rotateY(angleY);
	obj.rotateZ(angleZ);
	
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}


function initGUI() {

	controls = new function () {
		this.fov 			= camera.fov;
		this.camPosX		= camera.position.x;
		this.camPosY		= camera.position.y;
		this.camPosZ		= camera.position.z;
		}

	var gui = new dat.GUI();

	gui.add(controls, 'fov', 10.0, 170.0).onChange(function (value) {
		camera.fov = controls.fov;
		camera.updateProjectionMatrix();
		});

	var fCamPos = gui.addFolder('CameraPos');
	fCamPos.add( controls, 'camPosX', -40.0, 40.0).onChange(function (value) {
		camera.position.x = controls.camPosX;
		camera.updateProjectionMatrix();
		});
	fCamPos.add( controls, 'camPosY', -40.0, 40.0).onChange(function (value) {
		camera.position.y = controls.camPosY;
		camera.updateProjectionMatrix();
		});
	fCamPos.add( controls, 'camPosZ', -40.0, 40.0).onChange(function (value) {
		camera.position.z = controls.camPosZ;
		camera.updateProjectionMatrix();
		});
	fCamPos.close();
};

