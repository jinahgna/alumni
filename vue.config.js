const path = require('path');
const ansiRegex = require('ansi-regex')

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.join(__dirname, 'src'),
				'@router': path.join(__dirname, 'src/router'),
			},
		},
	},
	transpileDependencies: ['vuetify'],
	transpileDependencies: [ansiRegex],
};