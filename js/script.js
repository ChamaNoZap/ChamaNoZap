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
}, 100);

function hideLoadingScreen() {
    var loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
}

function openWhatsAppWeb() {
    var phoneNumber = document.getElementById("phone").value;

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

var phone = document.getElementById("phone");

phone.addEventListener("input", () => {
    var limparValor = phone.value.replace(/\D/g, "").substring(0, 11);
    var numeroFormatado = formatPhoneNumber(limparValor);

    phone.value = numeroFormatado;
});