const lighting = `
attribute vec3 terrainNormal;
varying vec3 vColor;
uniform vec3 uShadow;
uniform vec3 uHighlight;
void lightTerrain() {
	vec3 normal = normalize(normalMatrix * terrainNormal);
	float light = max(dot(normal, normalize(vec3(-0.55, 0.65, 0.7))), 0.0);
	vColor = mix(uShadow, uHighlight, smoothstep(0.1, 0.95, light));
}
`;

const interaction = `
uniform vec2 uPointer;
uniform vec2 uViewport;
uniform float uRadius;
uniform float uActivation;
float influence(vec2 screenPosition) {
	return (1.0 - smoothstep(uRadius * 0.3, uRadius, distance(screenPosition, uPointer))) * uActivation;
}
`;

export const surfaceVertexShader = `
varying vec3 vNormal;
varying vec2 vUv;
void main() {
	vNormal = normalize(normalMatrix * normal);
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const surfaceFragmentShader = `
uniform vec3 uShadow;
uniform vec3 uHighlight;
varying vec3 vNormal;
varying vec2 vUv;
void main() {
	float light = max(dot(normalize(vNormal), normalize(vec3(-0.55, 0.65, 0.7))), 0.0);
	float shade = smoothstep(0.1, 0.95, light);
	vec2 edge = smoothstep(vec2(0.0), vec2(0.08), vUv) * smoothstep(vec2(0.0), vec2(0.08), 1.0 - vUv);
	gl_FragColor = vec4(mix(uShadow, uHighlight, shade), mix(0.16, 0.055, shade) * edge.x * edge.y);
	#include <colorspace_fragment>
}
`;

export const contourVertexShader = `
${lighting}
void main() {
	lightTerrain();
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const contourFragmentShader = `
${interaction}
uniform float uPixelRatio;
uniform float uOpacity;
varying vec3 vColor;
void main() {
	float dissolve = influence(gl_FragCoord.xy / uPixelRatio);
	gl_FragColor = vec4(vColor, uOpacity * (1.0 - dissolve));
	#include <colorspace_fragment>
}
`;

export const particleVertexShader = `
${lighting}
${interaction}
attribute vec3 scatter;
uniform float uPixelRatio;
varying float vInfluence;
void main() {
	lightTerrain();
	vec4 rest = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	vec2 screenPosition = (rest.xy / rest.w * 0.5 + 0.5) * uViewport;
	vInfluence = influence(screenPosition);
	vec3 displaced = position + scatter * vInfluence;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
	gl_PointSize = (1.5 + abs(scatter.z) * 0.035) * uPixelRatio;
}
`;

export const particleFragmentShader = `
varying float vInfluence;
varying vec3 vColor;
void main() {
	float radius = length(gl_PointCoord - 0.5);
	float alpha = (1.0 - smoothstep(0.25, 0.5, radius)) * vInfluence * 0.65;
	if (alpha < 0.005) discard;
	gl_FragColor = vec4(vColor, alpha);
	#include <colorspace_fragment>
}
`;
