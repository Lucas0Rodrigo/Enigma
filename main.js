// Troque as senhas abaixo pelas que você deseja
const SENHA_1 = "13250";
const SENHA_2 = "08532";
// Caminho do PDF
const PDF_URL = "Arq/E Se For Amor.pdf";

// --- VIDAS ---
let vidas = 3;
const vidasDiv = document.createElement('div');
vidasDiv.id = "vidas-box";
vidasDiv.style.textAlign = "center";
vidasDiv.style.marginBottom = "10px";
vidasDiv.style.fontWeight = "bold";
vidasDiv.style.color = "#b71c1c";
function atualizarVidas() {
  vidasDiv.innerHTML = `Vidas: ${'❤️'.repeat(vidas)}${'🤍'.repeat(3-vidas)}`;
}
document.getElementById("senha-form").insertBefore(vidasDiv, document.getElementById("senha-form").firstChild);
atualizarVidas();

document.getElementById("senha-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const s1 = document.getElementById("senha1").value;
  const s2 = document.getElementById("senha2").value;
  const resultado = document.getElementById("resultado");

  if (s1 === SENHA_1 && s2 === SENHA_2) {
    resultado.innerHTML = `
      <div>
        <p style="color: #6a1b9a; font-weight: 600;">Senhas corretas! Baixe o PDF abaixo:</p>
        <a href="${PDF_URL}" download class="btn" style="margin-top: 14px;">Baixar PDF</a>
      </div>
    `;
  } else {
    vidas--;
    atualizarVidas();
    if (vidas > 0) {
      resultado.innerHTML = `<div class="shake-fade" style="color: #b39ddb; font-weight: 600;">Senhas incorretas. Tente novamente!</div>`;
    } else {
      // Volta para a pergunta 1
      vidas = 3;
      atualizarVidas();
      resultado.innerHTML = `<div class="shake-fade" style="color: #b71c1c; font-weight: 600;">Você perdeu todas as vidas! Voltando ao início...</div>`;
      setTimeout(() => {
        document.getElementById('senha-form').style.display = 'none';
        document.getElementById('pergunta1').style.display = '';
        document.getElementById('pergunta2').style.display = 'none';
        document.getElementById('pergunta3').style.display = 'none';
        document.getElementById('resultado').innerHTML = '';
        document.getElementById('resposta1').value = '';
        document.getElementById('resposta2').value = '';
        document.getElementById('senha1').value = '';
        document.getElementById('senha2').value = '';
        document.getElementById('feedback1').textContent = '';
        document.getElementById('feedback2').textContent = '';
      }, 1500);
    }
  }
});

function chuvaDeCoracoes() {
  const container = document.getElementById('chuva-coracoes');
  if (!container) return;
  const coracao = document.createElement('img');
  coracao.src = 'Arq/Nos.png';
  coracao.className = 'coracao-nos';
  const left = Math.random() * 100;
  coracao.style.left = `${left}%`;
  coracao.style.transform = "translateX(-50%)";
  coracao.style.width = `${70 + Math.random()*40}px`;
  coracao.style.opacity = 0.8 + Math.random()*0.2;
  container.appendChild(coracao);
  setTimeout(() => coracao.remove(), 3000);
}
setInterval(chuvaDeCoracoes, 700);

// PERGUNTA 1
window.verificar1 = function() {
  const resposta = document.getElementById('resposta1').value;
  const feedback = document.getElementById('feedback1');
  if (resposta == "2035") {
    feedback.textContent = "Correto!";
    feedback.className = "correto";
    document.getElementById('pergunta2').style.display = '';
    setTimeout(() => {
      document.getElementById('pergunta1').style.display = 'none';
    }, 700);
  } else {
    feedback.textContent = "Tente novamente!";
    feedback.className = "incorreto";
  }
}

// PERGUNTA 2
window.verificar2 = function() {
  const resposta = document.getElementById('resposta2').value.trim().toLowerCase();
  const feedback = document.getElementById('feedback2');
  if (resposta === "julia") {
    feedback.textContent = "Correto!";
    feedback.className = "correto";
    document.getElementById('pergunta3').style.display = '';
    setTimeout(() => {
      document.getElementById('pergunta2').style.display = 'none';
    }, 700);
  } else {
    feedback.textContent = "Tente novamente!";
    feedback.className = "incorreto";
  }
}

