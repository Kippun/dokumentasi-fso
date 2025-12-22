(function(){
	jtd.onReady(function(){
		var btn = document.getElementById('theme-toggle');
		if (!btn) return;

		var saved = null;
		try { saved = localStorage.getItem('jtd-theme'); } catch(e) { saved = null; }
		if (saved) {
			try { jtd.setTheme(saved); } catch(e) {}
		}

		function getCurrent() {
			try { return jtd.getTheme(); } catch(e) { return 'default'; }
		}

		function updateButton(theme) {
			// switch the icon inside the button (sun for light/default, moon for dark)
			var img = btn.querySelector('img#theme-toggle-icon');
			var sun = '{{ "/assets/images/logo/sun.svg" | relative_url }}';
			var moon = '{{ "/assets/images/logo/moon.svg" | relative_url }}';
			if (!img) {
				img = document.createElement('img');
				img.id = 'theme-toggle-icon';
				img.width = 20;
				img.height = 20;
				btn.appendChild(img);
			}
			if (theme === 'dark') {
				img.setAttribute('src', moon);
				img.setAttribute('alt', 'Dark theme');
				btn.setAttribute('aria-pressed', 'true');
			} else {
				img.setAttribute('src', sun);
				img.setAttribute('alt', 'Light theme');
				btn.setAttribute('aria-pressed', 'false');
			}
		}

		updateButton(getCurrent());

		btn.addEventListener('click', function(){
			var cur = getCurrent();
			var next = cur === 'dark' ? 'default' : 'dark';
			try { jtd.setTheme(next); } catch(e) {}
			try { localStorage.setItem('jtd-theme', next); } catch(e) {}
			updateButton(next);
		});

		// Make "Edit this page on GitHub" link open in a new tab
		var editLink = document.querySelector('a[href*="github.com"][href*="edit"]');
		if (editLink) {
			editLink.setAttribute('target', '_blank');
			editLink.setAttribute('rel', 'noopener noreferrer');
		}
	});
})();

