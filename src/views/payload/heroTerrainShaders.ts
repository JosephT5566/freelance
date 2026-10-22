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
uniform vec2 uViewport;
uniform vec2 uCursorCenter;
uniform float uCursorRadius;
uniform float uCursorActivation;
uniform float uTime;
vec4 projectTerrain(vec3 point) {
	vec4 projected = projectionMatrix * modelViewMatrix * vec4(point, 1.0);
	vec2 screenPosition = (projected.xy / projected.w * 0.5 + 0.5) * uViewport;
	vec2 local = (screenPosition - uCursorCenter) / uCursorRadius;
	float envelope = 1.0 - smoothstep(0.35, 1.0, length(local));
	float breathing = sin(uTime * 1.7) * 12.0;
	float twist = sin(uTime * 1.1 + local.x * 2.2 + local.y * 1.6) * 8.0;
	vec2 drift = vec2(sin(uTime * 1.3 + local.y * 2.0), cos(uTime * 1.5 + local.x * 2.0)) * 4.0;
	vec2 displacement = (local * breathing + vec2(-local.y, local.x) * twist + drift) * envelope * uCursorActivation;
	displacement *= min(1.0, 16.0 / max(length(displacement), 1.0));
	projected.xy += displacement / uViewport * 2.0 * projected.w;
	return projected;
}
`;

export const surfaceVertexShader = `
${interaction}
varying vec3 vNormal;
varying vec2 vUv;
void main() {
	vNormal = normalize(normalMatrix * normal);
	vUv = uv;
	gl_Position = projectTerrain(position);
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
${interaction}
void main() {
	lightTerrain();
	gl_Position = projectTerrain(position);
}
`;

export const contourFragmentShader = `
uniform float uOpacity;
varying vec3 vColor;
void main() {
	gl_FragColor = vec4(vColor, uOpacity);
	#include <colorspace_fragment>
}
`;
