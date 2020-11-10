/* eslint-disable import/no-extraneous-dependencies */
import gulp from 'gulp';
import compileImages from './images';
import compileScripts from './scripts';
import compileStyles from './styles';
import compileTemplates from './templates';

export default gulp.parallel(
  compileImages,
  compileScripts,
  compileStyles,
  compileTemplates,
);
