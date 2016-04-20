	/**
	 * MyTamp
	 * @constructor
	 */
	 function MyTamp(scene, slices, stacks) {
		CGFobject.call(this,scene);

		this.slices = slices;
		this.stacks = stacks;
	  this.ang = Math.PI * 2 / this.slices;

		this.initBuffers();
	 };

	 MyTamp.prototype = Object.create(CGFobject.prototype);
	 MyTamp.prototype.constructor = MyTamp;

	 MyTamp.prototype.initBuffers = function() {
		/*
		* TODO:
		* Replace the following lines in order to build a prism with a **single mesh**.
		*
		* How can the vertices, indices and normals arrays be defined to
		* build a prism with varying number of slices and stacks?
		*/

	  this.vertices = [];
	  this.indices = [];
	  this.normals = [];
	  this.texCoords = [];

	  var i;
	  var j;
	  
	  this.vertices.push(0,0,1);
	  this.texCoords.push(0.5,0.5);
	  this.normals.push(0,0,1);
	  j=this.slices;
	  for(i=0;i<=this.slices;i++)
	  {
		  this.vertices.push(Math.cos(this.ang * i), Math.sin(this.ang * i),1);
		  this.normals.push(0,0,1);
		  this.texCoords.push(Math.cos(this.ang * j)*0.5+0.5,Math.sin(this.ang * j)*0.5+0.5);
		  j-=1;
	  }
	  
	  for(i = 0;i<=this.slices;i++){
			this.indices.push(0,i,i+1);
	  }
	  

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	 };