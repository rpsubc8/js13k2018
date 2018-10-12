var canvas;
var _gfx_installed=false;
var SCREEN_W=0;
var SCREEN_H=0;

var _loader_init_time;
var _ready_proc;

var _downloadables=[];
var _installed_timers=[];

var _keyboard_installed=false;
var KEY_A=0x41,KEY_B=0x42,KEY_C=0x43,KEY_D=0x44,KEY_E=0x45,KEY_F=0x46,KEY_G=0x47,KEY_H=0x48,KEY_I=0x49,KEY_J=0x4A,KEY_K=0x4B,KEY_L=0x4C,KEY_M=0x4D,KEY_N=0x4E,KEY_O=0x4F,KEY_P=0x50,KEY_Q=0x51,KEY_R=0x52,KEY_S=0x53,KEY_T=0x54,KEY_U=0x55,KEY_V=0x56,KEY_W=0x57,KEY_X=0x58,KEY_Y=0x59,KEY_Z=0x5A,KEY_0=0x30,KEY_1=0x31,KEY_2=0x32,KEY_3=0x33,KEY_4=0x34,KEY_5=0x35,KEY_6=0x36,KEY_7=0x37,KEY_8=0x38,KEY_9=0x39,KEY_0_PAD=0x60,KEY_1_PAD=0x61,KEY_2_PAD=0x62,KEY_3_PAD=0x63,KEY_4_PAD=0x64,KEY_5_PAD=0x65,KEY_6_PAD=0x66,KEY_7_PAD=0x67,KEY_8_PAD=0x68,KEY_9_PAD=0x69,KEY_F1=0x70,KEY_F2=0x71,KEY_F3=0x72,KEY_F4=0x73,KEY_F5=0x74,KEY_F6=0x75,KEY_F7=0x76,KEY_F8=0x77,KEY_F9=0x78,KEY_F10=0x79,KEY_F11=0x7a,KEY_F12=0x7b,KEY_ESC=0x1B,KEY_TILDE=0xc0,KEY_MINUS=0xbd,KEY_EQUALS=0xbb,KEY_BACKSPACE=0x08,KEY_TAB=0x09,KEY_OPENBRACE=0xdb,KEY_CLOSEBRACE=0xdd,KEY_ENTER=0x0D,KEY_COLON=0xba,KEY_QUOTE=0xde,KEY_BACKSLASH=0xdc,KEY_COMMA=0xbc,KEY_STOP=0xbe,KEY_SLASH=0xBF,KEY_SPACE=0x20,KEY_INSERT=0x2D,KEY_DEL=0x2E,KEY_HOME=0x24,KEY_END=0x23,KEY_PGUP=0x21,KEY_PGDN=0x22,KEY_LEFT=0x25,KEY_RIGHT=0x27,KEY_UP=0x26,KEY_DOWN=0x28,KEY_SLASH_PAD=0x6F,KEY_ASTERISK=0x6A,KEY_MINUS_PAD=0x6D,KEY_PLUS_PAD=0x6B,KEY_ENTER_PAD=0x0D,KEY_PRTSCR=0x2C,KEY_PAUSE=0x13,KEY_EQUALS_PAD=0x0C,KEY_LSHIFT=0x10,KEY_RSHIFT=0x10,KEY_LCONTROL=0x11,KEY_RCONTROL=0x11,KEY_ALT=0x12,KEY_ALTGR=0x12,KEY_LWIN=0x5b,KEY_RWIN=0x5c,KEY_MENU=0x5d,KEY_SCRLOCK=0x9d,KEY_NUMLOCK=0x90,KEY_CAPSLOCK=0x14;
var _default_enabled_keys=[KEY_F1,KEY_F2,KEY_F3,KEY_F4,KEY_F5,KEY_F6,KEY_F7,KEY_F8,KEY_F9,KEY_F10,KEY_F11,KEY_F12];
var _enabled_keys=[];
var key=[0x80];
var pressed=[];
var released=[];


function install_allegro(){if (!Date.now) Date.now=function now(){return new Date().getTime();};}

function allegro_init_all(id,w,h,menu,enable_keys){	
 install_allegro();
 set_gfx_mode(id,w,h);
 install_keyboard(enable_keys);
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

function create_bitmap(width,height){
 var cv=document.createElement('canvas');
 cv.width=width;
 cv.height=height;
 var ctx=cv.getContext("2d");
 return{w:width,h:height,canvas:cv,context:ctx,ready:true,type:"bmp"};
}

function putpixel(bitmap,x,y,colour){
 _fillstyle(bitmap,colour);
 bitmap.context.fillRect(x,y,1,1);
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



function install_keyboard(enable_keys){
 if(_keyboard_installed){return -1;}
 if(enable_keys){_enabled_keys=enable_keys;}else{_enabled_keys=_default_enabled_keys;}
 for (var c=0;c<0x80;c++){
  key[c]=false;
  pressed[c]=false;
  released[c]=false;
 }
 document.addEventListener('keyup',_keyup);
 document.addEventListener('keydown',_keydown);
 _keyboard_installed=true;
 return 0;
}

function remove_keyboard(){
 if (!_keyboard_installed){return -1;}
 document.removeEventListener('keyup',_keyup);
 document.removeEventListener('keydown',_keydown);
 _keyboard_installed=false;	
 return 0;
}

function _keydown(e){
 if (!key[e.keyCode]) pressed[e.keyCode]=true;
 key[e.keyCode]=true;
 if (_enabled_keys.indexOf(e.keyCode)==-1) e.preventDefault();
}

function _keyup(e){
 key[e.keyCode]=false;
 released[e.keyCode]=true;
 if (_enabled_keys.indexOf(e.keyCode)==-1) e.preventDefault();
}

function END_OF_MAIN(){window.addEventListener("load", main);}