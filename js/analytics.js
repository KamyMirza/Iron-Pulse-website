// ===== Page View Tracking (simple analytics) =====
function trackPageView() {
  const pageName = document.title; // e.g. "Iron Pulse | Cart"

  let totalVisits = parseInt(localStorage.getItem('totalVisits')) || 0;
  totalVisits += 1;
  localStorage.setItem('totalVisits', totalVisits);

  let pageViews = JSON.parse(localStorage.getItem('pageViews')) || {};
  pageViews[pageName] = (pageViews[pageName] || 0) + 1;
  localStorage.setItem('pageViews', JSON.stringify(pageViews));

  const counterEl = document.getElementById('visit-counter');
  if (counterEl) {
    counterEl.textContent = `Page views: ${pageViews[pageName]} | Total site visits: ${totalVisits}`;
  }
}

trackPageView();
