	/**
	 * MyClockHand
	 * @constructor
	 */
	 function MyClockHand(scene) {
		CGFobject.call(this,scene);

		this.initBuffers();
	 };

	 MyClockHand.prototype = Object.create(CGFobject.prototype);
	 MyClockHand.prototype.constructor = MyClockHand;

	 MyClockHand.prototype.initBuffers = function() {
		this.vertices = [
            -0.03, 0, 0,
            0.03, 0, 0,
            -0.03, 1, 0,
            0.03, 1, 0
			];

		this.indices = [
            0, 1, 2,
			3, 2, 1
			];
	//this.normals = new int[9];
		this.normals = [0,0,1,
				0,0,1,
				0,0,1,
				0,0,1];
				
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	 };
	 
	MyClockHand.prototype.setAngle = function(angle) {
		this.anglo = angle;
	};