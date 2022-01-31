var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
}


function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});


window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded');
		}, 0);
	}
});

let unlock = true;

//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================
//Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});

// Карта
if ('map') {
	ymaps.ready(init);

	function init() {
		var map = new ymaps.Map("map", {
			center: [50.39381957305294, 30.489799999999985],
			zoom: 16
		});

		let placemark1 = new ymaps.Placemark([50.39381957305294, 30.489799999999985], {
			balloonContentHeader: 'Киев',
			balloonContentBody: "ул.Васильковская, 30",
			hintContent: "Васильковская, 30"
		}, {
			iconLayout: 'default#image',
			iconImageHref: 'img/icons/pin.png',
			iconImageSize: [40, 40],
			iconImageOffset: [-50, -75]
		});

		map.controls.remove('geolocationControl'); // удаляем геолокацию
		map.controls.remove('searchControl'); // удаляем поиск
		map.controls.remove('trafficControl'); // удаляем контроль трафика
		map.controls.remove('typeSelector'); // удаляем тип
		map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
		// map.controls.remove('zoomControl'); // удаляем контрол зуммирования
		map.controls.remove('rulerControl'); // удаляем контрол правил
		map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

		map.geoObjects.add(placemark1);

	}
}


//========================================================================================================================================================
//Добавление класса _active странице с выбранным языком
document.addEventListener('DOMContentLoaded', (e) => {
	const wrapper_data = document.querySelector('.wrapper');
	const page_lang_ru = document.querySelector('.top-header__lang_ru');
	const page_lang_ua = document.querySelector('.top-header__lang_ua');

	if (wrapper_data.dataset.lang == 'ru') {
		if (page_lang_ua.classList.contains('_active')) {
			page_lang_ua.classList.remove('_active')
		}
		page_lang_ru.classList.add('_active');
	}

	if (wrapper_data.dataset.lang == 'ua') {
		if (page_lang_ru.classList.contains('_active')) {
			page_lang_ru.classList.remove('_active')
		}
		page_lang_ua.classList.add('_active');
	}
})



if ('.license-main__slider') {
	var slider_team = new Swiper('.license-main__slider', {
		observer: true,
		observeParents: true,
		spaceBetween: 20,
		speed: 800,
		//Отключаем предзагрузку картинок
		preloadImages: false,
		lazy: {
			// Подгружаем на старте переключения слайда
			loadOnTransitionStart: false,
			// Подгрузить следующую и предыдущую картинки
			loadPrevNext: false,
		},
		// Следим за видимыми слайдами
		watchSlidesProgress: true,
		// Добавление класса видимым слайдам
		watchSlidexVisibility: true,

		// Arrows
		navigation: {
			nextEl: ".license-main__arrow-next",
			prevEl: ".license-main__arrow-prev",
		},

		breakpoints: {
			320: {
				slidesPerView: 2,
			},

			415: {
				slidesPerView: 3,
			},
		},
	});
}
