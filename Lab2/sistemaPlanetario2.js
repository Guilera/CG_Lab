var scene 		= null;
var renderer	= null;
var camera 		= null;
var earth 		= null;
var marth 		= null;
var sun 		= null;
var group		= null;
var day 		= 0.0;
var year		= 0.0;
var month		= 0.0;

function init() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.OrthographicCamera( -2.0, 2.0, 2.0, -2.0, -2.0, 2.0 );
	scene.add( camera );
	
	group = new THREE.Object3D();
	var m = new THREE.Matrix4();

	// Eixo do Sol
	var sAxis = new THREE.AxisHelper(0.6);

	// Sol
	var sphereGeometry = new THREE.SphereGeometry( 0.4, 20, 20);                 
	var sphereMat = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:false} );
	sun = new THREE.Mesh( sphereGeometry, sphereMat );
	sun.add(sAxis);
	group.add(sun);
	scene.add(group);	
	
	// Eixo da Terra
	var tAxis = new THREE.AxisHelper(0.15);

	// Terra	
	m.makeScale(1/4, 1/4, 1/4);
	sphereGeometry = sun.geometry.clone();
	sphereGeometry.applyMatrix(m);
	sphereMat = new THREE.MeshBasicMaterial( {color: 0x0000ff, wireframe:false} );
	earth = new THREE.Mesh(sphereGeometry, sphereMat);
	earth.add(tAxis);
	// scene.add(earth);
	group.add(earth);
	
	// Marte
	m.makeScale(0.53, 0.53, 0.53);
	sphereGeometry = earth.geometry.clone();
	sphereGeometry.applyMatrix(m);
	sphereMat = new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe:false} );
	marth = new THREE.Mesh(sphereGeometry, sphereMat);
	marth.add(tAxis);
	// scene.add(earth);
	group.add(marth);
		
	// Eixo da Lua
	var lAxis = new THREE.AxisHelper(0.04);

	// Lua	
	m.makeScale(1/3, 1/3, 1/3);
	sphereGeometry = earth.geometry.clone();
	sphereGeometry.applyMatrix(m);
	sphereMat = new THREE.MeshBasicMaterial( {color: 0xaaaaaa, wireframe:false} );
	moon = new THREE.Mesh( sphereGeometry, sphereMat );
	moon.add(lAxis);
	// scene.add(moon);
	earth.add(moon);
		
	renderer.clear();
	render();
};

function render() {
	var m = new THREE.Matrix4();
	
	day 	+= 0.07;
	year 	+= 0.01;
	month 	+= 0.04;
	
	//BEGIN SUN===========
	sun.matrix.copy(new THREE.Matrix4().identity());
	m.makeRotationX(year);
	sun.applyMatrix(m);
	sun.updateMatrix();
	//===================END SUN

	//BEGIN GROUP==========
	group.matrix.copy(new THREE.Matrix4().identity());
	m.makeRotationY(year);
	group.applyMatrix(m);
	group.updateMatrix();
	//=============END GROUP

	//BEGIN EARTH========
	earth.matrix.copy(new THREE.Matrix4().identity());
	
	//ROTATE ON ITSELF
	m.makeRotationY(day);
	earth.applyMatrix(m);

	//TRANSLATE
	m.makeTranslation(0.7, 0, 0);
	earth.applyMatrix(m);
	
	earth.updateMatrix();
	//===========END EARTH

	//BEGIN MOON=============
	moon.matrix.copy(new THREE.Matrix4().identity());

	//ROTATE AROUND ITSELF
	m.makeRotationY(month);
	moon.applyMatrix(m);

	//TRANSLATE TO DIFF FROM EARTH
	m.makeTranslation(0.15, 0, 0);
	moon.applyMatrix(m);

	moon.updateMatrix();

	//==============END MOON

	//BEGIN MARTH========
	marth.matrix.copy(new THREE.Matrix4().identity());
	
	//ROTATE ON ITSELF
	m.makeRotationY(day);
	marth.applyMatrix(m);

	//TRANSLATE
	m.makeTranslation(1.2, 0, 0);
	marth.applyMatrix(m);
	
	marth.updateMatrix();
	//===========END MARTH

	renderer.render(scene, camera);
	
	requestAnimationFrame(render);
}