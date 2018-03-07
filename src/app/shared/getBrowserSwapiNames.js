var names = document.querySelectorAll('.tc-black-2');
var images = document.querySelectorAll('.card img');
var downloadList = [];
var i = 0;​
var friendlyName = function (name) {
  var newName = name.replace(/\s/gi, '-');
  newName = newName.toLowerCase();
  return newName;
};

for (i; i < images.length; i++) {
  downloadList.push({
    src: images[i].src,
    name: friendlyName(names[i].innerText)
  });
}

var x = 0;
var interval = setInterval(function () {
  var link = document.createElement("a");
  link.id = x;
  link.download = downloadList[x].name;
  link.href = downloadList[x].src;
  link.click();
  x++;
  if (x === 10) {
    clearInterval(interval);
  }
}, 100);

