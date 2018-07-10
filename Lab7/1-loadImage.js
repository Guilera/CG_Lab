var texture;
var renderer;
var scene;
var camera;

function init() {

	scene 		= new THREE.Scene();
	renderer 	= new THREE.WebGLRenderer();
	
	var textureLoader 	= new THREE.TextureLoader();
	texture 			= textureLoader.load("../../Assets/Images/lena.png", onLoadTexture);

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	camera 		= new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, -1.0, 1.0 );
	scene.add( camera );
	
	// Global Axis
	var globalAxis = new THREE.AxisHelper( 1.0 );
	scene.add( globalAxis );

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	renderer.clear();
};

function onLoadTexture() {

	console.log("Texture size: " + texture.image.width + " x " + texture.image.height);

	// Plane
	var planeGeometry 	= new THREE.PlaneBufferGeometry(1.0, 1.0, 20, 20);                 
	var planeMat 		= new THREE.MeshBasicMaterial( {map:texture, wireframe:false, side: THREE.DoubleSide } );  

	var plane 			= new THREE.Mesh( planeGeometry, planeMat );
	plane.position.set(0.0, 0.0, -0.5);
	scene.add( plane );	
	renderer.setSize(texture.image.width, texture.image.height);
	renderer.render(scene, camera);
};
