var scene, renderer, camera, gotaGeometry, gotaMesh, gotaMaterial;
var num_vertices;
var fixed, cartesian, spherical;
var checkbox;

function init() {
	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	renderer.setSize(750, 750);

	document.getElementById("canvas").appendChild(renderer.domElement);
	fixed = document.getElementById('fixed');
	cartesian = document.getElementById('cartesian'); 
	spherical = document.getElementById('spherical');
	checkbox = document.getElementById('checkbox');

	camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );

	num_vertices = 30;
	makeGota();

	var id;
	var animate = function (){
		id = requestAnimationFrame(animate);

		gotaMesh.rotation.x += 0.02;
		gotaMesh.rotation.y += 0.01;
		renderer.render(scene, camera);
	};

	var button = document.getElementsByTagName('button');
	button[0].onclick = animate;
	button[1].onclick = () => {
		cancelAnimationFrame(id);
	};

};

function makeGota() {

	while(scene.children.length > 0)
		scene.remove(scene.children[0]); 

	gotaGeometry = new THREE.Geometry(); 
	var x, y, z, omega, theta;
	var MAX = {
		x: 0,
		y: 0,
		z: 0,
	};
	var MIN = {
		x: 0,
		y: 0,
		z: 0,
	}
	for(var i = 0 ; i < num_vertices ; i++){
		omega = i*2*Math.PI/(num_vertices - 1);
		for(var j = 0 ; j < num_vertices ; j++){
			theta = j*Math.PI/(num_vertices - 1);
			x = 0.5 * (1 - Math.cos(theta))*Math.sin(theta)*Math.cos(omega);
			y = 0.5 * (1 - Math.cos(theta))*Math.sin(theta)*Math.sin(omega);
			z = Math.cos(theta);

			gotaGeometry.vertices.push(new THREE.Vector3(x, y, z));

			MAX.x = Math.max(x, MAX.x);
			MAX.y = Math.max(y, MAX.y);
			MAX.z = Math.max(z, MAX.z);

			MIN.x = Math.min(x, MIN.x);
			MIN.y = Math.min(y, MIN.y);
			MIN.z = Math.min(z, MIN.z);
		}
	}

	var face_count = 0;
	for (var i = 0 ; i < num_vertices - 1; i++){
		for(var j = 0 ; j < num_vertices - 1; j++){

			var o1 = i*2*Math.PI/(num_vertices - 1),
				o2 = (i+1)*2*Math.PI/(num_vertices - 1),
				t1 = j*Math.PI/(num_vertices - 1),
				t2 = (j+1)*Math.PI/(num_vertices - 1);

			gotaGeometry.faces.push(new THREE.Face3(i*num_vertices+j, (i+1)*num_vertices+j, (i+1)*num_vertices+(j+1)));
			faceColor(gotaGeometry.faces[face_count], MAX, MIN, [o1, o2, o2], [t1, t1, t2]);
			face_count++;

			gotaGeometry.faces.push(new THREE.Face3(i*num_vertices+j, (i+1)*num_vertices+(j+1), i*num_vertices+(j+1)));
			faceColor(gotaGeometry.faces[face_count], MAX, MIN, [o1, o2, o1], [t1, t2, t2]);
			face_count++;
		}
	}
		
	gotaMaterial = new THREE.MeshBasicMaterial({
		vertexColors: THREE.VertexColors,
		wireframe: checkbox.checked
	});

	gotaMesh = new THREE.Mesh(gotaGeometry, gotaMaterial); 
	gotaMesh.rotation.y += Math.PI/2;
	
	scene.add(gotaMesh);	
		
	renderer.clear();
	renderer.render(scene, camera);
}

function updateTextInput(val) {
		 document.getElementById('textInput').value = val;
		 num_vertices = val; 
};
function updateSlider(val) {
		 document.getElementById('slider').value = val; 
		 num_vertices = val;
};

function faceColor(face, MAX, MIN, omega, theta) {
	if(fixed.checked){
		face.color = new THREE.Color(0x0000FF);
	
	} else if(cartesian.checked) {
		var v = gotaGeometry.vertices[face.a];
		face.vertexColors[0] = new THREE.Color(normalizeCartesian(v.x, MAX.x, MIN.x), normalizeCartesian(v.y, MAX.y, MIN.y), normalizeCartesian(v.z, MAX.z, MIN.z));
		
		v = gotaGeometry.vertices[face.b];
		face.vertexColors[1] = new THREE.Color(normalizeCartesian(v.x, MAX.x, MIN.x), normalizeCartesian(v.y, MAX.y, MIN.y), normalizeCartesian(v.z, MAX.z, MIN.z));

		v = gotaGeometry.vertices[face.c];
		face.vertexColors[2] = new THREE.Color(normalizeCartesian(v.x, MAX.x, MIN.x), normalizeCartesian(v.y, MAX.y, MIN.y), normalizeCartesian(v.z, MAX.z, MIN.z));
	
	} else if(spherical.checked) {
		face.vertexColors[0] = new THREE.Color();
		face.vertexColors[0].setHSL(normalizeSpherical(omega[0], 2*Math.PI, 0), 1, 1 - normalizeSpherical(theta[0], Math.PI, 0));
		face.vertexColors[1] = new THREE.Color();
		face.vertexColors[1].setHSL(normalizeSpherical(omega[1], 2*Math.PI, 0), 1, 1 - normalizeSpherical(theta[1], Math.PI, 0));
		face.vertexColors[2] = new THREE.Color();
		face.vertexColors[2].setHSL(normalizeSpherical(omega[2], 2*Math.PI, 0), 1, 1 - normalizeSpherical(theta[2], Math.PI, 0));
	}
};

function normalizeCartesian(val, max, min) {
	return (val - min) / (max - min);
}

function normalizeSpherical(val, max, min) {
	return (val - min) / (max - min);
}