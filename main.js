(()=>{"use strict";function t(t,e,n){!function(t,e,n){fetch(t).then((function(t){return t.ok?t.json():404===t.status?Promise.reject("Комикс не найден."):Promise.reject("Произошла ошибка. Попробуйте позже!")})).then((function(t){e(t)})).catch((function(t){n(t)}))}(t>0?"http://xkcd.com/".concat(t,"/info.0.json"):"http://xkcd.com/info.0.json",e,n)}var e,n=document.querySelector(".page"),o=n.querySelector(".comics__title"),i=n.querySelector(".comics__image"),c=n.querySelector(".comics__transcription"),r=n.querySelector(".comics__date"),a=n.querySelector(".navigation__button_position_first"),s=n.querySelector(".navigation__button_position_prev"),l=n.querySelector(".navigation__button_position_random"),u=n.querySelector(".navigation__button_position_next"),d=n.querySelector(".navigation__button_position_last");function _(t){o.textContent=t.title,i.src=t.img,i.alt=t.alt,c.textContent=t.transcript,r.textContent="".concat(t.day,".").concat(t.month,".").concat(t.year),Number(window.location.search.slice(1))!==t.num&&(window.location.search="?".concat(t.num)),b()}function m(t){o.textContent=t,i.src="",i.alt="",c.textContent="",r.textContent="",b()}function b(){a.toggleAttribute("disabled"),s.toggleAttribute("disabled"),l.toggleAttribute("disabled"),u.toggleAttribute("disabled"),d.toggleAttribute("disabled")}t(0,(function(t){e=t.num}),m),b(),Number(window.location.search.slice(1))?t(Number(window.location.search.slice(1)),_,m):window.location.search?m("Неправильно указан номер комикса!"):t(0,_,m),a.addEventListener("click",(function(){b(),t(1,_,m)})),s.addEventListener("click",(function(){Number(window.location.search.slice(1))>1?t(Number(window.location.search.slice(1))-1,_,m):m("Вы просматриваете первый комикс!"),b()})),l.addEventListener("click",(function(){t(Math.floor(Math.random()*e+1),_,m),b()})),u.addEventListener("click",(function(){Number(window.location.search.slice(1))<e?t(Number(window.location.search.slice(1))+1,_,m):m("Вы просматриваете последний комикс!"),b()})),d.addEventListener("click",(function(){b(),t(0,_,m)}))})();