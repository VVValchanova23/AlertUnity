import { auth, db } from "../../data/firebase-config.js";
import {
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

const DISASTER_CONFIGS = {
  fire: {
    collection: "fires",
    severityLabel: "Fire Severity",
    severityOptions: ["Low", 'Medium', "High"]
  },
  flood: {
    collection: "floods",
    severityLabel: "Flood Severity",
    severityOptions: ["Low", 'Medium', "High"]
  },
  hurricane: {
    collection: "hurricanes",
    severityLabel: "Hurricane Category",
    severityOptions: ["Low", 'Medium', "High"]
  },
  earthquake: {
    collection: "earthquakes",
    severityLabel: "Earthquake Magnitude",
    severityOptions: ["Low", 'Medium', "High"]
  }
};

function initDisasterReport(disasterType) {
  const config = DISASTER_CONFIGS[disasterType];
  
  if (!config) {
    console.error(`Unknown disaster type: ${disasterType}`);
    return;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('disasterReportForm');
    const getLocationBtn = document.getElementById('getLocationBtn');
    const fileUpload = document.getElementById('fileUpload');
    const fileInput = document.getElementById('fileInput');
    const uploadedFilesDiv = document.getElementById('uploadedFiles');
    const submitBtn = document.getElementById('submitBtn');
    const navbar = document.getElementById('navbar');
    let uploadedFiles = [];

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitBtn.disabled = true;

      const coords = [
        parseFloat(document.getElementById('longitude').value),
        parseFloat(document.getElementById('latitude').value)
      ];
      const severity = document.querySelector('input[name="severity"]:checked')?.value;
      const address = document.getElementById('address').value.trim();
      const description = document.getElementById('description').value.trim();
      const phone = document.getElementById('phone').value.trim();

      if (!severity) {
        alert(`Please select the ${config.severityLabel.toLowerCase()}.`);
        submitBtn.disabled = false;
        return;
      }

      if (!coords[0] || !coords[1]) {
        alert("Please provide location coordinates.");
        submitBtn.disabled = false;
        return;
      }

      try {
        const docRef = await addDoc(collection(db, config.collection), {
          userId: auth.currentUser?.uid || "anonymous",
          disasterType: disasterType,
          coords,
          severity,
          address,
          description,
          phone,
          status: 'active',
          timestamp: serverTimestamp()
        });

        alert(`${disasterType.charAt(0).toUpperCase() + disasterType.slice(1)} report saved! ID: ${docRef.id}`);
        form.reset();
        uploadedFiles = [];
        uploadedFilesDiv.innerHTML = '';
      } catch (err) {
        console.error(err);
        alert('Error saving report: ' + err.message);
      } finally {
        submitBtn.disabled = false;
      }
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    });

    getLocationBtn.addEventListener('click', () => {
      getLocationBtn.disabled = true;
      getLocationBtn.textContent = '📍 Getting Location...';

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            document.getElementById('latitude').value = position.coords.latitude.toFixed(6);
            document.getElementById('longitude').value = position.coords.longitude.toFixed(6);
            getLocationBtn.textContent = '✅ Location Obtained';
            getLocationBtn.style.background = 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)';
            setTimeout(() => {
              getLocationBtn.disabled = false;
              getLocationBtn.textContent = '📍 Get My Current Location';
              getLocationBtn.style.background = 'var(--gradient-accent)';
            }, 2000);
          },
          (error) => {
            console.error("Location error:", error);
            alert('Unable to get location. Please enter coordinates manually.');
            getLocationBtn.disabled = false;
            getLocationBtn.textContent = '❌ Location Failed';
            getLocationBtn.style.background = 'var(--gradient-accent)';
            setTimeout(() => {
              getLocationBtn.textContent = '📍 Get My Current Location';
              getLocationBtn.style.background = 'var(--gradient-accent)';
            }, 2000);
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
        getLocationBtn.disabled = false;
        getLocationBtn.textContent = '❌ Not Supported';
      }
    });

    fileUpload?.addEventListener('click', () => fileInput.click());

    fileUpload?.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileUpload.classList.add('dragover');
    });

    fileUpload?.addEventListener('dragleave', () => {
      fileUpload.classList.remove('dragover');
    });

    fileUpload?.addEventListener('drop', (e) => {
      e.preventDefault();
      fileUpload.classList.remove('dragover');
      handleFiles(e.dataTransfer.files);
    });

    fileInput?.addEventListener('change', (e) => {
      handleFiles(e.target.files);
    });

    function handleFiles(files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
          uploadedFiles.push(file);
          displayUploadedFile(file);
        }
      });
    }

    function displayUploadedFile(file) {
      const fileDiv = document.createElement('div');
      fileDiv.className = 'uploaded-file';

      let previewHTML = '';
      if (file.type.startsWith('image/')) {
        const imgURL = URL.createObjectURL(file);
        previewHTML = `<img src="${imgURL}" alt="${file.name}" class="preview-image">`;
      }

      fileDiv.innerHTML = `
        ${previewHTML}
        <span>📎 ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</span>
        <button type="button" class="file-remove" data-filename="${file.name}">Remove</button>
      `;

      uploadedFilesDiv.appendChild(fileDiv);

      fileDiv.querySelector('.file-remove').addEventListener('click', () => {
        removeFile(file.name);
        uploadedFilesDiv.removeChild(fileDiv);
      });
    }

    function removeFile(fileName) {
      uploadedFiles = uploadedFiles.filter(file => file.name !== fileName);
    }

    window.clearForm = function () {
      form.reset();
      uploadedFiles = [];
      uploadedFilesDiv.innerHTML = '';
    };
  });
}

export { initDisasterReport, DISASTER_CONFIGS };