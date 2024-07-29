import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeScene = () => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return; // Prevent re-initialization

    const canvas = canvasRef.current;
    if (!canvas) return;
    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      canvas: canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth * 1.2, window.innerHeight * 1.2);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = renderer;

    // Initialize scene
    const scene = sceneRef.current;

    // Initialize camera
    const cameraList = [];
    const retrieveListOfCameras = (scene) => {
      scene.traverse(function (object) {
        if (object.isCamera) {
          cameraList.push(object);
        }
      });
      const camera = cameraList[0];
      updateCameraAspect(camera);
      camera.position.set(2, 2, 2);
      cameraRef.current = camera;

      // Start the animation loop
      animate();
    };

    const updateCameraAspect = (camera) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    // Load the GLTF model
    const loader = new GLTFLoader();
    const loadModelWithDelay = () => {
      setTimeout(() => {
        loader.load(
          "/PortfolioWebsite/WebPageRoom.gltf",
          (gltf) => {
            const object = gltf.scene;
            scene.add(object);
            gltf.scene.traverse((node) => {
              if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
              }
            });
            retrieveListOfCameras(scene);
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
          }
        );
      }, 1500); // 3 seconds delay
    };

    loadModelWithDelay();

    const animate = () => {
      const render = () => {
        const camera = cameraRef.current;
        if (camera) {
          renderer.render(scene, camera);
        }
        requestAnimationFrame(render);
      };
      render();
    };

    // Add lights
    const addLights = () => {
      const windowLight = new THREE.PointLight(0xffffa0, 1);
      windowLight.position.set(1, 2, -1.95);
      windowLight.castShadow = true;
      windowLight.shadow.mapSize.width = 2048;
      windowLight.shadow.mapSize.height = 2048;
      windowLight.shadow.camera.near = 0.5;
      windowLight.shadow.camera.far = 500;
      windowLight.shadow.bias = -0.0005;
      scene.add(windowLight);

      const light = new THREE.PointLight(0xffffa0, 10);
      light.position.set(4, 3, -3);
      light.castShadow = true;
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;
      light.shadow.camera.near = 0.5;
      light.shadow.bias = -0.00001;
      scene.add(light);

      const light2 = new THREE.PointLight(0xffffff, 10);
      light2.position.set(2, 5, 2);
      light2.castShadow = true;
      light2.shadow.mapSize.width = 2048;
      light2.shadow.mapSize.height = 2048;
      light2.shadow.camera.near = 0.5;
      light2.shadow.camera.far = 50;
      light2.shadow.bias = -0.00005;
      scene.add(light2);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      ambientLight.position.set(3, 3, 3);
      scene.add(ambientLight);
    };

    addLights();

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth * 1.2, window.innerHeight * 1.2);
      const camera = cameraRef.current;
      if (camera) {
        updateCameraAspect(camera);
      }
    };
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", onClick);
    function onClick(event) {
      let wheel = getFirstObjectWithName(
        event,
        window,
        cameraRef.current,
        canvas,
        scene,
        "shoe"
      );

      if (wheel) {
        console.log("Yay");
      }
    }
    // Set initialized flag to true
    initializedRef.current = true;

    return () => {
      // Clean up Three.js resources on unmount
      cancelAnimationFrame(animate);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", onClick);

      scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
        if (object.isMesh) {
          object.parent.remove(object);
        }
      });

      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="background" />;
};

export function getFirstObjectWithName(
  event,
  window,
  camera,
  canvas,
  scene,
  name
) {
  const raycaster = new THREE.Raycaster();
  const getFirstValue = true;

  const mousePointer = getMouseVector2(event, canvas);
  const intersections = checkRayIntersections(
    mousePointer,
    camera,
    raycaster,
    scene,
    getFirstValue
  );
  const wheelList = getObjectsByName(intersections, name);

  if (typeof wheelList[0] !== "undefined") {
    return wheelList[0];
  }

  return null;
}

export function getMouseVector2(event, canvas) {
  let mousePointer = new THREE.Vector2();
  const rect = canvas.getBoundingClientRect();

  mousePointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mousePointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  return mousePointer;
}

export function checkRayIntersections(mousePointer, camera, raycaster, scene) {
  raycaster.setFromCamera(mousePointer, camera);

  let intersections = raycaster.intersectObjects(scene.children, true);

  return intersections;
}

export function getObjectsByName(objectList, name) {
  const wheelObjects = [];

  objectList.forEach((object) => {
    const objectName = object.object.name || "Unnamed Object";
    objectName.includes(name) ? wheelObjects.push(object.object) : null;
  });

  return wheelObjects;
}

export default ThreeScene;
