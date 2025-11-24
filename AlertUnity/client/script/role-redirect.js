import { auth, db } from '../data/firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js';

const PAGE_CONFIG = {
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
  const parts = path.split('/').filter(Boolean);

  const folder = parts[parts.length - 2];
  let page = parts[parts.length - 1];

  if (!page.endsWith('.html')) {
    page += '.html';
  }

  return `${folder}/${page}`;
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
      if (!user) {
        if (pageConfig.requireAuth || pageConfig.allowedRoles) {
          localStorage.setItem('redirectAfterLogin', window.location.href);

          if (pageConfig.message) alert(pageConfig.message);

          window.location.href = '../disasters/sign-in.html';
        }
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        alert('User profile not found.');
        window.location.href = '../disasters/sign-in.html';
        return;
      }

      const userRole = userDoc.data().role || 'citizen';

      if (!isRoleAllowed(userRole, pageConfig.allowedRoles)) {

        if (pageConfig.message) alert(pageConfig.message);

        const previousPage = document.referrer;

        if (previousPage && previousPage !== window.location.href) {
          window.location.href = previousPage;
        } else {
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