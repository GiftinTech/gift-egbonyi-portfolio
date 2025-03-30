const sidebar = document.querySelector('.sidebar');
const brandName = document.querySelector('.brand-name');
const menubarSvg = document.querySelector('.js-menu-sidebar-svg');
const hideSidebarSvg = document.querySelector('.js-hide-sidebar-svg');
const themeToggle = document.querySelectorAll('.js-theme-toggle');
const body = document.body;
const anchorElements = document.querySelectorAll('a');
const flipCards = document.querySelectorAll('.skill-container > .skill-cards');
const connectSidebar = document.querySelector('.js-connect-with-me-sidebar');
const showConnectSvg = document.querySelector(".connect-with-me svg:first-of-type");
const hideConnectSvg = document.querySelector(".connect-with-me svg:last-of-type");

document.addEventListener("DOMContentLoaded", () => {
  // Function to apply theme based on local storage
  function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.toggle('dark-mode', savedTheme === 'dark');
    updateThemeIcon(savedTheme);
  }

  // Function to update the theme icon
  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeToggle.forEach(toggle => {
        toggle.innerHTML = darkModeIcon();
      });
    } else {
      themeToggle.forEach(toggle => {
        toggle.innerHTML = lightModeIcon();
      });      
    }
  }

  // Function to return dark mode icon
  function darkModeIcon() {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
        <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/>
      </svg>
    `;
  }

  // Function to return light mode icon
  function lightModeIcon() {
    return `
       <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
        <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>
      </svg>
    `;
  }

  // Apply theme and update icon
  applyTheme();

  // Toggle dark and Light mode functionality
  themeToggle.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark-mode'); 
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark ? 'dark' : 'light'); 
    });
  })

  // Toggle sidebar functionality
  function toggleSidebar() {
    const isVisible = sidebar.classList.toggle('visible');
    localStorage.setItem('sidebarVisible', isVisible); 

    menubarSvg.classList.toggle('hidden', isVisible);
    hideSidebarSvg.classList.toggle('hidden', !isVisible);
    hideSidebarSvg.style.display = isVisible ? 'flex' : 'none';
    brandName.style.display = isVisible ? 'none' : 'flex';
  }

  // Sidebar event listeners
  menubarSvg.addEventListener('click', toggleSidebar);
  hideSidebarSvg.addEventListener('click', toggleSidebar);

  // Apply sidebar state on load
  const savedSidebarState = localStorage.getItem('sidebarVisible') === 'true';
  if (savedSidebarState) toggleSidebar();
});

// Close sidebar when clicking outside function
document.addEventListener('click', (e) => {
  if (
    sidebar.classList.contains('visible') &&
    !sidebar.contains(e.target) &&
    !menubarSvg.contains(e.target) && 
    !hideSidebarSvg.contains(e.target)
  ) {
    sidebar.classList.remove('visible');
    hideSidebarSvg.classList.add('hidden'); 
    menubarSvg.classList.remove('hidden');
    brandName.style.display = 'block'; 
  }
});

// Close sidebar when a link is clicked function
anchorElements.forEach((a) => {
  a.addEventListener('click', () => {
    sidebar.classList.remove('visible');
    hideSidebarSvg.classList.add('hidden'); 
    hideSidebarSvg.style.display = 'none'; // Hide it properly
    menubarSvg.classList.remove('hidden');
    brandName.style.display = 'block';
  });
});

//Prevent sidebar closing behavior for nav links to their html pages
document.querySelectorAll('.hideOnMobile').forEach(link => {
  link.addEventListener('click', (event) => {
    event.stopPropagation()
  })
})

// Skills flipcards mouseenter and mouseleave
flipCards.forEach((card)  => {
  card.addEventListener('mouseenter', () => {
    card.style.cursor = 'pointer' 
    card.style.transform = 'rotateY(180deg)'
  })

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateY(0deg)'
  }) 
})

/* //Download resume function 
document.querySelectorAll('.js-download-resume').addEventListener('click', () => {
  //create a link element
  let link = document.createElement('a');
  link.href = 'https://docs.google.com/document/d/1_hdJP_6CwfDrP2BfjCXmZNmOMDC7CcdRH1aNE0EXbsk/edit?usp=sharing';
  link.target = '_blank';
  link.tabIndex = '0';
  link.rel = 'noopener';
  link.download = 'gift-egbonyi-resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
})
 */

// Intersection Observer for all paragraph animating elements as they come into view
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.skills-flex-items > p');

  const observerOptions = {
    root: null, // Use the viewport
    rootMargin: '0px',
    threshold: 0.5, // Trigger when 50% of the element is visible
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add the 'visible' class when the element is in view
        entry.target.classList.add('visible');
      } else {
        // Optionally remove the class if it's not in view (for resetting on scroll back)
        entry.target.classList.remove('visible');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe each paragraph element
  elements.forEach(element => {
    observer.observe(element);
  });
});

// Connect with me toggle functionality 
document.addEventListener('DOMContentLoaded', () => {
  // Restore previous sidebar state
  const savedState = localStorage.getItem('connectSidebarVisible') === 'true';
  connectSidebar.classList.toggle('visible', savedState);
  showConnectSvg.classList.toggle('hidden', savedState);
  hideConnectSvg.classList.toggle('hidden', !savedState);

  // Toggle connectSidebar functionality
  function toggleConnectSidebar() {
    const isVisible = connectSidebar.classList.toggle('visible');
    localStorage.setItem('connectSidebarVisible', isVisible); 

    showConnectSvg.classList.toggle('hidden', isVisible);
    hideConnectSvg.classList.toggle('hidden', !isVisible);
  }

  // connectSidebar event listeners
  showConnectSvg.addEventListener('click', toggleConnectSidebar);
  hideConnectSvg.addEventListener('click', toggleConnectSidebar);

 // Close sidebar when clicking outside
 document.addEventListener('click', (e) => {
  if (
    connectSidebar.classList.contains('visible') &&
    !connectSidebar.contains(e.target) &&
    !showConnectSvg.contains(e.target) && 
    !hideConnectSvg.contains(e.target)
  ) {
    connectSidebar.classList.remove('visible');
    hideConnectSvg.classList.add('hidden'); 
    showConnectSvg.classList.remove('hidden');
    localStorage.setItem('connectSidebarVisible', false);
  }
});
});

// Function to redirect to email when say hello button is clicked
const contactBtn = () => {
  window.open('mailto:egbonyigiftvicky@gmail.com', '_blank', 'noopener')
};
 
