import { auth, db } from '../../data/firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js';
import { doc, collection, getDocs, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js';

const API_BASE_URL = 'https://alertunity.onrender.com';
let currentUpdateReportId = null;
let currentDeleteReportId = null;
let allReports = [];
const table = document.getElementById("reportsTable");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const severityFilter = document.getElementById("severityFilter");
const exportBtn = document.getElementById("exportBtn");
const feedbackBtn = document.getElementById("feedbackBtn");

const statusStyles = {
  active: { class: 'status-active', text: 'Active' },
  inactive: { class: 'status-inactive', text: 'Inactive' },
  'false-alarm': { class: 'status-false-alarm', text: 'False Alarm' }
};

const severityStyles = {
  low: { class: 'severity-low', text: 'Low', emoji: '🟢' },
  medium: { class: 'severity-medium', text: 'Medium', emoji: '🟡' },
  high: { class: 'severity-high', text: 'High', emoji: '🔴' }
};

let languageManager;

function initLanguageManager() {
  languageManager = new LanguageManager();
  applyTranslationsToDynamicContent();
}

function applyTranslationsToDynamicContent() {
  if (!languageManager) return;
  
  updateStatusAndSeverityText();
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = languageManager.t(key);
    if (translation) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.textContent = translation;
      }
    }
  });
}

function updateStatusAndSeverityText() {
  if (!languageManager) return;
  
  statusStyles.active.text = languageManager.t('history.active') || 'Active';
  statusStyles.inactive.text = languageManager.t('history.inactive') || 'Inactive';
  statusStyles['false-alarm'].text = languageManager.t('history.falseAlarm') || 'False Alarm';
  
  severityStyles.low.text = languageManager.t('history.low') || 'Low';
  severityStyles.medium.text = languageManager.t('history.medium') || 'Medium';
  severityStyles.high.text = languageManager.t('history.high') || 'High';
}

function formatDate(timestamp) {
  if (!timestamp) return 'N/A';
  
  let date;
  if (timestamp.toDate) {
    date = timestamp.toDate();
  } 
  else if (timestamp instanceof Date) {
    date = timestamp;
  } 
  else {
    date = new Date(timestamp);
  }
  
  return date.toLocaleString();
}

