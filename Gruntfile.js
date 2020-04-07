/* global module*/
module.exports = function (grunt) {
  grunt.initConfig({
    eslint: {
      options: {
        configFile: '.eslintrc.json'
      },
      target: ['./js/*.js','./com/**/*.js']
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: ['css/*.css', './com/**/*.css']
    },
    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      src: ['*.html', '.com/**/*.html']
    },
    htmlmin: {
      options: {
        collapseWhitespace: true,
        preserveLineBreaks: false
      },
      files: {
        expand:true,
        src:['*.html','./com/**/*.html'],
        dest:'dist/'
      }
    },
    cssmin: {
      files:{
        expand:true,
        src: ['css/*.css', './com/**/*.css'],
        dest: 'dist/'
      }
    },
    uglify: {
      main:{
        files: [{
          expand:true,
          src: ['js/*.js', './com/**/*.js'],
          dest: 'dist/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('lint', ['htmlhint','csslint','eslint']);
  grunt.registerTask('default', ['htmlmin', 'cssmin', 'uglify']);
};
