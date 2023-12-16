// Three.js를 불러오기
import * as THREE from 'three';

// 씬 생성
const scene = new THREE.Scene();

// 카메라 생성
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// WebGL 렌더러 생성
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 정점 데이터 생성
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -1, -1, 0,
    1, -1, 0,
    0, 1, 0
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

// 쉐이더 코드
const vertexShader = `
    varying vec3 vColor;
    void main() {
        vColor = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying vec3 vColor;
    void main() {
        gl_FragColor = vec4(vColor, 1.0);
    }
`;

// 재질 생성
const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
});

// 메쉬 생성
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);

    // 회전 애니메이션 추가
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// 윈도우 크기 조정 이벤트 처리
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// 애니메이션 시작
animate();