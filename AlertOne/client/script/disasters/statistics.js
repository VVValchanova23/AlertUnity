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

const DEFAULT_REGIONS = ['Northern', 'Southwestern', 'Southern', 'Southeastern', 'Northwestern', 'Northeastern'];
const regionColors = ['#2196F3', '#4CAF50', '#FF9800', '#9C27B0', '#F44336', '#00BCD4'];

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
  const base = {
    pieLabels: DEFAULT_REGIONS,
    regionNames: DEFAULT_REGIONS
  };

  const map = {
    fire: {
      activeIncidents: 245,
      pie: [45, 30, 25, 20, 35, 28],
      line: [
        [12,15,18,16,20,19,22,24,21,23,25,27],
        [10,13,15,14,17,16,19,20,18,21,22,24],
        [8,11,13,12,14,13,16,17,15,18,19,21],
        [7,9,11,10,12,11,14,15,13,16,17,19],
        [9,12,14,13,15,14,17,18,16,19,20,22],
        [6,8,10,9,11,10,13,14,12,15,16,18]
      ],
      area: [450,420,510,480,550,520],
      bar: [85,70,95,75,110,65,120]
    },
    flood: {
      activeIncidents: 128,
      pie: [35,40,25,30,28,32],
      line: [
        [9,11,13,12,15,14,17,18,16,19,20,22],
        [11,14,16,15,18,17,20,21,19,22,23,25],
        [7,9,11,10,13,12,15,16,14,17,18,20],
        [8,10,12,11,14,13,16,17,15,18,19,21],
        [10,13,15,14,17,16,19,20,18,21,22,24],
        [6,8,10,9,12,11,14,15,13,16,17,19]
      ],
      area: [380,350,430,400,470,440],
      bar: [70,55,80,60,95,50,105]
    },
    hurricane: {
      activeIncidents: 67,
      pie: [30,35,35,25,32,28],
      line: [
        [7,9,10,9,12,11,14,15,13,16,17,19],
        [8,10,12,11,14,13,16,17,15,18,19,21],
        [9,11,13,12,15,14,17,18,16,19,20,22],
        [6,8,9,8,11,10,13,14,12,15,16,18],
        [8,10,11,10,13,12,15,16,14,17,18,20],
        [7,9,10,9,12,11,14,15,13,16,17,19]
      ],
      area: [320,290,370,340,410,380],
      bar: [55,45,65,50,80,40,90]
    },
    earthquake: {
      activeIncidents: 89,
      pie: [40,25,35,30,28,33],
      line: [
        [10,12,14,13,16,15,18,19,17,20,21,23],
        [8,10,12,11,14,13,16,17,15,18,19,21],
        [9,11,13,12,15,14,17,18,16,19,20,22],
        [7,9,11,10,13,12,15,16,14,17,18,20],
        [8,10,12,11,14,13,16,17,15,18,19,21],
        [9,11,13,12,15,14,17,18,16,19,20,22]
      ],
      area: [400,370,450,420,490,460],
      bar: [75,60,85,65,100,55,110]
    }
  };

  return Object.assign({}, base, map[type] || map.fire);
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchDisasterData(type) {
  try {
    return await fetchJson(`${API_CONFIG.baseUrl}${API_CONFIG[type]}`);
  } catch (err) {
    console.error(`fetchDisasterData(${type}) failed:`, err);
    return getFallbackData(type);
  }
}

async function fetchAllDisasterData() {
  showLoading(true);
  try {
    const res = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.all}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const allData = await res.json();

    disasterData = {
      fire: allData.fire || getFallbackData('fire'),
      flood: allData.flood || getFallbackData('flood'),
      hurricane: allData.hurricane || getFallbackData('hurricane'),
      earthquake: allData.earthquake || getFallbackData('earthquake')
    };
  } catch (err) {
    const [fire, flood, hurricane, earthquake] = await Promise.all([
      fetchDisasterData('fire'),
      fetchDisasterData('flood'),
      fetchDisasterData('hurricane'),
      fetchDisasterData('earthquake')
    ]);
    disasterData = { fire, flood, hurricane, earthquake };
  } finally {
    if (DOM.fireValue) DOM.fireValue.textContent = (disasterData.fire?.activeIncidents ?? getFallbackData('fire').activeIncidents);
    if (DOM.floodValue) DOM.floodValue.textContent = (disasterData.flood?.activeIncidents ?? getFallbackData('flood').activeIncidents);
    if (DOM.hurricaneValue) DOM.hurricaneValue.textContent = (disasterData.hurricane?.activeIncidents ?? getFallbackData('hurricane').activeIncidents);
    if (DOM.earthquakeValue) DOM.earthquakeValue.textContent = (disasterData.earthquake?.activeIncidents ?? getFallbackData('earthquake').activeIncidents);
    showLoading(false);
  }
}

