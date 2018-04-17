
function init() {

	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	renderer.setSize(500, 500);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	var camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );

	var triangleGeometry = new THREE.Geometry(); 
	
	triangleGeometry.vertices.push(new THREE.Vector3( 0.5,  0.5,  0.5)); 
	triangleGeometry.vertices.push(new THREE.Vector3(-0.5, -0.5,  0.5)); 
	triangleGeometry.vertices.push(new THREE.Vector3( 0.5, -0.5,  0.5)); 
	triangleGeometry.vertices.push(new THREE.Vector3(-0.5,  0.5,  0.5)); 
	triangleGeometry.vertices.push(new THREE.Vector3( 0.5,  0.5, -0.5)); 
	triangleGeometry.vertices.push(new THREE.Vector3(-0.5, -0.5, -0.5)); 
	triangleGeometry.vertices.push(new THREE.Vector3( 0.5, -0.5, -0.5)); 
	triangleGeometry.vertices.push(new THREE.Vector3(-0.5,  0.5, -0.5)); 

	// Front
	triangleGeometry.faces.push(new THREE.Face3(1, 2, 0)); 
	triangleGeometry.faces.push(new THREE.Face3(1, 0, 3)); 
	triangleGeometry.faces[0].materialIndex =
	triangleGeometry.faces[1].materialIndex = 0;
	// Back
	triangleGeometry.faces.push(new THREE.Face3(5, 4, 6)); 
	triangleGeometry.faces.push(new THREE.Face3(5, 7, 4)); 
	triangleGeometry.faces[2].materialIndex =
	triangleGeometry.faces[3].materialIndex = 1;
	// Top
	triangleGeometry.faces.push(new THREE.Face3(3, 0, 4)); 
	triangleGeometry.faces.push(new THREE.Face3(3, 4, 7)); 
	triangleGeometry.faces[4].materialIndex =
	triangleGeometry.faces[5].materialIndex = 2;
	// Bottom
	triangleGeometry.faces.push(new THREE.Face3(1, 6, 2)); 
	triangleGeometry.faces.push(new THREE.Face3(1, 5, 6)); 
	triangleGeometry.faces[6].materialIndex =
	triangleGeometry.faces[7].materialIndex = 3;
	// Right
	triangleGeometry.faces.push(new THREE.Face3(2, 6, 4)); 
	triangleGeometry.faces.push(new THREE.Face3(2, 4, 0)); 
	triangleGeometry.faces[8].materialIndex =
	triangleGeometry.faces[9].materialIndex = 4;
	// Left
	triangleGeometry.faces.push(new THREE.Face3(5, 1, 3)); 
	triangleGeometry.faces.push(new THREE.Face3(5, 3, 7));
	triangleGeometry.faces[10].materialIndex =
	triangleGeometry.faces[11].materialIndex = 5;
	
	var boxMaterials = 	[ 	new THREE.MeshBasicMaterial({color:0xFF0000}), 
							new THREE.MeshBasicMaterial({color:0x00FF00}), 
							new THREE.MeshBasicMaterial({color:0x0000FF}), 
							new THREE.MeshBasicMaterial({color:0xFFFF00}), 
							new THREE.MeshBasicMaterial({color:0x00FFFF}), 
							new THREE.MeshBasicMaterial({color:0xFFFFFF}) 
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


