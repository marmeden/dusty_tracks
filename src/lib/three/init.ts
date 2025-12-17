import * as THREE from 'three';

export function initThree(canvas: HTMLCanvasElement) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        60,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    return { scene, camera, renderer };
}
