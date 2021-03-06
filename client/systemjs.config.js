/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': '/app', // 'dist',

        '@angular': '/node_modules/@angular',
        //'@angular/router': 'node_modules/@angular/router/router.umd.js',
        'rxjs': '/node_modules/rxjs',
        'dragula': '/node_modules/dragula/dist/dragula.js',
        'ng2-dragula': '/node_modules/ng2-dragula',
        'ng2-toasty': '/node_modules/ng2-toasty/bundles/index.umd.js',
        
        'ng2-dnd': '/node_modules/ng2-dnd/bundles/index.umd.js',
        '@qontu/ngx-inline-editor': '/node_modules/@qontu/ngx-inline-editor/ngx-inline-editor.umd.js',
        'moment': '/node_modules/moment/moment.js',
        'ngx-bootstrap': '/node_modules/ngx-bootstrap/bundles/ngx-bootstrap.umd.js',
        'ngx-color-picker': '/node_modules/ngx-color-picker',
        'ng2-pdf-viewer': '/node_modules/ng2-pdf-viewer',
        'pdfjs-dist': '/node_modules/pdfjs-dist',
        'ng2-file-upload': '/node_modules/ng2-file-upload'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { main: 'Rx.js', defaultExtension: 'js' },
        'dragula': { defaultExtension: "js" },
        'ng2-dragula': { defaultExtension: "js" },
        'ng2-toasty': { defaultExtension: "js" },
        'ngx-color-picker': { main: 'bundles/ngx-color-picker.umd.js', defaultExtension: 'js' },
        'ng2-pdf-viewer': { main: 'dist/index.js', defaultExtension: 'js' },
        'pdfjs-dist': { defaultExtension: 'js' },
        'ng2-file-upload': { main: 'ng2-file-upload.js', defaultExtension: 'js' }
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade',
    ];

    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }

    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }

    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);

    // No umd for router yet
    //packages['@angular/router'] = { main: 'index.js', defaultExtension: 'js' };

    var config = {
        map: map,
        packages: packages,
       // transpiler: 'es6-module-transpiler'
    };

    System.config(config);

})(this);
