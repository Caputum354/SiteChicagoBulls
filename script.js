// ========================================
// CARTEIRINHA — atualiza o documento com o que é digitado
// ========================================
(function () {
  const form = document.getElementById("formSocio");
  if (!form) return;

  const aviso = document.getElementById("avisoForm");
  const campos = {
    nome: document.getElementById("nome"),
    nascimento: document.getElementById("nascimento"),
    cidade: document.getElementById("cidade"),
    plano: document.getElementById("plano"),
  };

  const card = {
    nome: document.getElementById("cardNome"),
    nascimento: document.getElementById("cardNascimento"),
    cidade: document.getElementById("cardCidade"),
    plano: document.getElementById("cardPlano"),
    matricula: document.getElementById("cardMatricula"),
    mrz: document.getElementById("cardMrz"),
  };

  function matriculaDe(texto) {
    let soma = 7;
    for (let i = 0; i < texto.length; i++) {
      soma = (soma * 31 + texto.charCodeAt(i)) % 1000000;
    }
    const num = String(soma).padStart(6, "0");
    return "CHI-" + num.slice(0, 3) + "-" + num.slice(3);
  }

  function atualizar() {
    const nome = campos.nome.value.trim().toUpperCase() || "NOME DO SÓCIO";
    const cidade =
      campos.cidade.value.trim().toUpperCase() || "CHICAGO";
    const plano = campos.plano.value;

    card.nome.textContent = nome;
    card.cidade.textContent = cidade;
    card.plano.textContent = plano;
    card.matricula.textContent = matriculaDe(nome + plano);

    if (campos.nascimento.value) {
      const [ano, mes, dia] = campos.nascimento.value.split("-");
      card.nascimento.textContent = dia + "/" + mes + "/" + ano;
    } else {
      card.nascimento.textContent = "--/--/----";
    }

    card.mrz.textContent =
      "BULLS<<SOCIO<<" +
      card.matricula.textContent.replace(/-/g, "") +
      "<<" +
      plano +
      "<<" +
      nome.split(" ")[0].slice(0, 8);
  }

  form.addEventListener("input", atualizar);
  form.addEventListener("change", atualizar);

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (!campos.nome.value.trim()) {
      aviso.textContent = "Escreva seu nome para gerar a carteirinha.";
      aviso.className = "form-aviso full erro";
      campos.nome.focus();
      return;
    }

    atualizar();
    aviso.textContent =
      "Carteirinha gerada ao lado. Demonstração visual: nada foi enviado.";
    aviso.className = "form-aviso full ok";
  });

  atualizar();
})();

// ========================================
// CARROSSEL DE LENDÁRIOS
// A correia anda sozinha e também pode ser arrastada com o
// mouse. Tudo por transform: o container é overflow: hidden,
// então não existe barra de rolagem em lugar nenhum.
// Sem JavaScript, a animação do CSS assume no lugar.
// ========================================
(function () {
  const carrossel = document.querySelector(".carrossel");
  const trilho = document.querySelector(".carrossel-trilho");

  if (!carrossel || !trilho) return;

  const VELOCIDADE = 28; // pixels por segundo
  let metade = 0;
  let posicao = 0;
  let pausado = false;
  let arrastando = false;
  let inicioX = 0;
  let inicioPos = 0;

  // o script assume o controle: a animação do CSS sai
  trilho.classList.add("manual");

  function medir() {
    metade = trilho.offsetWidth / 2;
  }

  // mantém a posição sempre dentro de uma cópia da lista.
  // Como as duas cópias são idênticas, o salto não aparece.
  function normalizar() {
    if (metade <= 0) return;
    while (posicao <= -metade) posicao += metade;
    while (posicao > 0) posicao -= metade;
  }

  function aplicar() {
    trilho.style.transform = "translateX(" + posicao + "px)";
  }

  let anterior = null;

  function correia(agora) {
    if (anterior === null) anterior = agora;

    // intervalo limitado: evita salto ao voltar de outra aba
    const intervalo = Math.min((agora - anterior) / 1000, 0.05);
    anterior = agora;

    if (!pausado && !arrastando) {
      posicao += VELOCIDADE * intervalo;
      normalizar();
      aplicar();
    }

    requestAnimationFrame(correia);
  }

  // ---- arraste com o mouse ----

  carrossel.addEventListener("pointerdown", function (evento) {
    if (evento.button !== 0 && evento.pointerType === "mouse") return;

    arrastando = true;
    inicioX = evento.clientX;
    inicioPos = posicao;

    carrossel.classList.add("arrastando");
    carrossel.setPointerCapture(evento.pointerId);
  });

  carrossel.addEventListener("pointermove", function (evento) {
    if (!arrastando) return;

    posicao = inicioPos + (evento.clientX - inicioX);
    normalizar();
    aplicar();
  });

  ["pointerup", "pointercancel", "pointerleave"].forEach(function (nome) {
    carrossel.addEventListener(nome, function () {
      arrastando = false;
      carrossel.classList.remove("arrastando");
    });
  });

  // roda do mouse na horizontal (trackpad, shift + roda, mouse com
  // roda lateral). A rolagem vertical da página continua normal.
  carrossel.addEventListener(
    "wheel",
    function (evento) {
      const desloca = evento.shiftKey ? evento.deltaY : evento.deltaX;
      if (!desloca) return;

      evento.preventDefault();

      posicao -= desloca;
      normalizar();
      aplicar();
    },
    { passive: false }
  );

  // ---- pausa com o mouse sobre um card ----

  trilho.addEventListener(
    "mouseover",
    function (evento) {
      if (evento.target.closest(".lendario")) pausado = true;
    },
    { passive: true }
  );

  trilho.addEventListener(
    "mouseout",
    function (evento) {
      const saindo = evento.target.closest(".lendario");
      const entrando = evento.relatedTarget
        ? evento.relatedTarget.closest(".lendario")
        : null;

      if (saindo && !entrando) pausado = false;
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", function () {
    pausado = document.hidden;
  });

  window.addEventListener("resize", function () {
    medir();
    normalizar();
    aplicar();
  });

  window.addEventListener("load", function () {
    medir();
    normalizar();
    aplicar();
  });

  medir();
  aplicar();
  requestAnimationFrame(correia);
})();