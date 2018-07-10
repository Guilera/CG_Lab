var renderer;
var scene;
var camera;
var control;
var stats;
var cameraControl;
var earthMesh;

function init() {

    clock = new THREE.Clock();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 40;
    camera.lookAt(scene.position);
    cameraControl = new THREE.OrbitControls(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

    // cria esfera do planeta Terra
    var sphereGeometry = new THREE.SphereGeometry(15, 60, 60);
    var sphereMaterial = createEarthMaterial();
    earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(earthMesh);

    // Luz ambiente
    var ambientLight = new THREE.AmbientLight(0x111111);
    ambientLight.name = 'ambient';
    scene.add(ambientLight);

    // Luz do sol
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set( 3, 3, 3 ).normalize();
    directionalLight.name = 'directional';
    scene.add(directionalLight);

    document.body.appendChild(renderer.domElement);

    render();
}


function createEarthMaterial() {
    
    var textureLoader = new THREE.TextureLoader();

    var earthTexture    = textureLoader.load("earthmap4k.jpg");

    var earthMaterial = new THREE.MeshPhongMaterial();
    earthMaterial.map = earthTexture;
    
    return earthMaterial;
}

function render() {

    cameraControl.update();

	earthMesh.rotation.y+=0.0005;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}
