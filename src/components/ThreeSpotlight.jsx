import { useEffect, useRef } from "react";
import * as THREE from "three";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

const ThreeSpotlight = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const guiRef = useRef(null);
  const spotLightRef = useRef(null); // Store the spotLight instance
  const isMountedRef = useRef(false);
  const isGuiInitializedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      console.log("ThreeSpotlight already mounted. Skipping duplicate initialization.");
      return;
    }
    isMountedRef.current = true;
    console.log("Mounting ThreeSpotlight component");

    let renderer, scene, camera, lightHelper, controls;
    const textures = { none: null };
    let animationFrameId = null;
    let resizeObserver = null;

    const updateSize = () => {
      if (containerRef.current && renderer && camera) {
        const parent = containerRef.current.parentElement;
        const width = parent.clientWidth;
        const height = parent.clientHeight;

        console.log(`Updating renderer size: ${width}x${height}`);
        if (height === 0) {
          console.warn("Parent container height is 0. Waiting for layout to stabilize.");
        }

        renderer.setSize(width, height);
        renderer.domElement.style.width = `${width}px`;
        renderer.domElement.style.height = `${height}px`;
        camera.aspect = width / height || 1;
        camera.updateProjectionMatrix();
      }
    };

    const init = () => {
      // Initialize renderer
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);

        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        rendererRef.current = renderer;

        if (containerRef.current) {
          while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
          }
          containerRef.current.appendChild(renderer.domElement);
          console.log("Canvas appended to container");
        } else {
          console.error("Container ref is null");
          return;
        }
      } catch (error) {
        console.error("Failed to initialize WebGLRenderer:", error);
        return;
      }

      // Initialize scene and camera
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(7, 4, 1);

      // Orbit controls
      try {
        controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 2;
        controls.maxDistance = 10;
        controls.maxPolarAngle = Math.PI / 2;
        controls.target.set(0, 1, 0);
        controls.update();
        console.log("OrbitControls initialized");
      } catch (error) {
        console.error("Failed to initialize OrbitControls:", error);
      }

      // Ambient light
      const ambient = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 0.15);
      scene.add(ambient);

      // Load textures
      const textureBasePath = "/textures/";
      const filenames = ["disturb.jpg", "colors.png", "uv_grid_opengl.jpg"];
      const loader = new THREE.TextureLoader();

      filenames.forEach((filename) => {
        const texture = loader.load(
          `${textureBasePath}${filename}`,
          () => console.log(`Loaded texture: ${filename}`),
          undefined,
          (error) => console.error(`Failed to load texture ${filename}:`, error)
        );
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.colorSpace = THREE.SRGBColorSpace;
        textures[filename] = texture;
      });

      // Spotlight
      const spotLight = new THREE.SpotLight(0xffffff, 100);
      spotLight.position.set(2.5, 5, 2.5);
      spotLight.angle = Math.PI / 6;
      spotLight.penumbra = 1;
      spotLight.decay = 2;
      spotLight.distance = 0;
      spotLight.map = textures["disturb.jpg"] || null;
      spotLight.castShadow = true;
      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;
      spotLight.shadow.camera.near = 1;
      spotLight.shadow.camera.far = 10;
      spotLight.shadow.focus = 1;
      spotLightRef.current = spotLight; // Store in ref
      scene.add(spotLight);

      lightHelper = new THREE.SpotLightHelper(spotLight);
      scene.add(lightHelper);

      // Ground plane with texture
      const groundGeo = new THREE.PlaneGeometry(200, 200);
      const groundMat = new THREE.MeshLambertMaterial({
        color: 0xbcbcbc,
        map: textures["disturb.jpg"] || null,
      });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.set(0, -1, 0);
      ground.receiveShadow = true;
      scene.add(ground);

      // Fallback cube
      const cubeGeo = new THREE.BoxGeometry(1, 1, 1);
      const cubeMat = new THREE.MeshLambertMaterial({ color: 0xff0000 });
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      cube.position.set(0, 0.5, 0);
      cube.castShadow = true;
      cube.receiveShadow = true;
      scene.add(cube);

      // Load PLY model
      new PLYLoader().load(
        "/models/ply/binary/Lucy100k.ply",
        (geometry) => {
          console.log("Loaded PLY model: Lucy100k.ply");
          geometry.scale(0.0024, 0.0024, 0.0024);
          geometry.computeVertexNormals();
          const mat = new THREE.MeshLambertMaterial();
          const mesh = new THREE.Mesh(geometry, mat);
          mesh.rotation.y = -Math.PI / 2;
          mesh.position.y = 0.8;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          scene.add(mesh);
          scene.remove(cube);
        },
        (progress) =>
          console.log(
            `Loading PLY model: ${(progress.loaded / progress.total * 100).toFixed(2)}%`
          ),
        (error) => console.error("Failed to load PLY model:", error)
      );

      // Initialize GUI (only if not already initialized)
      if (!isGuiInitializedRef.current) {
        try {
          const gui = new GUI();
          guiRef.current = gui;
          isGuiInitializedRef.current = true;
          console.log("GUI initialized");

          const params = {
            map: textures["disturb.jpg"],
            color: spotLightRef.current.color.getHex(),
            intensity: spotLightRef.current.intensity,
            distance: spotLightRef.current.distance,
            angle: spotLightRef.current.angle,
            penumbra: spotLightRef.current.penumbra,
            decay: spotLightRef.current.decay,
            focus: spotLightRef.current.shadow.focus,
            shadows: true,
          };

          gui.add(params, "map", textures).onChange((val) => {
            spotLightRef.current.map = val;
            console.log("Spotlight map updated:", val);
          });
          gui.addColor(params, "color").onChange((val) => {
            spotLightRef.current.color.setHex(val);
          });
          gui.add(params, "intensity", 0, 500).onChange((val) => {
            spotLightRef.current.intensity = val;
          });
          gui.add(params, "distance", 0, 20).onChange((val) => {
            spotLightRef.current.distance = val;
          });
          gui.add(params, "angle", 0, Math.PI / 3).onChange((val) => {
            spotLightRef.current.angle = val;
          });
          gui.add(params, "penumbra", 0, 1).onChange((val) => {
            spotLightRef.current.penumbra = val;
          });
          gui.add(params, "decay", 1, 2).onChange((val) => {
            spotLightRef.current.decay = val;
          });
          gui.add(params, "focus", 0, 1).onChange((val) => {
            spotLightRef.current.shadow.focus = val;
          });
          gui.add(params, "shadows").onChange((val) => {
            renderer.shadowMap.enabled = val;
            scene.traverse((child) => {
              if (child.material) child.material.needsUpdate = true;
            });
          });
          gui.open();
        } catch (error) {
          console.error("Failed to initialize GUI:", error);
        }
      }

      // Animation loop
      const animate = () => {
        try {
          const time = performance.now() / 3000;
          spotLightRef.current.position.x = Math.cos(time) * 2.5;
          spotLightRef.current.position.z = Math.sin(time) * 2.5;
          lightHelper.update();
          renderer.render(scene, camera);
          animationFrameId = requestAnimationFrame(animate);
        } catch (error) {
          console.error("Error in animation loop:", error);
        }
      };
      animationFrameId = requestAnimationFrame(animate);
    };

    // Set up ResizeObserver to handle dynamic resizing
    if (containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateSize();
      });
      resizeObserver.observe(containerRef.current.parentElement);
    }

    // Initial setup with delay to ensure DOM is ready
    try {
      setTimeout(() => {
        init();
        updateSize();
      }, 0);
    } catch (error) {
      console.error("Initialization failed:", error);
    }

    // Window resize handler
    const onWindowResize = () => {
      updateSize();
    };
    window.addEventListener("resize", onWindowResize);

    return () => {
      console.log("Unmounting ThreeSpotlight component");
      isMountedRef.current = false;
      isGuiInitializedRef.current = false;

      // Clean up GUI DOM elements
      const guiElements = document.querySelectorAll(".lil-gui");
      guiElements.forEach((element) => element.remove());

      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", onWindowResize);
      if (guiRef.current) {
        guiRef.current.destroy();
        guiRef.current = null;
      }
      Object.values(textures).forEach((texture) => {
        if (texture) texture.dispose();
      });
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        if (containerRef.current && rendererRef.current.domElement) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        rendererRef.current = null;
      }
      if (scene) {
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat) => mat.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
      spotLightRef.current = null;
      console.log("Cleanup executed");
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "black",
      }}
    >
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%", display: "block", background: "black" }}
      />
    </div>
  );
};

export default ThreeSpotlight;