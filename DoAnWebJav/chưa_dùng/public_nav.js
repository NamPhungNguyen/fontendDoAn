window.onload = function () {
    fetch('public_nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('public_nav').innerHTML = data;
        });
}