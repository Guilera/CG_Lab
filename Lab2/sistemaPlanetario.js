var scene 		= null;
var renderer	= null;
var camera 		= null;
var earth 		= null;
var sun 		= null;
var day 		= 0.0;
var year		= 0.0;
var month		= 0.0;

function init() {

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(window.innerWidth*0.7, window.innerHeight*0.7);

	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	camera = new THREE.OrthographicCamera( -1.0, 1.0, 1.0, -1.0, -1.0, 1.0 );
	scene.add( camera );
		
	// Eixo do Sol
	var sAxis = new THREE.AxisHelper(0.6);

	// Sol
	var sphereGeometry = new THREE.SphereGeometry( 0.4, 20, 20);                 
	var sphereMat = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:false} );
	sun = new THREE.Mesh( sphereGeometry, sphereMat );
	sun.add(sAxis);
	scene.add(sun);	
	
	// Eixo da Terra
	var tAxis = new THREE.AxisHelper(0.15);

	// Terra	
	sphereGeometry = new THREE.SphereGeometry( 0.1, 20, 20);                 
	sphereMat = new THREE.MeshBasicMaterial( {color: 0x0000ff, wireframe:false} );
	earth = new THREE.Mesh( sphereGeometry, sphereMat );
	earth.position.set(0.5, 0, 0);
	earth.add(tAxis);
	scene.add( earth );	
		
	// Eixo da Lua
	var lAxis = new THREE.AxisHelper(0.04);

	// Lua	
	sphereGeometry = new THREE.SphereGeometry( 0.03, 10, 10 );                 
	sphereMat = new THREE.MeshBasicMaterial( {color: 0xaaaaaa, wireframe:false} );
	moon = new THREE.Mesh( sphereGeometry, sphereMat );
	moon.add(lAxis);
	scene.add( moon );	
		
	renderer.clear();
	render();
};

function render() {
	var m = new THREE.Matrix4();
	
	day 	+= 0.07;
	year 	+= 0.01;
	month 	+= 0.04;
	
	//BEGIN SUN==========
	sun.matrix.copy(new THREE.Matrix4().identity());
	m.makeRotationY(year);
	sun.applyMatrix(m);
	sun.updateMatrix();
	//=============END SUN

	//BEGIN EARTH========
	earth.matrix.copy(new THREE.Matrix4().identity());
	
	//ROTATE ON ITSELF
	m.makeRotationY(day);
	earth.applyMatrix(m);

	//TRANSLATE
	m.makeTranslation(0.7, 0, 0);
	earth.applyMatrix(m);
	
	//ROTATE AROUND SUN
	m.makeRotationY(year);
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

	//ROTATE AROUND EARTH
	m.makeRotationY(month);
	moon.applyMatrix(m);
	
	//TRANSLATE TO EARTH
	m.makeTranslation(0.7, 0, 0);
	moon.applyMatrix(m);

	//ROTATE AROUND SUN
	m.makeRotationY(year);
	moon.applyMatrix(m);

	moon.updateMatrix();

	//==============END MOON

	renderer.render(scene, camera);
	
	requestAnimationFrame(render);
}

