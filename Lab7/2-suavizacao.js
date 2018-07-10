var texture = null;
var renderer;
var scene;
var camera;
var matShader = null;

var gui = new dat.GUI();

function init() {

	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	buildGUI();

	camera = new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, -1.0, 1.0 );
	scene.add( camera );
	
	var textureLoader = new THREE.TextureLoader();
	texture = textureLoader.load("../../Assets/Images/lena.png", onLoadTexture);
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	// Global Axis
	var globalAxis = new THREE.AxisHelper( 1.0 );
	scene.add( globalAxis );

	renderer.clear();
//    requestAnimationFrame( animate );
};


function onLoadTexture() {

	if (!texture.image) 
		console.log("ERROR: loading texture");
	else {

		console.log("Image size: " + texture.image.width + " x " + texture.image.height);
		console.log("Pixel size: " + 1.0/texture.image.width + " x " + 1.0/texture.image.height);

		uniforms = {
			uSampler 		: 	{ 	type: "t", value:texture },
			uPixelSize		:	{ 	type: "v2", 
									value: new THREE.Vector2(1.0/texture.image.width, 1.0/texture.image.height) } ,
			uApplyFilter	: 	{	type: "bool", value:false}
			};
		
		matShader = new THREE.ShaderMaterial( {
				uniforms: uniforms,
				vertexShader: document.getElementById( 'suaviza-vs' ).textContent,
				fragmentShader: document.getElementById( 'suaviza-fs' ).textContent
			} );
		
		// Plane
		var planeGeometry = new THREE.PlaneBufferGeometry(1.0, 1.0, 20, 20);                 
		var plane = new THREE.Mesh( planeGeometry, matShader );
		plane.position.set(0.0, 0.0, -0.5);
		scene.add( plane );	

		renderer.setSize(texture.image.width, texture.image.height);
		renderer.render(scene, camera);
		}
};


function buildGUI() {

	parameters = {
		bApplyFilter	: false
		};

	gui.add( parameters, 'bApplyFilter').onChange(function(newValue) {
		if (matShader != null) {
			matShader.uniforms.uApplyFilter.value 	= parameters.bApplyFilter;
			renderer.render( scene, camera );
			}
		});

	gui.open();
};
