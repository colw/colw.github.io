var fs = require('fs')
var path = require('path');
var mkdirp = require('mkdirp');
var util = require('util');
var converter = new (require('showdown')).converter();
var moment = require('moment');

var POST_DIR = 'posts';
var RAW_POSTS_DIR = './texts/';
var TEMPLATES = './templates';
var readOptions = {encoding: 'utf8'};

function isMarkDownFile(fileName) {
  return path.extname(fileName) == ".md";
}

function sortByDateDescending(a, b) {
  return a.date < b.date;
}

/* Create a Post Object file */
function createPostObject(fileName) {
  var text = fs.readFileSync(path.join(RAW_POSTS_DIR + fileName), readOptions).split('\n');
  var title = text.splice(0,1)[0];
  var date = new Date(text.splice(0,3)[1]);
  
  var urlName = title.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z]/g, '');

  var y = '' + date.getFullYear();
  var m = '' + (date.getMonth()+1);
  var d = '' + date.getDate();
  var basepath = path.join(y, m, d);
  
  return {title: title, urlname: urlName, basepath: basepath, date: date, text: text.join('\n')};
}

/* Transforms a post object into html and writes to a file. */
function writePostToDirectory(postObject) {
  mkdirp.sync(path.join(POST_DIR, postObject.basepath));
  
  var postTemplate = fs.readFileSync(path.join(TEMPLATES, 'post.template'), readOptions);
  var fileTemplate = fs.readFileSync(path.join(TEMPLATES, 'index.template'), readOptions);
  
  var linkToPost = path.join(POST_DIR, postObject.basepath, postObject.urlname + '.html');
  
  var fmtDate = moment(postObject.date).format('dddd, D MMMM YYYY');
  var thePost = util.format(postTemplate, linkToPost, postObject.title, fmtDate, converter.makeHtml(postObject.text))
  
  var postPage = util.format(fileTemplate, thePost);
  fs.writeFileSync(path.join(POST_DIR, postObject.basepath, postObject.urlname + '.html'), postPage);
  
  return thePost;
}

/* Inserts all posts into a main index.html file, and writes. */
function writeIndexPage(htmlPosts) {  
  var masterFileContents = fs.readFileSync(path.join(TEMPLATES, 'index.template'), readOptions);
  var indexPage = util.format(masterFileContents, htmlPosts.join('\n\n'));
  fs.writeFileSync('index.html', indexPage);
}

var markDownFileList = fs.readdirSync(RAW_POSTS_DIR).filter(isMarkDownFile);
var postObjects = markDownFileList.map(createPostObject).sort(sortByDateDescending);
var htmlPosts = postObjects.map(writePostToDirectory);

writeIndexPage(htmlPosts);
