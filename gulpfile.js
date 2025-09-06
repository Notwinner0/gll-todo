const { src, dest, watch, series, parallel } = require('gulp');
const _path = require('node:path');
const { exec } = require('node:child_process'); 








function copyStatic() {
  return src('src/static/**/*') 
    .pipe(dest('dist/static')); 
}


function webpackDev(cb) {
  
  exec('yarn start', (err, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
}


function webpackBuild(cb) {
   
  exec('yarn build', (err, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    cb(err);
  });
}


function watchStatic() {
  watch('src/static/**/*', copyStatic);
}


exports.dev = parallel(webpackDev, watchStatic);


exports.build = series(copyStatic, webpackBuild);


exports.default = exports.dev;