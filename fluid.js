/**
 * Fluid.js is a fluid simulation library that allow you to simulate fluid
 * in JS for your games or demos
 * @param {[type]} parameters [description]
 */
function Fluid(parameters) {

  // public functions
  this.addParticle = function() {

  };

  this.update = function() {
    updateFluidMap();
  };

  this.gizmo = function(ctx) {
    var fluidmapSize = fluidmap.length;
    for (var i = 0; i < fluidmapSize; i += 2) {
     
      var x = (i / 2) % fluidmapWidth;
      var y = ((i / 2) / fluidmapHeight) | 0;

      ctx.beginPath();
      ctx.moveTo(x * 10, y * 10);
      ctx.lineTo(x * 10 + fluidmap[i], y  * 10 + fluidmap[i + 1]);
      ctx.stroke();
    }
  };

  // private functions
  var fluidmap = null;
  var fluidmapWidth = 40;
  var fluidmapHeight = 30;
    
  // note fluidmapFriction + fluidmapNeighbour should be equal to 1.0
  var fluidmapFriction = 0.8;
  var fluidmapNeighbour = 0.1;

  createFluidMap();

  // DEBUG
  fluidmap[300] = 20;
  fluidmap[301] = 15;
  function createFluidMap() {
    // todo replace with float Array
    if (Float32Array) {
      fluidmap = new Float32Array(fluidmapWidth * fluidmapHeight * 2);
    } else {
      fluidmap = new Array(fluidmapWidth * fluidmapHeight * 2);
    }
  }

  // update the fluidmap
  function updateFluidMap() {
    var newFluidMap = null;

    if (Float32Array) {
      newFluidMap = new Float32Array(fluidmapWidth * fluidmapHeight * 2);
    } else {
      newFluidMap = new Array(fluidmapWidth * fluidmapHeight * 2);
    }

    var fluidmapSize = fluidmap.length;
    for (var i = 0; i < fluidmapSize; i += 2) {
      var finalValueX = fluidmap[i] * fluidmapFriction;
      var finalValueY = fluidmap[i + 1] * fluidmapFriction;
     
      var x = (i / 2) % fluidmapWidth;
      var y = ((i / 2) / fluidmapHeight) | 0;

      if (x > 0) {
        finalValueX += fluidmap[i - 2] * fluidmapNeighbour;
      }
      if (x < fluidmapWidth - 1) {
        finalValueX += fluidmap[i + 2] * fluidmapNeighbour;
      }

      if (y > 0) {
        finalValueY += fluidmap[i - fluidmapWidth * 2 + 1] * fluidmapNeighbour;
      }
      if (y < fluidmapHeight - 1) {
        finalValueY += fluidmap[i + fluidmapWidth * 2 + 1] * fluidmapNeighbour;
      }

      newFluidMap[i] = finalValueX;
      newFluidMap[i + 1] = finalValueY;
    }

    fluidmap = newFluidMap;
  }
}