// PERGUNTA 3
window.verificar3 = function() {
  const resposta = document.getElementById('resposta3').value.trim().toUpperCase();
  const feedback = document.getElementById('feedback3');
  if (resposta === "CNPEM") {
    feedback.textContent = "Correto!";
    feedback.className = "correto";
    document.getElementById('pergunta4').style.display = '';
    setTimeout(() => {
      document.getElementById('pergunta3').style.display = 'none';
    }, 700);
  } else {
    feedback.textContent = "Tente novamente!";
    feedback.className = "incorreto";
  }
}

// PERGUNTA 4 (Código Morse)
window.verificar4 = function() {
  const resposta = document.getElementById('resposta4').value.trim().toUpperCase();
  const feedback = document.getElementById('feedback4');
  if (resposta === "LEIA O LIVRO") {
    feedback.textContent = "Correto!";
    feedback.className = "correto";
    document.getElementById('pergunta5').style.display = '';
    setTimeout(() => {
      document.getElementById('pergunta4').style.display = 'none';
    }, 700);
  } else {
    feedback.textContent = "Tente novamente!";
    feedback.className = "incorreto";
  }
}

// --- QUEBRA-CABEÇA ---
// Altere para usar pergunta5
function iniciaQuebraCabeca() {
  const tabuleiro = document.getElementById('tabuleiro-qc');
  const pecasSoltas = document.getElementById('pecas-soltas');
  if (!tabuleiro || !pecasSoltas) return;

  // Cria slots no tabuleiro
  tabuleiro.innerHTML = '';
  for (let i = 0; i < 25; i++) {
    const slot = document.createElement('div');
    slot.className = 'slot-qc';
    slot.dataset.index = i;
    slot.style.position = 'relative';
    tabuleiro.appendChild(slot);
  }

  // Cria peças embaralhadas
  pecasSoltas.innerHTML = '';
  let indices = Array.from({length: 25}, (_, i) => i);
  indices = indices.sort(() => Math.random() - 0.5);

  indices.forEach(idx => {
    const peca = document.createElement('img');
    const num = String(idx + 1).padStart(2, '0');
    // Ajusta a extensão conforme o número da peça
    let ext = (num === "01" || num === "25") ? "png" : "gif";
    peca.src = `Arq/qc/1_${num}.${ext}`;
    peca.className = 'qc-peca';
    peca.draggable = false;
    peca.dataset.idx = idx;
    // Espalha as peças aleatoriamente na área de peças soltas
    peca.style.left = `${Math.random()*180+10}px`;
    peca.style.top = `${Math.random()*180+10}px`;
    pecasSoltas.appendChild(peca);
  });

  // Drag & Drop manual (mobile e desktop)
  let arrastando = null, offsetX = 0, offsetY = 0, origem = null;

  function startDrag(e) {
    let alvo = e.target;
    if (!alvo.classList.contains('qc-peca')) return;
    arrastando = alvo;
    origem = alvo.parentElement;
    arrastando.style.zIndex = 1000;
    const rect = arrastando.getBoundingClientRect();
    const evt = e.touches ? e.touches[0] : e;
    offsetX = evt.clientX - rect.left;
    offsetY = evt.clientY - rect.top;
    document.addEventListener('mousemove', moveDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchmove', moveDrag, {passive: false});
    document.addEventListener('touchend', endDrag);
    e.preventDefault();
  }

  function moveDrag(e) {
    if (!arrastando) return;
    const evt = e.touches ? e.touches[0] : e;
    let x, y;
    if (origem === pecasSoltas) {
      x = evt.clientX - pecasSoltas.getBoundingClientRect().left - offsetX;
      y = evt.clientY - pecasSoltas.getBoundingClientRect().top - offsetY;
      arrastando.style.left = `${x}px`;
      arrastando.style.top = `${y}px`;
    } else {
      x = evt.clientX - tabuleiro.getBoundingClientRect().left - offsetX;
      y = evt.clientY - tabuleiro.getBoundingClientRect().top - offsetY;
      arrastando.style.position = 'absolute';
      arrastando.style.left = `${x}px`;
      arrastando.style.top = `${y}px`;
      tabuleiro.appendChild(arrastando);
    }
    e.preventDefault();
  }

  function endDrag(e) {
    if (!arrastando) return;
    const idx = parseInt(arrastando.dataset.idx);
    let encaixou = false;
    // Verifica se está próximo de algum slot
    for (let i = 0; i < 25; i++) {
      const slot = tabuleiro.children[i];
      const slotRect = slot.getBoundingClientRect();
      const pecaRect = arrastando.getBoundingClientRect();
      const dist = Math.hypot(
        (pecaRect.left + 25) - (slotRect.left + 25),
        (pecaRect.top + 25) - (slotRect.top + 25)
      );
      if (dist < 30) {
        // Se já tem peça, devolve ela para as peças soltas
        if (slot.firstChild) {
          const outra = slot.firstChild;
          outra.style.position = 'absolute';
          outra.style.left = `${Math.random()*180+10}px`;
          outra.style.top = `${Math.random()*180+10}px`;
          pecasSoltas.appendChild(outra);
        }
        arrastando.style.position = 'static';
        slot.appendChild(arrastando);
        encaixou = true;
        break;
      }
    }
    if (!encaixou) {
      // Volta para área de peças soltas
      arrastando.style.position = 'absolute';
      arrastando.style.left = `${Math.random()*180+10}px`;
      arrastando.style.top = `${Math.random()*180+10}px`;
      pecasSoltas.appendChild(arrastando);
    }
    arrastando.style.zIndex = 10;
    arrastando = null;
    origem = null;
    document.removeEventListener('mousemove', moveDrag);
    document.removeEventListener('mouseup', endDrag);
    document.removeEventListener('touchmove', moveDrag);
    document.removeEventListener('touchend', endDrag);

    // Checa se terminou
    let completo = true;
    for (let i = 0; i < 25; i++) {
      const slot = tabuleiro.children[i];
      if (!slot.firstChild || parseInt(slot.firstChild.dataset.idx) !== i) {
        completo = false;
        break;
      }
    }
    if (completo) {
      document.getElementById('qc-feedback').textContent = "Parabéns! Quebra-cabeça completo!";
      document.getElementById('qc-feedback').className = "correto";
      setTimeout(() => {
        document.getElementById('pergunta5').style.display = 'none';
        document.getElementById('senha-form').style.display = '';
      }, 1200);
    } else {
      document.getElementById('qc-feedback').textContent = "";
      document.getElementById('qc-feedback').className = "";
    }
  }

  pecasSoltas.addEventListener('mousedown', startDrag);
  pecasSoltas.addEventListener('touchstart', startDrag, {passive: false});
  tabuleiro.addEventListener('mousedown', startDrag);
  tabuleiro.addEventListener('touchstart', startDrag, {passive: false});
}

// Inicia o quebra-cabeça quando a pergunta 3 aparecer
const observer = new MutationObserver(() => {
  const p5 = document.getElementById('pergunta5');
  if (p5 && p5.style.display !== 'none' && !p5.dataset.qc) {
    p5.dataset.qc = "ok";
    iniciaQuebraCabeca();
  }
});
observer.observe(document.body, {subtree:true, childList:true, attributes:true});

// ADMIN
document.getElementById('admin-btn').onclick = function() {
  const senha = prompt("Digite a senha de admin:");
  if (senha === "088985") {
    document.getElementById('admin-panel').style.display = '';
  } else if (senha !== null) {
    alert("Senha incorreta!");
  }
};

window.pularFase = function(fase) {
  // Esconde tudo
  document.getElementById('pergunta1').style.display = 'none';
  document.getElementById('pergunta2').style.display = 'none';
  document.getElementById('pergunta3').style.display = 'none';
  document.getElementById('pergunta4').style.display = 'none';
  document.getElementById('pergunta5').style.display = 'none';
  document.getElementById('senha-form').style.display = 'none';
  document.getElementById('resultado').innerHTML = '';
  document.getElementById('feedback1').textContent = '';
  document.getElementById('feedback2').textContent = '';
  document.getElementById('feedback3').textContent = '';
  document.getElementById('feedback4').textContent = '';
  // Mostra a fase escolhida
  if (fase === 1) {
    document.getElementById('pergunta1').style.display = '';
  } else if (fase === 2) {
    document.getElementById('pergunta2').style.display = '';
  } else if (fase === 3) {
    document.getElementById('pergunta3').style.display = '';
  } else if (fase === 4) {
    document.getElementById('pergunta4').style.display = '';
  } else if (fase === 5) {
    document.getElementById('pergunta5').style.display = '';
  } else if (fase === 6) {
    document.getElementById('senha-form').style.display = '';
  }
  document.getElementById('admin-panel').style.display = 'none';
};