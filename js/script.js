function redirecionarParaWhatsApp() {
  const telNum = document.getElementById("phone").value;

  if (telNum.trim() === "") {
    exibirPopup();
    return;
  }

  const whatsappURL = `https://api.whatsapp.com/send?phone=${encodeURIComponent(telNum)}`;
  window.open(whatsappURL, "_blank");
}