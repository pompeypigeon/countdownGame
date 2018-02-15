/*'use strict'
//draw clock face.
var cnv = document.querySelector('#clock'),
	ctx = cnv.getContext("2d");

//face
ctx.beginPath();
ctx.arc(150,150,149,0,2*Math.PI);
ctx.fillStyle = 'lightgoldenrodyellow';
ctx.stroke();
ctx.fill();

ctx.beginPath();
ctx.moveTo(150,0);
ctx.lineTo(150,300);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(0,150);
ctx.lineTo(300,150);
ctx.stroke();

ctx.beginPath();
ctx.arc(150,150,10,0,2*Math.PI);
ctx.fillStyle = 'darkblue';
ctx.fill();




//second hand
ctx.beginPath();
ctx.moveTo(150,0);
ctx.lineTo(160,150);
ctx.lineTo(140,150);
ctx.fillStyle = 'darkblue';
ctx.fill();

ctx.beginPath();*/
