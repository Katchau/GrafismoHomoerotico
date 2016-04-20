	/**
	 * MyClock
	 * @constructor
	 */
	 function MyClock(scene, slices, stacks) {
		CGFobject.call(this,scene);

		this.slices = slices;
		this.stacks = stacks;
		this.cilinder = new MyCilinder(this.scene, slices,stacks);
		this.cilinder.initBuffers();
		this.tamp = new MyTamp(this.scene, slices, stacks);
		this.tamp.initBuffers();
		this.memtempo = 0;
		this.secs = new MyClockHand(this.scene);
		this.secs.initBuffers();
		
		this.fatorAccel = 1;//para poder acelarar o relogio
		
		this.mins = new MyClockHand(this.scene);
		this.mins.initBuffers();
		
		this.horas = new MyClockHand(this.scene);
		this.horas.initBuffers();
		
		this.cilinderTex = new CGFappearance(this.scene);
		this.cilinderTex.loadTexture('..//resources//images//lol.png');
	
		this.clockTex = new CGFappearance(this.scene);
		this.clockTex.loadTexture('..//resources//images//clock.png');
		
		this.blackMaterial = new CGFappearance(this.scene);
		this.blackMaterial.setDiffuse(0,0,0,1);
		this.blackMaterial.setSpecular(0.1,0.1,0.1,1);
		this.blackMaterial.setShininess(10);
		
		this.whiteMaterial = new CGFappearance(this.scene);
		this.whiteMaterial.setDiffuse(0.3,0.3,0.3,1);
		this.whiteMaterial.setSpecular(0.1,0.1,0.1,1);
		this.whiteMaterial.setShininess(10);
		
		this.secs.setAngle(270);
		this.mins.setAngle(180);
		this.horas.setAngle(90);
	 };

	 MyClock.prototype = Object.create(CGFobject.prototype);
	 MyClock.prototype.constructor = MyClock;

	  MyClock.prototype.display = function () {
		  this.scene.pushMatrix();
		  this.cilinderTex.apply();
		  this.cilinder.display();
		  this.scene.popMatrix();
		  
		  this.scene.pushMatrix();
		  this.clockTex.apply();
		  this.tamp.display();
		  this.scene.popMatrix();
		  
		  this.scene.pushMatrix();
		  this.scene.translate(0,0,1.05);
		  this.scene.rotate(-this.secs.anglo*Math.PI/180,0,0,1);
		  this.whiteMaterial.apply();
		  this.secs.display();
		  this.scene.popMatrix();
		  
		  this.scene.pushMatrix();
		  this.scene.translate(0,0,1.05);
		  this.scene.rotate(-this.horas.anglo*Math.PI/180,0,0,1);
		  this.scene.scale(1,0.4,1);
		  this.blackMaterial.apply();
		  this.horas.display();
		  this.scene.popMatrix();
		  
		  this.scene.pushMatrix();
		  this.scene.translate(0,0,1.05);
		  this.scene.rotate(-this.mins.anglo*Math.PI/180,0,0,1);
		  this.scene.scale(1,0.7,1);
		  this.blackMaterial.apply();
		  this.mins.display();
		  this.scene.popMatrix();
	  };
	 
	MyClock.prototype.update = function(currTime) {
		this.time = currTime - this.memtempo;
		if(this.memtempo == 0)this.time = 0;
		this.memtempo = currTime;
		this.secs.setAngle(this.secs.anglo + 6*(this.time*0.001*this.fatorAccel)); //cada segundo 6 graus
		this.mins.setAngle(this.mins.anglo + 6/60*(this.time*0.001*this.fatorAccel)); // cada minuto 6 graus (cada 60 secs)
		this.horas.setAngle(this.horas.anglo + 30/(60*60)*(this.time*0.001*this.fatorAccel));//cada hora 30 graus (cada 60 minutos)
	};
	  