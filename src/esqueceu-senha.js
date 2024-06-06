window.onload = function (e) {
  var btnRecuperarSenha = document.getElementById("btnRecuperarSenha");

  var txtEmail = document.getElementById("txtEmail");

  txtEmail.focus();

  btnRecuperarSenha.onclick = function (e) {
    e.preventDefault();

    var email = txtEmail.value;

    if (email == "") {
      exibirMensagemErro("Informe o E-mail");
    } else {
      relizarLogin(email);
    }
  };

  function exibirMensagemErro(mensagem) {
    var spnErro = document.getElementById("spnErro");

    spnErro.innerText = mensagem;

    spnErro.style.display = "block";

    setTimeout(function () {
      spnErro.style.display = "none";
    }, 5000);
  }

  function relizarLogin(email) {
    var data = JSON.stringify({
      email: email,
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var result = JSON.parse(this.responseText);
        if (result.sucesso) {
          alert("E-mail enviado com sucesso!");
        } else {
          exibirMensagemErro(result.mensagem);
        }
      }
    });

    xhr.open("POST", "https://localhost:44368/api/usuario/esqueceuSenha");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
  }
};
