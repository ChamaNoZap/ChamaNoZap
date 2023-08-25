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

function openWhatsAppWeb() {
    var phoneNumber = document.getElementById("phone1","phone2").value;
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
    } else {
        document.getElementById("error-message").classList.remove("hidden");
        document.getElementById("phone1").classList.add("hidden")
        document.getElementById("phone2").classList.remove("hidden")
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        openWhatsAppWeb();
    }
}

var phone = document.getElementById("phone2", "phone2");

phone.addEventListener("input", () => {

    var limparValor = phone.value.replace(/\D/g, "").substring(0,11);
    var numerosArray = limparValor.split("");
    var numeroFormatado = "";
    if(numerosArray.length > 0){
        numeroFormatado += `(${numerosArray.slice(0,2).join("")})`;
    }
    if(numerosArray.length > 2){
        numeroFormatado += ` ${numerosArray.slice(2,7).join("")}`;
    }
    if(numerosArray.length > 7){
        numeroFormatado += `-${numerosArray.slice(7,11).join("")}`;
    }

    phone.value = numeroFormatado;
});

