var texture;
var renderer;
var scene;
var camera;

function init() {

	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	camera = new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, -1.0, 1.0 );
	scene.add( camera );
	
	var textureLoader = new THREE.TextureLoader();
	texture = textureLoader.load("../../Assets/Images/lena.png");
	
	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	// Global Axis
	var globalAxis = new THREE.AxisHelper( 1.0 );
	scene.add( globalAxis );

	renderer.clear();
	requestAnimationFrame(render);
};


function render() {

	if (!texture.image) 
		requestAnimationFrame(render);
	else {
		uniforms = {
			texture: { type: "t", value:texture }
		};
		
		var matShader = new THREE.ShaderMaterial( {
				uniforms: uniforms,
				vertexShader: document.getElementById( 'base-vs' ).textContent,
				fragmentShader: document.getElementById( 'base-fs' ).textContent
			} );
		
		// Plane
		var planeGeometry = new THREE.PlaneBufferGeometry(1.0, 1.0, 20, 20);                 
		var plane = new THREE.Mesh( planeGeometry, matShader );
		plane.position.set(0.0, 0.0, -0.5);
		scene.add( plane );	

		renderer.setSize(texture.image.width, texture.image.height);
		renderer.render(scene, camera);
		}
}

