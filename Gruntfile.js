module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  // Load grunt tasks automagically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    // Project settings
    yeoman: {
      //Where to build the final theme
      dist: 'assets'
    },

    // JAVASCRIPT

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      app: [
        'Gruntfile.js',
        'assets/js/_*.js',
        '!assets/js/modernizr.js',
        '!assets/js/scripts.min.js'
      ]
    },

    // Uglify scripts
    uglify: {
      app: {
        files: {
          'assets/js/scripts.min.js': [
            // Here you can choose which boostrap's plugins to include
            //'bower_components/bootstrap/js/transition.js',
            //'bower_components/bootstrap/js/alert.js',
            //'bower_components/bootstrap/js/button.js',
            //'bower_components/bootstrap/js/carousel.js',
            //'bower_components/bootstrap/js/collapse.js',
            //'bower_components/bootstrap/js/dropdown.js',
            //'bower_components/bootstrap/js/modal.js',
            //'bower_components/bootstrap/js/tooltip.js',
            //'bower_components/bootstrap/js/popover.js',
            //'bower_components/bootstrap/js/scrollspy.js',
            //'bower_components/bootstrap/js/tab.js',
            //'bower_components/bootstrap/js/affix.js',

            // Your js code to be uglified. Order matters.
            'assets/js/plugins/*.js',
            'assets/js/_*.js'
          ]
        }
      }
    },
    
    // CSS
   // Less compilation
    less: {
      app: {
        files: {
          'assets/css/main.css': [
            'assets/less/main.less'
          ]
        },
        options: {
          compress: true, // remove some spaces
          // LESS source map
          // To enable, set sourceMap to true and update sourceMapRootpath based on your install
          sourceMap: false,
          //sourceMapFilename: 'assets/css/main.css.map',
          //sourceMapRootpath: '/app/themes/metro/'
        }
      }
    },

    // CSS-autoprefixer
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      app: {
        files: [{
          expand: true,
          cwd: 'assets/css',
          src: 'main.css',
          dest: 'assets/css'
        }]
      }
    },

    // CSS minification
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/css/main.css': [
            'assets/css/main.css'
          ]
        }
      }
    },

    version: {
      options: {
        file: 'lib/scripts.php',
        css: 'assets/css/main.css',
        cssHandle: 'roots_styles',
        js: 'assets/js/scripts.min.js',
        jsHandle: 'roots_scripts'
      }
    },
   // Modernizr minimal custom build
    modernizr: {
      devFile: 'bower_components/modernizr/modernizr.js',
      outputFile: '<%= yeoman.dist %>/bower_components/modernizr/modernizr.js',
      files: [
        'assets/js/{,*/}*.js',
        'assets/css/{,*/}*.css'
      ],
      uglify: true
    },

    // WATCH DAEMON
    // Automatic tasks

    watch: {
      less: {
        files: [
          'assets/less/{,*/}*.less'
        ],
        tasks: [
          'less',
          'newer:autoprefixer',
          'newer:version'
        ]
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['newer:jshint:app']
      },
      js: {
        files: [
          'assets/js/{,*/}*.js',
          '!assets/js/scripts.min.js'
          
        ],
        tasks: [
          'newer:jshint:app',
          'newer:uglify',
          'uglify',
          'newer:version'
        ]
      },
      
      // Files that trigger a livereload event
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'assets/css/main.css',
          'assets/js/scripts.min.js',
          'assets/img/{,*/}*.{png,jpg,jpeg,gif,svg,webp}',
          'templates/*.php',
          'lib/*.php',
          '*.php'
        ]
      }
    },

    // Empties folders to start fresh
    //clean: {
    //  options: {
    //    // force is needed in case of deleting files outside the root directory
    //    force: true
    //  },
    //  dist: [
    //    '<%= yeoman.dist %>'
    //  ]
    //},

  });

  /*****************************************************************************
   *  TASKS REGISTERING
   */

  // Internal tasks, usually not called from grunt CLI

  // Compiles sass/less files to CSS and add vendor prefixes
  grunt.registerTask('compile-css', [
    'less:app',
    'newer:autoprefixer'
  ]);


  // Unit-testing the app
  grunt.registerTask('test', [
    'app'
  ]);


  // Public tasks

  grunt.registerTask('default', [
    'dist'
  ]);

  // Watch task
  grunt.registerTask('serve', [
    'app',
    'watch'
  ]);

  // Building the app version
  grunt.registerTask('app', [
    'newer:jshint',
    'newer:uglify',
    'compile-css',
    'version'
  ]);

  // Building the dist version
  grunt.registerTask('dist', [
    'test',
    'cssmin'	
  ]);

  // Aliases

  grunt.registerTask('server', function () {
    grunt.log.writeln('You should use `watch` task instead.');
    grunt.log.warn('`server` will soon be deprecated !');
    grunt.task.run(['watch']);
  });

  grunt.registerTask('build', function () {
    grunt.log.writeln('You can also use `dist` task.');
    grunt.task.run(['dist']);
  });

};
