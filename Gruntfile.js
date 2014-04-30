/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  // Project configuration.
  grunt.initConfig({

    // Metadata.
		bootstrapDirectory: require('bower').config.directory + '/bootstrap',
    pkg: grunt.file.readJSON('package.json'),
    jqueryCheck: 'if (typeof jQuery === "undefined") { throw new Error("Bootstrap requires jQuery") }\n\n',

    /* Remove all built files */
    clean: {
			libs: ['bower_components'],
      dist: ['dist'],
      build: ['build']
    },

		/* Check JavaScript */
    jshint: {
      options: {
        jshintrc: '<%= bootstrapDirectory %>/js/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['<%= bootstrapDirectory %>/js/*.js']
      },
      test: {
        src: ['<%= bootstrapDirectory %>/js/tests/unit/*.js']
      }
    },

    concat: {
			/* Combine the Bootstrap JavaScript into one file */
      bootstrap: {
        src: [
					'<%= bootstrapDirectory %>/js/*.js'
        ],
        dest: 'dist/js/bootstrap.js'
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
			/* Minify the Bootstrap JavaScript */
      bootstrap: {
        src: ['<%= concat.bootstrap.dest %>'],
        dest: 'dist/js/bootstrap.min.js'
      }
    },

    copy: {
			/* Copy Bootstrap's fonts to dist */
      fonts: {
        expand: true,
        cwd: '<%= bootstrapDirectory %>',
        src: ["fonts/**"],
        dest: 'dist/'
      },
			/* Copy Bootstrap LESS files to be compiled */
      bootstrap: {
        expand: true,
        cwd: '<%= bootstrapDirectory %>',
        src: ["less/**"],
        dest: 'build/'
      },
			/* Copy custom images to dist */
      img: {
        expand: true,
        cwd: 'src',
        src: ["img/**"],
        dest: 'dist/'
      },
			/* Copy custom theme fonts to be compiled */
      theme: {
        expand: true,
        cwd: 'src',
        src: ["less/**"],
        dest: 'build/'
      },
    },

		less: {
			/* Compile the Boostrap core */
			compileCore: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: '<%= pkg.name %>.css.map',
					sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
				},
				files: {
					'dist/css/<%= pkg.name %>.css': 'build/less/bootstrap.less'
				}
			},

			/* Compile the custom theme */
			compileTheme: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: '<%= pkg.name %>-theme.css.map',
					sourceMapFilename: 'dist/css/<%= pkg.name %>-theme.css.map'
				},
				files: {
					'dist/css/<%= pkg.name %>-theme.css': 'build/less/theme.less'
				}
			},

			/* Create minified versions of both */
			minify: {
				options: {
					cleancss: true,
					report: 'min'
				},
				files: {
					'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css',
					'dist/css/<%= pkg.name %>-theme.min.css': 'dist/css/<%= pkg.name %>-theme.css'
				}
			}
		},

		exec: {
			bower: {
				cmd: 'node_modules/.bin/bower install',
			}
		},

    watch: {
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src']
      },
      less: {
        files: ['src/less/*.less', 'src/img/*'],
        tasks: ['copy:theme', 'less']
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-exec');

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['copy:bootstrap', 'copy:theme', 'less']);

  // Fonts distribution task.
  grunt.registerTask('dist-fonts', ['copy:fonts']);

  // Images
  grunt.registerTask('dist-img', ['copy:img']);

  // Full distribution task.
  grunt.registerTask('default', ['clean:build', 'clean:dist', 'exec:bower', 'dist-css', 'dist-fonts', 'dist-js', 'dist-img']);
};
