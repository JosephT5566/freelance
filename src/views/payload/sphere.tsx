import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import * as THREE from 'three';
// import * as dat from 'dat.gui';

const useStyle = makeStyles(() => ({
	sphere: {
		position: 'absolute',
		top: 0,
		width: '100%',
		height: '100%',
	},
}));

export default function Sphere() {
	const classes = useStyle();
	const canvasRef = useRef(null);

	useEffect(() => {
		// const gui = new dat.GUI();
		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};

		// Scene
		const scene = new THREE.Scene();
		// Objects
		const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
		// Materials
		const material = new THREE.MeshBasicMaterial();
		material.color = new THREE.Color(0xff0000);
		// Mesh
		const sphere = new THREE.Mesh(geometry, material);
		scene.add(sphere);
		// Lights
		const pointLight = new THREE.PointLight(0xffffff, 0.1);
		pointLight.position.x = 2;
		pointLight.position.y = 3;
		pointLight.position.z = 4;
		scene.add(pointLight);

		// camera
		var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 5;
		scene.add(camera);

		// renderer
		const renderer = new THREE.WebGLRenderer({
			alpha: true,
		});
		renderer.setSize(sizes.width, sizes.height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		canvasRef.current.appendChild(renderer.domElement);

		const updateSize = () => {
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

		const aninate = () => {
			const elapsedTime = clock.getElapsedTime();

			// Update objects
			sphere.rotation.y = 0.5 * elapsedTime;

			// Update Orbital Controls
			// controls.update()

			// Render
			renderer.render(scene, camera);

			// Call tick again on the next frame
			window.requestAnimationFrame(aninate);
		};

		aninate();

		window.addEventListener('resize', updateSize);

		return () => {
			window.removeEventListener('resize', updateSize);
		};
	}, []);

	return <div className={classes.sphere} ref={canvasRef}></div>;
}
