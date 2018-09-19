module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            dist: {
                files: {
                    'dist/app.js': [ 'dist/app.js' ]
                },
                options: {
                    mangle: false,
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [ 'webApp/*.js', 'webApp/**/*.js', 'tmp/*.js' ],
                dest: 'dist/app.js'
            }
        },

        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'webApp/*.js', '*.html' ],
                tasks: [   'concat:dist'],
                options: {
                    atBegin: true
                }
            },
            min: {
                files: [ 'Gruntfile.js', 'webApp/*.js', '*.html', 'webApp/**/*.js' ],
                tasks: [   'concat:dist',  'uglify:dist' ],
                options: {
                    atBegin: true
                }
            }
        },

        compress: {
            dist: {
                options: {
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [{
                    src: [ 'index.html' ],
                    dest: '/'
                }, {
                    src: [ 'dist/**' ],
                    dest: 'dist/'
                }, {
                    src: [ 'assets/**' ],
                    dest: 'assets/'
                }, {
                    src: [ 'libs/**' ],
                    dest: 'libs/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', [ 'watch:dev' ]);
    // grunt.registerTask('test', [ 'bower', 'jshint', 'karma:continuous' ]);
    grunt.registerTask('minified', [  'connect:server', 'watch:min' ]);
    grunt.registerTask('package', [ 'files', 'concat:dist', 'uglify:dist',
        'clean:temp', 'compress:dist' ]);
};