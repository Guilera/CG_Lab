var scene 		= null;
var renderer	= null;
var camera 		= null;
var angleX		= 0.007;
var angleY		= 0.0;
var angleZ		= 0.0;

function init() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);
	aspectRatio = window.innerWidth/window.innerHeight;

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera( 100.0, aspectRatio, 0.1, 100.0 );
	scene.add( camera );
	
	var globalAxis = new THREE.AxisHelper(2.0);
	scene.add( globalAxis );

	var objGeometry = new THREE.SphereGeometry(1.0, 20, 20);                 
	var objMat = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe:true} );
	myObj = new THREE.Mesh( objGeometry, objMat );
	myObj.name = "myObj";
	scene.add( myObj );
		
	renderer.clear();
	render();
};


function render() {

	var obj = scene.getObjectByName("myObj");
	obj.rotateX(angleX);
	
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}
