(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('ouvert');b.setAttribute('aria-expanded',o)});
  document.querySelectorAll('.form-demo').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var c=f.querySelector('.confirm');c.textContent=f.dataset.msg;c.classList.add('on');f.reset();});});
})();
