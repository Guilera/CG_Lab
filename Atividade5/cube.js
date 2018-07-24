var scene, camera, renderer, video, controls, cube;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas').appendChild(renderer.domElement);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    video = document.getElementById('video');
    getVideo(video);
    var texture = getVideoTexture();
    var loader = new THREE.TextureLoader();

    var normal = loader.load("Brick_Wall_011_NORM.jpg");
    // var displacement = loader.load("Brick_Wall_011_DISP.png");
    var displacement = loader.load("cobblestone.png");
    var alpha = loader.load("alpha.png");
    var bump = loader.load("bricks_bump.jpg");
    var enviroment = loader.load("");


    var materials = [
        new THREE.MeshStandardMaterial({map: texture, normalMap: normal}),
        new THREE.MeshStandardMaterial({map: texture, displacementMap: displacement, displacementScale: 0.5}),
        new THREE.MeshStandardMaterial({map: texture, alphaMap: alpha, transparent: false, alphaTest: 0.3}),
        new THREE.MeshStandardMaterial({map: texture, bumpMap: bump}),
        new THREE.MeshPhongMaterial({specularMap: texture, color: "#C288C9"}),
        new THREE.MeshStandardMaterial()
    ];

    cube = new THREE.Mesh(new THREE.BoxGeometry(562, 562, 562, 1, 1, 1), materials);
    
    buildScene(cube);
    scene.add(cube);

    var ambientLight = new THREE.AmbientLight(0x444444);
    scene.add(ambientLight);

    var light = new THREE.PointLight(0xffffff, 1);

    camera.add(light);
    scene.add(camera);

    render();
};

function render() {
    
    // if(cube) {
    //     cube.rotation.x += 0.005;
    //     cube.rotation.z += 0.005;
    // }

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

function buildScene(loadedMesh) {
	var box = new THREE.Box3();
	box.setFromObject(loadedMesh);	

    var maxCoord = Math.max(box.max.x,box.max.y,box.max.z);
	
	camera.position.x = camera.position.y = camera.position.z = maxCoord * 2.5;
	camera.far = new THREE.Vector3(maxCoord*5, maxCoord*5, maxCoord*5).length();
	camera.lookAt(new THREE.Vector3((box.max.x + box.min.x) / 2.0, (box.max.y + box.min.y) / 2.0, (box.max.z + box.min.z) / 2.0));
	camera.updateProjectionMatrix();	
}
