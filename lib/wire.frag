varying vec3 vBarycentric;

uniform float distanceFactor;
uniform vec3 stroke;
uniform vec3 fill;

float aastep (float threshold, float dist) {
  float afwidth = fwidth(dist) * 0.5;
  return smoothstep(threshold - afwidth, threshold + afwidth, dist);
}

vec4 getStyledWireframe (vec3 barycentric) {
  // this will be our signed distance for the wireframe edge
  float d = min(min(barycentric.x, barycentric.y), barycentric.z);

  float stripe = aastep(1.0, mod(d * distanceFactor, 2.0));

  // now compute the final color of the mesh
  vec4 outColor = vec4(0.0);
  outColor.rgb = mix(fill, stroke, stripe);
  outColor.a = 1.0;

  return outColor;
}

void main () {
  gl_FragColor = getStyledWireframe(vBarycentric);
}