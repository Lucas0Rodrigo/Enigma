// Troque as senhas abaixo pelas que você deseja
const SENHA_1 = "13250";
const SENHA_2 = "08532";
// Caminho do PDF
const PDF_URL = "Arq/Só dia 28!.pdf";

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
    resultado.innerHTML = `<div class="shake-fade" style="color: #b39ddb; font-weight: 600;">Senhas incorretas. Tente novamente!</div>`;
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
