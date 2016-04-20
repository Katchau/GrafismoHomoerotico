	/**
	 * MyCilinder
	 * @constructor
	 */
	 function MyCilinder(scene, slices, stacks) {
		CGFobject.call(this,scene);

		this.slices = slices;
		this.stacks = stacks;
	  this.ang = Math.PI * 2 / this.slices;

		this.initBuffers();
	 };

	 MyCilinder.prototype = Object.create(CGFobject.prototype);
	 MyCilinder.prototype.constructor = MyCilinder;

	 MyCilinder.prototype.initBuffers = function() {
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
	  var tamanhovetor = 0;
	 
	  for(j=0;j<this.stacks;j++)
	  {

			for (i = 0; i < this.slices; i++) {
			
			this.vertices.push(Math.cos(this.ang * i), Math.sin(this.ang * i), j/this.stacks);
			this.texCoords.push((i)/this.slices,(j)/this.stacks);
			this.vertices.push(Math.cos(this.ang * i), Math.sin(this.ang * i), (j+1)/this.stacks);
			this.texCoords.push((i)/this.slices,((j+1))/this.stacks);
		  }
		  for (i = 0; i < this.slices*2 - 2; i += 2) {
			this.indices.push(i + 1 + tamanhovetor, i+ tamanhovetor, i + tamanhovetor + 2);
			this.indices.push(i + tamanhovetor + 2, i + 3 + tamanhovetor, i + 1 + tamanhovetor);
		  } 
		  this.indices.push(i + tamanhovetor+ 1, i + tamanhovetor, tamanhovetor);
		  this.indices.push(tamanhovetor, tamanhovetor+1, i + tamanhovetor + 1);
		  
		  tamanhovetor += this.slices*2;
		  
		  for(i = 0;i<this.slices;i++)
		  {
			  this.normals.push(Math.cos(this.ang * i),Math.sin(this.ang * i),0);
			  this.normals.push(Math.cos(this.ang * i),Math.sin(this.ang * i),0);
		  }
		  
		  
	  }
	  

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	 };