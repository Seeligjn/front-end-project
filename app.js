let $searchBtn = $("#verse");
let $textBox = $("p");
let savedVerses = [];
let selectedTranslation = "kjv";
let $reference = $(".reference");
//Search button function to display the searched verse in textbox
$searchBtn.on("click", function () {
  let $userInput = $("input").val();
  $textBox.empty();
  $reference.empty();
  $.get(
    `https://bible-api.com/${$userInput}?translation=${selectedTranslation}`,
    function (data) {
      $textBox.append(data.text);
      $reference.append(" " + data.reference);
    }
  );
});

let $saveVerseBtn = $("#save-verse");
$saveVerseBtn.on("click", function () {
  let $userInput = $("input").val();
  $.get(
    `https://bible-api.com/${$userInput}?translation=${selectedTranslation}`,
    function (data) {
      let $verseStorageContainer = $("<ul></ul>").addClass("list-group");
      // let $yourLibrary = $('<li>').addClass('list-group-item list-group-item-secondary').text('Your Library')
      let $yourLibrary = $(".your-library");
      if ($yourLibrary.length === 0) {
        $yourLibrary = $("<li>")
          .addClass("list-group-item list-group-item-secondary your-library")
          .text("Your Notepad");
        $verseStorageContainer.append($yourLibrary);
      }
      let $savedVerse = $("<li>")
        .addClass("list-group-item list-group-item-warning")
        .append(data.text)
        .append(" " + data.reference);
      if (!savedVerses.includes(data.text)) {
        savedVerses.push(data.text);
        $verseStorageContainer.append($savedVerse);
        $(".library-title").append($verseStorageContainer);
      }
      let $saveLibraryBtn = $(".save-library");
      if ($saveLibraryBtn.length === 0) {
        $saveLibraryBtn = $("<button>")
          .text("Save Notes")
          .addClass("save-library")
          .attr("id", "save-library");
        $yourLibrary.append($saveLibraryBtn);
      }
    }
  );
});

////Translation Selector
let $portBtn = $(".port");
$portBtn.on("click", function () {
  selectedTranslation = "almeida";
});
let $bbeBtn = $(".bbe");
$bbeBtn.on("click", function () {
  selectedTranslation = "bbe";
});
let $webBtn = $(".web");
$webBtn.on("click", function () {
  selectedTranslation = "web";
});
let $kjvBtn = $(".kjv");
$kjvBtn.on("click", function () {
  selectedTranslation = "kjv";
});
///////////////////////////////

//Random Verse Generator
let $randomBtn = $("#random");
let books = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalm",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
];
let numOfChapters = [
  50, 40, 27, 36, 34, 24, 21, 4, 31, 24, 22, 25, 29, 36, 10, 13, 10, 42, 150,
  31, 12, 8, 66, 52, 5, 48, 12, 14, 3, 9, 1, 4, 7, 3, 3, 3, 2, 14, 4, 28, 16,
  24, 21, 28, 16, 16, 13, 6, 6, 4, 4, 5, 3, 6, 4, 3, 1, 13, 5, 5, 3, 5, 1, 1, 1,
  22,
];

$randomBtn.on("click", function () {
  let randomBook = books[Math.floor(Math.random() * books.length)];
  let numOfChaptersInBook = numOfChapters[books.indexOf(randomBook)];
  let randomChapter = Math.floor(Math.random() * numOfChaptersInBook) + 1;
  let randomVerse = Math.floor(Math.random() * 20) + 1;
  let $userInput = `${randomBook} ${randomChapter}:${randomVerse}`;
  $reference.empty();
  $textBox.empty();
  $.get(
    `https://bible-api.com/${$userInput}?translation=${selectedTranslation}`,
    function (data) {
      $textBox.append(data.text);
      $reference.append(data.reference);
    }
  );
});
////////////////////////
