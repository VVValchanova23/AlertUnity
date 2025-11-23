import { auth, db } from '../data/firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js';

const PAGE_CONFIG = {
  // Admin Panel
  'disasters/admin-panel.html': {
    allowedRoles: [
        'admin-fire',
        'admin-flood',
        'admin-hurricane',
        'admin-earthquake',
        'super-admin'
    ],
    message: 'Access denied. Admins only.'
  },

  // ========== FIRE FOLDER ==========
  'fire/fire-report.html': {
    allowedRoles: ['citizen', 'firefighter', 'admin-fire'],
    requireAuth: true,
    message: 'Please sign in to report a fire.'
  },

  'fire/report-history.html': {
    allowedRoles: ['admin-fire', 'firefighter'],
    message: 'Access denied. Authorized fire personnel only.'
  },

  'fire/map.html': {
    allowedRoles: ['citizen', 'firefighter', 'admin-fire'],
    requireAuth: true,
    message: 'Access denied. Authorized fire personnel only.'
  },


  // ========== FLOOD FOLDER ==========
  'flood/flood-report.html': {
    allowedRoles: ['citizen', 'flood-rescuer', 'admin-flood'],
    requireAuth: true,
    message: 'Please sign in to report a flood.'
  },

  'flood/report-history.html': {
    allowedRoles: ['flood-rescuer', 'admin-flood'],
    message: 'Access denied. Authorized flood personnel only.'
  },

  'flood/map.html': {
    allowedRoles: ['citizen', 'flood-rescuer', 'admin-flood'],
    requireAuth: true,
    message: 'Access denied. Authorized fire personnel only.'
  },


  // ========== HURRICANE FOLDER ==========
  'hurricane/hurricane-report.html': {
    allowedRoles: ['citizen', 'hurricane-rescuer', 'admin-hurricane'],
    requireAuth: true,
    message: 'Please sign in to report a hurricane.'
  },

  'hurricane/report-history.html': {
    allowedRoles: ['hurricane-rescuer', 'admin-hurricane'],
    message: 'Access denied. Authorized hurricane personnel only.'
  },

  'hurricane/map.html': {
    allowedRoles: ['citizen', 'hurricane-rescuer', 'admin-hurricane'],
    requireAuth: true,
    message: 'Access denied. Authorized fire personnel only.'
  },


  // ========== EARTHQUAKE FOLDER ==========
  'earthquake/earthquake-report.html': {
    allowedRoles: ['citizen', 'earthquake-rescuer', 'admin-earthquake'],
    requireAuth: true,
    message: 'Please sign in to report an earthquake.'
  },

  'earthquake/report-history.html': {
    allowedRoles: ['earthquake-rescuer', 'admin-earthquake'],
    message: 'Access denied. Authorized earthquake personnel only.'
  },

  'earthquake/map.html': {
    allowedRoles: ['citizen', 'earthquake-rescuer', 'admin-earthquake'],
    requireAuth: true,
    message: 'Access denied. Authorized fire personnel only.'
  }
};


function getCurrentPagePath() {
  const path = window.location.pathname;
  // Extract the relative path from the root (e.g., "fire/map.html" or "flood/report-history.html")
  const parts = path.split('/');
  
  // Get the last two parts (folder/filename.html)
  if (parts.length >= 2) {
    return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
  }
  
  // If only filename (root level page)
  return parts[parts.length - 1] || 'index.html';
}

function isRoleAllowed(userRole, allowedRoles) {
  if (allowedRoles.includes('public')) return true;
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
}

function checkUserRole() {
  const currentPagePath = getCurrentPagePath();
  const pageConfig = PAGE_CONFIG[currentPagePath];

  if (!pageConfig) {
    console.log(`Page ${currentPagePath} is public or not configured`);
    return;
  }

  onAuthStateChanged(auth, async (user) => {
    try {
      // 🔹 NOT LOGGED IN but page requires auth
      if (!user) {
        if (pageConfig.requireAuth || pageConfig.allowedRoles) {
          localStorage.setItem('redirectAfterLogin', window.location.href);

          if (pageConfig.message) alert(pageConfig.message);

          window.location.href = '../disasters/sign-in.html';
        }
        return;
      }

      // 🔹 LOGGED IN — load user role
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        alert('User profile not found.');
        window.location.href = '../disasters/sign-in.html';
        return;
      }

      const userRole = userDoc.data().role || 'citizen';

      // 🔹 LOGGED IN but NOT ALLOWED (wrong role)
      if (!isRoleAllowed(userRole, pageConfig.allowedRoles)) {

        if (pageConfig.message) alert(pageConfig.message);

        // ⬅️ Go back to previous page instead of fixed redirect
        const previousPage = document.referrer;

        if (previousPage && previousPage !== window.location.href) {
          window.location.href = previousPage;
        } else {
          // fallback to homepage
          window.location.href = '../../index.html';
        }

        return;
      }

      console.log(`✅ Access granted to ${currentPagePath} for role: ${userRole}`);

    } catch (error) {
      console.error("Role check error:", error);
      alert('Error verifying permissions.');
      window.location.href = '../../index.html';
    }
  });
}

checkUserRole();