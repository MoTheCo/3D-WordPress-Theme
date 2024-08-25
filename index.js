import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';


// utf8_encode importieren und als Funktion utf8_encode definieren
// Funktion utf8_encode aufrufen
function utf8_encode(argString) {
   
    if (argString === null || typeof argString === 'undefined') {
        return ''
    }
}

// variablen für die iframe urls
const w1 = 'wp-content/themes/3d/iframes/info1.php';
const w2 = 'wp-content/themes/3d//iframes/info2.php';
const w3 = 'wp-content/themes/3d//iframes/info3.php';


// Szene, Kamera und Renderer erstellen
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);



// Modell laden
const loader = new GLTFLoader();
let cockpit;

loader.load('wp-content/themes/3d/models/scene.glb', function (gltf) {
    scene.add(gltf.scene);

    // Kamera auf das Cockpit ausrichten

    cockpit = gltf.scene.getObjectByName('cockpit');
    if (cockpit) {
        camera.position.set(cockpit.position.x, cockpit.position.y + 1, cockpit.position.z + 5);
        camera.lookAt(cockpit.position);
        camera.position.z = 500; // Stellen Sie sicher, dass dies größer als der Radius der Kugel ist
        camera.lookAt(0, 0, 0); // Blickrichtung auf den Mittelpunkt der Kugel


        const cockpitLight = new THREE.PointLight(0xffffff, 1, 100);
        cockpitLight.position.copy(cockpit.position);
        scene.add(cockpitLight);
    }

}, undefined, function (error) {
    console.error('Fehler beim Laden des Modells:', error);
});


// Initialisierung des Video-Elements
const video = document.createElement('video');
video.src = 'wp-content/themes/3d/img/bg2.mp4';
video.loop = true;
video.muted = true;
//wiedergabe des Videos ohne verzögerung starten
video.play();

// Erstellung der Video-Textur und des Materials
const texture = new THREE.VideoTexture(video);
texture.minFilter = THREE.LinearFilter; // Verbessert die Darstellung bei Skalierung
const bgMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });

// Erstellung und Hinzufügung der Kugel zur Szene
const bgGeometry = new THREE.SphereBufferGeometry(920, 202, 10);
const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
bgMesh.rotation.y = Math.PI/2;
scene.add(bgMesh);





// Position der Lichtquelle
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 4);
scene.add(light);

// Bewegung der Kamera
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 0.4;
controls.maxDistance = 6;
controls.enablePan = false;
controls.enableZoom = false;
controls.enableDamping = false;
controls.minAzimuthAngle = -Math.PI / 2;
controls.maxAzimuthAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;



// Raycasting für Klick-Events
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let currentIframeContainer = null;

window.addEventListener('click', onMouseClick, false);

// Klick-Event-Handler
function onMouseClick(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;
        if (object.name === 'ClickableMesh') {
            if (!currentIframeContainer) {
                createIframe1();
            

            }
            break;
        }
    }
  for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;
        if (object.name === 'ClickableMesh1') {
            if (!currentIframeContainer) {
                createIframe2();
            }
            break;
        }
    }
    for (let i = 0; i < intersects.length; i++) {
            const object = intersects[i].object;
            if (object.name === 'ClickableMesh2') {
                if (!currentIframeContainer) {
                    createIframe3();
                }
                break;
            }
        }

}

var endpoint = 'wp-content/plugins/3d/threejs-texts.json'; // Angenommen, du hast einen entsprechenden REST-API-Endpoint eingerichtet

fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        var mainTitle = data.main_title
        var fieldTitle1 = data.field1_title
        var fieldTitle2 = data.field2_title
        var fieldTitle3 = data.field3_title


   

    







