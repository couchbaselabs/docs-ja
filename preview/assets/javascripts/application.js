require(
	[
		'modules/navigation',
		'modules/globalheadersearch'
	],

	function(Navigation, GlobalHeaderSearch) {
		new Navigation();
		new GlobalHeaderSearch();

		var modules = document.body.getAttribute('data-modules');

		if (modules !== null) {
			modules = modules.trim();

			if (modules.length) {
				modules.split(' ').forEach(function(module) {
					require(['modules/' + module], function(Module) {
						new Module();
					});
				});
			}
		}
	}
);