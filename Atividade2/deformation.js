function twist(scene, value, direction) {
	var group = [];
	if(scene.children[0] instanceof THREE.Group)
		group = scene.children[0].children;
	else
		group.push(scene.children[0]);

	group.forEach(mesh => {
		var geometry = mesh.geometry;
		buffer = false;
		if(geometry.isBufferGeometry) {
			geometry.attributes.position.needsUpdate = true;
			geometry = new THREE.Geometry();
			geometry.fromBufferGeometry(mesh.geometry);
			buffer = true;
		}

		var vertexArray = geometry.vertices;
		var MAX = {
			x: Number.MIN_VALUE,
			y: Number.MIN_VALUE,
			z: Number.MIN_VALUE,
		};
		var MIN = {
			x: Number.MAX_VALUE,
			y: Number.MAX_VALUE,
			z: Number.MAX_VALUE,
		}
		vertexArray.forEach(v => {
			MAX.x = Math.max(MAX.x, v.x);
			MIN.x = Math.min(MIN.x, v.x);
			MAX.y = Math.max(MAX.y, v.y);
			MIN.y = Math.min(MIN.y, v.y);
			MAX.z = Math.max(MAX.z, v.z);
			MIN.z = Math.min(MIN.z, v.z);
		});
		var m = new THREE.Matrix4();
		vertexArray.forEach(v => {
			var x = normalize(v.x, MAX.x, MIN.x);
			var y = normalize(v.y, MAX.y, MIN.y);
			var z = normalize(v.z, MAX.z, MIN.z);
			if(direction.toLowerCase() == "x")
				m.makeRotationX(value * x);
			if(direction.toLowerCase() == "y")
				m.makeRotationY(value * y);
			if(direction.toLowerCase() == "z")
				m.makeRotationZ(value * z);
			v.applyMatrix4(m);
		});
		geometry.verticesNeedUpdate = true;

		if(buffer) {
			mesh.geometry.fromGeometry(geometry);
		}
	});
}

function taper(scene, value, direction) {
	var group = [];
	if(scene.children[0] instanceof THREE.Group)
		group = scene.children[0].children;
	else
		group.push(scene.children[0]);

	group.forEach(mesh => {
		var geometry = mesh.geometry;
		buffer = false;
		if(geometry.isBufferGeometry) {
			geometry.attributes.position.needsUpdate = true;
			geometry = new THREE.Geometry();
			geometry.fromBufferGeometry(mesh.geometry);
			buffer = true;
		}

		var vertexArray = geometry.vertices;
		var MAX = {
			x: Number.MIN_VALUE,
			y: Number.MIN_VALUE,
			z: Number.MIN_VALUE,
		};
		var MIN = {
			x: Number.MAX_VALUE,
			y: Number.MAX_VALUE,
			z: Number.MAX_VALUE,
		}
		vertexArray.forEach(v => {
			MAX.x = Math.max(MAX.x, v.x);
			MIN.x = Math.min(MIN.x, v.x);
			MAX.y = Math.max(MAX.y, v.y);
			MIN.y = Math.min(MIN.y, v.y);
			MAX.z = Math.max(MAX.z, v.z);
			MIN.z = Math.min(MIN.z, v.z);
		});
		var m = new THREE.Matrix4();
		vertexArray.forEach(v => {
			var x = normalize(v.x, MAX.x, MIN.x);
			var y = normalize(v.y, MAX.y, MIN.y);
			var z = normalize(v.z, MAX.z, MIN.z);
			if(direction.toLowerCase() == "x")
				m.makeScale(1, value * x, value * x);
			if(direction.toLowerCase() == "y")
				m.makeScale(value * y, 1, value * y);
			if(direction.toLowerCase() == "z")
				m.makeScale(value * z, value * z, 1);
			v.applyMatrix4(m);
		});
		geometry.verticesNeedUpdate = true;

		if(buffer)
			mesh.geometry.fromGeometry(geometry);
	});
}

function shear(scene, value, direction) {
	var group = [];
	if(scene.children[0] instanceof THREE.Group)
		group = scene.children[0].children;
	else
		group.push(scene.children[0]);
	
	group.forEach(mesh => {
		var geometry = mesh.geometry;
		buffer = false;
		if(geometry.isBufferGeometry) {
			geometry.attributes.position.needsUpdate = true;
			geometry = new THREE.Geometry();
			geometry.fromBufferGeometry(mesh.geometry);
			buffer = true;
		}

		var vertexArray = geometry.vertices;
		var MAX = {
			x: Number.MIN_VALUE,
			y: Number.MIN_VALUE,
			z: Number.MIN_VALUE,
		};
		var MIN = {
			x: Number.MAX_VALUE,
			y: Number.MAX_VALUE,
			z: Number.MAX_VALUE,
		}
		vertexArray.forEach(v => {
			MAX.x = Math.max(MAX.x, v.x);
			MIN.x = Math.min(MIN.x, v.x);
			MAX.y = Math.max(MAX.y, v.y);
			MIN.y = Math.min(MIN.y, v.y);
			MAX.z = Math.max(MAX.z, v.z);
			MIN.z = Math.min(MIN.z, v.z);
		});
		var m = new THREE.Matrix4();
		vertexArray.forEach(v => {
			var x = normalize(v.x, MAX.x, MIN.x);
			var y = normalize(v.y, MAX.y, MIN.y);
			var z = normalize(v.z, MAX.z, MIN.z);
			if(direction.toLowerCase() == "x")
				m.makeShear(value, 0, 0);
			if(direction.toLowerCase() == "y")
				m.makeShear(0, value, 0);
			if(direction.toLowerCase() == "z")
				m.makeShear(0, 0, value);
			v.applyMatrix4(m);
		});
		geometry.verticesNeedUpdate = true;

		if(buffer)
			mesh.geometry.fromGeometry(geometry);
	});
}

function normalize(val, max, min) {
	return (val - min) / (max - min);
}