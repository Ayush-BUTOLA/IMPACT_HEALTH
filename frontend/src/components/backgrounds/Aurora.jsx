import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import './Aurora.css';

const VERT = /* glsl */ `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = /* glsl */ `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(
      dot(x0, x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ),
    0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) { \
  int index = 0; \
  for (int i = 0; i < 2; i++) { \
    ColorStop currentColor = colors[i]; \
    bool isInBetween = currentColor.position <= factor; \
    index = int(mix(float(index), float(i), float(isInBetween))); \
  } \
  ColorStop currentColor = colors[index]; \
  ColorStop nextColor = colors[index + 1]; \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  float noise1 = snoise(uv * 2.0 + uTime * 0.1) * uAmplitude;
  float noise2 = snoise(uv * 3.0 - uTime * 0.15) * uAmplitude * 0.5;

  float combinedNoise = (noise1 + noise2) * 0.5;
  float blendedPosition = uv.x + combinedNoise * 0.3;
  blendedPosition = clamp(blendedPosition, 0.0, 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, blendedPosition, rampColor);

  float wave = sin(uv.y * 6.0 + uTime * 0.5 + noise1 * 2.0) * 0.5 + 0.5;
  wave = smoothstep(0.3, 0.7, wave);

  vec3 finalColor = mix(rampColor, rampColor * 1.2, wave * 0.3);
  float alpha = smoothstep(0.0, uBlend, length(finalColor));

  fragColor = vec4(finalColor, alpha);
}
`;

function hexToVec3(hex) {
  const c = new Color(hex);
  return [c.r, c.g, c.b];
}

export default function Aurora({
  colorStops = ['#3A29FF', '#FF94B4', '#FF3232'],
  amplitude = 1.0,
  speed = 1.0,
  blend = 0.5,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer, gl, animationFrameId, resizeObserver;

    try {
      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: true,
      });

      gl = renderer.gl;
      if (!gl) return;
      container.appendChild(gl.canvas);

      const geometry = new Triangle(gl);

      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uAmplitude: { value: amplitude },
          uColorStops: {
            value: [
              hexToVec3(colorStops[0]),
              hexToVec3(colorStops[1]),
              hexToVec3(colorStops[2]),
            ],
          },
          uResolution: { value: [gl.canvas.width, gl.canvas.height] },
          uBlend: { value: blend },
        },
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });

      const mesh = new Mesh(gl, { geometry, program });

      function resize() {
        if (!gl || !gl.canvas) return;
        renderer.setSize(container.clientWidth, container.clientHeight);
        gl.canvas.style.width = '100%';
        gl.canvas.style.height = '100%';
        program.uniforms.uResolution.value = [
          gl.canvas.width,
          gl.canvas.height,
        ];
      }

      function animate(t) {
        animationFrameId = requestAnimationFrame(animate);
        program.uniforms.uTime.value = t * 0.001 * speed;
        renderer.render({ scene: mesh });
      }

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();
      animationFrameId = requestAnimationFrame(animate);
    } catch (e) {
      console.warn("Aurora background WebGL disabled or unsupported:", e);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
      if (gl && gl.canvas && gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      if (gl) gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [colorStops, amplitude, speed, blend]);

  return (
    <div
      ref={containerRef}
      className={`aurora-container ${className}`}
      style={style}
    />
  );
}
