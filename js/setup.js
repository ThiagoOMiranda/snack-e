$(document).ready(function() {
    const title = document.createElement("audio");
    title.setAttribute("src", "src/title.mp3");
    title.play();

    $("#play-btn").click(function() {
        title.pause();
    });
});