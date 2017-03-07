Package.describe({
	name: 'faichenshing:bones',
	version: '0.0.1',
	// Brief, one-line summary of the package.
	summary: 'The complete, no-nonsense, semantic, layout sass framework.',
	// URL to the Git repository containing the source code for this package.
	git: '',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.4.1.1');
	// api.use('ecmascript');
	// api.mainModule('bones.js');

	api.use('fourseven:scss');
	api.addFiles([
		'_bones.scss',
		// 'custom-functions.scss.js'
	], 'client', {isImport: true});
});

Package.onTest(function(api) {
	// api.use('ecmascript');
	api.use('tinytest');
	api.use('bones');
	api.mainModule('bones-tests.js');
});
