'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Let\'s get building a '+chalk.yellow('sweet')+' new  project with '+chalk.magenta('Kiricon-Website')+chalk.red('')
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What\'s your project name?: '
    },{
      type: 'confirm',
      name: 'sass',
      message: 'Do you want Sass?',
      default: true
    },{
      type: 'confirm',
      name: 'minify',
      message: 'Do you want to be able to minify/uglify your javascript and css?',
      default: true,
    },{
      type: 'confirm',
      name: 'browsersync',
      message: 'Do you want to use BrowserSync in your build?',
      default: true
    },{
      type: 'confirm',
      name: 'angular',
      message: 'Is this going to be an Angular Project?',
      default: true
    },{
      when: function(response){
        return response.angular
      },
      type: 'confirm',
      name: 'materialAngular',
      message: 'Then will we be using Material Angular?',
      default: false
    },{
      type: 'confirm',
      name: 'materialIcons',
      message: 'Would you like the Material Icon font set?',
      default: false
    },{
      type: 'input',
      name: 'source',
      message: 'Name of your source directory: ',
      default: 'src'
    },{
      type: 'input',
      name: 'dist',
      message: 'Name of your distribution directory: ',
      default: 'dist'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name,
        browsersync: this.props.browsersync,
        sass: this.props.sass,
        minify: this.props.minify
      }
    );

    this.fs.copyTpl(
      this.templatePath('src/index.html'),
      this.destinationPath(this.props.source+'/index.html'), {
        name: this.props.name,
        angular: this.props.angular,
        materialAngular: this.props.materialAngular,
        materialIcons: this.props.materialIcons
      }
    );
    if(this.props.sass){
      var cssextension = 'scss';
    }else{
      var cssextension = 'css';
    }
    this.fs.copyTpl(
      this.templatePath('src/css/main.scss'),
      this.destinationPath(this.props.source+'/css/main.'+cssextension), {
        name: this.props.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('src/js/app.js'),
      this.destinationPath(this.props.source+'/js/app.js'), {
        name: this.props.name,
        angular: this.props.angular,
        materialAngular: this.props.materialAngular,
      }
    );

    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'), {
        name: this.props.name,
        src: this.props.source,
        dist: this.props.dist,
        browsersync: this.props.browsersync,
        sass: this.props.sass,
        minify: this.props.minify
      }
    );

  },

  install: function () {
    this.installDependencies();
  }
});
