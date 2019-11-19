'use strict';class Termynal{constructor(container='#termynal',options={}){this.container=(typeof container==='string')?document.querySelector(container):container;this.pfx=`data-${options.prefix||'ty'}`;this.startDelay=options.startDelay||600;this.typeDelay=options.typeDelay||90;this.lineDelay=options.lineDelay||1500;this.progressLength=options.progressLength||40;this.progressChar=options.progressChar||'█';this.progressPercent=options.progressPercent||100;this.showPercent=options.showPercent=='true';this.onExitCommand=options.onExitCommand;this.cursor=options.cursor||'▋';if(!options.noInit)this.init()}
init(){this.lines=[...this.container.querySelectorAll(`[${this.pfx}]`)].concat(this.lineData);const containerStyle=getComputedStyle(this.container);this.container.style.width=containerStyle.width!=='0px'?containerStyle.width:undefined;this.container.style.minHeight=containerStyle.height!=='0px'?containerStyle.height:undefined;this.container.setAttribute('data-termynal','');this.container.innerHTML='';this.start();}
async start(){await this._wait(this.startDelay);for(let line of this.lines){if(typeof line==='undefined'){break}
const type=line.getAttribute(this.pfx);const delay=line.getAttribute(`${this.pfx}-delay`)||this.lineDelay;if(type=='input'){line.setAttribute(`${this.pfx}-cursor`,this.cursor);await this.type(line);await this._wait(delay);if(line.textContent==='exit'&&typeof this.onExitCommand!=='undefined'){this.onExitCommand()}}
else if(type=='progress'){await this.progress(line);await this._wait(delay);}
else{this.container.appendChild(line);await this._wait(delay);}
line.removeAttribute(`${this.pfx}-cursor`);}}
async type(line){const chars=[...line.textContent];const delay=line.getAttribute(`${this.pfx}-typeDelay`)||this.typeDelay;line.textContent='';this.container.appendChild(line);for(let char of chars){await this._wait(delay);line.textContent+=char;}}
async progress(line){const progressLength=line.getAttribute(`${this.pfx}-progressLength`)||this.progressLength;const progressChar=line.getAttribute(`${this.pfx}-progressChar`)||this.progressChar;const chars=progressChar.repeat(progressLength);const progressPercent=line.getAttribute(`${this.pfx}-progressPercent`)||this.progressPercent;line.textContent='';this.container.appendChild(line);for(let i=1;i<chars.length+1;i++){await this._wait(this.typeDelay);const percent=Math.round(i/chars.length*100);line.textContent=`${chars.slice(0,i)}`;if(this.showPercent){line.textContent+=` ${percent}%`}
if(percent>progressPercent){break;}}}
_wait(time){return new Promise(resolve=>setTimeout(resolve,time));}}
;
(function(){var ANIMATION_TIME=500
var $=document.querySelector.bind(document),$$=document.querySelectorAll.bind(document),modal,modalBoxes=$$('.modal-box'),openLinks=$$('.gallery-modal-link'),closeLinks=$$('.close')
function openModal(){modalBoxes.forEach(function(box){box.classList.add('scale-in-center')
box.classList.remove('scale-out-center')})}
function closeModal(){modalBoxes.forEach(function(box){box.classList.remove('scale-in-center')
box.classList.add('scale-out-center')
setTimeout(function(){modal.classList.remove('active')},ANIMATION_TIME)})}
function open(modalElement){modal=modalElement
modal.classList.add('active')
openModal()
var term=$(`#term-${modal.getAttribute('id')}`)
if(term!==null&&typeof terms[modal.getAttribute('id')]==='undefined'){var termOptions=JSON.parse('{"lineDelay":250,"progressChar":"★","progressLength":14,"showPercent":"true","startDelay":800,"typeDelay":30}')
termOptions.onExitCommand=function(){term.classList.add('scale-out-center')
setTimeout(function(){$(`#content-${modal.getAttribute('id')}`).removeAttribute("hidden")
term.setAttribute("hidden",true)},ANIMATION_TIME+10)}
terms[modal.getAttribute('id')]=new Termynal(term,termOptions)}}
var terms={};openLinks.forEach(function(link){link.onclick=function(e){e.preventDefault()
open($(e.target.getAttribute('href')))}
const loc=window.location.href
const seg=loc.substring(loc.lastIndexOf('/')+1)
if(link.getAttribute('href')==seg){$("#work").scrollIntoView()
open($(link.getAttribute('href')))}})
closeLinks.forEach(function(link){link.onclick=function(e){e.preventDefault()
closeModal()}})
window.onclick=function(e){if(e.target===modal){closeModal()}}
document.onkeydown=function(e){if(e.key==='Escape'){closeModal()}}})()