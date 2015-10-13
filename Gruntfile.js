module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      dist: {
        expand: true, cwd: 'src/', src: ['**'], dest: 'dist/'
      },
      site: {
        expand: true, cwd: 'dist/', src: ['**/*'], dest: 'site/'
      }
    }, 
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/jquery.countimator.min.js': [ 'dist/jquery.countimator.js'],
          'dist/jquery.countimator.wheel.min.js': [ 'dist/jquery.countimator.wheel.js']
        }
      }
    },
    livemd: {
      options: {
        prefilter: function(string) {
          return string.replace(grunt.config().pkg && grunt.config().pkg.homepage && new RegExp("\\[.*\\]\\(" + grunt.config().pkg.homepage.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + "\\)", "gi"), "");
        }
      },
      site: {
        files: {
          'site/index.html': ['README.md']
        }
      }
    },
    'gh-pages': {
      options: {
        // Options for all targets go here.
      },
      push: {
        options: {
          base: 'site'
        },
        // These files will get pushed to the `gh-pages` branch (the default).
        src: ['**/*']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-livemd');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', ['copy:dist', 'jshint', 'uglify']);
  
  grunt.registerTask('build', ['copy:dist', 'uglify']);
  
  grunt.registerTask('site', ['build', 'copy:site', 'livemd:site']);
  
};