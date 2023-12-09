


//newwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
function updateTextInput(val, inputId) {
  document.getElementById(inputId).value = val;
  calculateSIP(); // Update calculation when slider changes
}

function calculateSIP() {
  const investmentAmount = parseFloat(document.getElementById('investment').value);
  const annualInterest = parseFloat(document.getElementById('interest').value);
  const investmentDuration = parseFloat(document.getElementById('duration').value);

  const monthlyRate = annualInterest / 12 / 100;
  const totalMonths = investmentDuration * 12;

  const futureValue =
    investmentAmount *
    ((Math.pow((1 + monthlyRate), totalMonths) - 1) / monthlyRate) *
    (1 + monthlyRate);

  const totalInvestment = investmentAmount * totalMonths;
  const totalProfit = futureValue - totalInvestment;

  const resultElement = document.getElementById('result');
  resultElement.innerHTML = `
    <p>Total Investment: ₹${totalInvestment.toFixed(2)}</p>
    <p>Future Value: ₹${futureValue.toFixed(2)}</p>
    <p>Total Profit: ₹${totalProfit.toFixed(2)}</p>
    <hr>
    <div class="mt-4">
    <canvas id="sipChart" width="400" height="200"></canvas>
  </div>
  `;

  // Data for the pie chart representing investment breakdown
  const labels = ['Investment', 'Profit'];
  const data = [totalInvestment, totalProfit];
  const backgroundColors = ['#FF6384', '#36A2EB'];

  const canvasElement = document.getElementById('sipChart');
  canvasElement.width = 400; // Adjust the width of the chart
  canvasElement.height = 200; // Adjust the height of the chart

  const ctx = canvasElement.getContext('2d');
  const sipChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            font: {
              size: 12
            }
          }
        }
      }
    }
  });
}
