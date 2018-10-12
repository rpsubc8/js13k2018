var kirby=[];
var columna=[];
var x=100,y=366,contSprite=0;
var suelo,carne;
var contEspera=3,contUp=10,contDown=10;
var scalc=0,ccalc=0;
var doUp=false,doDown=false;

function LoadSprites(){
 kirby[0]=load_bitmap("data:image/gif;base64,R0lGODlhFgATALMAAAAAADlC1mMIIbUAKdYAUt5Kc/dzpff39/8A//8YhP+l3v///////////////////yH5BAEAAAgALAAAAAAWABMAAAR/EMmJhL00Z6u6t9rmjV8oAWSqCCFgqB7KaiisGIc7Ty4s3ABZpudTFISU3iv1MwRWQ4O0sOwYBIlEZ3eSTqnS3/Ya5IG9lxGZQAAgAAPA2UufAhLsYN5Vpx/ZewRZCXJzBkcAgHEnWQqEQZBBA5OQPIOELWU0WW0mnm+anxQRAAA7");
 kirby[1]=load_bitmap("data:image/gif;base64,R0lGODlhEgASALMAAAAAADlC1mMIIXOUvbUAKdYAUt5Kc/dzpff39/8A//8YhP+l3v///////////////yH5BAEAAAkALAAAAAASABIAAARqMMkpqp2YisV7zdLWjZyQAWS6mBJwqAtglBMKIzZiunBsA7sXzGAzBHuHAOdwTCkUpGZH6FkwE7zRLEpsUQ2HsDgMqAErrnG4W3s+02sAgFBuFZ6Lgnxf6NNrdwplcwR9fnUtcmZ7cgMRAAA7");
 kirby[2]=load_bitmap("data:image/gif;base64,R0lGODlhEwARALMAAAAAADlC1mMIIbUAKdYAUt5Kc/dzpff39/8A//8YhP+l3v///////////////////yH5BAEAAAgALAAAAAATABEAAARqEMmJhL2Waqu674ImAV8JaoBhAkXHhhNpHjINI6mpADJvwDJTQTZUhIImQ6CjNOZMiQRUgGSWBIrWr2poXRVdAM6z5aUMaLR4xBMQotEzeoh6S6OE1HBNAdgJA4FmfCiDPASAhCI4hoQRAAA7");
 suelo=load_bitmap("data:image/gif;base64,R0lGODlhBAAFALMAAACtAFreUv///////////////////////////////////////////////////////ywAAAAABAAFAAAECBBIEKqtEs8IADs=");
 columna[0]=load_bitmap("data:image/gif;base64,R0lGODlhEAACALMAAIwQAP+lQv/nrf///////////////////////////////////////////////////ywAAAAAEAACAAAECxCEIIW9QlJdseURADs=");
 columna[1]=load_bitmap("data:image/gif;base64,R0lGODlhEAAHALMAAIwQAP8A//+lQv/nrf///////////////////////////////////////////////yH5BAEAAAEALAAAAAAQAAcAAAQhMEgJqp04VMF7zUAnelPoWSJAcZswDK1qCuFrz7Fr32wEADs=");
 carne=load_bitmap("data:image/gif;base64,R0lGODlhFgALALMAAAAAAKWlpd4YEOfn5/daIfelIffnIf8A/////////////////////////////////yH5BAEAAAcALAAAAAAWAAsAAARX8MhDSi22Ek3E/FZhhNkmnB+CSOTldpKKAOoAVCOGdQQwqADaYBC4cV4C4W+GCNg0IY2gR5w5A6yNlsfzHJzfgcRkmp46XuLncG67vevJac6ew+P4/CQCADs=");
}

function DibujaSuelo(bitmap){
 for(i=0;i<40;i++){
  stretch_blit(suelo,bitmap,0,0,suelo.w,suelo.h,i*16,440,(suelo.w*4),(suelo.h*4));
  stretch_blit(suelo,bitmap,0,0,suelo.w,suelo.h,i*16,460,(suelo.w*4),(suelo.h*4));
 }
}

function DibujaColumnas(bitmap){
 for(i=0;i<40;i++){
  stretch_blit(columna[0],bitmap,0,0,columna[0].w,columna[0].h,16,432-(i*8),(columna[0].w*4),(columna[0].h*4));
 } 
 stretch_blit(columna[1],bitmap,0,0,columna[1].w,columna[1].h,16,92,(columna[1].w*4),(columna[1].h*4)); 
 for(i=0;i<20;i++){
  stretch_blit(columna[0],bitmap,0,0,columna[0].w,columna[0].h,370,432-(i*8),(columna[0].w*4),(columna[0].h*4));
 } 
 stretch_blit(columna[1],bitmap,0,0,columna[1].w,columna[1].h,370,252,(columna[1].w*4),(columna[1].h*4));  
}

function overscan(bitmap){
 for(i=0;i<bitmap.h;i+=4){
  hline(bitmap,0,i,bitmap.w,makecol(0,0,0));
 }
}




function lissajous(bitmap){
 scalc+=0.01;
 ccalc+=0.02;
 var carneY=100+(Math.sin(scalc)*100);
 var carneX=200+(Math.sin(ccalc)*50);
 stretch_blit(carne,bitmap,0,0,carne.w,carne.h,carneX,carneY,(carne.w*4),(carne.h*4));
}

function animacion(bitmap){  
 stretch_blit(kirby[contSprite],bitmap,0,0,kirby[contSprite].w,kirby[contSprite].h,x,y,(kirby[contSprite].w*4),(kirby[contSprite].h*4));
 contEspera--;
 if (doUp==true){
  contUp--;
  y-=8;
  if (contUp<0){doUp=false;doDown=true;contUp=10;}
 }
 if (doDown==true){
  contDown--;
  y+=8;
  if(contDown<0){doDown=false;contDown=10;}	 
 } 
 if(contEspera<0){contSprite++;contEspera=3;}
 if(contSprite>2) contSprite=0;
 if(key[KEY_LEFT]) x-=4;
 if(key[KEY_RIGHT]) x+=4;
 if(key[KEY_UP]) doUp=true 
}

function main(){
 allegro_init_all("canvas_id",window.innerWidth,window.innerHeight);
 var auxcanvas=create_bitmap(640,480)
 LoadSprites();
 ready(function(){
  loop(function(){
   clear_to_color(auxcanvas,makecol(63,191,255));   
   DibujaSuelo(auxcanvas);
   DibujaColumnas(auxcanvas);
   lissajous(auxcanvas);
   animacion(auxcanvas);
   overscan(auxcanvas);   
   stretch_blit(auxcanvas,canvas,0,0,auxcanvas.w,auxcanvas.h,0,0,canvas.w,canvas.h);
  },BPS_TO_TIMER(60));
 }); 
 return 0;
 //remove_keyboard();
}
END_OF_MAIN();