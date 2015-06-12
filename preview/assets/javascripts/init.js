var BASEPATH;
if (!BASEPATH) {
	BASEPATH = '../';
}

(function(H){H.className=H.className.replace(/\bno-js\b/,'js')})(document.documentElement);

/* Added placeholder for GCSE */
window.__gcse = {
	callback: function() {
		var gcse_el = document.getElementById('gsc-i-id1');
		gcse_el.setAttribute('placeholder', 'Search Documentation');
	}
};

/* Load Vendor Things */
(function(d,t) {
	if ('querySelector' in d && 'addEventListener' in window) {
		r=d.createElement(t);s=d.querySelector(t);
		r.src=BASEPATH+'assets/javascripts/vendor/require.js';
		r.setAttribute('data-main', BASEPATH+'assets/javascripts/application');
		s.parentNode.insertBefore(r,s);
	}
})(document,'script');

/* Load Google Analytics */
/*
var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-7763794-10']);
  _gaq.push(['_setDomainName', '.couchbase.com']);
  _gaq.push(['_setAllowLinker', true]);
  _gaq.push(['_setAllowHash', false]);
  _gaq.push(['_trackPageview']);
  (function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
*/
