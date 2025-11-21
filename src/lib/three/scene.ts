import * as THREE from 'three';

export function createDemoScene(scene: THREE.Scene) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0xff8844 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    // luz
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    return { cube };
}
