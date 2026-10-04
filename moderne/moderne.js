(function(){
  var A=document.getElementById('oeuvre'),S=document.getElementById('salete');
  if(!A||!S)return;
  var a=A.getContext('2d'),s=S.getContext('2d'),N,fini=false,dessine=false,dernier=null;
  var pct=document.getElementById('pct'),barre=document.getElementById('barre'),bravo=document.getElementById('bravo');
  var C={vert:'#2F5D50',brique:'#9C3B22',sable:'#D4CA87',creme:'#F3EDD3',bleu:'#24506B',noir:'#3A1A0E'};
  function etoile(c,x,y,r,f,st){c.beginPath();for(var i=0;i<16;i++){var ang=Math.PI/8*i-Math.PI/2,rr=i%2?r*.62:r;c.lineTo(x+Math.cos(ang)*rr,y+Math.sin(ang)*rr);}c.closePath();c.fillStyle=f;c.fill();if(st){c.strokeStyle=st;c.lineWidth=r*.07;c.stroke();}}
  function zellige(){
    a.fillStyle=C.creme;a.fillRect(0,0,N,N);
    var n=4,t=N/n;
    for(var i=0;i<=n;i++)for(var j=0;j<=n;j++){
      var x=i*t,y=j*t;
      a.save();a.translate(x,y);a.rotate(Math.PI/4);a.fillStyle=(i+j)%2?C.vert:C.bleu;a.fillRect(-t*.36,-t*.36,t*.72,t*.72);a.restore();
      etoile(a,x,y,t*.42,C.brique,C.noir);etoile(a,x,y,t*.22,C.sable,C.noir);
      a.beginPath();a.arc(x,y,t*.07,0,7);a.fillStyle=C.vert;a.fill();
      if(i<n&&j<n){etoile(a,x+t/2,y+t/2,t*.2,C.sable,C.noir);a.beginPath();a.arc(x+t/2,y+t/2,t*.08,0,7);a.fillStyle=C.brique;a.fill();}
    }
    a.strokeStyle='rgba(58,26,14,.35)';a.lineWidth=N*.004;
    for(var k=0;k<=n*2;k++){a.beginPath();a.moveTo(k*t/2,0);a.lineTo(k*t/2,N);a.stroke();}
  }
  function crasse(){
    s.globalCompositeOperation='source-over';
    var g=s.createLinearGradient(0,0,N,N);g.addColorStop(0,'#5C4632');g.addColorStop(.5,'#6E5639');g.addColorStop(1,'#4B3726');
    s.fillStyle=g;s.fillRect(0,0,N,N);
    for(var i=0;i<2600;i++){s.fillStyle='rgba('+(30+Math.random()*60|0)+','+(20+Math.random()*40|0)+',10,'+(Math.random()*.22)+')';var r=Math.random()*N*.016;s.beginPath();s.arc(Math.random()*N,Math.random()*N,r,0,7);s.fill();}
    s.strokeStyle='rgba(25,14,6,.55)';s.lineWidth=Math.max(1,N*.003);
    for(var c=0;c<7;c++){s.beginPath();var x=Math.random()*N,y=Math.random()*N;s.moveTo(x,y);for(var p=0;p<8;p++){x+=(Math.random()-.5)*N*.12;y+=(Math.random()-.5)*N*.12;s.lineTo(x,y);}s.stroke();}
    s.fillStyle='rgba(240,230,212,.85)';s.font='600 '+Math.round(N*.04)+'px "Hanken Grotesk",Arial';s.textAlign='center';s.fillText('Passez le doigt pour nettoyer',N/2,N/2);
  }
  function taille(){
    var r=S.getBoundingClientRect(),d=Math.min(window.devicePixelRatio||1,2);N=Math.round(r.width*d);
    A.width=S.width=A.height=S.height=N;zellige();crasse();fini=false;maj(0);bravo.classList.remove('on');
  }
  function pos(e){var r=S.getBoundingClientRect();return{x:(e.clientX-r.left)/r.width*N,y:(e.clientY-r.top)/r.height*N};}
  function frotter(p){
    s.globalCompositeOperation='destination-out';var R=N*.055;
    s.lineCap='round';s.lineWidth=R*2;s.strokeStyle='rgba(0,0,0,1)';
    s.beginPath();if(dernier){s.moveTo(dernier.x,dernier.y)}else{s.moveTo(p.x-.1,p.y)}s.lineTo(p.x,p.y);s.stroke();dernier=p;
  }
  function mesurer(){
    var d=s.getImageData(0,0,N,N).data,vide=0,tot=0;
    for(var i=3;i<d.length;i+=4*37){tot++;if(d[i]<40)vide++;}
    return Math.round(vide/tot*100);
  }
  function maj(v){pct.textContent='Surface restaurée : '+v+' %';barre.style.width=v+'%';}
  var att=null;
  function planifier(){if(att)return;att=setTimeout(function(){att=null;var v=mesurer();if(v>=85&&!fini){fini=true;s.clearRect(0,0,N,N);v=100;bravo.classList.add('on');}maj(v);},180);}
  S.addEventListener('pointerdown',function(e){dessine=true;dernier=null;S.setPointerCapture(e.pointerId);frotter(pos(e));planifier();});
  S.addEventListener('pointermove',function(e){if(!dessine)return;frotter(pos(e));planifier();});
  ['pointerup','pointercancel','pointerleave'].forEach(function(t){S.addEventListener(t,function(){dessine=false;dernier=null;});});
  document.getElementById('recommencer').addEventListener('click',taille);
  var rt;addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){var r=S.getBoundingClientRect();if(Math.abs(r.width*Math.min(devicePixelRatio||1,2)-N)>20)taille();},250);});
  if(document.fonts&&document.fonts.ready){document.fonts.ready.then(taille)}else taille();
})();
