	/**
	 * MyPaperPlane
	 * @constructor
	 */
	 function MyPaperPlane(scene) {
		CGFobject.call(this,scene);

		this.pos_x = 12;
		this.pos_y = 4;
		this.pos_z = 8;
		this.comprimento = 1;
		this.initBuffers();
	 };

	 MyPaperPlane.prototype = Object.create(CGFobject.prototype);
	 MyPaperPlane.prototype.constructor = MyPaperPlane;

	 MyPaperPlane.prototype.initBuffers = function() {
		this.vertices = [
            0, 0, 0,
			0,-0.2, 0,
			0, 0, 0.75,
			0, 0, 0,
			0, -0.2, 0,
			0, 0, 0.75,
			0.5, 0, 0,
			-0.5, 0, 0,
			0, 0, this.comprimento,
			0, 0, 0,
			0, 0.2, 0,
			0, 0, 0.2,
			0, 0, 0,
			0, 0, 0.2,
			0, 0.2, 0,
			0.5, 0, 0,
			-0.5, 0, 0,
			0, 0, this.comprimento
			];

		this.indices = [
            0, 1, 2,
			3, 5, 4,
			6, 7, 8,
			9, 10, 11,
			12, 13, 14,
			15,17,16
			];
	//this.normals = new int[9];
		this.normals = [
		-1, 0, 0,
		-1, 0, 0,
		-1, 0, 0,
		1, 0, 0,
		1, 0, 0,
		1, 0, 0,
		0, 1, 0,
		0, 1, 0,
		0, 1, 0,
		1, 0, 0,
		1, 0, 0,
		1, 0, 0,
		-1, 0, 0,
		-1, 0, 0,
		-1, 0, 0,
		0, -1, 0,
		0, -1, 0,
		0, -1, 0
		]
		
				
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	 };
	 
	MyPaperPlane.prototype.setPos = function(x,y,z) {
		this.pos_x = x;
		this.pos_y = y;
		this.pos_z = z;
	};
	
	MyPaperPlane.prototype.setAngle = function(angle) {
		this.angle = angle;
	};