function truncateText(text, maxLength = 50) {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function createTableRow(id, data) {
  const row = document.createElement("tr");
  
  const statusInfo = statusStyles[data.status] || { class: 'status-active', text: data.status || 'Active' };
  const severityInfo = severityStyles[data.severity] || { class: 'severity-low', text: data.severity || 'Low', emoji: '🟢' };
  
  row.innerHTML = `
    <td>${formatDate(data.timestamp)}</td>
    <td>${truncateText(data.location || data.address, 30)}</td>
    <td>${data.phone || (languageManager ? languageManager.t('common.anonymous') : 'Anonymous')}</td>
    <td>
      <span class="severity-badge ${severityInfo.class}">
        ${severityInfo.emoji} ${severityInfo.text}
      </span>
    </td>
    <td>
      <span class="status-badge ${statusInfo.class}">
        ${statusInfo.text}
      </span>
    </td>
    <td>${truncateText(data.description, 40)}</td>
    <td>
      <div class="action-buttons">
        <button class="view-btn" onclick="openViewModal('${id}', ${JSON.stringify(data).replace(/"/g, '&quot;')})" data-i18n="common.view">👁️ ${languageManager ? languageManager.t('common.view') : 'View'}</button>
        <button class="edit-btn" onclick="openUpdateModal('${id}', '${data.status || 'active'}')" data-i18n="common.edit">📝 ${languageManager ? languageManager.t('common.edit') : 'Update'}</button>
        <button class="delete-btn" onclick="openDeleteModal('${id}')" data-i18n="common.delete">🗑️ ${languageManager ? languageManager.t('common.delete') : 'Delete'}</button>
      </div>
    </td>
  `;
  return row;
}

function loadReports() {
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';
  
  allReports.forEach(({ id, data }) => {
    const row = createTableRow(id, data);
    tbody.appendChild(row);
  });
}

function filterReports() {
  const searchQuery = searchInput.value.toLowerCase();
  const statusFilterValue = statusFilter.value;
  const severityFilterValue = severityFilter.value;
  
  const rows = table.querySelectorAll("tbody tr");
  
  rows.forEach((row, index) => {
    const reportData = allReports[index]?.data;
    if (!reportData) return;
    
    const matchesSearch = !searchQuery || 
      row.textContent.toLowerCase().includes(searchQuery);
    
    const matchesStatus = !statusFilterValue || 
      (reportData.status || 'active') === statusFilterValue;
    
    const matchesSeverity = !severityFilterValue || 
      (reportData.severity || 'low') === severityFilterValue;
    
    const shouldShow = matchesSearch && matchesStatus && matchesSeverity;
    row.style.display = shouldShow ? "" : "none";
  });
}

async function getFeedbackFromAI() {
  if (allReports.length === 0) {
    alert(languageManager ? languageManager.t('error.dataNotFound') : "No fire reports available for analysis.");
    return;
  }

  try {
    feedbackBtn.innerHTML = `<i class="fa-solid fa-robot"></i> ${languageManager ? languageManager.t('loading.processing') : 'Getting AI Analysis...'}`;
    feedbackBtn.disabled = true;

    const reportsData = allReports.map(({ data }) => {
      let timestamp;
      if (data.timestamp?.toDate) {
        timestamp = data.timestamp.toDate().toISOString();
      } else if (data.timestamp instanceof Date) {
        timestamp = data.timestamp.toISOString();
      } else if (data.timestamp) {
        timestamp = new Date(data.timestamp).toISOString();
      } else {
        timestamp = new Date().toISOString();
      }

      return {
        timestamp: timestamp,
        location: data.location || data.address || (languageManager ? languageManager.t('common.unknown') : 'Unknown'),
        severity: data.severity || 'low',
        status: data.status || 'active',
        description: data.description || (languageManager ? languageManager.t('common.noDescription') : 'No description'),
        coords: data.coords || [null, null],
        phone: data.phone || data.reporterPhone || (languageManager ? languageManager.t('common.anonymous') : 'Anonymous')
      };
    });

    const response = await fetch(`${API_BASE_URL}/api/ai/analyze-fires`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reports: reportsData
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API request failed: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Unknown error occurred');
    }

    const feedback = result.feedback;
    document.getElementById("feedbackContent").innerHTML = feedback.replace(/\n/g, '<br>');
    
    if (result.fallback) {
      const notice = `<p style="margin-top: 20px; padding: 10px; background: #fff3cd; border-radius: 5px; font-size: 0.9em;">⚠️ <strong>${languageManager ? languageManager.t('common.note') : 'Note'}:</strong> ${languageManager ? languageManager.t('notification.aiUnavailable') : 'AI service is currently unavailable. Showing basic analysis.'}</p>`;
      document.getElementById("feedbackContent").innerHTML += notice;
    }
    
    openModal("feedbackModal");

  } catch (error) {
    console.error("Error getting AI feedback:", error);
    
    const fallbackFeedback = generateLocalFallbackFeedback();
    document.getElementById("feedbackContent").innerHTML = fallbackFeedback;
    openModal("feedbackModal");
    
    alert(`${languageManager ? languageManager.t('error.tryAgain') : 'Error'}: ${error.message}. ${languageManager ? languageManager.t('notification.showingBasic') : 'Showing basic analysis instead.'}`);
  } finally {
    feedbackBtn.innerHTML = `<i class="fa-solid fa-robot"></i> ${languageManager ? languageManager.t('fireReport.getAIFeedback') : 'Get AI Feedback'}`;
    feedbackBtn.disabled = false;
  }
}

function generateLocalFallbackFeedback() {
  const totalReports = allReports.length;
  const highSeverity = allReports.filter(r => r.data.severity === 'high').length;
  const activeReports = allReports.filter(r => r.data.status === 'active').length;
  
  return `
    <h3>${languageManager ? languageManager.t('history.aiFeedback') : 'AI Fire Prediction Analysis'}</h3>
    <p><strong>${languageManager ? languageManager.t('common.summary') : 'Summary'}:</strong></p>
    <ul>
      <li>${languageManager ? languageManager.t('common.totalReports') : 'Total Reports'}: ${totalReports}</li>
      <li>${languageManager ? languageManager.t('common.highSeverity') : 'High Severity Reports'}: ${highSeverity}</li>
      <li>${languageManager ? languageManager.t('common.activeReports') : 'Active Reports'}: ${activeReports}</li>
    </ul>
    <p><strong>${languageManager ? languageManager.t('common.recommendations') : 'Recommendations'}:</strong></p>
    <p>${languageManager ? languageManager.t('ai.fallbackMessage') : 'Based on the current data, consider monitoring high-severity reports closely and ensure emergency services are prepared for rapid response.'}</p>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguageManager();
  
  onAuthStateChanged(auth, async () => {
    try {
      const reportsSnapshot = await getDocs(collection(db, "fires"));
      allReports = [];
      
      reportsSnapshot.forEach(docSnap => {
        allReports.push({
          id: docSnap.id,
          data: docSnap.data()
        });
      });

      allReports.sort((a, b) => {
        const dateA = a.data.timestamp?.toDate?.() || new Date(a.data.timestamp) || new Date(0);
        const dateB = b.data.timestamp?.toDate?.() || new Date(b.data.timestamp) || new Date(0);
        return dateB - dateA;
      });

      loadReports();

    } catch (error) {
      console.error("Error loading fire reports:", error);
      alert(languageManager ? languageManager.t('error.dataNotFound') : "Error loading fire report data. Please refresh the page.");
    }
  });

  searchInput.addEventListener("input", filterReports);
  statusFilter.addEventListener("change", filterReports);
  severityFilter.addEventListener("change", filterReports);
  feedbackBtn.addEventListener("click", getFeedbackFromAI);

  exportBtn.addEventListener("click", () => {
    try {
      const doc = new window.jspdf.jsPDF();
      
      const visibleRows = Array.from(table.querySelectorAll("tbody tr"))
        .filter(row => row.style.display !== "none")
        .map(tr => {
          const cells = Array.from(tr.children).slice(0, -1);
          return cells.map((td, index) => {
            let text = td.innerText || td.textContent;
            // Remove all emojis from text
            text = text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F7E2}]|[\u{1F7E1}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{FE00}-\u{FE0F}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F64F}]|[\u{1F910}-\u{1F96B}]|[\u{1F980}-\u{1F9E0}]/gu, '').trim();
            return text.trim();
          });
        });
      
      const headers = Array.from(table.querySelectorAll("thead th"))
        .slice(0, -1).map(th => th.innerText);
      
      doc.setFontSize(18);
      doc.text('AlertUnity - Fire Reports History', 14, 15);
      
      doc.setFontSize(10);
      doc.text(`${languageManager ? languageManager.t('common.generatedOn') : 'Generated on'}: ${new Date().toLocaleString()}`, 14, 25);
      doc.text(`${languageManager ? languageManager.t('common.totalReports') : 'Total Reports'}: ${visibleRows.length}`, 14, 30);
      
      doc.autoTable({ 
        head: [headers], 
        body: visibleRows,
        startY: 40,
        theme: 'grid',
        headStyles: { 
          fillColor: [220, 20, 60],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        styles: { 
          fontSize: 8,
          cellPadding: 2
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 30 },
          2: { cellWidth: 25 },
          3: { cellWidth: 20 },
          4: { cellWidth: 20 },
          5: { cellWidth: 40 }
        }
      });
      
      doc.save(`alertunity-fire-reports-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert(languageManager ? languageManager.t('error.tryAgain') : "Error exporting PDF. Please try again.");
    }
  });

  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal("viewModal");
      closeModal("updateModal");
      closeModal("deleteModal");
      closeModal("feedbackModal");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal("viewModal");
      closeModal("updateModal");
      closeModal("deleteModal");
      closeModal("feedbackModal");
    }
  });

  document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) {
        closeModal(modal.id);
      }
    });
  });

  document.querySelectorAll('.modal-btn.cancel').forEach(cancelBtn => {
    cancelBtn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) {
        closeModal(modal.id);
      }
    });
  });

  document.querySelector('.mobile-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });
});

