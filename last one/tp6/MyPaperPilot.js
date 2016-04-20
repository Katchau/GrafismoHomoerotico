	/**
	 * MyPaperPilot
	 * @constructor
	 */
	 function MyPaperPilot(scene) {
		CGFobject.call(this,scene);
		
		this.fatorAccel = 1;//para poder acelarar o relogio
		
		this.aviao = new MyPaperPlane(this.scene);
		this.aviao.initBuffers();
		
		this.avMaterial = new CGFappearance(this.scene);
		this.avMaterial.setDiffuse(0.3,0.3,0.3,1);
		this.avMaterial.setSpecular(0.1,0.1,0.1,1);
		this.avMaterial.setShininess(30);
		
		this.colidiu = 0;
		this.tempo = 0;
	 };

	 MyPaperPilot.prototype = Object.create(CGFobject.prototype);
	 MyPaperPilot.prototype.constructor = MyPaperPilot;

	  MyPaperPilot.prototype.display = function () {
		  this.scene.pushMatrix();
		  this.avMaterial.apply();
		  this.scene.translate(this.aviao.pos_x,this.aviao.pos_y,this.aviao.pos_z);
		  if(this.colidiu != 0)this.scene.rotate(Math.PI*this.aviao.angle/180,0,0,1);
		  this.scene.rotate(-Math.PI/2,0,1,0);
		  this.aviao.display();
		  this.scene.popMatrix();
		  
	  };
	 
	MyPaperPilot.prototype.update = function(currTime) {
		this.tempovar = currTime - this.tempo;
		if(this.tempo == 0){
			this.primeiravez = 1;
			this.tempovar = 0;
		}
		this.tempo = currTime;
		if(this.colidiu == 0)this.aviao.setPos(this.aviao.pos_x - (this.tempovar*0.015),this.aviao.pos_y + (this.tempovar*0.005),this.aviao.pos_z);
		if(this.aviao.pos_x-this.aviao.comprimento <= 0 && this.colidiu == 0){this.colidiu = 1;}
		if(this.colidiu == 1){
			this.aviao.setAngle(100);
			this.aviao.setPos(0,this.aviao.pos_y-(this.tempovar*0.003),this.aviao.pos_z);
		}
		if(this.colidiu == 1 && this.aviao.pos_y - this.aviao.comprimento < 0)
		{
			this.colidiu = 2;
		}
	};
	  