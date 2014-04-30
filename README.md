# Boostrap 3.0 Custom Theme Template

This project is an aid for building customized theme for Bootstrap 3.0. If compiled right now it will generate the default Boostrap theme.

`kitchensink.html` is shameless stolen from [divshot](http://www.divshot.com/) at https://github.com/divshot/bootstrap-theme-white-plum

## Customizing
By editing the Less files in the `src/less/` directory you can completely change how the Bootstrap theme looks. The two files you should concentrate on are the `theme.less` and `variables.less` files that are provided. These files are copied on top of the standard Bootstrap files, to create a custom theme.

If you would like you can override any of the other files that come standard with Boostrap. Although, it is highly recommended you do not override `bootstrap.less` or `mixins.less`.

In addition to the Less files, you can also add any files you would like to `src/img` and it will be copied to the `dist` with everything else when compiled.

If you would like to change the name of the theme so the files aren't named `bootstrap-custom-theme*` you can change the name in the `package.json` and `bower.json` files. You should also edit `kitchensink.html` to point to your new CSS filenames as well.

## Building
- Install the dependancies with with `npm install`
- Compile the source with `grunt`

## Usage
- Build the theme using the above steps.
- Copy the `js`, `css`, `img`, and `fonts` directories to your web source.
- Link to the JavaScript, CSS and fonts in your `<head>`.

		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/bootstrap-theme.min.css">
		<script type="text/javascript" src="js/bootstrap.min.js"></script>

## License

Boostrap is released under the Apache license.

The theme template and all related build code are also released under the Apache License.
