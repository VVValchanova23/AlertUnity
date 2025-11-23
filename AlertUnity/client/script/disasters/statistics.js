const API_CONFIG = {
  baseUrl: 'http://localhost:5000/api',
  fire: '/fire',
  flood: '/flood',
  hurricane: '/hurricane',
  earthquake: '/earthquake',
  all: '/all',
  stats: '/stats'
};

let currentDisaster = 'fire';
const charts = {};
let disasterData = {};
let isLoading = false;

const DOM = {
  fireValue: document.getElementById('fireValue'),
  floodValue: document.getElementById('floodValue'),
  hurricaneValue: document.getElementById('hurricaneValue'),
  earthquakeValue: document.getElementById('earthquakeValue'),
  pieChartTitle: document.getElementById('pieChartTitle'),
  chartCards: document.querySelectorAll('.chart-card'),
  statCards: document.querySelectorAll('.stat-card'),
  pieCanvas: document.getElementById('pieChart'),
  lineCanvas: document.getElementById('lineChart'),
  areaCanvas: document.getElementById('areaChart'),
  barCanvas: document.getElementById('barChart')
};

function getCSSVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function showLoading(show = true) {
  isLoading = show;
  DOM.chartCards.forEach(card => {
    card.style.opacity = show ? '0.5' : '1';
    card.style.pointerEvents = show ? 'none' : 'auto';
  });
}

function getFallbackData(type) {
  return {
    severity_distribution: { high: 50, medium: 70, low: 30 },
    severity_trend: {
      labels: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'],
      high: [12, 15, 18, 16, 20, 19, 22, 24, 21, 23, 25, 27],
      medium: [20, 23, 25, 24, 27, 26, 29, 30, 28, 31, 32, 34],
      low: [8, 11, 13, 12, 14, 13, 16, 17, 15, 18, 19, 21]
    },
    cumulative_reports: {
      labels: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'],
      cumulative: [40, 89, 145, 197, 258, 316, 383, 454, 518, 590, 666, 748]
    },
    hourly_distribution: {
      labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      counts: [5, 3, 2, 4, 6, 10, 15, 20, 25, 30, 35, 40, 42, 38, 36, 32, 28, 24, 20, 18, 15, 12, 10, 7]
    }
  };
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchDisasterData(type) {
  try {
    const data = await fetchJson(`${API_CONFIG.baseUrl}${API_CONFIG[type]}`);
    return {
      total_incidents: data.total_incidents || 0,
      charts: data.charts || getFallbackData(type)
    };
  } catch (err) {
    console.error(`fetchDisasterData(${type}) failed:`, err);
    return {
      total_incidents: 0,
      charts: getFallbackData(type)
    };
  }
}

async function fetchAllDisasterData() {
  showLoading(true);
  try {
    const res = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.all}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const allData = await res.json();

    disasterData = {
      fire: {
        total_incidents: allData.fires?.total_incidents || 0,
        charts: allData.fires?.charts || getFallbackData('fire')
      },
      flood: {
        total_incidents: allData.floods?.total_incidents || 0,
        charts: allData.floods?.charts || getFallbackData('flood')
      },
      hurricane: {
        total_incidents: allData.hurricanes?.total_incidents || 0,
        charts: allData.hurricanes?.charts || getFallbackData('hurricane')
      },
      earthquake: {
        total_incidents: allData.earthquakes?.total_incidents || 0,
        charts: allData.earthquakes?.charts || getFallbackData('earthquake')
      }
    };
  } catch (err) {
    console.error('fetchAllDisasterData failed:', err);
    const [fire, flood, hurricane, earthquake] = await Promise.all([
      fetchDisasterData('fire'),
      fetchDisasterData('flood'),
      fetchDisasterData('hurricane'),
      fetchDisasterData('earthquake')
    ]);
    disasterData = { fire, flood, hurricane, earthquake };
  } finally {
    if (DOM.fireValue) DOM.fireValue.textContent = disasterData.fire?.total_incidents || 0;
    if (DOM.floodValue) DOM.floodValue.textContent = disasterData.flood?.total_incidents || 0;
    if (DOM.hurricaneValue) DOM.hurricaneValue.textContent = disasterData.hurricane?.total_incidents || 0;
    if (DOM.earthquakeValue) DOM.earthquakeValue.textContent = disasterData.earthquake?.total_incidents || 0;
    showLoading(false);
  }
}

function getChartTextColor() {
  return getCSSVar('--text-primary') || '#000000';
}

