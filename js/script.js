var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
document.querySelectorAll('.zoom').forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(1.5)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 2000);
    });
});