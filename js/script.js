var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});

setTimeout(function() {
    hideLoadingScreen();
}, 3000);

function hideLoadingScreen() {
    var loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
}

function openWhatsAppWeb() {
    var phoneNumber1 = document.getElementById("phone1").value;
    var phoneNumber2 = document.getElementById("phone2").value;

    var phoneNumber = phoneNumber1.trim() || phoneNumber2.trim();

    if (phoneNumber) {
        var cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

        var isMobile = window.innerWidth < 640;

        if (isMobile) {
            var mobileUrl = "https://wa.me/" + cleanedPhoneNumber;
            window.open(mobileUrl, "_blank");
        } else {
            var desktopUrl = "https://web.whatsapp.com/send?phone=" + cleanedPhoneNumber;
            window.open(desktopUrl, "_blank");
        }

        var formattedPhoneNumber = formatPhoneNumber(cleanedPhoneNumber);
        saveContact(formattedPhoneNumber);
    } else {
        document.getElementById("error-message").classList.remove("hidden");
        document.getElementById("phone1").classList.add("hidden");
        document.getElementById("phone2").classList.remove("hidden");
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        openWhatsAppWeb();
    }
}

function formatPhoneNumber(phoneNumber) {
    var numbersArray = phoneNumber.split("");
    var formattedNumber = "";

    if (numbersArray.length > 0) {
        formattedNumber += `(${numbersArray.slice(0, 2).join("")})`;
    }
    if (numbersArray.length > 2) {
        formattedNumber += ` ${numbersArray.slice(2, 7).join("")}`;
    }
    if (numbersArray.length > 7) {
        formattedNumber += `-${numbersArray.slice(7, 11).join("")}`;
    }

    return formattedNumber;
}

var phone = document.getElementById("phone1", "phone2");

phone.addEventListener("input", () => {
    var limparValor = phone.value.replace(/\D/g, "").substring(0, 11);
    var numeroFormatado = formatPhoneNumber(limparValor);

    phone.value = numeroFormatado;
});

// recentNumbers.js

// Get references to the input and button elements
const phoneInput = document.getElementById('phone1');
const sendButton = document.querySelector('.send-button');

// Get the recent numbers list container
const recentNumbersList = document.getElementById('recent-numbers-list');

// Event listener for the send button
sendButton.addEventListener('click', function () {
  const phoneNumber = phoneInput.value.trim();
  
  if (phoneNumber) {
    // Add the number to the recent numbers list
    addToRecentNumbersList(phoneNumber);
    
    // Clear the input field
    phoneInput.value = '';
  }
});

// recentNumbers.js

// Load recent numbers from localStorage when the page loads
window.addEventListener('load', function () {
    const savedNumbers = JSON.parse(localStorage.getItem('recentNumbers')) || [];
    savedNumbers.forEach(number => {
      addToRecentNumbersList(number);
    });
  });
  
  // Event listener for the send button
  sendButton.addEventListener('click', function () {
    const phoneNumber = phoneInput.value.trim();
    
    if (phoneNumber) {
      addToRecentNumbersList(phoneNumber);
      
      // Save the updated list to localStorage
      saveRecentNumbers();
      
      phoneInput.value = '';
    }
  });
  
  // Function to add a number to the recent numbers list
  function addToRecentNumbersList(number) {
    const listItem = document.createElement('li');
    listItem.textContent = number;
    recentNumbersList.prepend(listItem);
  }
  
  // Function to save the recent numbers to localStorage
  function saveRecentNumbers() {
    const listItems = Array.from(recentNumbersList.querySelectorAll('li'));
    const recentNumbers = listItems.map(item => item.textContent);
    localStorage.setItem('recentNumbers', JSON.stringify(recentNumbers));
  }
  

// recentNumbers.js

// Load recent numbers from localStorage and display them on page load
window.addEventListener('load', function () {
    const savedNumbers = JSON.parse(localStorage.getItem('recentNumbers')) || [];
    
    // Display initial saved numbers
    const initialNumbersList = document.getElementById('initial-recent-numbers');
    savedNumbers.forEach(number => {
      const listItem = document.createElement('li');
      listItem.textContent = number;
      initialNumbersList.appendChild(listItem);
    });
  
    // ... rest of the code
});
  