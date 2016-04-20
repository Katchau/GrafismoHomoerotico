	/**
	 * MyPrism
	 * @constructor
	 */
	 function MyPrism(scene, slices, stacks) {
		CGFobject.call(this,scene);

		this.slices = slices;
		this.stacks = stacks;
	  this.ang = Math.PI * 2 / this.slices;

		this.initBuffers();
	 };

	 MyPrism.prototype = Object.create(CGFobject.prototype);
	 MyPrism.prototype.constructor = MyPrism;

	 MyPrism.prototype.initBuffers = function() {
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

	  var i;
	  var j;
	  
	  
	  for(j=0;j<this.stacks+1;j++)
	  {
			for (i = this.slices; i > 0; i--) {
			
			this.vertices.push(Math.cos(this.ang * i), Math.sin(this.ang * i), j/this.stacks);
			this.vertices.push(Math.cos(this.ang * (i+1)), Math.sin(this.ang * (i+1)), j/this.stacks);
		  } 
		  for(i = this.slices;i > 0;i--){
			this.normals.push(Math.cos(this.ang * i + this.ang*0.5),Math.sin(this.ang * i + this.ang*0.5),0);
			this.normals.push(Math.cos(this.ang * i + this.ang*0.5),Math.sin(this.ang * i + this.ang*0.5),0);
		  }
		  
	  }
	
	  for(j=0;j<this.stacks;j++)
	  {
		  for(i = 0;i < this.slices;i++)
		  {
			  this.indices.push(((j*this.slices)+i)*2,1+((j*this.slices)+i)*2,(((j+1)*this.slices)+i)*2);
			  this.indices.push(1+((j*this.slices)+i)*2,1+(((j+1)*this.slices)+i)*2,(((j+1)*this.slices)+i)*2);
		  }
	  }
	  
	  
	  /*
	  var tamanhovetor = 0;
	 
	  for(j=0;j<this.stacks;j++)
	  {
			for (i = 0; i < this.slices; i++) {
			
			this.vertices.push(Math.cos(this.ang * i), Math.sin(this.ang * i), j/this.stacks);
			this.vertices.push(Math.cos(this.ang * (i+1)), Math.sin(this.ang * (i+1)), j/this.stacks);
			this.vertices.push(Math.cos(this.ang * i), Math.sin(this.ang * i), (j+1)/this.stacks);
			this.vertices.push(Math.cos(this.ang * (i+1)), Math.sin(this.ang * (i+1)), (j+1)/this.stacks);
		  }
		 
		  for (i = 0; i < this.slices ; i++) {
			this.indices.push((i + tamanhovetor),1+(i + tamanhovetor), (i + tamanhovetor) + 2);
			this.indices.push((i + tamanhovetor)+1, 3+ (i + tamanhovetor),2 + (i + tamanhovetor));
		  } 
	
		this.indices.push(i + tamanhovetor+ 1, i + tamanhovetor, tamanhovetor);
		  this.indices.push(tamanhovetor, tamanhovetor+1, i + tamanhovetor + 1);
	 
		  tamanhovetor += this.slices*2;
		  
		  for(i = 0;i<this.slices;i++)
		  {
			this.normals.push(Math.cos(this.ang * i - this.ang*0.5),Math.sin(this.ang * i - this.ang*0.5),0);
			this.normals.push(Math.cos(this.ang *(i+1) - this.ang*0.5),Math.sin(this.ang *(i+1) - this.ang*0.5),0);
			this.normals.push(Math.cos(this.ang * i - this.ang*0.5),Math.sin(this.ang * i - this.ang*0.5),0);
			this.normals.push(Math.cos(this.ang *(i+1) - this.ang*0.5),Math.sin(this.ang *(i+1) - this.ang*0.5),0);
		  }
		  
		  
	  }
	*/
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	 };