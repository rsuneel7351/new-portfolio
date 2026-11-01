import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
    attribute vec2 a_grid;
    uniform float u_time;
    uniform float u_aspect;
    uniform float u_scale;
    uniform vec2 u_pointer;
    varying float v_x;
    varying float v_lift;
    varying float v_fade;

    const float LENS = 1.7;
    const float HORIZON = 0.14;

    void main() {
        vec2 world = vec2(a_grid.x * 12.0, 1.0 + a_grid.y * 8.0);
        float height = sin(world.x * 0.9 + u_time * 0.32) * 0.16
            + sin(world.y * 1.3 - u_time * 0.26) * 0.18
            + sin((world.x + world.y) * 0.7 + u_time * 0.18) * 0.12;

        // Projects the cursor onto the terrain so the swell sits under it
        float pointerClip = min(1.0 - 2.0 * u_pointer.y, -0.04);
        float pointerDepth = LENS / (HORIZON - pointerClip);
        vec2 pointerWorld = vec2(u_pointer.x * pointerDepth * u_aspect / LENS, pointerDepth);
        float reach = distance(world, pointerWorld);
        float swell = exp(-reach * reach * 0.7) * 0.34;
        height += swell;

        float depth = world.y;
        gl_Position = vec4(world.x / depth / u_aspect * LENS, (height - 1.0) / depth * LENS + HORIZON, 0.0, 1.0);
        gl_PointSize = u_scale * (3.6 / depth + 1.0 + swell * 2.0);

        v_x = a_grid.x * 0.5 + 0.5;
        v_lift = height;
        v_fade = smoothstep(1.0, 0.45, a_grid.y);
    }
`;

const FRAGMENT_SHADER = `
    precision mediump float;
    varying float v_x;
    varying float v_lift;
    varying float v_fade;

    void main() {
        float disc = 1.0 - smoothstep(0.25, 0.5, distance(gl_PointCoord, vec2(0.5)));
        vec3 primary = vec3(0.74, 0.07, 1.0);
        vec3 secondary = vec3(0.0, 0.95, 1.0);
        vec3 tertiary = vec3(0.0, 1.0, 0.62);
        vec3 colour = mix(primary, secondary, smoothstep(0.32, 0.56, v_x));
        colour = mix(colour, tertiary, smoothstep(0.56, 0.72, v_x));
        gl_FragColor = vec4(colour + v_lift * 0.22, disc * v_fade * (0.5 + max(v_lift, 0.0) * 0.9));
    }
`;

const compile = (gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
};

const buildGrid = (columns: number, rows: number) => {
    const grid = new Float32Array(columns * rows * 2);
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            const offset = (row * columns + column) * 2;
            grid[offset] = (column / (columns - 1)) * 2 - 1;
            grid[offset + 1] = row / (rows - 1);
        }
    }
    return grid;
};

// Runs on the GPU, so the terrain never competes with scroll work on the main thread.
export const SignalField = ({ className }: { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas?.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" });
        if (!canvas || !gl) return;

        const program = gl.createProgram();
        const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
        const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
        if (!program || !vertex || !fragment) return;

        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
        gl.useProgram(program);

        const compact = window.innerWidth < 768;
        const columns = compact ? 150 : 320;
        const rows = compact ? 80 : 130;
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, buildGrid(columns, rows), gl.STATIC_DRAW);
        const gridAttribute = gl.getAttribLocation(program, "a_grid");
        gl.enableVertexAttribArray(gridAttribute);
        gl.vertexAttribPointer(gridAttribute, 2, gl.FLOAT, false, 0, 0);

        const timeUniform = gl.getUniformLocation(program, "u_time");
        const aspectUniform = gl.getUniformLocation(program, "u_aspect");
        const scaleUniform = gl.getUniformLocation(program, "u_scale");
        const pointerUniform = gl.getUniformLocation(program, "u_pointer");

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        gl.clearColor(0, 0, 0, 0);

        const target = { x: 0.35, y: 0.3 };
        const pointer = { ...target };
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const draw = (time: number) => {
            pointer.x += (target.x - pointer.x) * 0.05;
            pointer.y += (target.y - pointer.y) * 0.05;
            gl.uniform1f(timeUniform, time / 1000);
            gl.uniform2f(pointerUniform, pointer.x, pointer.y);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.POINTS, 0, columns * rows);
        };

        const resize = () => {
            const ratio = Math.min(window.devicePixelRatio || 1, 1.75);
            canvas.width = canvas.clientWidth * ratio;
            canvas.height = canvas.clientHeight * ratio;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform1f(aspectUniform, canvas.clientWidth / canvas.clientHeight);
            gl.uniform1f(scaleUniform, ratio * Math.max(canvas.clientWidth / 1200, 0.8));
            if (reduceMotion) draw(0);
        };

        let frame = 0;
        const loop = (time: number) => {
            draw(time);
            frame = requestAnimationFrame(loop);
        };
        const start = () => {
            if (!frame && !reduceMotion) frame = requestAnimationFrame(loop);
        };
        const stop = () => {
            cancelAnimationFrame(frame);
            frame = 0;
        };

        let onScreen = true;
        const sync = () => (onScreen && !document.hidden ? start() : stop());
        const observer = new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting;
            sync();
        });
        const resizeObserver = new ResizeObserver(resize);
        const onPointerMove = (event: PointerEvent) => {
            target.x = (event.clientX / window.innerWidth) * 2 - 1;
            target.y = event.clientY / window.innerHeight;
        };

        observer.observe(canvas);
        resizeObserver.observe(canvas);
        document.addEventListener("visibilitychange", sync);
        window.addEventListener("pointermove", onPointerMove, { passive: true });

        return () => {
            stop();
            observer.disconnect();
            resizeObserver.disconnect();
            document.removeEventListener("visibilitychange", sync);
            window.removeEventListener("pointermove", onPointerMove);
            gl.deleteBuffer(buffer);
            gl.deleteProgram(program);
            gl.deleteShader(vertex);
            gl.deleteShader(fragment);
        };
    }, []);

    return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};
