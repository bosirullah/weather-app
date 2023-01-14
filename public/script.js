window.onload = function () {
    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        $(".2nd-container").hide();
        $(".container").css("height","200px");
        sessionStorage.setItem("hasCodeRunBefore", true);
    }
}


$(".btn").on("click",()=>{
    $(".2nd-container").show();
    $(".container").css("height","480px");
})