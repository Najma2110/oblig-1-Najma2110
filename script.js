document.addEventListener("DOMContentLoaded", () => {
   console.log("ready!");

   // lagt til event listeners to the book covers


   document.querySelectorAll(".books-container .book").forEach(book => {
      book.addEventListener("click", openSpellBook);
   });

   // Event listener for closing the book view


   document.getElementById("close-tome").addEventListener("click", closeSpellBooks);

   // Form event listeners
   document.getElementById("change-password-form").addEventListener("submit", handlePasswordChange);
   document.getElementById("rename-wizard-form").addEventListener("submit", handleNameChange);
   document.getElementById("summon-form").addEventListener("submit", handleSummonFamiliar);

   // Mood slider live oppdaterin


   document.getElementById("familiar-mood").addEventListener("input", updateMoodLabel);
});

function openSpellBook(event) {
   const bookId = event.currentTarget.id;
   const correspondingBook = document.getElementById(bookId.replace("-cover", ""));
   if (correspondingBook) {
      document.querySelectorAll(".spell-page").forEach(book => {
         book.classList.add("hidden");
      });
      correspondingBook.classList.remove("hidden");
      document.getElementById("book-view").classList.remove("hidden");
   }
}

function closeSpellBooks() {
   document.getElementById("book-view").classList.add("hidden");
   document.querySelectorAll(".spell-page").forEach(book => {
      book.classList.add("hidden");
   });
}

function handlePasswordChange(event) {
   event.preventDefault();
   const username = document.querySelector("#username").value;
   const newPassword = document.querySelector("#new-password").value;
   const confirmPassword = document.querySelector("#confirm-password").value;

   if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
   }
   alert(`Password changed successfully for ${username}`);
}

function handleNameChange(event) {
   event.preventDefault();
   const newName = document.querySelector("#new-name").value;
   const newTitle = document.querySelector("#new-title").value;

   document.querySelector("h1").innerText = `Welcome to The MagiScript Library of ${newName} the ${newTitle}`;
   localStorage.setItem('wizardName', newName);
   localStorage.setItem('wizardTitle', newTitle);

   alert(`You are now known as ${newName} the ${newTitle}`);
}

// Mood global variabel


let currentMood = "Neutral";

function updateMoodLabel() {
   const slider = document.getElementById("familiar-mood");
   const label = document.querySelector("label[for='familiar-mood']");

   const value = parseInt(slider.value);
   if (value <= 2) {
      currentMood = "Angry";
   } else if (value <= 4) {
      currentMood = "Grumpy";
   } else if (value <= 6) {
      currentMood = "Neutral";
   } else if (value <= 8) {
      currentMood = "Happy";
   } else {
      currentMood = "Joyful";
   }

   label.textContent = `Mood: ${currentMood}`;
}

function handleSummonFamiliar(event) {
   event.preventDefault();

   const name = document.querySelector("#familiar-name").value;
   const type = document.querySelector("#familiar-type").value;
   const hasWings = document.querySelector("#has-wings").checked;
   const wingType = hasWings ? document.querySelector("#wing-type").value : "No wings";
   const traits = Array.from(document.querySelectorAll(".traits:checked")).map(trait => trait.value).join(", ") || "None";
   const contractEnd = document.querySelector("#contract-end").value;

   const mood = currentMood;

   const description = `You have summoned: ${name}, a ${type} with ${wingType}. Traits: ${traits}. Mood: ${mood}. Contract ends on: ${contractEnd}`;
   alert(description);

   
}