function createCharts(initialDisaster) {
  const data = disasterData[initialDisaster]?.charts || getFallbackData(initialDisaster);
  const textColor = getChartTextColor();
  const highColor = '#F44336';
  const mediumColor = '#FF9800';
  const lowColor = '#4CAF50';
  const accentPrimary = getCSSVar('--accent-primary') || '#2196F3';

  const pieCtx = DOM.pieCanvas.getContext('2d');
  const severityDist = data.severity_distribution || { high: 0, medium: 0, low: 0 };
  charts.pie = new Chart(pieCtx, {
    type: 'doughnut',
    data: {
      labels: ['High', 'Medium', 'Low'],
      datasets: [{
        data: [severityDist.high, severityDist.medium, severityDist.low],
        backgroundColor: [highColor, mediumColor, lowColor],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: { color: textColor, usePointStyle: true, padding: 10, font: { size: 11 } }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });

  const lineCtx = DOM.lineCanvas.getContext('2d');
  const severityTrend = data.severity_trend || { labels: [], high: [], medium: [], low: [] };
  charts.line = new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: severityTrend.labels,
      datasets: [
        {
          label: 'High',
          data: severityTrend.high,
          borderColor: highColor,
          backgroundColor: `${highColor}1a`,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5
        },
        {
          label: 'Medium',
          data: severityTrend.medium,
          borderColor: mediumColor,
          backgroundColor: `${mediumColor}1a`,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5
        },
        {
          label: 'Low',
          data: severityTrend.low,
          borderColor: lowColor,
          backgroundColor: `${lowColor}1a`,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { 
          position: 'bottom', 
          labels: { color: textColor, usePointStyle: true, padding: 10, font: { size: 11 } } 
        }
      },
      scales: {
        y: { 
          beginAtZero: true, 
          ticks: { color: textColor },
          grid: { color: 'rgba(255,255,255,0.1)' } 
        },
        x: { 
          ticks: { color: textColor },
          grid: { display: false } 
        }
      }
    }
  });

  const areaCtx = DOM.areaCanvas.getContext('2d');
  const cumulativeData = data.cumulative_reports || { labels: [], cumulative: [] };
  charts.area = new Chart(areaCtx, {
    type: 'line',
    data: {
      labels: cumulativeData.labels,
      datasets: [{
        label: 'Cumulative Reports',
        data: cumulativeData.cumulative,
        borderColor: accentPrimary,
        backgroundColor: `${accentPrimary}4d`,
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { 
        legend: { 
          display: true,
          position: 'bottom',
          labels: { color: textColor, usePointStyle: true, padding: 10, font: { size: 11 } }
        } 
      },
      scales: {
        y: { 
          beginAtZero: true, 
          ticks: { color: textColor },
          grid: { color: 'rgba(255,255,255,0.1)' } 
        },
        x: { 
          ticks: { color: textColor },
          grid: { display: false } 
        }
      }
    }
  });

  const barCtx = DOM.barCanvas.getContext('2d');
  const hourlyData = data.hourly_distribution || { labels: [], counts: [] };
  charts.bar = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: hourlyData.labels,
      datasets: [{
        label: 'Incidents',
        data: hourlyData.counts,
        backgroundColor: accentPrimary,
        borderRadius: 4,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { 
        legend: { 
          display: true,
          position: 'bottom',
          labels: { color: textColor, usePointStyle: true, padding: 10, font: { size: 11 } }
        } 
      },
      scales: {
        y: { 
          beginAtZero: true, 
          ticks: { color: textColor },
          grid: { color: 'rgba(255,255,255,0.1)' } 
        },
        x: { 
          ticks: { color: textColor },
          grid: { display: false } 
        }
      }
    }
  });
}

function updateCharts(disaster) {
  const data = disasterData[disaster]?.charts || getFallbackData(disaster);
  const highColor = '#F44336';
  const mediumColor = '#FF9800';
  const lowColor = '#4CAF50';
  const accentPrimary = getCSSVar('--accent-primary') || '#2196F3';

  const severityDist = data.severity_distribution || { high: 0, medium: 0, low: 0 };
  charts.pie.data.datasets[0].data = [severityDist.high, severityDist.medium, severityDist.low];
  charts.pie.update();

  const severityTrend = data.severity_trend || { labels: [], high: [], medium: [], low: [] };
  charts.line.data.labels = severityTrend.labels;
  charts.line.data.datasets[0].data = severityTrend.high;
  charts.line.data.datasets[1].data = severityTrend.medium;
  charts.line.data.datasets[2].data = severityTrend.low;
  charts.line.update();

  const cumulativeData = data.cumulative_reports || { labels: [], cumulative: [] };
  charts.area.data.labels = cumulativeData.labels;
  charts.area.data.datasets[0].data = cumulativeData.cumulative;
  charts.area.data.datasets[0].borderColor = accentPrimary;
  charts.area.data.datasets[0].backgroundColor = `${accentPrimary}4d`;
  charts.area.update();

  const hourlyData = data.hourly_distribution || { labels: [], counts: [] };
  charts.bar.data.labels = hourlyData.labels;
  charts.bar.data.datasets[0].data = hourlyData.counts;
  charts.bar.data.datasets[0].backgroundColor = accentPrimary;
  charts.bar.update();

  const disasterNames = { fire: 'Fire', flood: 'Flood', hurricane: 'Hurricane', earthquake: 'Earthquake' };
  if (DOM.pieChartTitle) DOM.pieChartTitle.textContent = `${disasterNames[disaster] || disaster} Severity Distribution`;
}

const lastTheme = { textColor: null, accentPrimary: null };
let themeUpdateTimer = null;

function applyChartColorsIfNeeded() {
  const textColor = getCSSVar('--text-primary') || '#000';
  const accentPrimary = getCSSVar('--accent-primary') || '#2196F3';

  const changed = textColor !== lastTheme.textColor || accentPrimary !== lastTheme.accentPrimary;
  if (!changed) return;

  lastTheme.textColor = textColor;
  lastTheme.accentPrimary = accentPrimary;

  Object.values(charts).forEach(chart => {
    if (!chart) return;

    if (chart.options.plugins?.legend?.labels) {
      chart.options.plugins.legend.labels.color = textColor;
    }

    if (chart.options.scales) {
      Object.values(chart.options.scales).forEach(scale => {
        if (!scale) return;
        if (scale.ticks) scale.ticks.color = textColor;
        if (scale.grid && scale.grid.color) scale.grid.color = 'rgba(255,255,255,0.1)';
      });
    }

    chart.data.datasets.forEach(ds => {
      if (!ds) return;
      if (ds.label === 'Cumulative Reports' || ds.label === 'Incidents') {
        ds.borderColor = accentPrimary;
        if (ds.fill) {
          ds.backgroundColor = `${accentPrimary}4d`;
        } else {
          ds.backgroundColor = accentPrimary;
        }
      }
    });

    chart.update();
  });
}

function scheduleThemeUpdate() {
  if (themeUpdateTimer) clearTimeout(themeUpdateTimer);
  themeUpdateTimer = setTimeout(() => {
    applyChartColorsIfNeeded();
    themeUpdateTimer = null;
  }, 60);
}

const themeObserver = new MutationObserver(mutations => {
  for (const m of mutations) {
    if (m.type === 'attributes') {
      scheduleThemeUpdate();
      break;
    }
  }
});

themeObserver.observe(document.documentElement, { attributes: true });

window.addEventListener('storage', (ev) => {
  if (ev.key === 'disasterTheme') scheduleThemeUpdate();
});

function switchDisaster(disaster) {
  const currentTheme = localStorage.getItem('disasterTheme') || 'fire';
  const isLight = currentTheme.includes('-light');
  const newTheme = isLight ? `${disaster}-light` : disaster;

  if (typeof window.setTheme === 'function') {
    window.setTheme(newTheme);
  } else {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('disasterTheme', newTheme);
  }

  DOM.statCards.forEach(card => card.classList.remove('active'));
  document.querySelector(`[data-disaster="${disaster}"]`)?.classList.add('active');

  currentDisaster = disaster;

  updateCharts(disaster);

  scheduleThemeUpdate();
}

document.addEventListener('DOMContentLoaded', async () => {
  const savedTheme = localStorage.getItem('disasterTheme') || 'fire';
  const initialDisaster = savedTheme.replace('-light', '');
  currentDisaster = initialDisaster;

  DOM.statCards.forEach(card => card.classList.remove('active'));
  document.querySelector(`[data-disaster="${initialDisaster}"]`)?.classList.add('active');

  await fetchAllDisasterData();

  createCharts(initialDisaster);
  updateCharts(initialDisaster);
  applyChartColorsIfNeeded();

  setInterval(fetchAllDisasterData, 2 * 60 * 1000);

  window.switchDisaster = switchDisaster;
});