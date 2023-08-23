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

function redirecionarParaWhatsApp() {
  const telNum = document.getElementById("phone").value;

  if (telNum.trim() === "") {
    exibirPopup();
    return;
  }

  const whatsappURL = `https://wa.me/{encodeURIComponent(telNum)}`;
  window.open(whatsappURL, "_blank");
}

// Receber seletor do id phone
var phone = document.getElementById("phone");

phone.addEventListener("input", () => {

    // Remover os caracteres não numéricos usando a expressão regular /\D/g e limitar a 11 dígitos.
    var limparValor = phone.value.replace(/\D/g, "").substring(0,11);

    // Dividir a string em um array de caracteres individuais.
    var numerosArray = limparValor.split("");

    // Criar a variável para receber o número formatado
    var numeroFormatado = "";
    
    // Acessa o IF quando a quantidade de números é maior do que zero
    if(numerosArray.length > 0){
        // Formatar o DD e concatenar o valor
        // slice - extraie uma parte do array
        // join - unir os elementos do array em uma única string
        numeroFormatado += `(${numerosArray.slice(0,2).join("")})`;
    }

    // Acessa o IF quando a quantidade de números é maior do que dois
    if(numerosArray.length > 2){
        // Formatar o número do telefone e concatenar o valor
        // slice - extraie uma parte do array
        // join - unir os elementos do array em uma única string
        numeroFormatado += ` ${numerosArray.slice(2,7).join("")}`;
    }

    // Acessa o IF quando a quantidade de números é maior do que sete
    if(numerosArray.length > 7){
        // Formatar o número do telefone e concatenar o valor
        // slice - extraie uma parte do array
        // join - unir os elementos do array em uma única string
        numeroFormatado += `-${numerosArray.slice(7,11).join("")}`;
    }

    // Enviar para o campo o número formatado
    phone.value = numeroFormatado;
});

