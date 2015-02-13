var fs = require('fs')
var util = require('util');
var converter = new (require('showdown')).converter();
var inputFolder = './posts/';
var readOptions = {encoding: 'utf8'};

function isMarkDownFile(fileName) {
  return fileName.substr(-3) == ".md";
}

function getDatedContents(fileName) {
  var f = fs.readFileSync(inputFolder + fileName, readOptions);
  var d = new Date(f.split('\n')[2]);
  return {date: d, text: f};
}

function sortByDateDescending(a, b) {
  return a.date < b.date;
}

function toHtml(markDownFile) {
  return '<div class="thing">' + converter.makeHtml(markDownFile.text) + '</div>';
}

/* Create an array of processed Markdown files. */
var markDownFileList = fs.readdirSync(inputFolder).filter(isMarkDownFile);
var htmlPosts = markDownFileList.map(getDatedContents).sort(sortByDateDescending).map(toHtml);

/* Concatenate the array and place it into the template html file. */
var masterFileContents = fs.readFileSync('index.template', readOptions);
var indexPage = util.format(masterFileContents, htmlPosts.join('\n\n'));
fs.writeFileSync('index.html', indexPage);
