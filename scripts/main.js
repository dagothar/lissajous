function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}


$(document).ready(function() {
  
  var canvas;
  var scene;
  var camera;
  var renderer;
  var controls;
  var light;
  
  var defaultParams = {
    Ax: 1.0,
    wx: 1.0,
    px: 0.0,
    Ay: 1.0,
    wy: 2.0,
    py: 0.0,
    Az: 1.0,
    wz: 3.0,
    pz: 0.0
  };
  
  
  function getParameters() {
    var params = clone(defaultParams);
    
    params.Ax = parseFloat($('.parameter-Ax').val());
    params.wx = parseFloat($('.parameter-wx').val());
    //params.px = parseFloat($('.parameter-px').val());
    params.Ay = parseFloat($('.parameter-Ay').val());
    params.wy = parseFloat($('.parameter-wy').val());
    //params.py = parseFloat($('.parameter-py').val());
    params.Az = parseFloat($('.parameter-Az').val());
    params.wz = parseFloat($('.parameter-wz').val());
    //params.pz = parseFloat($('.parameter-pz').val());
    
    return params;
  };
  
  
  var params = getParameters();
  console.log(params);
  var curve = new Lissajous(params);
  var grid = new Grid(2.0, 0.25);
  var axes = new Axes(1.0, 0.01);
  
  
  function initialize() {
    canvas = $('#view').get(0);
  
    /* initialize THREEjs */
    scene     = new THREE.Scene();
    //scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
    
    //camera    = new THREE.PerspectiveCamera(75, 1.0*canvas.width/canvas.height, 0.1, 1000);
    
    camera    = new THREE.OrthographicCamera(-canvas.width/200, canvas.width/200, canvas.height/200, -canvas.height/200, -10, 10);
    camera.position.set(1, -1, 1);
    camera.up = new THREE.Vector3(0, 0, 1);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    renderer  = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    renderer.setSize(canvas.width, canvas.height);
    renderer.setClearColor(0xffffff);
    
    controls  = new THREE.OrbitControls(camera, canvas);
    controls.addEventListener('change', render);
    controls.zoom0 = 1.5;
    controls.reset();
    
    //light = new THREE.PointLight(0xffffff, 1.0);
    //scene.add(light);
    //light.position.set(0, 0, 10);
  };
  
  
  function requestAnimationFrame(renderer) {
    scene     = new THREE.Scene();
    
    axes.render(scene, renderer);
    grid.render(scene, renderer);
    curve.render(scene, renderer);
  };
  
  
  function animate() {
    requestAnimationFrame(render);
    //controls.update();
  };
  
  
  function render() {
    renderer.render(scene, camera);
  };
  
  
  initialize();
  animate();
  render();
  
  
  $('.parameter').change(function() {
    var Ax = $('.parameter-Ax').val();
    var Ay = $('.parameter-Ay').val();
    var Az = $('.parameter-Az').val();
    var wx = $('.parameter-wx').val();
    var wy = $('.parameter-wy').val();
    var wz = $('.parameter-wz').val();
    
    curve.setA([Ax, Ay, Az]);
    curve.setW([wx, wy, wz]);
    
    animate();
    render();
  });
});
