// Simple unified tooltip system
document.addEventListener('DOMContentLoaded', function() {
  // Create single tooltip element
  const tooltip = document.createElement('div');
  tooltip.className = 'unified-tooltip';
  tooltip.style.cssText = `
    position: fixed;
    background-color: #1a1c20;
    color: #fff;
    padding: 8px 12px;
    border-radius: 5px;
    font-size: 13px;
    line-height: 1.4;
    max-width: 280px;
    z-index: 10000;
    pointer-events: none;
    text-align: left;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease;
    white-space: normal;
    word-wrap: break-word;
  `;
  document.body.appendChild(tooltip);

  let currentElement = null;

  function showTooltip(element, text) {
    if (!text) return;
    
    const rect = element.getBoundingClientRect();
    tooltip.textContent = text;
    tooltip.style.opacity = '1';
    tooltip.style.visibility = 'visible';

    // Position above the element
    setTimeout(() => {
      const tooltipRect = tooltip.getBoundingClientRect();
      const left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
      const top = rect.top - tooltipRect.height - 12;

      // Keep on screen
      const finalLeft = Math.max(10, Math.min(left, window.innerWidth - tooltipRect.width - 10));
      const finalTop = Math.max(10, top);

      tooltip.style.left = finalLeft + 'px';
      tooltip.style.top = finalTop + 'px';
    }, 0);
  }

  function hideTooltip() {
    tooltip.style.opacity = '0';
    tooltip.style.visibility = 'hidden';
    currentElement = null;
  }

  // Handle Experience section (title attribute)
  document.querySelectorAll('#experience .cell[title]').forEach(cell => {
    cell.addEventListener('mouseenter', () => {
      currentElement = cell;
      showTooltip(cell, cell.getAttribute('title'));
    });
    cell.addEventListener('mouseleave', hideTooltip);
  });

  // Handle Skills & Interests sections (span.tooltip)
  document.querySelectorAll('#skills .cell, #interests .cell').forEach(cell => {
    const tooltipSpan = cell.querySelector('.tooltip');
    if (tooltipSpan) {
      const text = tooltipSpan.textContent;
      tooltipSpan.style.display = 'none'; // Hide the span
      
      cell.addEventListener('mouseenter', () => {
        currentElement = cell;
        showTooltip(cell, text);
      });
      cell.addEventListener('mouseleave', hideTooltip);
    }
  });

  // Reposition on scroll
  window.addEventListener('scroll', () => {
    if (currentElement) {
      const text = currentElement.getAttribute('title') || 
                   currentElement.querySelector('.tooltip')?.textContent;
      if (text) showTooltip(currentElement, text);
    }
  });
});