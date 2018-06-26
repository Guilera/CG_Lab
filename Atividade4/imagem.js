var renderer,
	scene,
	texture,
	eq_texture,
	camera,
	camera2,
	view_size = {
		w: 350,
		h: 350
	},
	histo_size,
	red,
	green,
	blue;

var histograms;

function init() {
	window.innerHeight = 800;
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
	document.getElementById("canvas").appendChild(renderer.domElement);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xFFFFFF);

	camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1.0, 1.0);
	camera2 = new THREE.OrthographicCamera(0, 258, 1, 0, -1.0, 1.0);
	scene.add(camera);
	scene.add(camera2);
}

function load(file) {
	texture = new THREE.TextureLoader().load(file, () => {		
		var planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 20, 20);
		var planeGeometry2 = new THREE.PlaneBufferGeometry(1, 1, 20, 20);

		var planeMaterial = new THREE.MeshBasicMaterial({
			map: texture,
			wireframe: false,
			side: THREE.DoubleSide
		});

		var plane = new THREE.Mesh(planeGeometry, planeMaterial);
		scene.add(plane);
		
		var image_data = getImageData(texture.image);
		count_pixels(image_data, 4);

		histograms = histogram(red, green, blue).reverse();
		
		histo_size = {
			w: 350,
			h: Math.floor(view_size.h/histograms.length),
			top: 0
		}

		renderer.clear();
		
		//old image
		renderImage(10, window.innerHeight);
		renderHistograms(10, window.innerHeight);

		
		//new image
		var new_data = equalizer(image_data, red, green, blue);
		
		eq_texture = new THREE.DataTexture(new_data, texture.image.width, texture.image.height, THREE.RGBFormat);
		eq_texture.needsUpdate = true
		eq_texture.flipY = true;
		
		var planeMaterial2 = new THREE.MeshBasicMaterial({
			map: eq_texture,
			wireframe: false,
			side: THREE.DoubleSide
		});
		
		var plane2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
		
		clearScene();
		scene.add(plane2);

		count_pixels(new_data, 3);
		histograms = histogram(red, green, blue).reverse();

		renderImage(window.innerWidth/2, window.innerHeight);
		renderHistograms(window.innerWidth/2, window.innerHeight);
	});
}

function getImageData(image) {
	
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    return context.getImageData(0, 0, image.width, image.height).data;

}

function count_pixels(pixels, offset) {
	red = [];
	green = [];
	blue = [];

	for(var i = 0 ; i < pixels.length ; i += offset) {
		var r = pixels[i],
			g = pixels[i+1],
			b = pixels[i+2];

		if(!red[r])
			red[r] = 0;

		if(!green[g])
			green[g] = 0;
		
		if(!blue[b])
			blue[b] = 0;
		
		red[r]++;
		green[g]++;
		blue[b]++;
	}
}

function isGrayScale(red, green, blue) {
	r = JSON.stringify(red);
	g = JSON.stringify(green);
	b = JSON.stringify(blue);

	return r == g && r == b;
}

function histogram(red, green, blue) {
	var colors = [],
		materials = [],
		histo = [];

	if(isGrayScale(red, green, blue)) {
		colors = [red];
		materials = [new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})];
	} else {
		colors = [red, green, blue];
		materials = [
			new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true}),
			new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe: true}),
			new THREE.MeshBasicMaterial({color: 0x0000FF, wireframe: true})
		]
	}

	for (var c = 0; c < colors.length; c++) {
		var max, min;
		
		[max, min] = extremals(colors[c]);

		function normalize(value) {
			return (value - min) / (max - min)
		}

		geometry = new THREE.Geometry();

		for (var i = 0; i < colors[c].length; i++) {
			if(colors[c][i]) {
				geometry.vertices.push(new THREE.Vector3(i, 0, 0));
				geometry.vertices.push(new THREE.Vector3(i, normalize(colors[c][i]), 0));
				geometry.vertices.push(new THREE.Vector3(i, normalize(colors[c][i]), 1));
			}
		}

		for (var i = 0; i < geometry.vertices.length - 2; i += 3) {
			geometry.faces.push(new THREE.Face3(i, i+1, i+2));
		}

		histo.push(new THREE.Mesh(geometry, materials[c]));
	}

	return histo;
}

function extremals(color) {
	var max = 0, min = Number.MAX_VALUE;
	color.forEach(p => {
		max = Math.max(max, p);
		min = Math.min(min, p);
	});

	return [max, min];
}

function equalizer(image_data) {
	var size = texture.image.width * texture.image.height;
	var data = new Uint8Array( 3 * size );

	var p;
	var acc = {
		r: 0,
		g: 0,
		b: 0
	};

	for(var i = 0; i < 256; i++) {
		if(red[i]) {
			p = red[i]/size;
			acc.r += p;
			red[i] = Math.round(acc.r*255);
		}
		if(green[i]) {
			p = green[i]/size;
			acc.g += p;
			green[i] = Math.round(acc.g*255);
		}
		if(blue[i]) {
			p = blue[i]/size;
			acc.b += p;
			blue[i] = Math.round(acc.b*255);
		}
	}

	size *= 3;
	for (var i = 0; i < size; i++) {
		data[i*3] = red[image_data[i*4]];
		data[i*3 + 1] = green[image_data[i*4 + 1]];
		data[i*3 + 2] = blue[image_data[i*4 + 2]];
	}
	
	return data;
}

function clearScene() {
	while(scene.children.length > 0)
		scene.remove(scene.children[0]);
}

function renderImage(x, y) {
	renderer.setViewport(x, y - view_size.h, view_size.w, view_size.h);
	renderer.setScissor(x, y - view_size.h, view_size.w, view_size.h);
	renderer.setScissorTest(true);
	renderer.render(scene, camera);	
}

function renderHistograms(x, y) {
	histo_size.top = 0;
	histograms.forEach(h => {
		clearScene();
		
		renderer.setViewport(x, y - 10 - 2 * view_size.h + histo_size.top, histo_size.w, histo_size.h);
		renderer.setScissor(x, y - 10 - 2 * view_size.h + histo_size.top, histo_size.w, histo_size.h);
		
		scene.add(h);
		renderer.render(scene, camera2);
		histo_size.top += histo_size.h;
	});	

}