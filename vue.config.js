const path = require('path');

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
};