function getChartTextColor() {
  return getCSSVar('--text-primary') || '#000000';
}

function createCharts(initialDisaster) {
  const data = disasterData[initialDisaster] || getFallbackData(initialDisaster);
  const textColor = getChartTextColor();
  const accentPrimary = getCSSVar('--accent-primary') || '#2196F3';

  const pieCtx = DOM.pieCanvas.getContext('2d');
  charts.pie = new Chart(pieCtx, {
    type: 'doughnut',
    data: {
      labels: data.pieLabels || DEFAULT_REGIONS,
      datasets: [{
        data: data.pie,
        backgroundColor: regionColors,
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
        }
      }
    }
  });

  const lineCtx = DOM.lineCanvas.getContext('2d');
  const regionNames = data.regionNames || DEFAULT_REGIONS;
  charts.line = new Chart(lineCtx, {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: regionNames.map((r, i) => ({
        label: r,
        data: data.line[i],
        borderColor: regionColors[i],
        backgroundColor: `${regionColors[i]}1a`,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, padding: 10, font: { size: 11 } } }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(33,150,243,0.1)' } },
        x: { grid: { display: false } }
      }
    }
  });

  const areaCtx = DOM.areaCanvas.getContext('2d');
  charts.area = new Chart(areaCtx, {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [{
        label: 'Active Incidents',
        data: data.area,
        borderColor: accentPrimary,
        backgroundColor: `${accentPrimary}4d`,
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(33,150,243,0.1)' } },
        x: { grid: { display: false } }
      }
    }
  });

  const barCtx = DOM.barCanvas.getContext('2d');
  charts.bar = new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Week 1','Week 2','Week 3','Week 4','Week 5','Week 6','Week 7'],
      datasets: [{
        label: 'Incidents',
        data: data.bar,
        backgroundColor: accentPrimary,
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(33,150,243,0.1)' } },
        x: { grid: { display: false } }
      }
    }
  });
}

function updateCharts(disaster) {
  const accentPrimary = getCSSVar('--accent-primary') || '#2196F3';
  const data = disasterData[disaster] || getFallbackData(disaster);

  charts.pie.data.labels = data.pieLabels || DEFAULT_REGIONS;
  charts.pie.data.datasets[0].data = data.pie;
  charts.pie.data.datasets[0].backgroundColor = regionColors;
  charts.pie.update();

  const regionNames = data.regionNames || DEFAULT_REGIONS;
  charts.line.data.datasets = regionNames.map((region, index) => ({
    label: region,
    data: data.line[index],
    borderColor: regionColors[index],
    backgroundColor: `${regionColors[index]}1a`,
    tension: 0.4,
    borderWidth: 2,
    pointRadius: 0
  }));
  charts.line.update();

  charts.area.data.datasets[0].data = data.area;
  charts.area.data.datasets[0].borderColor = accentPrimary;
  charts.area.data.datasets[0].backgroundColor = `${accentPrimary}4d`;
  charts.area.update();

  charts.bar.data.datasets[0].data = data.bar;
  charts.bar.data.datasets[0].backgroundColor = accentPrimary;
  charts.bar.update();

  const disasterNames = { fire: 'Fire', flood: 'Flood', hurricane: 'Hurricane', earthquake: 'Earthquake' };
  if (DOM.pieChartTitle) DOM.pieChartTitle.textContent = `${disasterNames[disaster] || disaster} Regional Distribution`;
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

    // Legend labels
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
      if (ds.label === 'Active Incidents' || ds.label === 'Incidents') {
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