// Mảng các người chơi với thuật toán dự đoán ngẫu nhiên và màu sắc riêng
const players = [
  { name: 'Player 1 (Markov Chain)', algorithm: 'Markov Chain', prediction: null, results: [], color: '#3498db' },
  { name: 'Player 2 (Naive Bayes)', algorithm: 'Naive Bayes', prediction: null, results: [], color: '#e74c3c' },
  { name: 'Player 3 (Pattern Recognition)', algorithm: 'Pattern Recognition', prediction: null, results: [], color: '#f39c12' },
  { name: 'Player 4 (K-means Clustering)', algorithm: 'K-means Clustering', prediction: null, results: [], color: '#2ecc71' },
  { name: 'Player 5 (Monte Carlo)', algorithm: 'Monte Carlo', prediction: null, results: [], color: '#9b59b6' },
  { name: 'Player 6 (Markov Decision)', algorithm: 'Markov Decision Process', prediction: null, results: [], color: '#1abc9c' },
  { name: 'Player 7 (Genetic Algorithm)', algorithm: 'Genetic Algorithm', prediction: null, results: [], color: '#f1c40f' },
  { name: 'Player 8 (Neural Networks)', algorithm: 'Neural Networks', prediction: null, results: [], color: '#e67e22' },
  { name: 'Player 9 (SVM)', algorithm: 'SVM', prediction: null, results: [], color: '#16a085' },
  { name: 'Player 10 (Bayesian Inference)', algorithm: 'Bayesian Inference', prediction: null, results: [], color: '#8e44ad' }, // Thuật toán Bayesian
  { name: 'Player 11 (Probability-based)', algorithm: 'Probability-based', prediction: null, results: [], color: '#f39c12' }, // Thuật toán Probability-based
  { name: 'Player 12 (Pattern Recognition)', algorithm: 'Pattern Recognition', prediction: null, results: [], color: '#d35400' }, // Thuật toán Pattern Recognition
  { name: 'Player 13 (Statistical Prediction)', algorithm: 'Statistical Prediction', prediction: null, results: [], color: '#2980b9' } // Thuật toán Statistical Prediction
];

// Kết quả nhập vào (P hoặc B)
let results = [];
let lastResult = '';  // Kết quả cuối cùng (P hoặc B)

// Cập nhật kết quả dự đoán và kiểm tra kết quả đúng/sai (Win/Loss)
function updatePlayerResults() {
  players.forEach(player => {
    if (player.prediction === lastResult) {
      player.results.push('W');  // Nếu dự đoán đúng, ghi "W"
    } else {
      player.results.push('L');  // Nếu dự đoán sai, ghi "L"
    }
  });
  renderPlayersPredictions();
  displayFinalResult(); // Cập nhật kết quả cuối cùng
}

// Hiển thị kết quả dự đoán của các người chơi
function renderPlayersPredictions() {
  const playersContainer = document.getElementById('players-predictions');
  playersContainer.innerHTML = players.map(player => {
    return `<tr>
              <td style="color: ${player.color};">${player.name}</td>
              <td>${player.algorithm}</td>
              <td>${player.prediction}</td>
              <td class="results-column">${player.results.join(' ')}</td>
            </tr>`;
  }).join('');
}

// Cập nhật kết quả cuối cùng (người chơi có số lần "W" nhiều nhất)
function displayFinalResult() {
  let maxWins = 0;
  let finalPlayers = [];

  players.forEach(player => {
    const winCount = player.results.filter(result => result === 'W').length;
    if (winCount > maxWins) {
      maxWins = winCount;
      finalPlayers = [player];
    } else if (winCount === maxWins) {
      finalPlayers.push(player);
    }
  });

  const finalResultSection = document.getElementById('final-result');
  if (finalPlayers.length > 0) {
    const playerNames = finalPlayers.map(player => player.name).join(', ');
    const nextPrediction = finalPlayers[0].prediction;
    finalResultSection.innerHTML = `<strong>Kết quả cuối cùng:</strong> Các người chơi với ${maxWins} lần thắng: ${playerNames}. Dự đoán ván tiếp theo: ${nextPrediction}`;
  }
}

// Các chức năng nhập kết quả cho Baccarat
document.getElementById('P-btn').onclick = () => addResult("P", "blue");
document.getElementById('B-btn').onclick = () => addResult("B", "red");
document.getElementById('undo-btn').onclick = () => undoResult();
document.getElementById('reset-btn').onclick = () => resetResults();

function addResult(value, color) {
  results.push({ value, color });
  lastResult = value;

  players.forEach(player => {
    player.prediction = Math.random() > 0.5 ? 'P' : 'B'; // Dự đoán ngẫu nhiên cho mỗi người chơi
  });

  updatePlayerResults();
  renderResults();
}

function renderResults() {
  const resultsList = document.getElementById('results-list');
  resultsList.innerHTML = results.map(r => `<span style="color: ${r.color};">${r.value}</span>`).join(' ');
  renderPlayersPredictions();
  displayFinalResult();
}

function undoResult() {
  if (results.length > 0) {
    results.pop();
    lastResult = results.length ? results[results.length - 1].value : '';
    players.forEach(player => {
      player.prediction = Math.random() > 0.5 ? 'P' : 'B';
    });
    updatePlayerResults();
    renderResults();
  }
}

function resetResults() {
  results = [];
  players.forEach(player => {
    player.prediction = null;
    player.results = [];
  });
  renderResults();
}
