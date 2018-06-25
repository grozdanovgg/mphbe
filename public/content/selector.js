// const pools = [
//     {
//         name: 'omegapool',
//         blocksUrl: 'https://omegapool.cc/index.php?coin=raven&page=blocks',
//         blochsHtmlSelector: '#main > div > div > table > tbody > tr:nth-child(2) > td:nth-child(1) > a',

//     }
// ]


// console.log('HEEEEEEEEEEEY');
// const lastBlock = $(pool.blochsHtmlSelector);
// console.log(lastBlock);
// console.log('END')

console.log('IN SELECTOR');
$('body').mousemove(function (event) {
    // console.log(event)
    $(".mphce-hover").removeClass("mphce-hover");
    $(event.target).addClass("mphce-hover");
});

$(document).click(function (event) {
    event.preventDefault();

    const path = fullPath(event.target);
    var text = $(path).text();
    console.log(text);

    chrome.runtime.sendMessage({
        type: "selected-element",
        elementSelector: path,
        elementText: +text
    }, function () {
        $(document).unbind('click');
        $('body').unbind('mousemove');
        $(".mphce-hover").removeClass("mphce-hover");
    });
});









function fullPath(el) {
    var names = [];
    while (el.parentNode) {
        if (el.id) {
            names.unshift('#' + el.id);
            break;
        } else {
            if (el == el.ownerDocument.documentElement) names.unshift(el.tagName);
            else {
                for (var c = 1, e = el; e.previousElementSibling; e = e.previousElementSibling, c++);
                names.unshift(el.tagName + ":nth-child(" + c + ")");
            }
            el = el.parentNode;
        }
    }
    return names.join(" > ");
}

