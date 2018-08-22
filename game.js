var x=100,y=400,contSprite=0;

function overscan(){
 for(i=0;i<canvas.h;i+=4){
  hline(canvas,0,i,canvas.w,makecol(0,0,0));
 }
}

function update(){
 for(j=0;j<4;j++){
  for(i=0;i<5;i++){
   stretch_blit(logo,canvas,0,0,logo.w,logo.h,(i*100),(j*100),(logo.w*4),(logo.h*4));
  }
 }
}

function animacion(){  
 if(contSprite<3){stretch_blit(logo,canvas,0,0,logo.w,logo.h,x,y,(logo.w*4),(logo.h*4));}
 else{
  if(contSprite<6){stretch_blit(logo02,canvas,0,0,logo.w,logo.h,x,y,(logo02.w*4),(logo02.h*4));}
  else{
   if(contSprite<9){stretch_blit(logo03,canvas,0,0,logo.w,logo.h,x,y,(logo03.w*4),(logo03.h*4));} 
  }
 }
 contSprite++;
 if (contSprite>=9){contSprite=0;}
 x+=4;
 if(x>(canvas.w)){x=0;}
}

function main(){ 
 allegro_init_all("canvas_id",640,480);
 logo=load_bitmap("datos/kirbi01.gif");
 logo02=load_bitmap("datos/kirbi02.gif");
 logo03=load_bitmap("datos/kirbi03.gif");
 ready(function(){
  loop(function(){
   clear_to_color(canvas,makecol(0,0,0));
   update();
   animacion();
   overscan();
  },BPS_TO_TIMER(60));
 });
 return 0;
}
END_OF_MAIN();