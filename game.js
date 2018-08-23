//prueba
var kirby=[];
var columna=[];
var x=100,y=366,contSprite=0;
var suelo;
var carne;
var contEspera=3;
var scalc=0;
var ccalc=0;

function LoadSprites(){
 kirby[0]=load_bitmap("datos/kirbi00.gif");
 kirby[1]=load_bitmap("datos/kirbi01.gif");
 kirby[2]=load_bitmap("datos/kirbi02.gif");
 suelo=load_bitmap("datos/suelo.gif");
 columna[0]=load_bitmap("datos/columna00.gif");
 columna[1]=load_bitmap("datos/columna01.gif");
 carne=load_bitmap("datos/carne.gif");
}

function DibujaSuelo(){
 for(i=0;i<40;i++){
  stretch_blit(suelo,canvas,0,0,suelo.w,suelo.h,i*16,440,(suelo.w*4),(suelo.h*4));
  stretch_blit(suelo,canvas,0,0,suelo.w,suelo.h,i*16,460,(suelo.w*4),(suelo.h*4));
 }
}

function DibujaColumnas(){
 for(i=0;i<40;i++){
  stretch_blit(columna[0],canvas,0,0,columna[0].w,columna[0].h,16,432-(i*8),(columna[0].w*4),(columna[0].h*4));
 } 
 stretch_blit(columna[1],canvas,0,0,columna[1].w,columna[1].h,16,92,(columna[1].w*4),(columna[1].h*4)); 
 for(i=0;i<20;i++){
  stretch_blit(columna[0],canvas,0,0,columna[0].w,columna[0].h,370,432-(i*8),(columna[0].w*4),(columna[0].h*4));
 } 
 stretch_blit(columna[1],canvas,0,0,columna[1].w,columna[1].h,370,252,(columna[1].w*4),(columna[1].h*4));  
}

function overscan(){
 for(i=0;i<canvas.h;i+=4){
  hline(canvas,0,i,canvas.w,makecol(0,0,0));
 }
}




function lissajous(){
 scalc += 0.01;
 ccalc += 0.02;
 var carneY = 100 + (Math.sin(scalc) * 100);
 var carneX = 200 + (Math.sin(ccalc) * 50);
 stretch_blit(carne,canvas,0,0,carne.w,carne.h,carneX,carneY,(carne.w*4),(carne.h*4));
}

function animacion(){  
 stretch_blit(kirby[contSprite],canvas,0,0,kirby[contSprite].w,kirby[contSprite].h,x,y,(kirby[contSprite].w*4),(kirby[contSprite].h*4));
 contEspera--;
 if(contEspera<0){
  contSprite++;
  contEspera=3;
 }
 if(contSprite>2) contSprite=0;
 if(key[KEY_LEFT]) x-=4;
 if(key[KEY_RIGHT]) x+=4;
 if(key[KEY_UP]) y-=4;
 if(key[KEY_DOWN]) y+=4; 
}

function main(){ 
 allegro_init_all("canvas_id",640,480);
 LoadSprites();
 ready(function(){
  loop(function(){
   clear_to_color(canvas,makecol(63,191,255));   
   DibujaSuelo();
   DibujaColumnas();
   lissajous();
   animacion();
   overscan();
  },BPS_TO_TIMER(60));
 });
 return 0;
}
END_OF_MAIN();