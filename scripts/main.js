$(document).ready(function() {
  
  var canvas;
  var scene;
  var camera;
  var renderer;
  var controls;
  var light;
  
  
  function initialize() {
    canvas = $('#view').get(0);
  
    /* initialize THREEjs */
    scene     = new THREE.Scene();
    //camera    = new THREE.PerspectiveCamera(75, 1.0*canvas.width/canvas.height, 0.1, 1000);
    camera    = new THREE.OrthographicCamera(-canvas.width/200, canvas.width/200, -canvas.height/200, canvas.height/200, -10, 10);
    renderer  = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    controls  = new THREE.OrbitControls(camera);
    
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
     
    camera.position.set(0, 0, 1);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    renderer.setSize(canvas.width, canvas.height);
    renderer.setClearColor(0xffffff);
    
    controls.addEventListener('change', render);
    
    light = new THREE.PointLight(0xffffff, 1.0);
    scene.add(light);
    light.position.set(0, 0, 10);
  };
  
  
  function requestAnimationFrame(renderer) {
    var curve = new Lissajous([ 1, 1, 1 ], [ 1, 2, 4 ], [ 0, 0, 0 ]);
    curve.render(scene, renderer);
  };
  
  
  function animate() {
    requestAnimationFrame(render);
    controls.update();
  };
  
  
  function render() {
    renderer.render(scene, camera);
  };
  
  
  initialize();
  animate();
});
