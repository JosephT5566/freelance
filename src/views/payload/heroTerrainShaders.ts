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
uniform vec4 uRipples[6];
vec4 projectTerrain(vec3 point) {
	vec4 projected = projectionMatrix * modelViewMatrix * vec4(point, 1.0);
	vec2 screenPosition = (projected.xy / projected.w * 0.5 + 0.5) * uViewport;
	vec2 displacement = vec2(0.0);
	for (int index = 0; index < 6; index++) {
		vec4 ripple = uRipples[index];
		vec2 delta = screenPosition - ripple.xy;
		float radius = length(delta);
		float ring = radius - ripple.z * 145.0;
		float envelope = 1.0 - smoothstep(18.0, 48.0, abs(ring));
		float fade = smoothstep(0.0, 0.12, ripple.z) * (1.0 - smoothstep(1.0, 1.8, ripple.z));
		float wave = cos(ring * 0.055) * envelope * fade * ripple.w;
		displacement += delta / max(radius, 1.0) * smoothstep(0.0, 24.0, radius) * wave * 14.0;
	}
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
