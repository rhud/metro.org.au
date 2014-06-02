'use strict';
module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  // Load grunt tasks automagically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    // Project settings
    yeoman: {
      // Where to build the final theme
      dist: '../metro'
    },

    // JAVASCRIPT

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      app: [
        'Gruntfile.js',
        '!assets/js/main.js'
      ]
    },

    coffeelint: {
      options: {
        // TODO : Find a way to dump .coffeelintrc
        'max_line_length': {
          name: 'max_line_length',
          value: 80,
          level: 'warn',
          limitComments: true
        }
      },
      app: [
        'assets/coffee/{,*/}*.{coffee,litcoffee,coffee.md}'
      ],
      test: [
        'test/spec/coffee/*.{coffee,litcoffee,coffee.md}'
      ]
    },
    // Uglify scripts
    uglify: {
      app: {
        files: {
          'assets/js/main.js': [
            // Here you can choose which boostrap's plugins to include
            'bower_components/bootstrap/js/transition.js',
            //'bower_components/bootstrap/js/alert.js',
            'bower_components/bootstrap/js/button.js',
            //'bower_components/bootstrap/js/carousel.js',
            //'bower_components/bootstrap/js/collapse.js',
            'bower_components/bootstrap/js/dropdown.js',
            //'bower_components/bootstrap/js/modal.js',
            //'bower_components/bootstrap/js/tooltip.js',
            //'bower_components/bootstrap/js/popover.js',
            //'bower_components/bootstrap/js/scrollspy.js',
            //'bower_components/bootstrap/js/tab.js',
            //'bower_components/bootstrap/js/affix.js',

            // Your js code to be uglified. Order matters.
            'assets/js/h5bpshim.js',
            'assets/js/plugins/jquery-plugin.js',
            'assets/js/app.js'
          ]
        },
        options: {
          // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
          // sourceMap: 'assets/js/main.js.map',
          // sourceMappingURL: '/app/themes/metro/assets/js/main.js.map'
        }
      }
    },
    // Compiles CoffeeScript to JavaScript
    coffee: {
      options: {
        bare: true,
        join: false,
        sourceMap: false,
        separator: '\n'
      },
      app: {
        files: [{
          expand: true,
          cwd: 'assets/coffee',
          src: '{,*/}*.{coffee,litcoffee,coffee.md}',
          dest: 'assets/js',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec/coffee',
          src: '*.{coffee,litcoffee,coffee.md}',
          dest: 'test/spec',
          ext: '.js'
        }]
      }
    },
   // Server for tests
    connect: {
      test: {
        options: {
          port: 9001,
          // Change this to '0.0.0.0' to access the server from outside
          livereload: 35729,
          hostname: 'localhost',
          base: [
            '.',
            'test'
          ]
        }
      }
    },

    // Mocha testing framework configuration options
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
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
          sourceMap: true,
          sourceMapFilename: 'assets/css/main.css.map',
          sourceMapRootpath: '/app/themes/metro/'
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
          '<%= yeoman.dist %>/assets/css/main.css': [
            'assets/css/main.css'
          ]
        }
      }
    },

    // IMAGES
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/img',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= yeoman.dist %>/assets/img'
        }, {
          expand: true,
          cwd: '.',
          src: '*.{gif,jpeg,jpg,png}',
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/img',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/assets/img'
        }]
      }
    },
    version: {
      options: {
        file: 'lib/scripts.php',
        css: 'assets/css/main.css',
        cssHandle: 'roots_styles',
        js: 'assets/js/main.js',
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
          '!assets/js/main.js'
        ],
        tasks: [
          'newer:jshint:app',
          'newer:uglify',
          'mocha',
          'uglify',
          'newer:version'
        ]
      },
      coffee: {
        files: ['assets/coffee/{,*/}*.{coffee,litcoffee,coffee.md}'],
        tasks: [
          'newer:coffeelint:app',
          'newer:coffee:app',
          'mocha',
          'uglify',
          'newer:version'
        ]
      },
      coffeetest: {
        files: ['test/spec/coffee/*.{coffee,litcoffee,coffee.md}'],
        tasks: [
          'newer:coffeelint:test',
          'newer:coffee:test',
          'mocha'
        ]
      },
      // Files that trigger a livereload event
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'assets/css/main.css',
          'assets/js/main.js',
          'assets/img/{,*/}*.{png,jpg,jpeg,gif,svg,webp}',
          'templates/*.php',
          'lib/*.php',
          '*.php'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      options: {
        // force is needed in case of deleting files outside the root directory
        force: true
      },
      dist: [
        '<%= yeoman.dist %>'
      ]
    },

    // Copies remaining unprocessed files to dist
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            'assets/img/{,*/}*.webp',
            'bower_components/bootstrap/dist/fonts/*.*',
            'bower_components/jquery/jquery.min.js',
            'screenshot.{png/jpg/jpeg}',
            '{,*/}*.php',
            'lang/*.*',
            'assets/fonts/*.*',
            'assets/js/main.js',  // TODO !!!
            'assets/js/vendor/{,*/}*.js'
          ]
        }]
      }
    },

    'string-replace': {
      dist: {
        files: {
          '<%= yeoman.dist %>/style.css': 'style.css'
        },
        options: {
          replacements: [{
            pattern: '(development)',
            replacement: '(production)'
          }]
        }
      }
    }

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
    'app',
    'connect:test',
    'mocha'
  ]);


  // Public tasks

  grunt.registerTask('default', [
    'dist'
  ]);

  // Watch task
  grunt.registerTask('serve', [
    'app',
    'connect:test',
    'watch'
  ]);

  // Building the app version
  grunt.registerTask('app', [
    'newer:jshint',
    'newer:coffeelint',
    'mocha',
    'newer:coffee',
    'newer:uglify',
    'compile-css',
    'version'
  ]);

  // Building the dist version
  grunt.registerTask('dist', [
    'test',
    'clean:dist',
    'copy:dist',
    'cssmin',
    'imagemin',
    'svgmin',
    'modernizr',
    'string-replace'
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
