(function(){
  var menu=document.querySelector('.mobile-menu');
  var nav=document.querySelector('.nav');
  if(menu&&nav){menu.addEventListener('click',function(){var open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open?'true':'false');});}
  var tabs=document.querySelectorAll('[data-tab]');
  for(var i=0;i<tabs.length;i++){tabs[i].addEventListener('click',function(){var id=this.getAttribute('data-tab');for(var j=0;j<tabs.length;j++){tabs[j].setAttribute('aria-selected','false');}this.setAttribute('aria-selected','true');var panels=document.querySelectorAll('.gallery-panel');for(var k=0;k<panels.length;k++){panels[k].classList.remove('active');}var panel=document.getElementById(id);if(panel){panel.classList.add('active');}});}
  var languagePanels=document.querySelectorAll('[data-language]');
  if(languagePanels.length){
    var params=new URLSearchParams(window.location.search);
    var requested=params.get('lang');
    var language=requested==='en'?'en':(requested==='tr'?'tr':((navigator.language||'tr').toLowerCase().indexOf('tr')===0?'tr':'en'));
    for(var p=0;p<languagePanels.length;p++){languagePanels[p].hidden=languagePanels[p].getAttribute('data-language')!==language;}
    document.documentElement.lang=language;
    var labels={'privacy.html':{en:'Privacy',tr:'Gizlilik'},'terms.html':{en:'Terms',tr:'Koşullar'},'refund.html':{en:'Refund Policy',tr:'İade'},'support.html':{en:'Support',tr:'Destek'},'data-deletion.html':{en:'Data Deletion',tr:'Veri Silme'}};
    var headerLinks=document.querySelectorAll('.site-header a');
    for(var h=0;h<headerLinks.length;h++){
      var link=headerLinks[h];
      if(link.hasAttribute('data-language-switch')){continue;}
      var destination=(link.getAttribute('href')||'').split('?')[0];
      if(destination==='tr/'||destination==='en/'){
        link.setAttribute('href',language+'/');
        if(!link.classList.contains('brand')){link.textContent=language==='en'?'Home':'Ana Sayfa';}
      }else if(labels[destination]){
        link.textContent=labels[destination][language];
        link.setAttribute('href',destination+'?lang='+language+'&v=3.1');
      }
    }
    var heading=document.querySelector('[data-language="'+language+'"] h1');
    if(heading){document.title='CozyTV+ '+heading.textContent;}
    var switches=document.querySelectorAll('[data-language-switch]');
    for(var s=0;s<switches.length;s++){switches[s].href=window.location.pathname+'?lang='+switches[s].getAttribute('data-language-switch')+'&v=3.1';}
  }
})();

