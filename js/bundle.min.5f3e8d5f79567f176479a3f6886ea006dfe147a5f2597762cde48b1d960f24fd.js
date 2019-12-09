var $=document.querySelector.bind(document),$$=document.querySelectorAll.bind(document)
function setVisibility(e,visible){e.classList.add(visible?'show':'hide')
e.classList.remove(visible?'hide':'show')
if(visible){e.style.visibility="visible"
e.removeAttribute("hidden")}else{e.style.visibility="hidden"
e.setAttribute("hidden",true)}}
function onLogoClick(){}
document.addEventListener('DOMContentLoaded',function(){const ITEMS=[...$$(".nav-item")]
const SECTIONS=[...$$("main > section")].reverse()
const THRESHOLD=340
var oldIdx=-1
window.addEventListener("scroll",()=>{const idx=SECTIONS.length-SECTIONS.findIndex((sec)=>window.scrollY>sec.offsetTop-THRESHOLD)-1
if(idx!=oldIdx){ITEMS.forEach((itm)=>itm.classList.remove("nav-item-active"))
ITEMS[idx].classList.add("nav-item-active")
oldIdx=idx}});},false);;'use strict';class Termynal{constructor(container='#termynal',options={}){this.container=(typeof container==='string')?document.querySelector(container):container;this.pfx=`data-${options.prefix||'ty'}`;this.startDelay=options.startdelay||800;this.typeDelay=options.typedelay||30;this.lineDelay=options.linedelay||250;this.progressLength=options.progresslength||14;this.progressChar=options.progresschar||'★';this.progressPercent=options.progressPercent||100;this.showPercent=("showpercent"in options&&options.showpercent)||(!"showpercent"in options&&true);this.onExitCommand=options.onExitCommand;this.cursor=options.cursor||'▋';if(!options.noInit)this.init()}
init(){this.lines=[...this.container.querySelectorAll(`[${this.pfx}]`)].concat(this.lineData);const containerStyle=getComputedStyle(this.container);this.container.style.width=containerStyle.width!=='0px'?containerStyle.width:undefined;this.container.style.minHeight=containerStyle.height!=='0px'?containerStyle.height:undefined;this.container.setAttribute('data-termynal','');this.container.innerHTML='';this.start();}
async start(){await this._wait(this.startDelay);for(let line of this.lines){if(typeof line==='undefined'){break}
const type=line.getAttribute(this.pfx);const delay=line.getAttribute(`${this.pfx}-delay`)||this.lineDelay;if(type=='input'){line.setAttribute(`${this.pfx}-cursor`,this.cursor);await this.type(line);await this._wait(delay);if(line.textContent==='exit'&&typeof this.onExitCommand!=='undefined'){this.onExitCommand()}}
else if(type=='progress'){await this.progress(line);await this._wait(delay);}
else{this.container.appendChild(line);await this._wait(delay);}
line.removeAttribute(`${this.pfx}-cursor`);}}
async type(line){const chars=[...line.textContent];const delay=line.getAttribute(`${this.pfx}-typeDelay`)||this.typeDelay;line.textContent='';this.container.appendChild(line);for(let char of chars){await this._wait(delay);line.textContent+=char;}}
async progress(line){const progressLength=line.getAttribute(`${this.pfx}-progressLength`)||this.progressLength;const progressChar=line.getAttribute(`${this.pfx}-progressChar`)||this.progressChar;const chars=progressChar.repeat(progressLength);const progressPercent=line.getAttribute(`${this.pfx}-progressPercent`)||this.progressPercent;line.textContent='';this.container.appendChild(line);for(let i=1;i<chars.length+1;i++){await this._wait(this.typeDelay);const percent=Math.round(i/chars.length*100);line.textContent=`${chars.slice(0,i)}`;if(this.showPercent){line.textContent+=` ${percent}%`}
if(percent>progressPercent){break;}}}
_wait(time){return new Promise(resolve=>setTimeout(resolve,time));}};(function(){var ANIMATION_TIME=500
var modal,modalBoxes=$$('.modal-box'),openLinks=$$('.gallery-modal-link'),closeLinks=$$('.close')
function openModal(){modalBoxes.forEach(function(box){box.classList.add('scale-in-center')
box.classList.remove('scale-out-center')})}
function closeModal(){modalBoxes.forEach(function(box){box.classList.remove('scale-in-center')
box.classList.add('scale-out-center')
setTimeout(function(){modal.classList.remove('active')},ANIMATION_TIME)})}
var terms={};var termOptions={};termOptions["osprey-delight"]=JSON.parse('{"progresschar":"█","showpercent":true}')
termOptions["kd"]=JSON.parse('{"showpercent":false}')
function open(modalElement){modal=modalElement
modal.classList.add('active')
openModal()
var termKey=modal.getAttribute('id').replace('modal-','')
var term=$(`#term-${termKey}`)
if(term!==null&&typeof terms[termKey]==='undefined'){var options=termOptions[termKey]
options.onExitCommand=function(){term.classList.add('scale-out-center')
setTimeout(function(){$(`#content-${termKey}`).removeAttribute("hidden")
term.setAttribute("hidden",true)},ANIMATION_TIME+10)}
terms[termKey]=new Termynal(term,options)}}
openLinks.forEach(function(link){link.onclick=function(e){e.preventDefault()
open($(`#modal-${e.target.getAttribute('href').substr(1)}`))}
const loc=window.location.href
const seg=loc.substring(loc.lastIndexOf('/')+1)
if(link.getAttribute('href')==seg){open($(`#modal-${link.getAttribute('href').substr(1)}`))}})
closeLinks.forEach(function(link){link.onclick=function(e){e.preventDefault()
closeModal()}})
window.onclick=function(e){if(e.target===modal){closeModal()}}
document.onkeydown=function(e){if(e.key==='Escape'){closeModal()}}})();(function(){menuActive=false
var nav=$('nav')
window.onscroll=function(){var scrollPosition=window.pageYOffset||document.documentElement.scrollTop,windowHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,navHeight=nav.clientHeight
if(scrollPosition>windowHeight-navHeight){nav.classList.add('nav-fixed')
nav.classList.add('nav-shadow')
$$('nav > .logo, nav > .nav-toggle').forEach(function(el){el.style.visibility='visible'
el.classList.add('show')
el.classList.remove('hide')})}else{nav.classList.remove('nav-fixed')
nav.classList.remove('nav-shadow')
$$('nav > .logo, nav > .nav-toggle').forEach(function(el){el.style.visibility='hidden'
el.classList.add('hide')
el.classList.remove('show')})}}
function toggle(){if(menuActive){$('#open').classList.remove('icon-active')
menuActive=false}else{$('#open').classList.add('icon-active')
menuActive=true}}
$('.nav-icon').addEventListener('click',function(){toggle()
$$('.nav-full, main').forEach(function(el){el.classList.toggle('active')})})
$$('.nav-full a').forEach(function(links){links.addEventListener('click',function(){toggle()
$$('.nav-full, main').forEach(function(el){el.classList.toggle('active')})})})
$('.logo').addEventListener('click',function(){toggle()
if($('.nav-full').classList.contains('active')){$$('.nav-full, main').forEach(function(el){el.classList.toggle('active')})}})
$('body').addEventListener('click',function(){if($('.nav-full').classList.contains('active')){$('html').style.overflowY='hidden'}else{$('html').style.overflowY='scroll'}})
function fullMobileViewport(){var element=this,viewportHeight=window.innerHeight,heightChangeTolerance=100
$(window).resize(function(){if(Math.abs(viewportHeight-window.innerHeight)>heightChangeTolerance){viewportHeight=window.innerHeight
update()}})
function update(){element.style.height=(viewportHeight+'px')}
update()}
$$('header').forEach(function(){fullMobileViewport})})();(function(){var realmsg=$('textarea[name=message2]')
var honeypotmsg=$('textarea[name=message]')
setVisibility(realmsg,true)
setVisibility(honeypotmsg,false)
honeypotmsg.removeAttribute("required")
$('#form-contact').addEventListener('submit',function(e){e.preventDefault()
var name=$('input[name=name]').value,email=$('input[name=email]').value,subject=$('input[name=_subject]').value,matter=$('select[name=matter]').value
message=realmsg.value,honeypot=honeypotmsg.value
var request=new XMLHttpRequest(),data={name:name,_replyto:email,email:email,_subject:subject,_matter:matter,message:message,}
if(honeypot!==""){data._anti_spam_honeypot=honeypot}
var sending=$('#form-sending'),submit=$('#form-submit'),thanks=$('#form-thankyou'),error=$('#form-error')
setVisibility(submit,false)
setVisibility(sending,true)
request.open('POST','https://usebasin.com/f/6f0f30b84119',true)
request.setRequestHeader('Content-Type','application/json')
request.setRequestHeader('Accept','application/json')
request.onreadystatechange=function(){if(request.readyState===XMLHttpRequest.DONE){if(request.status===200){$('#form-contact').reset()
function thankYouFadeIn(){setVisibility(sending,false)
setVisibility(thanks,true)
setTimeout(thankYouFadeOut,6000)};function thankYouFadeOut(){setVisibility(thanks,false)
setVisibility(submit,true)};thankYouFadeIn()}else{$('#form-contact').reset()
setVisibility(error,true)}}}
request.send(JSON.stringify(data))})})()