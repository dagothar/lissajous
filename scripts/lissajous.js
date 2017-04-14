var Lissajous = (function() {
  
  function Lissajous(params) {
    
    var Ax = params['Ax'];
    var wx = params['wx'];
    var px = params['px'];
    var Ay = params['Ay'];
    var wy = params['wy'];
    var py = params['py'];
    var Az = params['Az'];
    var wz = params['wz'];
    var pz = params['pz'];
    
    var material = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 3 });
    
    
    this.getAx = function() { return Ax; };
    this.setAx = function(v) { Ax = v; };    
    
    this.x = function(t) {
      return {
        x: Ax * Math.sin(2*Math.PI*wx*t + px),
        y: Ay * Math.sin(2*Math.PI*wy*t + py),
        z: Az * Math.sin(2*Math.PI*wz*t + pz)
      };
    };
    
    
    this.render = function(scene, renderer) {
      var geometry = new THREE.Geometry();
      
      for (var t = 0.0; t <= 2*Math.PI; t += 0.001) {
        var p = this.x(t);
        geometry.vertices.push(new THREE.Vector3(p.x, p.y, p.z));
      }
      
      var line = new THREE.Line(geometry, material);
      line.name = "curve";
    
      scene.add(line);
    };
    
  };
  
  
  return Lissajous;
} ());
