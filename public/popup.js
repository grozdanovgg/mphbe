const user = {
    name: "pesho"
}

///////

let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function (data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function (element) {
    let color = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: `document.body.style.backgroundColor = "${color}";` });
    });
};


const table = document.getElementById("table-body");

const row = table.insertRow(0);

var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);

// Add some text to the new cells:
cell1.innerHTML = "NEW CELL1";
cell2.innerHTML = "NEW CELL2";



// Add pool 


const addPoolBtn = document.getElementById("add-pool");
addPoolBtn.onclick = function (element) {

}

const blockWatchBtn = document.getElementById("block-to-watch");
blockWatchBtn.onclick = function (element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: `document.body.style.backgroundColor = "${color}";` });
    });
}