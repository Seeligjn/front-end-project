let $getVerseBtn = $(".verse");
let $textBox = $("p");

$getVerseBtn.on("click", function () {
  let $userInput = $("input").val();
  $.get(`https://bible-api.com/${$userInput}`, function (data) {
    $textBox.append(data.text);
    console.log(data.text);
  });
});
