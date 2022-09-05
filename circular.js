const madge = require('madge');
const path = require('path');

async function checkCircular() {
  return madge(path.resolve(__dirname, './'), {
    webpackConfig: path.resolve(__dirname, './config/webpack.config.js'),
    tsConfig: path.resolve(__dirname, './tsconfig.json'),
    fileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  }).then((res) => {
    const circular = res.circularGraph();
    if (Object.keys(circular).length > 0) {
      // console.error(circular)
      throw new Error(
        `Found circular dependencies! ${JSON.stringify(circular, null, 2)}`
      );
    }
  });
}

async function run() {
  try {
    await checkCircular();
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}

run();
