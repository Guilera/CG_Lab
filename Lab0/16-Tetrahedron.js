function init() {

	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	renderer.setSize(500, 500);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	var camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );

	var triangleGeometry = new THREE.Geometry(); 
	
	triangleGeometry.vertices.push(new THREE.Vector3( 0,  0.5,  0));//A -> 0
	triangleGeometry.vertices.push(new THREE.Vector3(0, 0,  0.5)); 	//B -> 1 
	triangleGeometry.vertices.push(new THREE.Vector3(0.5, 0,  0));	//C -> 2
	triangleGeometry.vertices.push(new THREE.Vector3(0, 0, -0.5)); 	//D -> 3

	// Front
	triangleGeometry.faces.push(new THREE.Face3(1, 2, 0)); //BCA
	triangleGeometry.faces[0].materialIndex = 0;
	
	// Bottom
	triangleGeometry.faces.push(new THREE.Face3(3, 2, 1)); //DCB
	triangleGeometry.faces[1].materialIndex = 1;
	
	// Right
	triangleGeometry.faces.push(new THREE.Face3(2, 3, 0)); //CDA
	triangleGeometry.faces[2].materialIndex = 2;
	
	// Left
	triangleGeometry.faces.push(new THREE.Face3(1, 0, 3)); //BAD 
	triangleGeometry.faces[3].materialIndex = 3;
	
	var boxMaterials = 	[ 	
		new THREE.MeshBasicMaterial({color:'red'}), 
		new THREE.MeshBasicMaterial({color:'blue'}), 
		new THREE.MeshBasicMaterial({color:'green'}),
		new THREE.MeshBasicMaterial({color:'white'})
	]; 
                 
	var triangleMaterial = new THREE.MeshFaceMaterial(boxMaterials); 
	
	var triangleMesh = new THREE.Mesh(triangleGeometry, triangleMaterial); 
	triangleMesh.rotation.x = Math.PI / 3;
	triangleMesh.rotation.y = Math.PI / 3;
	scene.add( triangleMesh );	
		
	renderer.clear();
	renderer.render(scene, camera);

	var animate = function (){
		requestAnimationFrame(animate);

		triangleMesh.rotation.x += 0.01;
		triangleMesh.rotation.y += 0.01;
		renderer.render(scene, camera);
	};


	var button = document.getElementsByTagName('button');
	button[0].onclick = animate;
};