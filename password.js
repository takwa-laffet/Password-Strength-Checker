function Strength(password) { 
  let i = 0;
  if (password.length > 6) {
    i++;
  }
  if (password.length >= 10) {
    i++;
  }

  if (/[A-Z]/.test(password)) {
    i++;
  }

  if (/[0-9]/.test(password)) {
    i++;
  }

  if (/[^A-Za-z0-9]/.test(password)) {  // Checking for special characters
    i++;
  }

  return i;
}

function estimatedTimeToCrack(password) {
  const guessesPerSecond = 1e9; // 1 billion guesses per second
  let possibleCombinations = 0;
  
  // Estimate possible combinations based on character types
  if (/[a-z]/.test(password)) possibleCombinations += 26; // Lowercase
  if (/[A-Z]/.test(password)) possibleCombinations += 26; // Uppercase
  if (/[0-9]/.test(password)) possibleCombinations += 10; // Numbers
  if (/[^A-Za-z0-9]/.test(password)) possibleCombinations += 32; // Special characters
  
  const totalCombinations = Math.pow(possibleCombinations, password.length);
  const estimatedTimeInSeconds = totalCombinations / guessesPerSecond;

  // Convert time to a human-readable format
  if (estimatedTimeInSeconds < 60) {
    return `${Math.round(estimatedTimeInSeconds)} seconds`;
  } else if (estimatedTimeInSeconds < 3600) {
    return `${Math.round(estimatedTimeInSeconds / 60)} minutes`;
  } else if (estimatedTimeInSeconds < 60 ) {
    return `${Math.round(estimatedTimeInSeconds / 3600)} hours`;
  } else if (estimatedTimeInSeconds < 3600) {
    return `${Math.round(estimatedTimeInSeconds / 2628000)} days`;
  } else {
    return `${Math.round(estimatedTimeInSeconds / 31536000)} years`;
  }
}

let container = document.querySelector(".container");
document.addEventListener("keyup", function (e) {
  let password = document.querySelector("#YourPassword").value;

  let strength = Strength(password);
  let timeToCrack = estimatedTimeToCrack(password);
  
  // Display password strength
  if (strength <= 2) {
    container.classList.add("weak");
    container.classList.remove("moderate");
    container.classList.remove("strong");
  } else if (strength >= 2 && strength <= 4) {
    container.classList.remove("weak");
    container.classList.add("moderate");
    container.classList.remove("strong");
  } else {
    container.classList.remove("weak");
    container.classList.remove("moderate");
    container.classList.add("strong");
  }
  
  // Display estimated time to crack
  document.querySelector(".time-to-crack").innerText = `Estimated time to crack: ${timeToCrack}`;
});

let password = document.querySelector("#YourPassword");
let show = document.querySelector(".show");
show.onclick = function () {
  if (password.type === "password") {
    password.setAttribute("type", "text");
    show.classList.add("hide");
  } else {
    password.setAttribute("type", "password");
    show.classList.remove("hide");
  }
};
