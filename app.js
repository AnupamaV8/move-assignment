const box = document.querySelector("#arrowkeys");
const obstacle = document.querySelector("#obstacle");
let positionTop = 0;
let positionLeft = 0;
const step = 10;

// Initialize box position
box.style.top = positionTop + "px";
box.style.left = positionLeft + "px";

// Function to move the box with boundary and collision check
function moveBox(newTop, newLeft) {
  const viewPortWidth = window.innerWidth;
  const viewPortHeight = window.innerHeight;

  // Ensure box stays within the viewport
  if (newTop >= 0 && newTop + box.offsetHeight <= viewPortHeight) {
    positionTop = newTop;
  }
  if (newLeft >= 0 && newLeft + box.offsetWidth <= viewPortWidth) {
    positionLeft = newLeft;
  }

  // Check for collision before updating position
  if (!isColliding(positionTop, positionLeft, box, obstacle)) {
    box.style.top = positionTop + "px";
    box.style.left = positionLeft + "px";
  }
}

// Function to check if the box and obstacle collide
function isColliding(top, left, box, obstacle) {
  if (!obstacle) return false;

  const boxRect = {
    top: top,
    bottom: top + box.offsetHeight,
    left: left,
    right: left + box.offsetWidth,
  };

  const obstacleRect = obstacle.getBoundingClientRect();

  return !(
    boxRect.bottom <= obstacleRect.top ||
    boxRect.top >= obstacleRect.bottom ||
    boxRect.right <= obstacleRect.left ||
    boxRect.left >= obstacleRect.right
  );
}

// Event listener for arrow keys with immediate response
window.addEventListener("keydown", (event) => {
  let nextTop = positionTop;
  let nextLeft = positionLeft;

  switch (event.key) {
    case "ArrowUp":
      nextTop -= step;
      break;
    case "ArrowDown":
      nextTop += step;
      break;
    case "ArrowLeft":
      nextLeft -= step;
      break;
    case "ArrowRight":
      nextLeft += step;
      break;
    default:
      return; // Ignore non-arrow keys
  }

  // Move the box to the new position
  moveBox(nextTop, nextLeft);
});

// Event listener for mouse clicks with immediate response
document.addEventListener("click", (event) => {
  // Get the mouse position relative to the viewport
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Move the box to the clicked position
  moveBox(mouseY - box.offsetHeight / 2, mouseX - box.offsetWidth / 2); // Center box on click
});
