function redirecionarParaWhatsApp() {
    const telNum = document.getElementById("phone").value;
    const whatsappURL = `https://api.whatsapp.com/send?phone=${encodeURIComponent(telNum)}`;
    window.open(whatsappURL, "_blank");
  }

document.getElementById("phone").addEventListener("keyup", function(event) {
if (event.key === "Enter") {
    redirecionarParaWhatsApp();
}
});