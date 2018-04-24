function init() {

	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	renderer.setSize(500, 500);

	document.getElementById("canvas").appendChild(renderer.domElement);

	var camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );

	var triangleGeometry = new THREE.Geometry(); 
	
	var numVertices = 60,
		raio = 0.4;
	triangleGeometry.vertices.push(new THREE.Vector3(0, 0, 0.5)) //centro base 1
	triangleGeometry.vertices.push(new THREE.Vector3(0, 0, 0)) //cenro base 2
	
	for (var i = 1 ; i <= numVertices ; i++) {
		var x = raio * Math.cos(i*2*Math.PI/(numVertices-1)),
			y = raio * Math.sin(i*2*Math.PI/(numVertices-1));
		triangleGeometry.vertices.push(new THREE.Vector3(x, y, 0.5)); //circuferencia da base 1
		triangleGeometry.vertices.push(new THREE.Vector3(x, y, -0,5)); //circuferencia da base 2
	}
	var face_count = 0;
	for (var i = 2 ; i < (2*numVertices)-2+2  ; i++){
		if(i%2 == 0){
			triangleGeometry.faces.push(new THREE.Face3(i, i+2, 0)); //faz a base 1
			triangleGeometry.faces[face_count++].color = new THREE.Color(0x0000FF);
		} else {
			triangleGeometry.faces.push(new THREE.Face3(i+2, 1, i)); //faz a base 2
			triangleGeometry.faces[face_count++].color = new THREE.Color('white');
		}
		triangleGeometry.faces.push(new THREE.Face3(i, i+1, i+2)); //faz um lado
		triangleGeometry.faces[face_count++].color = new THREE.Color(0x00FF00);
		triangleGeometry.faces.push(new THREE.Face3(i+2, i+1, i)); //faz o lado inverso
		triangleGeometry.faces[face_count++].color = new THREE.Color(0x00FF00);
	}
		
	var triangleMaterial = new THREE.MeshBasicMaterial({
		vertexColors: THREE.FaceColors,
		// wireframe: true,
		side: THREE.DoubleSide
	});

	var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial); 
	
	triangleMesh.rotation.x = 0;
	triangleMesh.rotation.y = 0;
	
	scene.add( triangleMesh );	
		
	renderer.clear();
	renderer.render(scene, camera);
	var id;
	var animate = function (){
		id = requestAnimationFrame(animate);

		triangleMesh.rotation.x += 0.05;
		triangleMesh.rotation.y += 0.01;
		renderer.render(scene, camera);
	};

	var button = document.getElementsByTagName('button');
	button[0].onclick = animate;
	button[1].onclick = () => {
		cancelAnimationFrame(id);
	}
};