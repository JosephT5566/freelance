import React, { useRef } from 'react';
import { makeStyles } from 'tss-react/mui';
import { useEffect } from 'react';
import * as THREE from 'three';
import { GUI } from 'dat.gui';

const useStyle = makeStyles()(() => ({
	sphere: {
		position: 'absolute',
		top: 0,
		width: '100%',
		height: '100%',
	},
}));

const createGUI = (): GUI => {
	const module = require('dat.gui');
	const { GUI } = module;
	return new GUI();
};

const DEBUG_GUI = false;

const noise = `
  // GLSL textureless classic 3D noise "cnoise",
  // with an RSL-style periodic variant "pnoise".
  // Author:  Stefan Gustavson (stefan.gustavson@liu.se)
  // Version: 2011-10-11
  //
  // Many thanks to Ian McEwan of Ashima Arts for the
  // ideas for permutation and gradient selection.
  //
  // Copyright (c) 2011 Stefan Gustavson. All rights reserved.
  // Distributed under the MIT license. See LICENSE file.
  // https://github.com/ashima/webgl-noise
  //

  vec3 mod289(vec3 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 mod289(vec4 x)
  {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 permute(vec4 x)
  {
    return mod289(((x*34.0)+1.0)*x);
  }

  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }

  // Classic Perlin noise, periodic variant
  float pnoise(vec3 P, vec3 rep)
  {
    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }
`;

const rotation = `
	mat3 rotation3dY(float angle) {
		float s = sin(angle);
		float c = cos(angle);

		return mat3(
		c, 0.0, -s,
		0.0, 1.0, 0.0,
		s, 0.0, c
		);
	}

	vec3 rotateY(vec3 v, float angle) {
		return rotation3dY(angle) * v;
	}
`;

const vertexShader = `  
	varying float vDistort;
  
	uniform float uTime;
	uniform float uSpeed;
	uniform float uNoiseDensity;
	uniform float uNoiseStrength;
	uniform float uFrequency;
	uniform float uAmplitude;
  
	${noise}
	
	${rotation}
	
	void main() {
		float t = uTime * uSpeed;
		float distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;

		vec3 pos = position + (normal * distortion);
		float angle = sin(uv.y * uFrequency + t) * uAmplitude;
		pos = rotateY(pos, angle);    
		
		vDistort = distortion;

		gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
	}  
`;

const fragmentShader = `
	varying vec2 vUv;
	varying float vDistort;
	
	uniform float uTime;
	uniform float uIntensity;
	
	vec3 cosPalette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
		return a + b * cos(6.28318 * (c * t + d));
	}     
	
	void main() {
		float distort = vDistort * uIntensity;
		
		vec3 brightness = vec3(0.5, 0.65, 0.5);
		vec3 contrast = vec3(0.5, 0.5, 0.5);
		vec3 oscilation = vec3(1.0, 1.0, 1.0);
		vec3 phase = vec3(0.00, 0.10, 0.20);
	
		vec3 color = cosPalette(distort, brightness, contrast, oscilation, phase);
		
		gl_FragColor = vec4(color, 0.7);
	}  
`;

export default function Sphere() {
	const { classes } = useStyle();
	const canvasRef = useRef(null);

	const settings = {
		speed: 0.2,
		density: 1.5,
		strength: 0.2,
		frequency: 3.0,
		amplitude: 4.0,
		intensity: 7.0,
	};

	useEffect(() => {
		if (DEBUG_GUI) {
			const gui = createGUI();

			const folder1 = gui.addFolder('Noise');
			const folder2 = gui.addFolder('Rotation');
			const folder3 = gui.addFolder('color');
			folder1.add(settings, 'speed', 0.1, 1, 0.01);
			folder1.add(settings, 'density', 0, 10, 0.01);
			folder1.add(settings, 'strength', 0, 2, 0.01);
			folder2.add(settings, 'frequency', 0, 10, 0.1);
			folder2.add(settings, 'amplitude', 0, 10, 0.1);
			folder3.add(settings, 'intensity', 0, 10, 0.1);
		}

		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		// Scene
		const scene = new THREE.Scene();
		// Objects
		const geometry = new THREE.IcosahedronBufferGeometry(1, 64);
		// Materials
		const material = new THREE.ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				uTime: { value: 0 },
				uSpeed: { value: settings.speed },
				uNoiseDensity: { value: settings.density },
				uNoiseStrength: { value: settings.strength },
				uFrequency: { value: settings.frequency },
				uAmplitude: { value: settings.amplitude },
				uIntensity: { value: settings.intensity },
			},
			// wireframe: true,
		});

		// Mesh
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		// Lights
		// const pointLight = new THREE.PointLight(0xffffff, 0.1);
		// pointLight.position.x = 2;
		// pointLight.position.y = 3;
		// pointLight.position.z = 4;
		// scene.add(pointLight);

		// camera
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 4;
		scene.add(camera);

		// renderer
		const renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
		});
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		canvasRef.current.appendChild(renderer.domElement);

		let mouseX = 0;
		let mouseY = 0;
		const windowX = window.innerWidth / 2;
		const windowY = window.innerHeight / 2;

		const onMouseMove = (event) => {
			mouseX = event.clientX - windowX;
			mouseY = event.clientY - windowY;
		};

		const onScreenScroll = () => {
			mesh.position.y = window.scrollY * 0.003;
		};

		const onResize = () => {
			// Update sizes
			sizes.width = window.innerWidth;
			sizes.height = window.innerHeight;
			// Update camera
			camera.aspect = sizes.width / sizes.height;
			camera.updateProjectionMatrix();
			// Update renderer
			renderer.setSize(sizes.width, sizes.height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		};

		const clock = new THREE.Clock();

		const animate = () => {
			// mesh.rotation.y = 0.5 * elapsedTime;
			const targetX = mouseX * 0.001;
			const targetY = mouseY * 0.001;
			mesh.rotation.y += 0.5 * (targetX - mesh.rotation.y);
			mesh.rotation.x += 0.5 * (targetY - mesh.rotation.x);

			// Update uniforms
			mesh.material.uniforms.uTime.value = clock.getElapsedTime();
			mesh.material.uniforms.uSpeed.value = settings.speed;
			mesh.material.uniforms.uNoiseDensity.value = settings.density;
			mesh.material.uniforms.uNoiseStrength.value = settings.strength;
			mesh.material.uniforms.uFrequency.value = settings.frequency;
			mesh.material.uniforms.uAmplitude.value = settings.amplitude;
			mesh.material.uniforms.uIntensity.value = settings.intensity;

			// Render
			renderer.render(scene, camera);

			// Call tick again on the next frame
			window.requestAnimationFrame(animate);
		};

		animate();

		window.addEventListener('resize', onResize);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('scroll', onScreenScroll);

		return () => {
			window.removeEventListener('resize', onResize);
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('scroll', onScreenScroll);
		};
	}, []);

	return <div className={classes.sphere} ref={canvasRef}></div>;
}
