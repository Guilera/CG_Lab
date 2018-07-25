var scene, camera, renderer, video, controls, cube;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas').appendChild(renderer.domElement);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    video = document.getElementById('video');
    getVideo(video);
    var videoTexture = getVideoTexture();
    var environmentTexture = getEnvironmentTexture();
    var loader = new THREE.TextureLoader();

    var materials = [
        new THREE.MeshStandardMaterial({map: videoTexture, displacementMap: loader.load("disp.jpg"), displacementScale: 1.8, displacementBias: -1}),
        new THREE.MeshStandardMaterial({map: videoTexture, normalMap: loader.load("normal.jpg")}),
        new THREE.MeshPhongMaterial({specularMap: videoTexture, color: "#C288C9"}),
        new THREE.MeshStandardMaterial({map: videoTexture, bumpMap: videoTexture}),
        new THREE.MeshStandardMaterial({map: videoTexture, alphaMap: videoTexture, transparent: false, alphaTest: 0.3}),
        new THREE.MeshLambertMaterial({envMap: environmentTexture})
    ];

    cube = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10, 100, 100, 100), materials);
    
    scene.background = environmentTexture;
    positionCamera(cube);
    scene.add(cube);

    var ambientLight = new THREE.AmbientLight(0x444444);
    var pointLight = new THREE.PointLight(0xffffff, 1);
    
    camera.add(pointLight);
    scene.add(camera);
    scene.add(ambientLight);

    render();
};

function render() {
    
    if(cube) {
        cube.rotation.x += 0.005;
        cube.rotation.z += 0.005;
    }

    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};

function getVideo(video) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        var constraints = { 
            video: { 
                width: 1280, 
                height: 720, 
                facingMode: 'user' 
            } 
        };

        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            video.srcObject = stream;
            video.play();
        }).catch(error => {
            console.error('Unable to access the camera/webcam.', error);
        });
    } else {
        console.error('MediaDevices interface not available.');
    }
};

function getVideoTexture() {
    var texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    return texture;
};

function getEnvironmentTexture() {
    var texture = new THREE.CubeTextureLoader().load([
        "posx.jpg", 
        "negx.jpg",
        "posy.jpg", 
        "negy.jpg",
        "posz.jpg",
        "negz.jpg"
    ]);
    texture.format = THREE.RGBFormat;
    texture.mapping = THREE.CubeReflectionMapping;
    
    return texture;
};

function positionCamera(cubeMesh) {
	var box = new THREE.Box3().setFromObject(cubeMesh);	
    var max = Math.max(box.max.x, box.max.y, box.max.z);
	
	camera.position.x = camera.position.y = camera.position.z = max * 2.5;
	camera.far = new THREE.Vector3(max * 5, max * 5, max * 5).length();
	camera.lookAt(new THREE.Vector3((box.max.x + box.min.x) / 2.0, (box.max.y + box.min.y) / 2.0, (box.max.z + box.min.z) / 2.0));
	camera.updateProjectionMatrix();	
}
