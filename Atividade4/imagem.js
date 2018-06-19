var renderer 	= null,
	scene		= null,
	texture		= null,
	camera		= null;

var red = {},
	green = {},
	blue = {};

function getImageData( image ) {

    var canvas = document.createElement( 'canvas' );
    canvas.width = image.width;
    canvas.height = image.height;

    var context = canvas.getContext( '2d' );
    context.drawImage( image, 0, 0 );

    return context.getImageData( 0, 0, image.width, image.height );

}

function init() {
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	document.getElementById("canvas").appendChild(renderer.domElement);
	renderer.setClearColor(0x000000);
	
	camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1.0, 1.0);
	scene.add(camera);

	texture = new THREE.TextureLoader().load("../Assets/Images/barbara.png", () => {		
		var planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 20, 20);

		var planeMaterial = new THREE.MeshBasicMaterial({
			map: texture,
			wireframe: false,
			side: THREE.DoubleSide
		});

		var plane = new THREE.Mesh(planeGeometry, planeMaterial);
		scene.add(plane);
		
		equalizer(texture.image);

		renderer.clear();
		renderer.setSize(texture.image.width, texture.image.height);
		renderer.render(scene, camera);	
	});
}

function equalizer(image) {
	var pixels = getImageData(image).data;
	
	for(var i = 0 ; i < pixels.length ; i += 4) {
		var r = pixels[i],
			g = pixels[i+1],
			b = pixels[i+2];

		if(!red[r])
			red[r] = 0;
		if(!green[g])
			green[g] = 0;
		if(!blue[b])
			blue[b] = 0;
		
		red[r]++;
		green[g]++;
		blue[b]++;
	}
}