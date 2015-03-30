/**
 * jquery-runabove: jQuery module to access and consume the RunAbove API
 *
 * @author Alexandre Vallières-Lagacé (@vallieres)
 * @url https://github.com/vallieres/jquery-runabove
 * @license MIT
 */

module.exports = function (grunt) {

    var type = grunt.option('type');

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-bump');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! jquery-runabove v<%= pkg.version %> by Alexandre Vallières-Lagacé (@vallieres) - ' +
                'https://github.com/vallieres/jquery-runabove - License MIT */\n',

        clean: {
            files: ['jquery-runabove.min.js']
        },

        jshint: {
            files: ['jquery-runabove.js'],
            options: {
                jshintrc: true,
            },
        },

        uglify: {
            js: {
                src: ['jquery-runabove.js'],
                dest: 'jquery-runabove.min.js',
                options: {
                    banner: '<%= banner %>'
                }
            }
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                commit: true,
                push: false,
                createTag: true,
                pushTo: 'upstream',
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                tagName: 'v%VERSION%'
            }
        }

    });

    // dev
    grunt.registerTask('default', [
        'jshint',
        'clean',
        'uglify'
    ]);

    // prod
    grunt.registerTask('release', [
        'jshint',
        'bump-only:' + type,
        'updatePkgConfig',
        'clean',
        'uglify',
        'bump-commit'
    ]);

    grunt.registerTask('updatePkgConfig', function () {
        grunt.config.set('pkg', grunt.file.readJSON('package.json'));
    });

};
