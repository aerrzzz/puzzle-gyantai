var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"]; // Assume "3.jpeg" is the blank tile.

window.onload = function() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            //<img id="0-0" src="1.jpeg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpeg";

            // Drag functionality for desktop
            tile.addEventListener("dragstart", dragStart);  // Click an image to drag
            tile.addEventListener("dragover", dragOver);    // Moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  // Dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  // Dragged image leaving another image
            tile.addEventListener("drop", dragDrop);        // Drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      // After drag drop, swap the two tiles

            // Touch functionality for mobile
            tile.addEventListener("touchstart", touchStart);
            tile.addEventListener("touchmove", touchMove);
            tile.addEventListener("touchend", touchEnd);

            document.getElementById("board").append(tile);
        }
    }
};

// Functions for drag functionality (desktop)
function dragStart() {
    currTile = this; // Refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
    // Empty
}

function dragDrop() {
    otherTile = this; // Refers to the img tile being dropped on
}

function dragEnd() {
    // Swap the images
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}

// Functions for touch functionality (mobile)
function touchStart(e) {
    e.preventDefault();
    currTile = e.targetTouches[0].target; // The touched tile
}

function touchMove(e) {
    e.preventDefault();
    let touch = e.targetTouches[0];
    let element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (element && element.tagName === "IMG") {
        otherTile = element; // Target tile being touched
    }
}

function touchEnd(e) {
    if (otherTile) {
        // Swap the images
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
}
