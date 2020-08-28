let arrQuotes;
let index = 0;
let indexImage = 0;
const totalImage = 7;

function onReady(callback) {
    fetch('https://quotes-api.archv.id/api/quotes/v1/latest')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then((result) => {
            var intervalId = window.setInterval(function () {
                if (document.getElementsByTagName('body')[0] !== undefined) {
                    window.clearInterval(intervalId);
                    document.getElementById("quote").innerHTML = result.content[0].content;
                    document.getElementById("quote-author").innerHTML = result.content[0].author;
                    document.getElementById("quote-left").style.color = getRandomColor();
                    arrQuotes = JSON.parse(JSON.stringify(result))
                    callback.call(this);
                }
            }, 1000);
        })
        .catch((error) => {
            setVisible('.section-loader', false);
            setVisible('.section-error', true);
        });
}

function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function () {
    setVisible('.section-quote', true);
    setVisible('.section-loader', false);
});

function nextQuote() {
    index + 1 <= arrQuotes.content.length - 1 ? ++index : index = 0;
    indexImage + 1 <= totalImage ? ++indexImage : indexImage = 0;

    changeQuote();
}

function prevQuote() {
    index - 1 >= 0 ? --index : index = arrQuotes.content.length - 1;
    indexImage - 1 >= 0 ? --indexImage : indexImage = totalImage;

    changeQuote();
}

function changeQuote() {
    document.getElementById("quote").innerHTML = arrQuotes.content[index].content;
    document.getElementById("quote-author").innerHTML = arrQuotes.content[index].author;
    document.getElementById("section-quote").style.backgroundImage = `url('images/background-${indexImage}.jpg')`;
    document.getElementById("quote-left").style.color = getRandomColor();
    resetElement();
}

function resetElement() {
    var elm = document.getElementById("section-quote");
    var newone = elm.cloneNode(true);
    elm.parentNode.replaceChild(newone, elm);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}