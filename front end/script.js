const goal = 100;
let count = 0;

const countDisplay = document.querySelector("#count");
const progress = document.querySelector("#progress");
const progressFill = document.querySelector("#progress-fill");
const progressLabel = document.querySelector("#progress-label");
const statusMessage = document.querySelector("#status");
const incrementButton = document.querySelector("#increment");
const decrementButton = document.querySelector("#decrement");
const resetButton = document.querySelector("#reset");

function render(message) {
  const formattedCount = new Intl.NumberFormat("pt-BR").format(count);
  const percentage = Math.min((count / goal) * 100, 100);

  countDisplay.textContent = formattedCount;
  progressFill.style.width = `${percentage}%`;
  progress.setAttribute("aria-valuenow", String(Math.min(count, goal)));
  progressLabel.textContent = `${formattedCount} / ${goal}`;
  decrementButton.disabled = count === 0;
  resetButton.disabled = count === 0;
  statusMessage.textContent = message;

  countDisplay.classList.remove("updated");
  requestAnimationFrame(() => countDisplay.classList.add("updated"));
  window.setTimeout(() => countDisplay.classList.remove("updated"), 180);
}

incrementButton.addEventListener("click", () => {
  count += 1;

  if (count === goal) {
    render("Meta alcançada! Que tal continuar?");
  } else if (count > goal) {
    render("Meta superada! Continue no seu ritmo.");
  } else {
    render(count === 1 ? "Boa! Seu primeiro clique já foi." : "Mais um passo na direção da sua meta.");
  }
});

decrementButton.addEventListener("click", () => {
  if (count === 0) return;

  count -= 1;
  render(count === 0 ? "Contador zerado. Pronto para recomeçar?" : "Um clique removido. Ajuste no seu ritmo.");
});

resetButton.addEventListener("click", () => {
  count = 0;
  render("Contador zerado. Pronto para recomeçar?");
});
