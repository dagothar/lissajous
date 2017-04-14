$(document).ready(function() {
  
  var canvas = $('#view').get(0);
  
  /* initialize THREEjs */
  var scene     = new THREE.Scene();
  var camera    = new THREE.PerspectiveCamera(75, 1.0*canvas.width/canvas.height, 0.1, 1000);
  var renderer  = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
  controls      = new THREE.OrbitControls(camera);
  
  scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
   
  camera.position.set(0, 0, 10);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  
  renderer.setSize(canvas.width, canvas.height);
  renderer.setClearColor(0xffffff);
  
  controls.addEventListener('change', render);
  
  var light = new THREE.PointLight(0xffffff, 1.0);
  scene.add(light);
  light.position.set(0, 0, 10);
  
  
  function requestAnimationFrame(render) {
    var material = new THREE.LineBasicMaterial({ color: 0xff00ff, linewidth: 5 });
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(Math.random(), 1, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(1, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 1));
    var line = new THREE.Line(geometry, material);
    scene.add(line);
  };
  
  
  function animate() {
    requestAnimationFrame(render);
    controls.update();
  };
  
  
  function render() {
    renderer.render(scene, camera);
  };
  
  
  animate();
});
