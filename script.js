/**
 * MRKHAN WORKS
 * Founder: Akram Khan
 * Website interactions, WhatsApp orders and 3D hero animation
 */

/* =========================================
   1. WHATSAPP SETTINGS
========================================= */

// Apna WhatsApp Business number country code ke saath add karo.
// Example: India +91 9876543210 => 919876543210
// Number mein +, spaces ya hyphens mat lagana.
const WHATSAPP_PHONE_NUMBER = "+91 7058590197";


/* =========================================
   2. HELPER FUNCTIONS
========================================= */

function openWhatsApp(message) {
  const phone = WHATSAPP_PHONE_NUMBER.replace(/\D/g, "");

  if (!phone || phone === "+91 7058591097") {
    alert(
      "Please add your WhatsApp number in script.js first."
    );
    return;
  }

  const url =
    "https://wa.me/" +
    phone +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank", "noopener,noreferrer");
}


/* =========================================
   3. LOADING SCREEN
========================================= */

function hidePreloader() {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";
    preloader.style.pointerEvents = "none";

    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  }
}

window.addEventListener("load", () => {
  setTimeout(hidePreloader, 800);
});

// Safety fallback: loading screen should not remain forever.
setTimeout(hidePreloader, 4000);


/* =========================================
   4. NAVBAR SCROLL EFFECT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");

  function updateNavbar() {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    }
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });
});


/* =========================================
   5. MOBILE NAVIGATION MENU
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (
      !navMenu.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
});


/* =========================================
   6. SMOOTH SCROLLING
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});


/* =========================================
   7. FAQ ACCORDION
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.setAttribute("aria-expanded", "false");

    question.addEventListener("click", () => {
      const willOpen = !item.classList.contains("active");

      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");

        const otherQuestion =
          otherItem.querySelector(".faq-question");

        if (otherQuestion) {
          otherQuestion.setAttribute("aria-expanded", "false");
        }
      });

      if (willOpen) {
        item.classList.add("active");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });
});
/* =========================================
   8. SERVICE BUTTONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(
    ".service-action-btn[data-service]"
  );

  const serviceSelect = document.getElementById("serviceType");
  const orderForm = document.getElementById("orderForm");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const serviceName = button.dataset.service;

      if (!serviceSelect || !orderForm) {
        console.error("Order form or service dropdown not found.");
        return;
      }

      const option = Array.from(serviceSelect.options).find(
        (item) => item.value.trim() === serviceName.trim()
      );

      if (!option) {
        console.error("Service option not found:", serviceName);
        return;
      }

      serviceSelect.value = option.value;

      orderForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });
  });
});


/* =========================================
   9. WHATSAPP ORDER FORM
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const orderForm = document.getElementById("orderForm");

  if (!orderForm) {
    console.error("Order form not found!");
    return;
  }

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const getValue = (id) => {
      const field = document.getElementById(id);
      return field ? field.value.trim() : "";
    };

    const name = getValue("customerName");
    const phone = getValue("customerPhone");
    const qualification = getValue("qualification");
    const service = getValue("serviceType");
    const subject = getValue("subject");
    const deadline = getValue("deadline");
    const details = getValue("orderDetails");

    if (
      !name || !phone || !qualification ||
      !service || !subject || !deadline
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const whatsappNumber = WHATSAPP_PHONE_NUMBER.replace(/\D/g, "");

    const message =
      "NEW ORDER - MRKHAN WORKS\n\n" +
      "Customer Name: " + name + "\n" +
      "Customer Phone: " + phone + "\n" +
      "Qualification: " + qualification + "\n" +
      "Service: " + service + "\n" +
      "Subject / Project: " + subject + "\n" +
      "Required Date: " + deadline + "\n" +
      "Additional Details: " + (details || "Not provided") +
      "\n\nPlease confirm my order and share the price.";

    const whatsappURL =
      "https://api.whatsapp.com/send?phone=" +
      whatsappNumber +
      "&text=" +
      encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
  });
});

/* =========================================
   10. DIRECT WHATSAPP BUTTONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Add data-whatsapp to any existing link or button
  // to make it open WhatsApp.
  document.querySelectorAll("[data-whatsapp]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const customMessage =
        button.getAttribute("data-whatsapp-message") ||
        "Hello MRKHAN WORKS! I would like to know more about your services.";

      if (button.tagName.toLowerCase() === "a") {
        event.preventDefault();
      }

      openWhatsApp(customMessage);
    });
  });

  // Create a floating WhatsApp button if one doesn't exist.
  if (!document.getElementById("floatingWhatsApp")) {
    const floatingButton = document.createElement("a");

    floatingButton.id = "floatingWhatsApp";
    floatingButton.href = "#";
    floatingButton.target = "_blank";
    floatingButton.rel = "noopener noreferrer";
    floatingButton.setAttribute(
      "aria-label",
      "Chat with MRKHAN WORKS on WhatsApp"
    );
    floatingButton.title = "Chat on WhatsApp";
    floatingButton.textContent = "WhatsApp";

    floatingButton.style.cssText = [
      "position:fixed",
      "right:18px",
      "bottom:18px",
      "z-index:999",
      "padding:13px 18px",
      "border-radius:999px",
      "background:#25D366",
      "color:#ffffff",
      "font-weight:700",
      "font-size:14px",
      "text-decoration:none",
      "box-shadow:0 8px 24px rgba(0,0,0,.25)",
      "font-family:Arial,sans-serif"
    ].join(";");

    floatingButton.addEventListener("click", (event) => {
      event.preventDefault();

      openWhatsApp(
        "Hello MRKHAN WORKS! 👋 I would like to know more about your services."
      );
    });

    document.body.appendChild(floatingButton);
  }
});


/* =========================================
   11. LIVE 3D HERO ANIMATION (THREE.JS)
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("heroCanvas");

  if (!container || typeof THREE === "undefined") {
    console.warn(
      "Three.js or #heroCanvas was not found. 3D animation skipped."
    );
    return;
  }

  // Avoid creating the same animation more than once.
  if (container.dataset.threeInitialized === "true") return;
  container.dataset.threeInitialized = "true";

  let scene;
  let camera;
  let renderer;
  let animationFrameId;
  let particlePoints;
  let wireframeObject;
  let resizeObserver;

  try {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      55,
      Math.max(container.clientWidth, 1) /
        Math.max(container.clientHeight, 1),
      0.1,
      100
    );

    camera.position.z = 7;

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 1.75)
    );

    renderer.setSize(
      Math.max(container.clientWidth, 1),
      Math.max(container.clientHeight, 1)
    );

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    container.appendChild(renderer.domElement);

    // Floating wireframe sphere.
    const sphereGeometry = new THREE.IcosahedronGeometry(1.7, 2);

    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x568bff,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });

    wireframeObject = new THREE.Mesh(
      sphereGeometry,
      sphereMaterial
    );

    scene.add(wireframeObject);

    // Glowing particle field.
    const particleCount = window.innerWidth < 600 ? 350 : 700;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }

    const particleGeometry = new THREE.BufferGeometry();

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8bb7ff,
      size: 0.035,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });

    particlePoints = new THREE.Points(
      particleGeometry,
      particleMaterial
    );

    scene.add(particlePoints);

    // Soft ambient and directional lighting.
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    const blueLight = new THREE.PointLight(0x386bff, 2, 20);
    blueLight.position.set(3, 2, 4);
    scene.add(blueLight);

    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;

    container.addEventListener("pointermove", (event) => {
      const rect = container.getBoundingClientRect();

      pointerX =
        ((event.clientX - rect.left) / rect.width - 0.5) * 0.5;

      pointerY =
        ((event.clientY - rect.top) / rect.height - 0.5) * 0.5;
    });

    container.addEventListener("pointerleave", () => {
      pointerX = 0;
      pointerY = 0;
    });

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      if (reducedMotion) {
        renderer.render(scene, camera);
        return;
      }

      const time = performance.now() * 0.0003;

      targetX += (pointerX - targetX) * 0.025;
      targetY += (pointerY - targetY) * 0.025;

      wireframeObject.rotation.x = time + targetY;
      wireframeObject.rotation.y = time * 1.3 + targetX;

      particlePoints.rotation.y = time * 0.15;
      particlePoints.rotation.x = Math.sin(time) * 0.08;

      wireframeObject.position.y = Math.sin(time * 2) * 0.12;

      camera.position.x = targetX * 0.8;
      camera.position.y = -targetY * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    function resizeRenderer() {
      if (!container.clientWidth || !container.clientHeight) return;

      camera.aspect =
        container.clientWidth / container.clientHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        container.clientWidth,
        container.clientHeight
      );
    }

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(resizeRenderer);
      resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", resizeRenderer);
    }

    animate();

    // Pause rendering when the page is hidden.
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      } else if (!document.hidden && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animate();
      }
    });

  } catch (error) {
    console.error("3D animation could not start:", error);
  }
});


/* =========================================
   12. FOOTER YEAR
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const yearElements = document.querySelectorAll(
    "#currentYear, .current-year"
  );

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
});


/* =========================================
   13. INITIALIZATION MESSAGE
========================================= */

console.log(
  "MRKHAN WORKS website script initialized successfully."
);
