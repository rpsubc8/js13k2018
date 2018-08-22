var canvas;
var _gfx_installed=false;
var SCREEN_W=0;
var SCREEN_H=0;

var _loader_init_time;
var _ready_proc;

var _downloadables=[];
var _installed_timers=[];


function install_allegro(){if (!Date.now) Date.now=function now(){return new Date().getTime();};}

function allegro_init_all(id,w,h,menu,enable_keys){	
 install_allegro();
 set_gfx_mode(id,w,h); 
}

function time(){return Date.now();}

function BPS_TO_TIMER(bps){return 1000/bps;}

function _progress_check(){ 
 var num_assets=0;
 var num_loaded=0;
 for (var c=0;c<_downloadables.length;c++){
  num_assets++;
  if (_downloadables[c].type=="snd"){
   if (_downloadables[c].element.readyState>=_downloadables[c].element.HAVE_FUTURE_DATA) _downloadables[c].ready=true;
  } 
  if (_downloadables[c].ready) num_loaded++;
 } 
 if (num_loaded<num_assets){
  window.setTimeout(_progress_check,100);
 }
 else{  
  _ready_proc();
 }
}

function _uberloop(){_loopproc();}

function ready(procedure,bar){
 _loader_init_time=time();
 _ready_proc=procedure;  
 window.setTimeout(_progress_check,100);
}

function loop(procedure,speed){
 _loopproc=procedure;
 var timer_id=window.setInterval(_uberloop,speed);	
}

function stretch_blit(source,dest,sx,sy,sw,sh,dx,dy,dw,dh){dest.context.drawImage(source.canvas,sx,sy,sw,sh,dx,dy,dw,dh);}

function hline(bitmap,x1,y,x2,colour,width){
 width=typeof width!=='undefined'?width:1;
 _fillstyle(bitmap,colour);
 bitmap.context.fillRect(x1,y-width/2,x2-x1,width);
}


function load_bitmap(filename){	
 var img=new Image();
 img.src=filename;
 var now=time();
 var cv=document.createElement('canvas');
 var ctx=cv.getContext("2d");
 var bmp={canvas:cv,context:ctx,w:-1,h:-1,ready:false,type:"bmp"};
 _downloadables.push(bmp);
 img.onload=function(){  
  bmp.canvas.width=img.width;
  bmp.canvas.height=img.height;
  bmp.context.drawImage(img,0,0);
  bmp.w=img.width;
  bmp.h=img.height;
  bmp.ready=true;
 };
 return bmp;
}



function set_gfx_mode(canvas_id,width,height){
 var cv = document.getElementById(canvas_id);
 if (!cv){return -1;}
 cv.width=width;
 cv.height=height;
 var ctx=cv.getContext("2d");
 SCREEN_W=width;
 SCREEN_H=height;
 canvas={w:width,h:height,canvas:cv,context:ctx,ready:true};
 //font=load_base64_font(_cartoon_woff);
 _gfx_installed=true;
 return 0;
}

function makecol(r,g,b,a){
 a=typeof a!=='undefined'?a:255;
 return (a<<24)|((r&0xff)<<16)|((g&0xff)<<8)|((b&0xff));
}

function getr(colour){return(colour>>16)&0xff;}
function getg(colour){return(colour>>8)&0xff;}
function getb(colour){return colour&0xff;}
function getaf(colour){return(colour>>>24)/255.0;}

function _fillstyle(bitmap,colour){
 bitmap.context.fillStyle='rgba('+getr(colour)+','+getg(colour)+','+getb(colour)+','+getaf(colour)+')';
}

function clear_to_color(bitmap,colour){
 bitmap.context.clearRect(0,0,bitmap.w,bitmap.h);
 _fillstyle(bitmap,colour);
 bitmap.context.fillRect(0,0,bitmap.w,bitmap.h);
}

function END_OF_MAIN(){window.addEventListener("load", main);}