// haupttitel
const tloader = new THREE.FontLoader();
tloader.load('wp-content/themes/3d/fonts/helvetiker_regular.typeface.json', function (font) {
    // E-Commerce durch titel aus wordpress datenbank ersetzen 
    const textGeometry = new THREE.TextGeometry(mainTitle, {

        font: font,
        size: 0.12,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-0.45,-0.1,-0.75);
    scene.add(textMesh);
});

//felder aus wordpress datenbank hinzufügen


// Erster Würfel
const geometry = new THREE.BoxGeometry(0.2, 0.1, 0.3);
const material = new THREE.MeshBasicMaterial({ color: 0x000000, visible: false });
const clickableMesh = new THREE.Mesh(geometry, material);
clickableMesh.name = 'ClickableMesh';
clickableMesh.position.set(0, -0.32, -0.6);
scene.add(clickableMesh);



// Titel über dem ersten Würfel hinzufügen
const tloader1 = new THREE.FontLoader();
tloader1.load('wp-content/themes/3d/fonts/helvetiker_regular.typeface.json', function (font) {

    //feld text aus wordpress holen
    const textGeometry = new THREE.TextGeometry(fieldTitle1, {
        font: font,
        size: 0.03,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-0.08, -0.28, -0.6);
    scene.add(textMesh);
}
);
    


//zweiter Würfel 
const geometry1 = new THREE.BoxGeometry(0.17, 0.1, 0.4);
const material1 = new THREE.MeshBasicMaterial({ color: 0x000000, visible: true });
const clickableMesh1 = new THREE.Mesh(geometry1, material1);
clickableMesh1.name = 'ClickableMesh1';
clickableMesh1.position.set(-0.37, -0.29, -0.89);
scene.add(clickableMesh1);

// Titel über dem zweiten Würfel hinzufügen
const tloader2 = new THREE.FontLoader();
tloader2.load('wp-content/themes/3d/fonts/helvetiker_regular.typeface.json', function (font) 
{
    const textGeometry = new THREE.TextGeometry(fieldTitle2, {
        font: font,
        size: 0.03,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh1 = new THREE.Mesh(textGeometry, textMaterial);
    textMesh1.position.set(-0.43, -0.28, -0.6);
    scene.add(textMesh1);
});


// Dritter Würfel
const geometry2 = new THREE.BoxGeometry(0.17, 0.1, 0.4);
const material2 = new THREE.MeshBasicMaterial({ color: 0x000000, visible: true });
const clickableMesh2 = new THREE.Mesh(geometry2, material2);
clickableMesh2.name = 'ClickableMesh2';
clickableMesh2.position.set(0.37, -0.29, -0.89);
scene.add(clickableMesh2);

// Titel über dem dritten Würfel hinzufügen
const tloader3 = new THREE.FontLoader();
tloader3.load('wp-content/themes/3d/fonts/helvetiker_regular.typeface.json', function (font)

{ 
    const textGeometry = new THREE.TextGeometry(fieldTitle3, {
        font: font,
        size: 0.027,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh2 = new THREE.Mesh(textGeometry, textMaterial);
    textMesh2.position.set(0.265, -0.28, -0.6);
    scene.add(textMesh2);
});
})


// Erstellung von Iframes
function createIframe1() {
    let isDragging = false;
    let dragStartX, dragStartY;

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '100px';
    container.style.left = '100px';
    container.style.border = '2px solid #000';
    container.style.cursor = 'move'; // Cursor-Stil ändern, um Verschiebbarkeit anzudeuten

    const iframe = document.createElement('iframe');
    iframe.style.width = '640px';
    iframe.style.height = '480px';
    iframe.src = w1;
    container.appendChild(iframe);

    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'X';
    closeButton.className = 'close-btn';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '0';
    closeButton.style.right = '0';
    closeButton.onclick = function () {
        container.remove();
        currentIframeContainer = null;
    };
    container.appendChild(closeButton);

    // Maus-Down-Ereignis
    container.addEventListener('mousedown', function(e) {
        isDragging = true;
        dragStartX = e.pageX - container.offsetLeft;
        dragStartY = e.pageY - container.offsetTop;
        e.preventDefault();
    });

    // Maus-Move-Ereignis
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            container.style.left = (e.pageX - dragStartX) + 'px';
            container.style.top = (e.pageY - dragStartY) + 'px';
        }
    });

    // Maus-Up-Ereignis
    document.addEventListener('mouseup', function(e) {
        isDragging = false;
    });

    document.body.appendChild(container);
    currentIframeContainer = container;
}


function createIframe2() {
    let isDragging = false;
    let dragStartX, dragStartY;

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '100px';
    container.style.left = '100px';
    container.style.border = '2px solid #000';
    container.style.cursor = 'move'; // Cursor-Stil ändern, um Verschiebbarkeit anzudeuten

    const iframe = document.createElement('iframe');
    iframe.style.width = '640px';
    iframe.style.height = '480px';
    iframe.src = w2;
    container.appendChild(iframe);

    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'X';
    closeButton.className = 'close-btn';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '0';
    closeButton.style.right = '0';
    closeButton.onclick = function () {
        container.remove();
        currentIframeContainer = null;
    };
    container.appendChild(closeButton);

    // Maus-Down-Ereignis
    container.addEventListener('mousedown', function(e) {
        isDragging = true;
        dragStartX = e.pageX - container.offsetLeft;
        dragStartY = e.pageY - container.offsetTop;
        e.preventDefault();
    });

    // Maus-Move-Ereignis
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            container.style.left = (e.pageX - dragStartX) + 'px';
            container.style.top = (e.pageY - dragStartY) + 'px';
        }
    });

    // Maus-Up-Ereignis
    document.addEventListener('mouseup', function(e) {
        isDragging = false;
    });

    document.body.appendChild(container);
    currentIframeContainer = container;
}

function createIframe3() {
    let isDragging = false;
    let dragStartX, dragStartY;

    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.top = '100px';
    container.style.left = '120px';
    container.style.border = '2px solid #000';
    container.style.cursor = 'move'; // Cursor-Stil ändern, um Verschiebbarkeit anzudeuten

    const iframe = document.createElement('iframe');
    iframe.style.width = '640px';
    iframe.style.height = '480px';
    iframe.src = w3;
    container.appendChild(iframe);

    const closeButton = document.createElement('button');
    closeButton.innerHTML = 'X';
    closeButton.className = 'close-btn';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '0';
    closeButton.style.right = '0';
    closeButton.onclick = function () {
        container.remove();
        currentIframeContainer = null;
    };
    container.appendChild(closeButton);

    // Maus-Down-Ereignis
    container.addEventListener('mousedown', function(e) {
        isDragging = true;
        dragStartX = e.pageX - container.offsetLeft;
        dragStartY = e.pageY - container.offsetTop;
        e.preventDefault();
    });

    // Maus-Move-Ereignis
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            container.style.left = (e.pageX - dragStartX) + 'px';
            container.style.top = (e.pageY - dragStartY) + 'px';
        }
    });

    // Maus-Up-Ereignis
    document.addEventListener('mouseup', function(e) {
        isDragging = false;
    });

    document.body.appendChild(container);
    currentIframeContainer = container;
}

// Event-Listener für Fenstergrößenänderung
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


// fetch from /wp-content/plugins/3d/custom-threejs-texts.php $threejsTexts array


// Animationsfunktion
function animate() {
    controls.update();
    requestAnimationFrame(animate);
    texture.needsUpdate = true; // Stellt sicher, dass die Textur aktualisiert wird
    renderer.render(scene, camera);
}

animate();