function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  document.body.style.overflow = "auto";
}

window.openViewModal = function(reportId, reportData) {
  if (typeof reportData === 'string') {
    reportData = JSON.parse(reportData.replace(/&quot;/g, '"'));
  }
  
  document.getElementById("viewReportId").textContent = reportId;
  document.getElementById("viewDateTime").textContent = formatDate(reportData.timestamp);
  document.getElementById("viewLocation").textContent = reportData.location || reportData.address || 'N/A';
  document.getElementById("viewCoordinates").textContent = 
    reportData.coords[0] && reportData.coords[1] ? 
    `${reportData.coords[0]}, ${reportData.coords[1]}` : 'N/A';
  document.getElementById("viewReporterContact").textContent = 
    reportData.reporterPhone || 'N/A';
  
  const severityInfo = severityStyles[reportData.severity] || severityStyles.low;
  const severityElement = document.getElementById("viewSeverity");
  severityElement.textContent = `${severityInfo.emoji} ${severityInfo.text}`;
  severityElement.className = `severity-badge ${severityInfo.class}`;
  
  const statusInfo = statusStyles[reportData.status] || statusStyles.active;
  const statusElement = document.getElementById("viewStatus");
  statusElement.textContent = statusInfo.text;
  statusElement.className = `status-badge ${statusInfo.class}`;
  
  document.getElementById("viewDescription").textContent = reportData.description || (languageManager ? languageManager.t('common.noDescription') : 'No description provided');
  
  const imageGroup = document.getElementById("viewImageGroup");
  const imageElement = document.getElementById("viewImage");
  if (reportData.imageUrl) {
    imageElement.src = reportData.imageUrl;
    imageGroup.style.display = "block";
  } else {
    imageGroup.style.display = "none";
  }
  
  openModal("viewModal");
};

