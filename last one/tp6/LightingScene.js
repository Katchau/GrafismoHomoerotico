var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.update = function(currTime) {
	this.clock.update(currTime);
	this.aviao.update(currTime);
};

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.enableTextures(true);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new MyQuad(this,0,5,0,5);
	this.leftwall = new MyQuad(this,-0.5,1.5,-0.5,1.5);
	this.floor = new MyQuad(this,0,10,0,12);
	this.clock = new MyClock(this,12,1);
	this.cilinder = new MyCilinder(this,80,20);
	this.aviao = new MyPaperPilot(this);
	this.drone = new MyDrone(this);
	this.lamp = new MyLamp(this,80,80);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS,-0.5,2,0,1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS,0,1,0,1);

	// Materials
	this.materialDefault = new CGFappearance(this);

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);
	this.slidesAppearance.setShininess(10);
	this.slidesAppearance.loadTexture('..//resources//images//slides.png');
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	
	this.boardAppearance = new CGFappearance(this,0,1,0,1);
	this.boardAppearance.setAmbient(1,1,1,1);
	this.boardAppearance.setDiffuse(0.4,0.4,0.4,1);
	this.boardAppearance.setSpecular(0.5,0.5,0.5,1);
	this.boardAppearance.setShininess(200);
	this.boardAppearance.loadTexture('..//resources//images//board.png');
	this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	
	this.cilinderTex = new CGFappearance(this);
	this.cilinderTex.loadTexture('..//resources//images//lol.png');
	
	this.materialWall = new CGFappearance(this);
	// this.materialWall.setAmbient(1,0.41,0.7,1);
	// this.materialWall.setDiffuse(1,0.41,0.7,1);
	// this.materialWall.setSpecular(0,0,0,1);
	// this.materialWall.setShininess(120);
	this.materialWall.loadTexture('..//resources//images//parede.png');
	this.materialWall.setTextureWrap('REPEAT', 'REPEAT');
	
	this.windowAppearance = new CGFappearance(this);
/* 	this.windowAppearance.setAmbient(1,0.41,0.7,1);
	this.windowAppearance.setDiffuse(1,0.41,0.7,1);
	this.windowAppearance.setSpecular(0,0,0,1);
	this.windowAppearance.setShininess(120);  */
	this.windowAppearance.loadTexture('..//resources//images//window.png');
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	
	this.floorAppearance = new CGFappearance(this);
/* 	this.floorAppearance.setAmbient(0.7,0.3,0.5,1);
	this.floorAppearance.setDiffuse(0.7,0.3,0.5,1);
	this.floorAppearance.setSpecular(0,0,0,1); */
	//this.floorAppearance.setShininess(30);
	this.floorAppearance.loadTexture('..//resources//images//floor.png');
	this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT');
	
	this.setUpdatePeriod(1);
	
	this.option1 = true; this.option2 = false; this.speed = 3;
};

LightingScene.prototype.doSomething = function(){console.log("Doing something. . .");};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 1.0);

	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)

	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)

	this.lights[4].setPosition(0.5, 4.0, 7.5, 1.0);
	this.lights[4].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0,0,1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0,1.0,1.0);
	this.lights[2].setConstantAttenuation(0.0);
	this.lights[2].setLinearAttenuation(0.2);
	this.lights[2].setQuadraticAttenuation(0.0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0,0,1.0);
	this.lights[3].setConstantAttenuation(0.0);
	this.lights[3].setLinearAttenuation(0.0);
	this.lights[3].setQuadraticAttenuation(0.2);
	this.lights[3].enable();
	
	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1.0, 1.0,0,1.0);
	this.lights[4].enable();
	
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
};


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup


	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.leftwall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.materialWall.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);

		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();


	//pila(res)
	this.pushMatrix();
	this.translate(7.25,7.3,0);
	this.scale(0.7,0.7,0.5);
	this.clock.display();
	this.popMatrix();

	this.pushMatrix();
	this.translate(6,2,2);
	this.scale(1,2,1);
	this.rotate(Math.PI/2,1,0,0);
	this.cilinderTex.apply();
	this.cilinder.display();
	this.popMatrix();

	//lamp
	this.pushMatrix();
	this.translate(8,8,8);
	//this.scale(0.5,2,0.5);
	this.rotate(Math.PI/2,1,0,0);
	this.lamp.display();
	this.popMatrix();
	
	//drone
	this.pushMatrix();
	//this.translate(8.5,4,7);
	this.translate(8.5,4,8);
	this.rotate(-Math.PI/2,0,1,0);
	this.drone.display();
	this.popMatrix();
	
	//abiao
	this.pushMatrix();
	this.aviao.display();
	this.popMatrix();

	// ---- END Primitive drawing section
};
