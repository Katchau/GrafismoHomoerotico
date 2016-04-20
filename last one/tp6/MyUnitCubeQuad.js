/**
 * MyUnitCubeQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCubeQuad(scene, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);
	this.quad = new MyQuad(this.scene, minS, maxS, minT, maxT);
	this.quad.initBuffers();
	//this.initBuffers();
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function () {
	this.scene.pushMatrix();
	this.scene.pushMatrix();
	this.scene.pushMatrix();
	this.scene.pushMatrix();
	this.scene.pushMatrix();
	this.scene.pushMatrix();
	this.scene.popMatrix();
	this.scene.translate(0,0,0.5);
	this.quad.display();
	this.scene.popMatrix();
	this.scene.translate(0,0,-0.5);
	this.scene.rotate(180*Math.PI/180.0,0,1,0);
	this.quad.display();
	this.scene.popMatrix();
	this.scene.translate(0.5,0,0);
	this.scene.rotate(90*Math.PI/180.0,0,1,0);
	this.quad.display();
	this.scene.popMatrix();
	this.scene.translate(-0.5,0,0);
	this.scene.rotate(-90*Math.PI/180.0,0,1,0);
	this.quad.display();
	this.scene.popMatrix();
	this.scene.translate(0,0.5,0);
	this.scene.rotate(-90*Math.PI/180.0,1,0,0);
	this.quad.display();
	this.scene.popMatrix();
	this.scene.translate(0,-0.5,0);
	this.scene.rotate(90*Math.PI/180.0,1,0,0);
	this.quad.display();
	
};

/*
MyUnitCubeQuad.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
            -0.5, 0.5, 0,
            0.5, 0.5, 0
			];

	this.indices = [
            0, 1, 2, 
			3, 2, 1
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
*/