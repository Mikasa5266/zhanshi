/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';

interface ShaderCanvasProps {
  activeSlide: number;
}

export default function ShaderCanvas({ activeSlide }: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  
  // Smoothly interpolate active slide in JS to pass to uniforms
  const animatedSlideRef = useRef(activeSlide);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    // Slide index spring animation
    let animationFrameId: number;
    const updateSlideTransition = () => {
      const diff = activeSlide - animatedSlideRef.current;
      animatedSlideRef.current += diff * 0.08; // Spring stiffness factor
      
      // Interpolate mouse too
      const mDiffX = mouseRef.current.targetX - mouseRef.current.x;
      const mDiffY = mouseRef.current.targetY - mouseRef.current.y;
      mouseRef.current.x += mDiffX * 0.05;
      mouseRef.current.y += mDiffY * 0.05;

      animationFrameId = requestAnimationFrame(updateSlideTransition);
    };
    
    updateSlideTransition();
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeSlide]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check capability
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
    if (!gl) {
      console.warn('WebGL is not supported in this browser. Falling back to background gradient.');
      setWebGlSupported(false);
      return;
    }

    // Vertex Shader code
    const vsSource = `
      attribute vec2 position;
      varying vec2 v_uv;
      void main() {
        v_uv = position * 0.5 + 0.5;
        v_uv.y = 1.0 - v_uv.y; // Correct flip if needed
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader code
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_active_slide;

      // GLSL utilities: Random and Octave Perlin Noise for fluid motion
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                   mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        // Rotation matrix to decrease axis bias
        mat2 m = mat2(0.8, 0.6, -0.6, 0.8);
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = m * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        // Safe UV mapping
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        // Mouse reaction
        float mouse_dist = length(p - u_mouse);
        float mouse_influence = smoothstep(0.9, 0.0, mouse_dist);
        
        // Complex fluid flow simulation modeling the "Wind"
        vec2 flow = vec2(
          fbm(p * 1.2 + vec2(u_time * 0.08, u_time * 0.03)),
          fbm(p * 1.2 - vec2(u_time * 0.04, u_time * 0.08))
        );
        
        p += flow * 0.35 + u_mouse * mouse_influence * 0.15;
        
        float activeSlide = u_active_slide;
        
        // Background baseline and glowing color elements
        vec3 baseColor = vec3(0.97, 0.97, 0.96);
        vec3 accentColor = vec3(0.85, 0.85, 0.85);

        // Dynamically compute visual mood based on the interpolated sliding progression
        if (activeSlide < 0.5) {
          // Slide 0: Soft Crimson Rose
          float stage = activeSlide / 0.5;
          baseColor = mix(vec3(0.98, 0.97, 0.96), vec3(0.98, 0.95, 0.94), stage);
          accentColor = vec3(0.95, 0.72, 0.72);
        } 
        else if (activeSlide < 1.5) {
          // Slide 1: Soft Professional Steel
          float stage = (activeSlide - 0.5);
          baseColor = mix(vec3(0.98, 0.95, 0.94), vec3(0.96, 0.96, 0.97), stage);
          accentColor = vec3(0.78, 0.82, 0.88);
        } 
        else if (activeSlide < 2.5) {
          // Slide 2: Soft Cyber Teal
          float stage = (activeSlide - 1.5);
          baseColor = mix(vec3(0.96, 0.96, 0.97), vec3(0.94, 0.97, 0.98), stage);
          accentColor = vec3(0.68, 0.88, 0.92);
        } 
        else if (activeSlide < 3.5) {
          // Slide 3: Soft Patriot Crimson
          float stage = (activeSlide - 2.5);
          baseColor = mix(vec3(0.94, 0.97, 0.98), vec3(0.98, 0.94, 0.94), stage);
          accentColor = vec3(0.95, 0.70, 0.70);
        } 
        else if (activeSlide < 4.5) {
          // Slide 4: Soft Amber Golden
          float stage = (activeSlide - 3.5);
          baseColor = mix(vec3(0.98, 0.94, 0.94), vec3(0.98, 0.97, 0.93), stage);
          accentColor = vec3(0.92, 0.84, 0.65);
        } 
        else {
          // Slide 5: Soft Lavender Purple
          float stage = min(1.0, (activeSlide - 4.5));
          baseColor = mix(vec3(0.98, 0.97, 0.93), vec3(0.96, 0.95, 0.98), stage);
          accentColor = vec3(0.85, 0.75, 0.92);
        }

        // Compute fluid noise density
        float density = fbm(p * 1.5 + u_time * 0.05);
        vec3 finalCol = mix(baseColor, accentColor, density * 0.35);

        // Subtle dark mouse influence ripples
        finalCol = mix(finalCol, vec3(0.85, 0.90, 0.95), mouse_influence * 0.15);
        
        // Add very soft vignette shadow borders to maintain clean crisp look
        vec2 radial = abs(uv - 0.5) * 1.8;
        float vignette = 1.0 - dot(radial, radial) * 0.08;
        finalCol *= clamp(vignette, 0.8, 1.0);
        
        gl_FragColor = vec4(finalCol, 1.0);
      }
    `;

    // Helper functions to compile shader
    function compileShader(source: string, type: number): WebGLShader | null {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    // Create Program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad setup
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Extract uniform locations
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const uActiveSlideLoc = gl.getUniformLocation(program, 'u_active_slide');

    // Handle Resize
    let width = 0;
    let height = 0;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      // Limit resolution on high-end monitors to maintain 60FPS on mobile devices
      const ratio = Math.min(window.devicePixelRatio, 1.5);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      
      if (width !== w || height !== h) {
        width = w;
        height = h;
        canvas.width = Math.floor(w * ratio);
        canvas.height = Math.floor(h * ratio);
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    resize();

    // Mouse Move listener setup to pass mouse coords to shader
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      
      // Normalize coordinate: -1 to 1 based on aspect ratio
      const aspect = rect.width / rect.height;
      mouseRef.current.targetX = ((px / rect.width) * 2.0 - 1.0) * aspect;
      mouseRef.current.targetY = (1.0 - (py / rect.height) * 2.0);
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Animation Loop
    let start = Date.now();
    let frameId: number;

    const render = () => {
      const elapsed = (Date.now() - start) / 1000.0;
      
      // Setup WebGL states
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Pass updated uniform details
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uActiveSlideLoc, animatedSlideRef.current);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frameId = requestAnimationFrame(render);
    };
    render();

    // Cleanups
    return () => {
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(frameId);
    };
  }, [webGlSupported]);

  if (!webGlSupported) {
    // Beautiful pure CSS animated gradient representation on WebGL failure (safe fallback)
    const backgroundGradients = [
      'bg-radial from-red-50 via-neutral-50 to-neutral-100',
      'bg-radial from-rose-50 via-zinc-50 to-zinc-100',
      'bg-radial from-cyan-50 via-slate-50 to-slate-100',
      'bg-radial from-red-50 via-stone-50 to-stone-100',
      'bg-radial from-amber-50 via-zinc-50 to-zinc-100',
      'bg-radial from-fuchsia-50 via-neutral-50 to-neutral-100',
    ];

    return (
      <div 
        className={`fixed inset-0 z-0 transition-all duration-1000 ease-out ${backgroundGradients[activeSlide] || "bg-neutral-50"}`}
        id="css-fallback-bg"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-radial-gradient-mask" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden select-none pointer-events-none" id="shader-background-wrapper">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block opacity-85"
        style={{ filter: 'contrast(1.02) brightness(1.0)' }}
        id="webgl-canvas-fluid"
      />
      {/* Dynamic Grid Overlay to reinforce the professional military/intelligence engineering theme */}
      <div 
        className="absolute inset-0 opacity-[0.80] select-none pointer-events-none transition-all duration-1000"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at center, rgba(0,0,0,0.01) 0%, transparent 80%),
            linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        }}
        id="grid-theme-overlay"
      />
    </div>
  );
}
