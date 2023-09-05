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
}, 2000);

function hideLoadingScreen() {
    var loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
}

function openWhatsAppWeb(phoneNumber) {

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

function isValidPhoneNumber(phoneNumber) {
    var phonePattern = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return phonePattern.test(phoneNumber);
}

function savePhoneNumber() {
    var phoneNumber = document.getElementById("phone").value;

    if (isValidPhoneNumber(phoneNumber)) {
        var savedPhoneNumbers = JSON.parse(localStorage.getItem("savedPhoneNumbers")) || [];
        savedPhoneNumbers.push(phoneNumber);
        localStorage.setItem("savedPhoneNumbers", JSON.stringify(savedPhoneNumbers));
        document.getElementById("phone").value = "";
        displaySavedPhoneNumbers(); 
    } else {
        document.getElementById("error-message").classList.remove("hidden");
    }
}

function displaySavedPhoneNumbers() {
    var savedPhoneNumbers = JSON.parse(localStorage.getItem("savedPhoneNumbers")) || [];
    var phoneNumberList = document.getElementById("initial-recent-numbers");

    phoneNumberList.innerHTML = "";

    var listTitle = document.createElement("h2");
    listTitle.textContent = "Números Salvos";
    listTitle.classList.add("mb-5", "text-1x1", "font-bold", "leading-none", "tracking-tight", "text-gray-900", "md:text-5xl", "lg:text-2xl", "dark:text-white");
    phoneNumberList.appendChild(listTitle);


    savedPhoneNumbers.forEach(function (phoneNumberData) {

        var listItem = document.createElement("li");
        listItem.classList.add("flex", "items-center", "justify-center", "w-full", "py-2", "gap-2", "border-b", "border-gray-300", "dark:border-gray-700");

        var contactIcon = document.createElement("span");
        contactIcon.classList.add("w-6", "h-6");

        var phoneNumberElement = document.createElement("span");
        phoneNumberElement.textContent = phoneNumberData;
        phoneNumberElement.classList.add("text-gray-700", "dark:text-gray-300");

        // Crie o elemento contactIcon
        var contactIcon = document.createElement("span");
        contactIcon.classList.add("flex", "items-center", "justify-center", "w-6", "h-6", "text-gray-800", "dark:text-white");

        // Crie um elemento SVG
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "w-5 h-5 text-gray-800 dark:text-white");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("fill", "currentColor");
        svg.setAttribute("viewBox", "0 0 14 18");

        // Crie o elemento de caminho (path) dentro do SVG
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z");

        // Adicione o elemento de caminho ao SVG
        svg.appendChild(path);

        // Adicione o elemento SVG ao contactIcon
        contactIcon.appendChild(svg);        

        var date = document.createElement("span");
        date.textContent = phoneNumberData.date;
        date.classList.add("flex", "items-center", "justify-center", "ml-auto", "text-gray-500", "dark:text-gray-400"); 

        var sendMessageButton = document.createElement("button");
        sendMessageButton.textContent = "Enviar";
        sendMessageButton.classList.add("send-button", "text-white", "bg-blue-700", "hover:bg-blue-800", "focus:ring-4", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "dark:bg-blue-600", "dark:hover:bg-blue-700", "focus:outline-none", "dark:focus:ring-blue-800"); // Adicione classes do Tailwind para estilo
        sendMessageButton.setAttribute("phone", phoneNumberData)



        var sendMessageButtons = document.querySelectorAll(".send-button");
        sendMessageButtons.forEach(button => {
        button.addEventListener("click", function(){
            openWhatsAppWeb(button.getAttribute("phone"))
        })
        }


            /*
            function (button) {
            button.addEventListener(

                "click", function () {
                var phoneNumber = this.getAttribute("data-phone-number");
                openWhatsAppWeb(phoneNumber);
            });
        }*/);

        listItem.appendChild(contactIcon);
        listItem.appendChild(phoneNumberElement);
        listItem.appendChild(date);
        listItem.appendChild(sendMessageButton);
        phoneNumberList.appendChild(listItem);
    });
}




document.querySelector(".send-button").addEventListener("click", savePhoneNumber);

displaySavedPhoneNumbers();