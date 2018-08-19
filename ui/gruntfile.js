module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: ["css"],
                    javascriptEnabled: true
                },
                files: {
                    "css/app.css": "less/app.less",
                },
                cleancss: true
            }
        },
        csssplit: {
            your_target: {
                src: ['css/app.css'],
                dest: 'css/app.min.css',
                options: {
                    maxSelectors: 4095,
                    suffix: '.'
                }
            },
        },
        ngtemplates: {
          POEApp: {
            src: ['template/*.html', 'views/*.html'],
            dest: 'js/templates.js',
            options: {
              htmlmin: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true
              }
            }
          }
        },
        watch: {
            a: {
                files: ['less/**/*.less'], // which files to watch
                tasks: ['less', 'csssplit'],
                options: {
                    nospawn: true
                }
            },
            b: {
                files: ['views/**/*.html', 'template/**/*.html'], // which files to watch
                tasks: ['ngtemplates'],
                options: {
                    nospawn: true
                }
            }
        },
        copy: {
            abi: {
              expand: true,
              src: '../build/contracts/ProofOfExistence.json',
              dest: 'js/',
              flatten: true
            },
        }
    });

    // Load the plugin that provides the "less" task.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-csssplit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['less', 'ngtemplates', 'copy:abi', 'watch']);

};
