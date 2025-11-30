document.getElementById('toggleNavSideMenu').addEventListener('click', async () => {
	await window.customElements.whenDefined('k-side-menu');
	document.getElementById('navSideMenu').toggle();
});
document.addEventListener('click', function(e) {
	if (e.target.matches('a[href^="#"]')) {
		e.preventDefault();
		const targetId = e.target.getAttribute('href').replace('#', '');
		const target = document.getElementById(targetId);
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' });
			const url = window.location.pathname + window.location.search + '#' + targetId;
			history.replaceState(null, '', url);
			document.getElementById('navSideMenu').close();
		}
	}
});

/*
  Fixed Nav Shadow on Scroll
*/
const fixedNav = document.querySelector('nav.fixed');
if(fixedNav){
	const updateNavShadow = () => {
		if(window.scrollY > 0){
			fixedNav.classList.add('scrolled');
		} else {
			fixedNav.classList.remove('scrolled');
		}
	};
	window.addEventListener('scroll', updateNavShadow, { passive: true });
	updateNavShadow();
}