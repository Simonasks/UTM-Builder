const form = document.getElementById('utm-form');
const urlInput = document.getElementById('url');
const sourceSelect = document.getElementById('utm-source');
const mediumSelect = document.getElementById('utm-medium');
const campaignInput = document.getElementById('utm-campaign');
const activeContainer = document.getElementById('active-links');
const archivedContainer = document.getElementById('archived-links');
const emptyState = document.getElementById('empty-state');
const template = document.getElementById('link-template');
const contextMenu = document.getElementById('context-menu');
const toast = document.getElementById('toast');

let utmLinks = loadLinks();
let contextTargetId = null;

render();

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const baseUrl = urlInput.value.trim();
  const utmSource = sourceSelect.value.trim();
  const utmMedium = mediumSelect.value.trim();
  const rawCampaign = campaignInput.value;
  const utmCampaign = normalizeCampaign(rawCampaign);
  if (!utmCampaign) {
    showToast('Please provide a campaign name using letters or numbers.');
    campaignInput.focus();
    return;
  }

  const utmUrl = buildUtmUrl(baseUrl, {
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
  });

  const link = {
    id: createId(),
    baseUrl,
    utmSource,
    utmMedium,
    utmCampaign,
    utmUrl,
    createdAt: Date.now(),
    archived: false,
  };

  utmLinks.unshift(link);
  saveLinks();
  render();
  form.reset();
  urlInput.focus();
  notifyCopy(utmUrl, 'UTM link created and copied to clipboard!');
});

function buildUtmUrl(baseUrl, params) {
  try {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    return url.toString();
  } catch (error) {
    // If the URL constructor fails, attempt to prepend https://
    const prefixed = /^https?:\/\//i.test(baseUrl)
      ? baseUrl
      : `https://${baseUrl}`;
    return buildUtmUrl(prefixed, params);
  }
}

function createId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }
  const array = crypto.getRandomValues(new Uint32Array(4));
  return Array.from(array, (segment) => segment.toString(16).padStart(8, '0')).join('-');
}

function normalizeCampaign(value) {
  return value
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_\-]/gi, '')
    .toLowerCase();
}

function loadLinks() {
  try {
    const raw = localStorage.getItem('utm-links');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error('Failed to load saved links', error);
    return [];
  }
}

function saveLinks() {
  try {
    localStorage.setItem('utm-links', JSON.stringify(utmLinks));
  } catch (error) {
    console.error('Failed to save links', error);
    showToast('Unable to save links locally.');
  }
}

function render() {
  const active = utmLinks.filter((link) => !link.archived);
  const archived = utmLinks.filter((link) => link.archived);

  emptyState.hidden = utmLinks.length > 0;

  populateList(activeContainer, active);
  populateList(archivedContainer, archived);
}

function populateList(container, list) {
  container.innerHTML = '';

  list
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach((link) => {
      const node = template.content.firstElementChild.cloneNode(true);
      node.dataset.id = link.id;
      node.querySelector('.link-url').textContent = link.utmUrl;
      node.querySelector('time').textContent = formatDate(link.createdAt);
      node.querySelector('.badge.source').textContent = `Source: ${link.utmSource}`;
      node.querySelector('.badge.medium').textContent = `Medium: ${link.utmMedium}`;
      node.querySelector(
        '.badge.campaign'
      ).textContent = `Campaign: ${link.utmCampaign}`;

      container.appendChild(node);
    });

  container.toggleAttribute('hidden', list.length === 0);
}

function formatDate(timestamp) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
  return Promise.resolve();
}

function showToast(message, duration = 2200) {
  toast.textContent = message;
  toast.hidden = false;
  toast.classList.add('visible');
  if (showToast.timeoutId) {
    clearTimeout(showToast.timeoutId);
  }
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove('visible');
    toast.addEventListener(
      'transitionend',
      () => {
        toast.hidden = true;
      },
      { once: true }
    );
  }, duration);
}

function notifyCopy(text, successMessage) {
  copyToClipboard(text)
    .then(() => showToast(successMessage))
    .catch(() =>
      showToast('Unable to copy automatically. Please copy it manually.')
    );
}

function hideContextMenu() {
  contextMenu.hidden = true;
  contextTargetId = null;
}

function getLinkById(id) {
  return utmLinks.find((link) => link.id === id);
}

function updateContextMenuForLink(link) {
  const archiveButton = contextMenu.querySelector('[data-action="archive"]');
  if (link.archived) {
    archiveButton.textContent = 'Unarchive';
  } else {
    archiveButton.textContent = 'Archive';
  }
}

function toggleArchive(id) {
  utmLinks = utmLinks.map((link) =>
    link.id === id ? { ...link, archived: !link.archived } : link
  );
  saveLinks();
  render();
}

function deleteLink(id) {
  utmLinks = utmLinks.filter((link) => link.id !== id);
  saveLinks();
  render();
}

function handleCopy(link) {
  notifyCopy(link.utmUrl, 'UTM link copied to clipboard!');
}

function handleContextAction(action) {
  if (!contextTargetId) return;
  const link = getLinkById(contextTargetId);
  if (!link) return;

  switch (action) {
    case 'copy':
      handleCopy(link);
      break;
    case 'archive':
      toggleArchive(link.id);
      break;
    case 'delete':
      deleteLink(link.id);
      showToast('UTM link deleted.');
      break;
    default:
      break;
  }
}

activeContainer.addEventListener('click', (event) => {
  const item = event.target.closest('.link-item');
  if (!item) return;
  const link = getLinkById(item.dataset.id);
  if (!link) return;
  handleCopy(link);
});

archivedContainer.addEventListener('click', (event) => {
  const item = event.target.closest('.link-item');
  if (!item) return;
  const link = getLinkById(item.dataset.id);
  if (!link) return;
  handleCopy(link);
});

[activeContainer, archivedContainer].forEach((container) => {
  container.addEventListener('contextmenu', (event) => {
    const item = event.target.closest('.link-item');
    if (!item) return;
    event.preventDefault();
    const link = getLinkById(item.dataset.id);
    if (!link) return;

    contextTargetId = link.id;
    updateContextMenuForLink(link);
    contextMenu.hidden = false;
    const pointerPadding = 8;
    const { innerWidth, innerHeight } = window;
    const menuRect = contextMenu.getBoundingClientRect();
    const x = Math.min(
      event.clientX,
      innerWidth - menuRect.width - pointerPadding
    );
    const y = Math.min(
      event.clientY,
      innerHeight - menuRect.height - pointerPadding
    );
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
  });
});

contextMenu.addEventListener('click', (event) => {
  const action = event.target.closest('button')?.dataset.action;
  if (!action) return;
  handleContextAction(action);
  hideContextMenu();
});

document.addEventListener('click', (event) => {
  if (!contextMenu.hidden && !contextMenu.contains(event.target)) {
    hideContextMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !contextMenu.hidden) {
    hideContextMenu();
  }
});

document.addEventListener('scroll', () => {
  if (!contextMenu.hidden) hideContextMenu();
});

window.addEventListener('blur', hideContextMenu);
window.addEventListener('resize', hideContextMenu);
