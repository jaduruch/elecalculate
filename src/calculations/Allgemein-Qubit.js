import { parseInput, parseInputsquare } from "../lib/si";
import { setHTML } from "../lib/safe-html";
import { calculateDivider } from "../lib/divider-controller";
import { createShared } from "./shared.js";
import * as THREE from "three";
/** Existing calculation algorithms, isolated to this route's mount lifecycle. */
export function createController(scope) {
	const {
		document,
		window,
		MathJax,
		requestAnimationFrame,
		cancelAnimationFrame,
		setTimeout,
		clearTimeout,
		setInterval,
		clearInterval,
	} = scope;
	const {
		changeSlide,
		showSlides,
		formatPrefixNoUnit,
		formatPrefixNoUnitSquare,
		formatWithPrefix,
		formatWithPrefixsquare,
		getlg,
		drawCurveDynamic,
		getBestSIPrefix,
		formatWithSIPrefix,
	} = createShared(scope);
	const CONFIG = {
		ANIMATION_DURATION: 750,
		PULSE_SPEED: 0.5,
	};
	let qubitState = {
		theta: 0,
		phi: 0,
	};
	let targetState = {
		theta: 0,
		phi: 0,
	};
	let isAnimating = false;
	let scene, camera, renderer, sphere, stateArrow, controls;
	let isDragging = false;
	let previousMousePosition = {
		x: 0,
		y: 0,
	};
	let particles,
		glowSphere,
		trailPoints = [];
	let time = 0;
	let arrowGlow, innerGlow;
	function initBlochSphere() {
		const container = document.getElementById("bloch-canvas-container");
		const width = container.clientWidth;
		const height = container.clientHeight;
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
		camera.position.set(2.8, 2, 2.8);
		camera.lookAt(0, 0, 0);
		renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
			powerPreference: "high-performance",
		});
		renderer.setSize(width, height);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setClearColor(0x000000, 0);
		container.appendChild(renderer.domElement);
		createParticles();
		createBlochSphere();
		createStateArrow();
		createAxisLabels();
		setupMouseControls(container);
		animate();
		window.addEventListener("resize", onWindowResize);
	}
	function createParticles() {
		const particleCount = 200;
		const geometry = new THREE.BufferGeometry();
		const positions = new Float32Array(particleCount * 3);
		const colors = new Float32Array(particleCount * 3);
		const sizes = new Float32Array(particleCount);
		for (let i = 0; i < particleCount; i++) {
			const radius = 1.5 + Math.random() * 2;
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.random() * Math.PI;
			positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] = radius * Math.cos(phi);
			positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
			const colorChoice = Math.random();
			if (colorChoice < 0.4) {
				colors[i * 3] = 0.31;
				colors[i * 3 + 1] = 0.8;
				colors[i * 3 + 2] = 0.77;
			} else if (colorChoice < 0.7) {
				colors[i * 3] = 0.77;
				colors[i * 3 + 1] = 0.3;
				colors[i * 3 + 2] = 1.0;
			} else {
				colors[i * 3] = 1.0;
				colors[i * 3 + 1] = 0.9;
				colors[i * 3 + 2] = 0.43;
			}
			sizes[i] = Math.random() * 3 + 1;
		}
		geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
		geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
		const material = new THREE.PointsMaterial({
			size: 0.03,
			vertexColors: true,
			transparent: true,
			opacity: 0.6,
			blending: THREE.AdditiveBlending,
			sizeAttenuation: true,
		});
		particles = new THREE.Points(geometry, material);
		scene.add(particles);
	}
	function createBlochSphere() {
		const innerGlowGeometry = new THREE.SphereGeometry(0.98, 64, 64);
		const innerGlowMaterial = new THREE.MeshBasicMaterial({
			color: 0x4ecdc4,
			transparent: true,
			opacity: 0.03,
			side: THREE.BackSide,
		});
		innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
		scene.add(innerGlow);
		const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
		const sphereMaterial = new THREE.MeshBasicMaterial({
			color: 0x4ecdc4,
			transparent: true,
			opacity: 0.08,
			wireframe: false,
		});
		sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
		scene.add(sphere);
		const glowGeometry = new THREE.SphereGeometry(1.02, 32, 32);
		const glowMaterial = new THREE.MeshBasicMaterial({
			color: 0x4ecdc4,
			transparent: true,
			opacity: 0.05,
			side: THREE.BackSide,
		});
		glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
		scene.add(glowSphere);
		const wireframeGeometry = new THREE.SphereGeometry(1.001, 24, 16);
		const wireframeMaterial = new THREE.MeshBasicMaterial({
			color: 0x4ecdc4,
			transparent: true,
			opacity: 0.15,
			wireframe: true,
		});
		const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
		scene.add(wireframe);
		createRing(0, 0, 64, 0x4ecdc4, 0.8, false);
		createRing(Math.PI / 4, 0, 48, 0x4ecdc4, 0.2, true);
		createRing(-Math.PI / 4, 0, 48, 0x4ecdc4, 0.2, true);
		createRing(Math.PI / 3, 0, 48, 0x4ecdc4, 0.15, true);
		createRing(-Math.PI / 3, 0, 48, 0x4ecdc4, 0.15, true);
		createMeridian(0, 64, 0xff6b6b, 0.4);
		createMeridian(Math.PI / 2, 64, 0xffe66d, 0.4);
		createGradientAxis(
			new THREE.Vector3(0, -1.4, 0),
			new THREE.Vector3(0, 1.4, 0),
			0x4ecdc4,
		);
		createGradientAxis(
			new THREE.Vector3(-1.4, 0, 0),
			new THREE.Vector3(1.4, 0, 0),
			0xff6b6b,
		);
		createGradientAxis(
			new THREE.Vector3(0, 0, -1.4),
			new THREE.Vector3(0, 0, 1.4),
			0xffe66d,
		);
		createAxisEndpoint(new THREE.Vector3(0, 1.15, 0), 0x4ecdc4, 0.04);
		createAxisEndpoint(new THREE.Vector3(0, -1.15, 0), 0x4ecdc4, 0.04);
		createAxisEndpoint(new THREE.Vector3(1.15, 0, 0), 0xff6b6b, 0.03);
		createAxisEndpoint(new THREE.Vector3(-1.15, 0, 0), 0xff6b6b, 0.03);
		createAxisEndpoint(new THREE.Vector3(0, 0, 1.15), 0xffe66d, 0.03);
		createAxisEndpoint(new THREE.Vector3(0, 0, -1.15), 0xffe66d, 0.03);
	}
	function createRing(latitude, rotation, segments, color, opacity, dashed) {
		const radius = Math.cos(latitude);
		const y = Math.sin(latitude);
		const geometry = new THREE.BufferGeometry();
		const points = [];
		for (let i = 0; i <= segments; i++) {
			const angle = (i / segments) * Math.PI * 2;
			points.push(
				new THREE.Vector3(
					radius * Math.cos(angle),
					y,
					radius * Math.sin(angle),
				),
			);
		}
		geometry.setFromPoints(points);
		let material;
		if (dashed) {
			material = new THREE.LineDashedMaterial({
				color: color,
				transparent: true,
				opacity: opacity,
				dashSize: 0.08,
				gapSize: 0.04,
			});
		} else {
			material = new THREE.LineBasicMaterial({
				color: color,
				transparent: true,
				opacity: opacity,
			});
		}
		const ring = new THREE.Line(geometry, material);
		if (dashed) ring.computeLineDistances();
		scene.add(ring);
	}
	function createMeridian(rotation, segments, color, opacity) {
		const geometry = new THREE.BufferGeometry();
		const points = [];
		for (let i = 0; i <= segments; i++) {
			const angle = (i / segments) * Math.PI * 2;
			points.push(
				new THREE.Vector3(
					Math.cos(angle) * Math.cos(rotation),
					Math.sin(angle),
					Math.cos(angle) * Math.sin(rotation),
				),
			);
		}
		geometry.setFromPoints(points);
		const material = new THREE.LineDashedMaterial({
			color: color,
			transparent: true,
			opacity: opacity,
			dashSize: 0.1,
			gapSize: 0.05,
		});
		const meridian = new THREE.Line(geometry, material);
		meridian.computeLineDistances();
		scene.add(meridian);
	}
	function createGradientAxis(start, end, color) {
		const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
		const material = new THREE.LineBasicMaterial({
			color: color,
			transparent: true,
			opacity: 0.4,
		});
		scene.add(new THREE.Line(geometry, material));
	}
	function createAxisEndpoint(position, color, size) {
		const geometry = new THREE.SphereGeometry(size, 16, 16);
		const material = new THREE.MeshBasicMaterial({
			color: color,
			transparent: true,
			opacity: 0.8,
		});
		const endpoint = new THREE.Mesh(geometry, material);
		endpoint.position.copy(position);
		scene.add(endpoint);
	}
	function createStateArrow() {
		const arrowGroup = new THREE.Group();
		const glowShaftGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.95, 16);
		const glowShaftMaterial = new THREE.MeshBasicMaterial({
			color: 0xffe66d,
			transparent: true,
			opacity: 0.2,
		});
		const glowShaft = new THREE.Mesh(glowShaftGeometry, glowShaftMaterial);
		glowShaft.position.y = 0.5;
		arrowGroup.add(glowShaft);
		const shaftGeometry = new THREE.CylinderGeometry(0.035, 0.025, 0.95, 16);
		const shaftMaterial = new THREE.MeshBasicMaterial({
			color: 0xffe66d,
		});
		const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
		shaft.position.y = 0.5;
		arrowGroup.add(shaft);
		const coreGeometry = new THREE.CylinderGeometry(0.015, 0.012, 0.95, 8);
		const coreMaterial = new THREE.MeshBasicMaterial({
			color: 0xffffff,
		});
		const core = new THREE.Mesh(coreGeometry, coreMaterial);
		core.position.y = 0.5;
		arrowGroup.add(core);
		const headGlowGeometry = new THREE.ConeGeometry(0.14, 0.22, 16);
		const headGlowMaterial = new THREE.MeshBasicMaterial({
			color: 0xffe66d,
			transparent: true,
			opacity: 0.25,
		});
		const headGlow = new THREE.Mesh(headGlowGeometry, headGlowMaterial);
		headGlow.position.y = 1.02;
		arrowGroup.add(headGlow);
		const headGeometry = new THREE.ConeGeometry(0.09, 0.18, 16);
		const headMaterial = new THREE.MeshBasicMaterial({
			color: 0xffe66d,
		});
		const head = new THREE.Mesh(headGeometry, headMaterial);
		head.position.y = 1.03;
		arrowGroup.add(head);
		const headCoreGeometry = new THREE.ConeGeometry(0.04, 0.12, 8);
		const headCoreMaterial = new THREE.MeshBasicMaterial({
			color: 0xffffff,
		});
		const headCore = new THREE.Mesh(headCoreGeometry, headCoreMaterial);
		headCore.position.y = 1.02;
		arrowGroup.add(headCore);
		const originGlowGeometry = new THREE.SphereGeometry(0.12, 32, 32);
		const originGlowMaterial = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			transparent: true,
			opacity: 0.15,
		});
		const originGlow = new THREE.Mesh(originGlowGeometry, originGlowMaterial);
		arrowGroup.add(originGlow);
		const originGeometry = new THREE.SphereGeometry(0.07, 32, 32);
		const originMaterial = new THREE.MeshBasicMaterial({
			color: 0xffffff,
		});
		const origin = new THREE.Mesh(originGeometry, originMaterial);
		arrowGroup.add(origin);
		const originCoreGeometry = new THREE.SphereGeometry(0.04, 16, 16);
		const originCoreMaterial = new THREE.MeshBasicMaterial({
			color: 0x4ecdc4,
		});
		const originCore = new THREE.Mesh(originCoreGeometry, originCoreMaterial);
		arrowGroup.add(originCore);
		arrowGlow = glowShaft;
		stateArrow = arrowGroup;
		scene.add(stateArrow);
		updateStateArrow();
	}
	function createAxisLabels() {
		const labels = [
			{
				text: "|0⟩",
				position: new THREE.Vector3(0, 1.5, 0),
				color: "#4ecdc4",
				size: 1.2,
			},
			{
				text: "|1⟩",
				position: new THREE.Vector3(0, -1.5, 0),
				color: "#4ecdc4",
				size: 1.2,
			},
			{
				text: "|+⟩",
				position: new THREE.Vector3(1.5, 0, 0),
				color: "#ff6b6b",
				size: 1.0,
			},
			{
				text: "|−⟩",
				position: new THREE.Vector3(-1.5, 0, 0),
				color: "#ff6b6b",
				size: 1.0,
			},
			{
				text: "|+i⟩",
				position: new THREE.Vector3(0, 0, 1.5),
				color: "#ffe66d",
				size: 0.9,
			},
			{
				text: "|−i⟩",
				position: new THREE.Vector3(0, 0, -1.5),
				color: "#ffe66d",
				size: 0.9,
			},
		];
		labels.forEach((label) => {
			const sprite = makeTextSprite(label.text, label.color, label.size);
			sprite.position.copy(label.position);
			scene.add(sprite);
		});
	}
	function makeTextSprite(text, color, sizeMultiplier = 1) {
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");
		canvas.width = 256;
		canvas.height = 128;
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.shadowColor = color;
		context.shadowBlur = 20;
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.font = 'Bold 48px "Segoe UI", Arial, sans-serif';
		context.fillStyle = color;
		context.textAlign = "center";
		context.textBaseline = "middle";
		for (let i = 0; i < 3; i++) {
			context.fillText(text, 128, 64);
		}
		context.shadowBlur = 0;
		context.fillStyle = "#ffffff";
		context.globalAlpha = 0.9;
		context.fillText(text, 128, 64);
		const texture = new THREE.CanvasTexture(canvas);
		texture.needsUpdate = true;
		const spriteMaterial = new THREE.SpriteMaterial({
			map: texture,
			transparent: true,
			depthTest: false,
			depthWrite: false,
		});
		const sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(0.6 * sizeMultiplier, 0.3 * sizeMultiplier, 1);
		return sprite;
	}
	function updateStateArrow() {
		const x = Math.sin(qubitState.theta) * Math.cos(qubitState.phi);
		const z = Math.sin(qubitState.theta) * Math.sin(qubitState.phi);
		const y = Math.cos(qubitState.theta);
		stateArrow.rotation.set(0, 0, 0);
		const direction = new THREE.Vector3(x, y, z).normalize();
		const up = new THREE.Vector3(0, 1, 0);
		if (Math.abs(direction.y) > 0.999) {
			if (direction.y > 0) {
				stateArrow.rotation.set(0, 0, 0);
			} else {
				stateArrow.rotation.set(Math.PI, 0, 0);
			}
		} else {
			const quaternion = new THREE.Quaternion();
			quaternion.setFromUnitVectors(up, direction);
			stateArrow.setRotationFromQuaternion(quaternion);
		}
	}
	function setupMouseControls(container) {
		container.addEventListener("mousedown", (e) => {
			isDragging = true;
			previousMousePosition = {
				x: e.clientX,
				y: e.clientY,
			};
		});
		container.addEventListener("mousemove", (e) => {
			if (!isDragging) return;
			const deltaX = e.clientX - previousMousePosition.x;
			const deltaY = e.clientY - previousMousePosition.y;
			const rotationSpeed = 0.01;
			const spherical = new THREE.Spherical();
			spherical.setFromVector3(camera.position);
			spherical.theta -= deltaX * rotationSpeed;
			spherical.phi += deltaY * rotationSpeed;
			spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
			camera.position.setFromSpherical(spherical);
			camera.lookAt(0, 0, 0);
			previousMousePosition = {
				x: e.clientX,
				y: e.clientY,
			};
		});
		container.addEventListener("mouseup", () => {
			isDragging = false;
		});
		container.addEventListener("mouseleave", () => {
			isDragging = false;
		});
		container.addEventListener("touchstart", (e) => {
			if (e.touches.length === 1) {
				isDragging = true;
				previousMousePosition = {
					x: e.touches[0].clientX,
					y: e.touches[0].clientY,
				};
			}
		});
		container.addEventListener("touchmove", (e) => {
			if (!isDragging || e.touches.length !== 1) return;
			e.preventDefault();
			const deltaX = e.touches[0].clientX - previousMousePosition.x;
			const deltaY = e.touches[0].clientY - previousMousePosition.y;
			const rotationSpeed = 0.01;
			const spherical = new THREE.Spherical();
			spherical.setFromVector3(camera.position);
			spherical.theta -= deltaX * rotationSpeed;
			spherical.phi += deltaY * rotationSpeed;
			spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));
			camera.position.setFromSpherical(spherical);
			camera.lookAt(0, 0, 0);
			previousMousePosition = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY,
			};
		});
		container.addEventListener("touchend", () => {
			isDragging = false;
		});
		container.addEventListener("wheel", (e) => {
			e.preventDefault();
			const zoomSpeed = 0.001;
			const distance = camera.position.length();
			const newDistance = distance * (1 + e.deltaY * zoomSpeed);
			if (newDistance > 2 && newDistance < 10) {
				camera.position.normalize().multiplyScalar(newDistance);
			}
		});
	}
	function onWindowResize() {
		const container = document.getElementById("bloch-canvas-container");
		const width = container.clientWidth;
		const height = container.clientHeight;
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height);
	}
	function animate() {
		requestAnimationFrame(animate);
		time += 0.016;
		if (particles) {
			particles.rotation.y += 0.0003;
			particles.rotation.x += 0.0001;
			const ps = CONFIG.PULSE_SPEED;
			particles.material.opacity = 0.4 + Math.sin(time * 0.5 * ps) * 0.2;
		}
		if (glowSphere) {
			const ps = CONFIG.PULSE_SPEED;
			const pulse = 1 + Math.sin(time * 2 * ps) * 0.02;
			glowSphere.scale.set(pulse, pulse, pulse);
			glowSphere.material.opacity = 0.03 + Math.sin(time * 1.5 * ps) * 0.02;
		}
		if (innerGlow) {
			const ps = CONFIG.PULSE_SPEED;
			innerGlow.material.opacity = 0.02 + Math.sin(time * 2.5 * ps) * 0.015;
		}
		if (arrowGlow && !isAnimating) {
			const ps = CONFIG.PULSE_SPEED;
			const arrowPulse = 1 + Math.sin(time * 3 * ps) * 0.1;
			arrowGlow.material.opacity = 0.15 + Math.sin(time * 3 * ps) * 0.1;
		}
		renderer.render(scene, camera);
	}
	function applyGate(gateName) {
		if (isAnimating) return;
		let newTheta = qubitState.theta;
		let newPhi = qubitState.phi;
		switch (gateName) {
			case "X":
				if (
					Math.abs(qubitState.theta - Math.PI / 2) < 0.05 &&
					(isPhiNear(qubitState.phi, 0, 0.05) ||
						isPhiNear(qubitState.phi, Math.PI, 0.05))
				) {
					showNoEffectMessage("X");
					return;
				}
				newTheta = Math.PI - qubitState.theta;
				if (
					qubitState.theta < 0.01 ||
					Math.abs(qubitState.theta - Math.PI) < 0.01
				) {
					newPhi = 0;
				} else {
					newPhi = -qubitState.phi;
				}
				break;
			case "Y":
				if (
					Math.abs(qubitState.theta - Math.PI / 2) < 0.05 &&
					(isPhiNear(qubitState.phi, Math.PI / 2, 0.05) ||
						isPhiNear(qubitState.phi, (3 * Math.PI) / 2, 0.05))
				) {
					showNoEffectMessage("Y");
					return;
				}
				newTheta = Math.PI - qubitState.theta;
				if (
					qubitState.theta < 0.01 ||
					Math.abs(qubitState.theta - Math.PI) < 0.01
				) {
					newPhi = 0;
				} else {
					newPhi = Math.PI - qubitState.phi;
				}
				break;
			case "Z":
				if (
					qubitState.theta < 0.01 ||
					Math.abs(qubitState.theta - Math.PI) < 0.01
				) {
					showNoEffectMessage("Z");
					return;
				} else {
					newPhi = qubitState.phi + Math.PI;
				}
				break;
			case "H":
				const tolerance = 0.05;
				const phiNormalized = normalizePhi(qubitState.phi);
				if (qubitState.theta < tolerance) {
					newTheta = Math.PI / 2;
					newPhi = 0;
				} else if (Math.abs(qubitState.theta - Math.PI) < tolerance) {
					newTheta = Math.PI / 2;
					newPhi = Math.PI;
				} else if (
					Math.abs(qubitState.theta - Math.PI / 2) < tolerance &&
					isPhiNear(phiNormalized, 0, tolerance)
				) {
					newTheta = 0;
					newPhi = 0;
				} else if (
					Math.abs(qubitState.theta - Math.PI / 2) < tolerance &&
					isPhiNear(phiNormalized, Math.PI, tolerance)
				) {
					newTheta = Math.PI;
					newPhi = 0;
				} else if (
					Math.abs(qubitState.theta - Math.PI / 2) < tolerance &&
					isPhiNear(phiNormalized, Math.PI / 2, tolerance)
				) {
					newTheta = Math.PI / 2;
					newPhi = (3 * Math.PI) / 2;
				} else if (
					Math.abs(qubitState.theta - Math.PI / 2) < tolerance &&
					isPhiNear(phiNormalized, (3 * Math.PI) / 2, tolerance)
				) {
					newTheta = Math.PI / 2;
					newPhi = Math.PI / 2;
				} else {
					const x = Math.sin(qubitState.theta) * Math.cos(qubitState.phi);
					const y = Math.sin(qubitState.theta) * Math.sin(qubitState.phi);
					const z = Math.cos(qubitState.theta);
					const newX = z;
					const newY = -y;
					const newZ = x;
					newTheta = Math.acos(Math.max(-1, Math.min(1, newZ)));
					newPhi = Math.atan2(newY, newX);
					if (isNaN(newTheta)) newTheta = 0;
					if (isNaN(newPhi)) newPhi = 0;
				}
				break;
			case "S":
				if (
					qubitState.theta < 0.01 ||
					Math.abs(qubitState.theta - Math.PI) < 0.01
				) {
					showNoEffectMessage("S");
					return;
				} else {
					newPhi = qubitState.phi + Math.PI / 2;
				}
				break;
			case "T":
				if (
					qubitState.theta < 0.01 ||
					Math.abs(qubitState.theta - Math.PI) < 0.01
				) {
					showNoEffectMessage("T");
					return;
				} else {
					newPhi = qubitState.phi + Math.PI / 4;
				}
				break;
		}
		while (newPhi < 0) newPhi += 2 * Math.PI;
		while (newPhi >= 2 * Math.PI) newPhi -= 2 * Math.PI;
		newTheta = Math.max(0, Math.min(Math.PI, newTheta));
		const snapResult = snapToNearestBasisState(newTheta, newPhi);
		newTheta = snapResult.theta;
		newPhi = snapResult.phi;
		if (newTheta < 0.001 || Math.abs(newTheta - Math.PI) < 0.001) {
			newPhi = 0;
		}
		animateToState(newTheta, newPhi);
	}
	function showNoEffectMessage(gateName) {
		let notification = document.getElementById("gate-notification");
		if (!notification) {
			notification = document.createElement("div");
			notification.id = "gate-notification";
			notification.style.cssText = `
                    position: fixed;
                    top: 80px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(255, 230, 109, 0.95);
                    color: #000;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    text-align: center;
                    max-width: 400px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                `;
			document.body.appendChild(notification);
		}
		let stateName, reason;
		if (qubitState.theta < 0.05) {
			stateName = "|0⟩";
			reason = "Phase gates only affect superposition states";
		} else if (Math.abs(qubitState.theta - Math.PI) < 0.05) {
			stateName = "|1⟩";
			reason = "Phase gates only affect superposition states";
		} else if (Math.abs(qubitState.theta - Math.PI / 2) < 0.05) {
			if (isPhiNear(qubitState.phi, 0, 0.1)) {
				stateName = "|+⟩";
				reason = "|+⟩ is on the X-axis (rotation axis)";
			} else if (isPhiNear(qubitState.phi, Math.PI, 0.1)) {
				stateName = "|−⟩";
				reason = "|−⟩ is on the X-axis (rotation axis)";
			} else if (isPhiNear(qubitState.phi, Math.PI / 2, 0.1)) {
				stateName = "|+i⟩";
				reason = "|+i⟩ is on the Y-axis (rotation axis)";
			} else if (isPhiNear(qubitState.phi, (3 * Math.PI) / 2, 0.1)) {
				stateName = "|−i⟩";
				reason = "|−i⟩ is on the Y-axis (rotation axis)";
			} else {
				stateName = "this state";
				reason = "State is on the rotation axis";
			}
		} else {
			stateName = "this state";
			reason = "State is on the rotation axis";
		}
		setHTML(
			notification,
			`<strong>${gateName} gate</strong> has no visible effect on ${stateName}<br><small style="opacity: 0.7">${reason}</small>`,
		);
		notification.style.opacity = "1";
		clearTimeout(notification.hideTimeout);
		notification.hideTimeout = setTimeout(() => {
			notification.style.opacity = "0";
		}, 2500);
	}
	function normalizePhi(phi) {
		while (phi < 0) phi += 2 * Math.PI;
		while (phi >= 2 * Math.PI) phi -= 2 * Math.PI;
		return phi;
	}
	function isPhiNear(phi, target, tolerance) {
		const diff = Math.abs(phi - target);
		return diff < tolerance || Math.abs(diff - 2 * Math.PI) < tolerance;
	}
	function snapToNearestBasisState(theta, phi) {
		const snapTol = 0.02;
		const basisStates = [
			{
				theta: 0,
				phi: 0,
				name: "|0⟩",
			},
			{
				theta: Math.PI,
				phi: 0,
				name: "|1⟩",
			},
			{
				theta: Math.PI / 2,
				phi: 0,
				name: "|+⟩",
			},
			{
				theta: Math.PI / 2,
				phi: Math.PI,
				name: "|−⟩",
			},
			{
				theta: Math.PI / 2,
				phi: Math.PI / 2,
				name: "|+i⟩",
			},
			{
				theta: Math.PI / 2,
				phi: (3 * Math.PI) / 2,
				name: "|−i⟩",
			},
		];
		for (const state of basisStates) {
			if (Math.abs(theta - state.theta) < snapTol) {
				if (
					state.theta < snapTol ||
					Math.abs(state.theta - Math.PI) < snapTol
				) {
					return {
						theta: state.theta,
						phi: 0,
					};
				}
				if (isPhiNear(phi, state.phi, snapTol)) {
					return {
						theta: state.theta,
						phi: state.phi,
					};
				}
			}
		}
		const commonAngles = [
			0,
			Math.PI / 4,
			Math.PI / 2,
			(3 * Math.PI) / 4,
			Math.PI,
			(5 * Math.PI) / 4,
			(3 * Math.PI) / 2,
			(7 * Math.PI) / 4,
		];
		for (const angle of commonAngles) {
			if (Math.abs(theta - angle) < snapTol && angle <= Math.PI) {
				theta = angle;
			}
			if (isPhiNear(phi, angle, snapTol)) {
				phi = angle;
			}
		}
		return {
			theta,
			phi,
		};
	}
	let trailParticles = null;
	let trailPositions = [];
	function animateToState(targetTheta, targetPhi) {
		isAnimating = true;
		showStateOverlay();
		const startState = {
			theta: qubitState.theta,
			phi: qubitState.phi,
		};
		const startTime = performance.now();
		trailPositions = [];
		createTrail();
		let deltaPhi = targetPhi - startState.phi;
		if (deltaPhi > Math.PI) deltaPhi -= 2 * Math.PI;
		if (deltaPhi < -Math.PI) deltaPhi += 2 * Math.PI;
		function animationStep(currentTime) {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / CONFIG.ANIMATION_DURATION, 1);
			const eased =
				progress < 0.5
					? 4 * progress * progress * progress
					: 1 - Math.pow(-2 * progress + 2, 3) / 2;
			qubitState.theta =
				startState.theta + (targetTheta - startState.theta) * eased;
			qubitState.phi = startState.phi + deltaPhi * eased;
			while (qubitState.phi < 0) qubitState.phi += 2 * Math.PI;
			while (qubitState.phi >= 2 * Math.PI) qubitState.phi -= 2 * Math.PI;
			addTrailPoint();
			updateStateArrow();
			updateStateDisplay();
			if (arrowGlow) {
				arrowGlow.material.opacity =
					0.4 + Math.sin(progress * Math.PI * 4) * 0.3;
			}
			if (progress < 1) {
				requestAnimationFrame(animationStep);
			} else {
				qubitState.theta = targetTheta;
				qubitState.phi = targetPhi;
				while (qubitState.phi < 0) qubitState.phi += 2 * Math.PI;
				while (qubitState.phi >= 2 * Math.PI) qubitState.phi -= 2 * Math.PI;
				updateStateArrow();
				isAnimating = false;
				updateStateDisplay();
				fadeOutTrail();
			}
		}
		requestAnimationFrame(animationStep);
	}
	function createTrail() {
		if (trailParticles) {
			scene.remove(trailParticles);
			trailParticles.geometry.dispose();
			trailParticles.material.dispose();
		}
		const maxPoints = 50;
		const geometry = new THREE.BufferGeometry();
		const positions = new Float32Array(maxPoints * 3);
		geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
		geometry.setDrawRange(0, 0);
		const material = new THREE.PointsMaterial({
			size: 0.04,
			color: 0xffe66d,
			transparent: true,
			opacity: 0.8,
			blending: THREE.AdditiveBlending,
			sizeAttenuation: true,
		});
		trailParticles = new THREE.Points(geometry, material);
		scene.add(trailParticles);
		trailPositions = [];
	}
	function addTrailPoint() {
		if (!trailParticles) return;
		const x = Math.sin(qubitState.theta) * Math.cos(qubitState.phi);
		const z = Math.sin(qubitState.theta) * Math.sin(qubitState.phi);
		const y = Math.cos(qubitState.theta);
		trailPositions.push({
			x,
			y,
			z,
		});
		const maxPoints = 50;
		if (trailPositions.length > maxPoints) {
			trailPositions.shift();
		}
		const positions = trailParticles.geometry.attributes.position.array;
		for (let i = 0; i < trailPositions.length; i++) {
			positions[i * 3] = trailPositions[i].x;
			positions[i * 3 + 1] = trailPositions[i].y;
			positions[i * 3 + 2] = trailPositions[i].z;
		}
		trailParticles.geometry.attributes.position.needsUpdate = true;
		trailParticles.geometry.setDrawRange(0, trailPositions.length);
	}
	function fadeOutTrail() {
		if (!trailParticles) return;
		let fadeTime = 0;
		function fadeStep() {
			fadeTime += 0.02;
			if (fadeTime >= 1 || !trailParticles) {
				if (trailParticles) {
					scene.remove(trailParticles);
					trailParticles.geometry.dispose();
					trailParticles.material.dispose();
					trailParticles = null;
				}
				return;
			}
			trailParticles.material.opacity = 0.8 * (1 - fadeTime);
			requestAnimationFrame(fadeStep);
		}
		fadeStep();
	}
	function measureQubit() {
		if (isAnimating) return;
		const prob0 = Math.pow(Math.cos(qubitState.theta / 2), 2);
		const result = Math.random() < prob0 ? 0 : 1;
		const resultColor = result === 0 ? "#4ecdc4" : "#ff6b6b";
		const stateDisplay = document.querySelector(".state-display");
		stateDisplay.style.borderColor = resultColor;
		createMeasurementBurst(result);
		setTimeout(() => {
			stateDisplay.style.borderColor = "rgba(78, 205, 196, 0.3)";
		}, 600);
		if (result === 0) {
			animateToState(0, 0);
		} else {
			animateToState(Math.PI, 0);
			if (prob0 > 0.4 && prob0 < 0.6) {
				triggerQuantumNewYear();
			}
		}
	}
	let newYearTriggered = false;
	function triggerQuantumNewYear() {
		if (newYearTriggered) return;
		newYearTriggered = true;
		const overlay = document.createElement("div");
		overlay.id = "quantum-new-year";
		const now = new Date();
		const currentYear =
			now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
		const nextYear = currentYear + 1;
		setHTML(
			overlay,
			`
                <div class="qny-content">
                    <div class="qny-pretext">Before midnight, time existed in superposition...</div>
                    <div class="qny-equation" id="qny-eq1">\\[|\\psi_{\\text{time}}\\rangle = \\frac{1}{\\sqrt{2}}\\left(|${currentYear}\\rangle + |${nextYear}\\rangle\\right)\\]</div>
                    <div class="qny-arrow">↓ Your observation collapsed the wavefunction ↓</div>
                    <div class="qny-result" id="qny-eq2">\\[|\\psi\\rangle \\rightarrow |${nextYear}\\rangle\\]</div>
                    <div class="qny-message">🎆 Quantum New Year!</div>
                    <div class="qny-subtitle">In quantum mechanics, measurement forces a definite outcome.<br>By observing the new year, you've irreversibly collapsed<br>the universe into the ${nextYear} eigenstate.</div>
                    <div class="qny-footnote">* According to the Copenhagen interpretation</div>
                    <button class="qny-close" data-ec-function="closeQuantumNewYear">Accept reality → ${nextYear}</button>
                </div>
            `,
		);
		setTimeout(() => {
			if (window.MathJax && MathJax.typesetPromise) {
				MathJax.typesetPromise([overlay]).catch((err) =>
					console.log("MathJax error:", err),
				);
			}
		}, 100);
		overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(ellipse at center, rgba(10, 10, 30, 0.95) 0%, rgba(0, 0, 0, 0.98) 100%);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: qnyFadeIn 0.5s ease;
            `;
		document.body.appendChild(overlay);
		const style = document.createElement("style");
		style.textContent = `
                @keyframes qnyFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes qnyPulse {
                    0%, 100% { transform: scale(1); text-shadow: 0 0 20px #ffe66d; }
                    50% { transform: scale(1.05); text-shadow: 0 0 40px #ffe66d, 0 0 60px #ff6b6b; }
                }
                @keyframes qnySlideDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .qny-content {
                    text-align: center;
                    color: white;
                    font-family: 'Segoe UI', Arial, sans-serif;
                }
                .qny-equation {
                    font-size: 28px;
                    color: #4ecdc4;
                    margin-bottom: 20px;
                    animation: qnySlideDown 0.6s ease 0.2s both;
                }
                .qny-equation .frac { margin: 0 5px; }
                .qny-equation .frac sup, .qny-equation .frac sub { 
                    font-size: 0.7em; 
                    display: block;
                }
                .qny-equation .frac sup { border-bottom: 2px solid #4ecdc4; padding-bottom: 3px; }
                .qny-arrow {
                    font-size: 20px;
                    color: #888;
                    margin: 15px 0;
                    animation: qnySlideDown 0.6s ease 0.4s both;
                }
                .qny-result {
                    font-size: 64px;
                    font-weight: bold;
                    color: #ffe66d;
                    margin: 20px 0;
                    animation: qnySlideDown 0.6s ease 0.6s both, qnyPulse 2s ease-in-out 1.2s infinite;
                }
                .qny-message {
                    font-size: 36px;
                    margin: 30px 0 10px;
                    animation: qnySlideDown 0.6s ease 0.8s both;
                }
                .qny-pretext {
                    font-size: 16px;
                    color: #aaa;
                    margin-bottom: 15px;
                    font-style: italic;
                    animation: qnySlideDown 0.6s ease 0.1s both;
                }
                .qny-subtitle {
                    font-size: 16px;
                    color: #aaa;
                    margin-bottom: 20px;
                    line-height: 1.6;
                    animation: qnySlideDown 0.6s ease 1s both;
                }
                .qny-footnote {
                    font-size: 12px;
                    color: #666;
                    font-style: italic;
                    margin-bottom: 30px;
                    animation: qnySlideDown 0.6s ease 1.1s both;
                }
                .qny-close {
                    padding: 15px 40px;
                    font-size: 18px;
                    background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
                    border: none;
                    border-radius: 30px;
                    color: white;
                    cursor: pointer;
                    animation: qnySlideDown 0.6s ease 1.2s both;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .qny-close:hover {
                    transform: scale(1.05);
                    box-shadow: 0 5px 30px rgba(78, 205, 196, 0.4);
                }
                
                /* Mobile responsive styles */
                @media (max-width: 768px) {
                    .qny-content {
                        padding: 15px;
                    }
                    .qny-pretext {
                        font-size: 12px;
                        margin-bottom: 10px;
                    }
                    .qny-equation {
                        font-size: 14px;
                        margin-bottom: 10px;
                        overflow-x: auto;
                    }
                    .qny-arrow {
                        font-size: 14px;
                        margin: 8px 0;
                    }
                    .qny-result {
                        font-size: 28px;
                        margin: 10px 0;
                    }
                    .qny-message {
                        font-size: 22px;
                        margin: 15px 0 8px;
                    }
                    .qny-subtitle {
                        font-size: 12px;
                        margin-bottom: 12px;
                        line-height: 1.5;
                    }
                    .qny-footnote {
                        font-size: 10px;
                        margin-bottom: 15px;
                    }
                    .qny-close {
                        padding: 12px 25px;
                        font-size: 14px;
                    }
                }
            `;
		document.head.appendChild(style);
		createNewYearFireworks(overlay);
	}
	function closeQuantumNewYear() {
		const overlay = document.getElementById("quantum-new-year");
		if (overlay) {
			overlay.style.opacity = "0";
			overlay.style.transition = "opacity 0.3s";
			setTimeout(() => overlay.remove(), 300);
		}
	}
	function createNewYearFireworks(container) {
		const colors = ["#ffe66d", "#ff6b6b", "#4ecdc4", "#c44dff", "#44a08d"];
		function createFirework() {
			const x = Math.random() * window.innerWidth;
			const y = Math.random() * window.innerHeight * 0.6;
			const color = colors[Math.floor(Math.random() * colors.length)];
			for (let i = 0; i < 20; i++) {
				const particle = document.createElement("div");
				const angle = (i / 20) * Math.PI * 2;
				const velocity = 2 + Math.random() * 3;
				const vx = Math.cos(angle) * velocity;
				const vy = Math.sin(angle) * velocity;
				particle.style.cssText = `
                        position: absolute;
                        left: ${x}px;
                        top: ${y}px;
                        width: 6px;
                        height: 6px;
                        background: ${color};
                        border-radius: 50%;
                        pointer-events: none;
                        box-shadow: 0 0 10px ${color};
                    `;
				container.appendChild(particle);
				let px = 0,
					py = 0,
					opacity = 1;
				function animateParticle() {
					px += vx;
					py += vy + 0.1;
					opacity -= 0.02;
					if (opacity <= 0) {
						particle.remove();
						return;
					}
					particle.style.transform = `translate(${px}px, ${py}px)`;
					particle.style.opacity = opacity;
					requestAnimationFrame(animateParticle);
				}
				setTimeout(animateParticle, i * 20);
			}
		}
		for (let i = 0; i < 8; i++) {
			setTimeout(createFirework, i * 400);
		}
	}
	function createMeasurementBurst(result) {
		const burstCount = 30;
		const burstGeometry = new THREE.BufferGeometry();
		const positions = new Float32Array(burstCount * 3);
		const velocities = [];
		const targetY = result === 0 ? 1 : -1;
		for (let i = 0; i < burstCount; i++) {
			positions[i * 3] = 0;
			positions[i * 3 + 1] = targetY;
			positions[i * 3 + 2] = 0;
			velocities.push({
				x: (Math.random() - 0.5) * 0.1,
				y: (Math.random() - 0.5) * 0.1,
				z: (Math.random() - 0.5) * 0.1,
			});
		}
		burstGeometry.setAttribute(
			"position",
			new THREE.BufferAttribute(positions, 3),
		);
		const burstMaterial = new THREE.PointsMaterial({
			size: 0.08,
			color: result === 0 ? 0x4ecdc4 : 0xff6b6b,
			transparent: true,
			opacity: 1,
			blending: THREE.AdditiveBlending,
		});
		const burst = new THREE.Points(burstGeometry, burstMaterial);
		scene.add(burst);
		let burstTime = 0;
		function animateBurst() {
			burstTime += 0.016;
			if (burstTime > 0.8) {
				scene.remove(burst);
				burstGeometry.dispose();
				burstMaterial.dispose();
				return;
			}
			const positions = burst.geometry.attributes.position.array;
			for (let i = 0; i < burstCount; i++) {
				positions[i * 3] += velocities[i].x;
				positions[i * 3 + 1] += velocities[i].y;
				positions[i * 3 + 2] += velocities[i].z;
			}
			burst.geometry.attributes.position.needsUpdate = true;
			burst.material.opacity = 1 - burstTime / 0.8;
			requestAnimationFrame(animateBurst);
		}
		animateBurst();
	}
	function resetQubit() {
		if (isAnimating) return;
		animateToState(0, 0);
		document.getElementById("theta-slider").value = 0;
		document.getElementById("phi-slider").value = 0;
		updateSliderDisplay();
	}
	function applyCustomRotation() {
		if (isAnimating) return;
		const theta =
			(parseFloat(document.getElementById("theta-slider").value) * Math.PI) /
			180;
		const phi =
			(parseFloat(document.getElementById("phi-slider").value) * Math.PI) / 180;
		animateToState(theta, phi);
	}
	function updateSliderDisplay() {
		const theta = document.getElementById("theta-slider").value;
		const phi = document.getElementById("phi-slider").value;
		document.getElementById("theta-value").textContent = theta + "°";
		document.getElementById("phi-value").textContent = phi + "°";
	}
	function showStateOverlay() {
		const overlay = document.getElementById("state-overlay");
		if (overlay) overlay.classList.add("active");
	}
	function hideStateOverlay() {
		const overlay = document.getElementById("state-overlay");
		if (overlay) overlay.classList.remove("active");
	}
	function updateStateDisplay() {
		const theta = qubitState.theta;
		const phi = qubitState.phi;
		const alpha = Math.cos(theta / 2);
		const betaReal = Math.sin(theta / 2) * Math.cos(phi);
		const betaImag = Math.sin(theta / 2) * Math.sin(phi);
		const betaMag = Math.sin(theta / 2);
		const diracEl = document.getElementById("state-dirac");
		const probEl = document.getElementById("state-prob");
		const coordsEl = document.getElementById("state-coords");
		const prob0 = Math.pow(alpha, 2) * 100;
		const prob1 = (1 - Math.pow(alpha, 2)) * 100;
		const thetaDeg = ((theta * 180) / Math.PI).toFixed(1);
		const phiDeg = ((phi * 180) / Math.PI).toFixed(1);
		if (isAnimating) {
			return;
		}
		let diracStr = formatQuantumState(
			theta,
			phi,
			alpha,
			betaReal,
			betaImag,
			betaMag,
		);
		setHTML(diracEl, diracStr);
		setHTML(
			probEl,
			`\\(P(|0\\rangle) = ${prob0.toFixed(1)}\\%\\) &nbsp;&nbsp; \\(P(|1\\rangle) = ${prob1.toFixed(1)}\\%\\)`,
		);
		setHTML(
			coordsEl,
			`\\(\\theta = ${thetaDeg}°\\) &nbsp;&nbsp; \\(\\varphi = ${phiDeg}°\\)`,
		);
		if (window.MathJax && MathJax.typesetPromise) {
			MathJax.typesetPromise([diracEl, probEl, coordsEl])
				.then(() => hideStateOverlay())
				.catch((err) => {
					console.log("MathJax error:", err);
					hideStateOverlay();
				});
		} else {
			hideStateOverlay();
		}
	}
	function formatQuantumState(theta, phi, alpha, betaReal, betaImag, betaMag) {
		const tol = 0.02;
		const sqrt2inv = 1 / Math.sqrt(2);
		if (theta < tol) {
			return "\\(|\\psi\\rangle = |0\\rangle\\)";
		}
		if (Math.abs(theta - Math.PI) < tol) {
			return "\\(|\\psi\\rangle = |1\\rangle\\)";
		}
		if (Math.abs(theta - Math.PI / 2) < tol && Math.abs(phi) < tol) {
			return "\\(|\\psi\\rangle = |+\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)\\)";
		}
		if (Math.abs(theta - Math.PI / 2) < tol && Math.abs(phi - Math.PI) < tol) {
			return "\\(|\\psi\\rangle = |-\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle - |1\\rangle)\\)";
		}
		if (
			Math.abs(theta - Math.PI / 2) < tol &&
			Math.abs(phi - Math.PI / 2) < tol
		) {
			return "\\(|\\psi\\rangle = |{+i}\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + i|1\\rangle)\\)";
		}
		if (
			Math.abs(theta - Math.PI / 2) < tol &&
			(Math.abs(phi - (3 * Math.PI) / 2) < tol ||
				Math.abs(phi + Math.PI / 2) < tol)
		) {
			return "\\(|\\psi\\rangle = |{-i}\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle - i|1\\rangle)\\)";
		}
		const phiNorm = phi > Math.PI ? phi - 2 * Math.PI : phi;
		if (Math.abs(theta - Math.PI / 2) < tol && Math.abs(phiNorm) < tol) {
			return "\\(|\\psi\\rangle = |+\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)\\)";
		}
		let latex = "|\\psi\\rangle = ";
		if (Math.abs(alpha) > 0.001) {
			if (Math.abs(alpha - 1) < tol) {
				latex += "|0\\rangle";
			} else if (Math.abs(alpha - sqrt2inv) < tol) {
				latex += "\\frac{1}{\\sqrt{2}}|0\\rangle";
			} else {
				latex += alpha.toFixed(3) + "|0\\rangle";
			}
		}
		if (Math.abs(betaMag) > 0.001) {
			let betaLatex = "";
			let signLatex = "";
			if (Math.abs(betaImag) < 0.001) {
				if (betaReal >= 0 && Math.abs(alpha) > 0.001) signLatex = " + ";
				else if (betaReal < 0 && Math.abs(alpha) > 0.001) signLatex = " - ";
				const absReal = Math.abs(betaReal);
				if (Math.abs(absReal - 1) < tol) {
					betaLatex = "|1\\rangle";
				} else if (Math.abs(absReal - sqrt2inv) < tol) {
					betaLatex = "\\frac{1}{\\sqrt{2}}|1\\rangle";
				} else {
					betaLatex = absReal.toFixed(3) + "|1\\rangle";
				}
			} else if (Math.abs(betaReal) < 0.001) {
				if (betaImag >= 0 && Math.abs(alpha) > 0.001) signLatex = " + ";
				else if (betaImag < 0 && Math.abs(alpha) > 0.001) signLatex = " - ";
				const absImag = Math.abs(betaImag);
				if (Math.abs(absImag - 1) < tol) {
					betaLatex = "i|1\\rangle";
				} else if (Math.abs(absImag - sqrt2inv) < tol) {
					betaLatex = "\\frac{i}{\\sqrt{2}}|1\\rangle";
				} else {
					betaLatex = absImag.toFixed(3) + "i|1\\rangle";
				}
			} else {
				if (Math.abs(alpha) > 0.001) signLatex = " + ";
				const sign = betaImag >= 0 ? "+" : "-";
				betaLatex =
					"(" +
					betaReal.toFixed(2) +
					sign +
					Math.abs(betaImag).toFixed(2) +
					"i)|1\\rangle";
			}
			latex += signLatex + betaLatex;
		}
		if (latex === "|\\psi\\rangle = ") latex = "|\\psi\\rangle = |0\\rangle";
		return "\\(" + latex + "\\)";
	}
	function toggleDropdown(element) {
		const dropdown = element.parentElement;
		dropdown.classList.toggle("open");
	}
	function addButtonEffects() {
		document.querySelectorAll(".gate-btn").forEach((btn) => {
			btn.addEventListener("click", function (e) {
				this.classList.add("clicked");
				setTimeout(() => this.classList.remove("clicked"), 600);
				createButtonBurst(e.target);
			});
		});
	}
	function createButtonBurst(button) {
		const rect = button.getBoundingClientRect();
		const color = window.getComputedStyle(button).color;
		for (let i = 0; i < 8; i++) {
			const particle = document.createElement("div");
			particle.style.cssText = `
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: ${color};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    left: ${rect.left + rect.width / 2}px;
                    top: ${rect.top + rect.height / 2}px;
                    box-shadow: 0 0 10px ${color};
                `;
			document.body.appendChild(particle);
			const angle = (i / 8) * Math.PI * 2;
			const velocity = 50 + Math.random() * 30;
			const vx = Math.cos(angle) * velocity;
			const vy = Math.sin(angle) * velocity;
			let opacity = 1;
			let x = 0,
				y = 0;
			function animateParticle() {
				x += vx * 0.016;
				y += vy * 0.016;
				opacity -= 0.03;
				if (opacity <= 0) {
					particle.remove();
					return;
				}
				particle.style.transform = `translate(${x}px, ${y}px)`;
				particle.style.opacity = opacity;
				requestAnimationFrame(animateParticle);
			}
			animateParticle();
		}
	}
	document.addEventListener("DOMContentLoaded", function () {
		initBlochSphere();
		updateStateDisplay();
		addButtonEffects();
		if (window.MathJax && MathJax.startup) {
			MathJax.startup.promise.then(() => {
				updateStateDisplay();
			});
		} else {
			setTimeout(updateStateDisplay, 500);
		}
		const now = new Date();
		const isNewYearSeason =
			(now.getMonth() === 11 && now.getDate() === 31) || now.getMonth() === 0;
		if (isNewYearSeason) {
			const hint = document.getElementById("easter-egg-hint");
			if (hint) hint.style.display = "block";
		}
	});
	return {
		handlers: {
			initBlochSphere,
			createParticles,
			createBlochSphere,
			createRing,
			createMeridian,
			createGradientAxis,
			createAxisEndpoint,
			createStateArrow,
			createAxisLabels,
			makeTextSprite,
			updateStateArrow,
			setupMouseControls,
			onWindowResize,
			animate,
			applyGate,
			showNoEffectMessage,
			normalizePhi,
			isPhiNear,
			snapToNearestBasisState,
			animateToState,
			createTrail,
			addTrailPoint,
			fadeOutTrail,
			measureQubit,
			triggerQuantumNewYear,
			closeQuantumNewYear,
			createNewYearFireworks,
			createMeasurementBurst,
			resetQubit,
			applyCustomRotation,
			updateSliderDisplay,
			showStateOverlay,
			hideStateOverlay,
			updateStateDisplay,
			formatQuantumState,
			toggleDropdown,
			addButtonEffects,
			createButtonBurst,
			changeSlide,
			showSlides,
			formatPrefixNoUnit,
			formatPrefixNoUnitSquare,
			formatWithPrefix,
			formatWithPrefixsquare,
			getlg,
			drawCurveDynamic,
			getBestSIPrefix,
			formatWithSIPrefix,
			parseInput,
			parseInputsquare,
		},
		dispose() {
			if (scene)
				scene.traverse((obj) => {
					obj.geometry?.dispose();
					const materials = Array.isArray(obj.material)
						? obj.material
						: [obj.material];
					for (const m of materials)
						if (m) {
							for (const value of Object.values(m))
								if (value?.isTexture) value.dispose();
							m.dispose();
						}
				});
			renderer?.dispose();
			renderer?.forceContextLoss();
		},
	};
}
