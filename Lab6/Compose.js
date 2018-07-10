var renderer;
var scene;
var camera;
var composer;
var texture;
var shaderPass;

function init() {

	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	camera = new THREE.OrthographicCamera( -0.5, 0.5, 0.5, -0.5, -1.0, 1.0 );
	scene.add( camera );
	
	var textureLoader = new THREE.TextureLoader();
	texture = textureLoader.load("../Images/lena.png", onLoadTexture);
	var txtMaterial = new THREE.MeshBasicMaterial( { 
					map : texture
					} );
	// Plane
	var planeGeometry 	= new THREE.PlaneBufferGeometry(1.0, 1.0, 20, 20);                 
	var plane = new THREE.Mesh( planeGeometry, txtMaterial );
	plane.position.set(0.0, 0.0, -0.5);
	scene.add( plane );	

	document.getElementById("WebGL-output").appendChild(renderer.domElement);
};

function onLoadTexture() {

	renderer.setSize(texture.image.width, texture.image.height);
	
	THREE.rgbShader = {	
		uniforms: {
			tDiffuse: 	{ type: "t", value:null },
			uChannel: 	{ type: "v3", value: new THREE.Vector3(1.0, 0.0, 0.0) }
			},
		vertexShader: 	document.getElementById( 'rgb-vs' ).textContent,
		fragmentShader:	document.getElementById( 'rgb-fs' ).textContent 
		};		

	composer = new THREE.EffectComposer(renderer);
	
	// Cria os passos de renderizacao
	var renderPass 	= new THREE.RenderPass(scene, camera);
	
	shaderPass 		= new THREE.ShaderPass(THREE.rgbShader);
	shaderPass.renderToScreen = true;

	composer.addPass(renderPass);
	composer.addPass(shaderPass);
	composer.render();

}

function onClick(state) {
	if (state == 0) {
		document.getElementById("greenC").checked = false;
		document.getElementById("blueC").checked = false;
		shaderPass.uniforms[ "uChannel" ].value = new THREE.Vector3(1.0, 0.0, 0.0);
		}
	else 
		if (state == 1) {
			document.getElementById("redC").checked = false;
			document.getElementById("blueC").checked = false;
			shaderPass.uniforms[ "uChannel" ].value = new THREE.Vector3(0.0, 1.0, 0.0);
			}
		else {
			document.getElementById("redC").checked = false;
			document.getElementById("greenC").checked = false;
			shaderPass.uniforms[ "uChannel" ].value = new THREE.Vector3(0.0, 0.0, 1.0);
			}
	composer.render();
}
