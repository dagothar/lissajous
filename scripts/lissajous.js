var Lissajous = (function() {
  
  function Lissajous(A, w, p) {
    
    //var A[3] = { 1.0, 1.0, 1.0 };
    //var w[3] = { 1.0, 1.0, 1.0 };
    //var p[3] = { 0.0, 0.0, 0.0 };
    var A = A, w = w, p = p;
    
    
    this.calculate = function(t) {
      return {
        x: A[0] * Math.sin(2*Math.PI*w[0]*t + p[0]),
        y: A[1] * Math.sin(2*Math.PI*w[1]*t + p[1]),
        z: A[2] * Math.sin(2*Math.PI*w[2]*t + p[2])
      };
    };
    
    
    this.render = function(scene, renderer) {
      var material = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: 3 });
      var geometry = new THREE.Geometry();
      
      for (var t = 0.0; t <= 2*Math.PI; t += 0.01) {
        var p = this.calculate(t);
        geometry.vertices.push(new THREE.Vector3(p.x, p.y, p.z));
      }
      
      var line = new THREE.Line(geometry, material);
    
      scene.add(line);
    };
    
  };
  
  
  return Lissajous;
} ());