window.openUpdateModal = function(reportId, currentStatus) {
  currentUpdateReportId = reportId;
  document.getElementById("updateStatus").value = currentStatus || 'active';
  openModal("updateModal");
};

window.openDeleteModal = function(reportId) {
  currentDeleteReportId = reportId;
  openModal("deleteModal");
};

window.closeModal = closeModal;

document.getElementById("updateForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  if (!currentUpdateReportId) {
    alert(languageManager ? languageManager.t('error.dataNotFound') : "Error: No report selected for update.");
    return;
  }

  const newStatus = document.getElementById("updateStatus").value;

  try {
    const submitBtn = document.querySelector("#updateForm .modal-btn.confirm");
    submitBtn.textContent = languageManager ? languageManager.t('loading.processing') : "Updating...";
    submitBtn.disabled = true;

    const updateData = {
      status: newStatus,
      lastUpdated: new Date()
    };

    await updateDoc(doc(db, "fires", currentUpdateReportId), updateData);
    
    alert(languageManager ? languageManager.t('notification.reportUpdated') : "Report status updated successfully!");
    closeModal("updateModal");
    
    location.reload();
    
  } catch (error) {
    console.error("Error updating report:", error);
    alert(languageManager ? languageManager.t('error.tryAgain') : "Error updating report. Please try again.");
    
    const submitBtn = document.querySelector("#updateForm .modal-btn.confirm");
    submitBtn.textContent = languageManager ? languageManager.t('history.updateBtn') : "Update Status";
    submitBtn.disabled = false;
  }
});

window.confirmDelete = async function() {
  if (!currentDeleteReportId) {
    alert(languageManager ? languageManager.t('error.dataNotFound') : "Error: No report selected for deletion.");
    return;
  }

  try {
    const deleteBtn = document.querySelector("#deleteModal .modal-btn.danger");
    deleteBtn.textContent = languageManager ? languageManager.t('loading.processing') : "Deleting...";
    deleteBtn.disabled = true;

    await deleteDoc(doc(db, "fires", currentDeleteReportId));
    
    alert(languageManager ? languageManager.t('notification.reportDeleted') : "Fire report deleted successfully!");
    closeModal("deleteModal");
    
    location.reload();
    
  } catch (error) {
    console.error("Error deleting report:", error);
    alert(languageManager ? languageManager.t('error.tryAgain') : "Error deleting report. Please try again.");
    
    const deleteBtn = document.querySelector("#deleteModal .modal-btn.danger");
    deleteBtn.textContent = languageManager ? languageManager.t('history.deleteReport') : "Delete Report";
    deleteBtn.disabled = false;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal("viewModal");
      closeModal("updateModal");
      closeModal("deleteModal");
      closeModal("feedbackModal");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal("viewModal");
      closeModal("updateModal");
      closeModal("deleteModal");
      closeModal("feedbackModal");
    }
  });

  document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) {
        closeModal(modal.id);
      }
    });
  });

  document.querySelectorAll('.modal-btn.cancel').forEach(cancelBtn => {
    cancelBtn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) {
        closeModal(modal.id);
      }
    });
  });
});

document.querySelector('.mobile-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});