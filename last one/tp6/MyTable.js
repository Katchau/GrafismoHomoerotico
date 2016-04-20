/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);
	this.cube = new MyUnitCubeQuad(this.scene,0,1,0,1);

	this.tableHeight = 3.5;

	this.tableTopLength = 5;
	this.tableTopHeight = 0.3;
	this.tableTopWidth = 3;

	this.tableLegLength = 0.3;
	this.tableLegWidth = 0.3;

	this.legTranslateX = this.tableTopLength * 0.5 - this.tableLegLength * 0.5;
	this.legTranslateY = this.tableHeight * 0.5;
	this.legTranslateZ = this.tableTopWidth * 0.5 - this.tableLegWidth * 0.5;

	//this.materialDefault = new CGFappearance(this);
	this.tableAppearance = new CGFappearance(this.scene);
	this.tableAppearance.setAmbient(0.58,0.43,0.2,1);
	this.tableAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.tableAppearance.setSpecular(0.2,0.2,0.2,1);
	this.tableAppearance.setShininess(30);
	this.tableAppearance.loadTexture('..//resources//images//table.png');

	this.materialLeg = new CGFappearance(this.scene);
	this.materialLeg.setAmbient(0.25,0.25,0.25,1);
	this.materialLeg.setDiffuse(0.25,0.25,0.25,1);
	this.materialLeg.setSpecular(0.7,0.7,0.7,1);
	this.materialLeg.setShininess(120);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {
	// tampo da mesa
	this.scene.pushMatrix();
	this.scene.translate(0, this.tableHeight + this.tableTopHeight * 0.5, 0);
	this.scene.scale(this.tableTopLength, this.tableTopHeight, this.tableTopWidth);
	this.tableAppearance.apply();
	this.cube.display();
	this.scene.popMatrix();

	// pernas da mesa
	this.scene.pushMatrix();
	this.scene.translate(this.legTranslateX, this.legTranslateY, this.legTranslateZ);
	this.scene.scale(this.tableLegLength, this.tableHeight, this.tableLegWidth);
	this.materialLeg.apply();
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(this.legTranslateX, this.legTranslateY, -this.legTranslateZ);
	this.scene.scale(this.tableLegLength, this.tableHeight, this.tableLegWidth);
	this.materialLeg.apply();
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-this.legTranslateX, this.legTranslateY, this.legTranslateZ);
	this.scene.scale(this.tableLegLength, this.tableHeight, this.tableLegWidth);
	this.materialLeg.apply();
	this.cube.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-this.legTranslateX, this.legTranslateY, -this.legTranslateZ);
	this.scene.scale(this.tableLegLength, this.tableHeight, this.tableLegWidth);
	this.materialLeg.apply();
	this.cube.display();
	this.scene.popMatrix();
};
