module.exports = function(grunt) {

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        less : {
            development : {
                options : {
                    compress : true
                },
                files : {
                    'css/structure.css' : 'less/structure.less',
                    'css/style.css' : 'less/style.less'
                }
            }
        },
        watch : {
            lessWatch : {
                files: ['less/**/*.less'],
                tasks: ['less']
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('dev', ['less','watch']);
};