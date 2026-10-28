/* ==========================================
   MRKHAN WORKS
   Founder: Akram Khan
   Interactive Website Script
   ========================================== */

"use strict";

// Replace this with your WhatsApp number.
// Use country code + number, without +, spaces, or dashes.
// Example format for India: 91XXXXXXXXXX
const WHATSAPP_PHONE_NUMBER = "YOUR_WHATSAPP_NUMBER_HERE";

document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // 1. PRELOADER — Prevents endless loading
  // ==========================================

  const preloader = document.getElementById("preloader");

  function hidePreloader() {
    if (preloader) {
      preloader.classList.add("hidden");
    }
  }

  // Hide the loader when the page loads.
  window.addEventListener("load", hidePreloader);

  // Fallback in case the load event already occurred.
  setTimeout(hidePreloader, 2000);


  // ==========================================
  // 2. NAVBAR SCROLL EFFECT
  // ==========================================

  const navbar = document.getElementById("navbar");

  function updateNavbar() {
    if (!navbar) return;

    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();


  // ==========================================
  // 3. MOBILE NAVIGATION MENU
  // ==========================================

  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {

    navToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("active");

      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after selecting a link.
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

  }


  // ==========================================
  // 4. FAQ ACCORDION
  // ==========================================

  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

      const faqItem = question.closest(".faq-item");

      if (!faqItem) return;

      const isActive = faqItem.classList.contains("active");

      // Close all FAQ items first.
      document.querySelectorAll(".faq-item").forEach(function (item) {
        item.classList.remove("active");

        const button = item.querySelector(".faq-question");
        if (button) {
          button.setAttribute("aria-expanded", "false");
        }
      });

      // Open the selected item if it was previously closed.
      if (!isActive) {
        faqItem.classList.add("active");
        question.setAttribute("aria-expanded", "true");
      }

    });

  });


  // ==========================================
  // 5. SERVICE BUTTONS
  // ==========================================

  const serviceButtons = document.querySelectorAll("[data-service]");
  const serviceSelect = document.getElementById("serviceType");

  serviceButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const selectedService = button.getAttribute("data-service");

      if (serviceSelect && selectedService) {
        const matchingOption = Array.from(serviceSelect.options).find(
          function (option) {
            return option.value === selectedService;
          }
        );

        if (matchingOption) {
          serviceSelect.value = selectedService;
        }
      }

      const orderSection = document.getElementById("order");

      if (orderSection) {
        orderSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    });

  });


  // ==========================================
  // 6. WHATSAPP ORDER FORM
  // ==========================================

  const orderForm = document.getElementById("orderForm");

  if (orderForm) {

    orderForm.addEventListener("submit", function (event) {

      event.preventDefault();

      if (!orderForm.checkValidity()) {
        orderForm.reportValidity();
        return;
      }

      if (
        !WHATSAPP_PHONE_NUMBER ||
        WHATSAPP_PHONE_NUMBER === "YOUR_WHATSAPP_NUMBER_HERE"
      ) {
        alert(
          "WhatsApp number is not configured yet. Please update the number in script.js."
        );
        return;
      }

      const customerName =
        document.getElementById("customerName")?.value.trim() || "";

      const customerPhone =
        document.getElementById("customerPhone")?.value.trim() || "";

      const qualification =
        document.getElementById("qualification")?.value.trim() || "Not specified";

      const serviceType =
        document.getElementById("serviceType")?.value || "";

      const subject =
        document.getElementById("subject")?.value.trim() || "Not specified";

      const deadline =
        document.getElementById("deadline")?.value || "Not specified";

      const orderDetails =
        document.getElementById("orderDetails")?.value.trim() || "";

      const message = [
        "Hello MRKHAN WORKS!",
        "",
        "I would like to enquire about an order.",
        "",
        "Name: " + customerName,
        "Phone: " + customerPhone,
        "Class / Qualification: " + qualification,
        "Service: " + serviceType,
        "Subject: " + subject,
        "Required By: " + deadline,
        "",
        "Project Details:",
        orderDetails,
        "",
        "Please share the price and further details.",
        "",
        "Thank you!"
      ].join("\n");

      const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_PHONE_NUMBER +
        "?text=" +
        encodeURIComponent(message);

      window.open(whatsappURL, "_blank", "noopener,noreferrer");

    });

  }


  // ==========================================
  // 7. FOOTER CURRENT YEAR
  // ==========================================

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  // ==========================================
  // 8. 3D HERO ANIMATION
  // ==========================================

  const canvasContainer = document.getElementById("heroCanvas");

  if (
    canvasContainer &&
    typeof THREE !== "undefined"
  ) {

    try {

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        60,
        canvasContainer.clientWidth /
          Math.max(canvasContainer.clientHeight, 1),
        0.1,
        1000
      );

      camera.position.z = 18;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
      });

      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, 1.5)
      );

      renderer.setSize(
        canvasContainer.clientWidth,
        canvasContainer.clientHeight
      );

      canvasContainer.appendChild(renderer.domElement);

      // Create floating particles.
      const particleCount = 450;
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 35;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
      }

      const particleGeometry = new THREE.BufferGeometry();

      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const particleMaterial = new THREE.PointsMaterial({
        color: 0x00d2ff,
        size: 0.055,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true
      });

      const particles = new THREE.Points(
        particleGeometry,
        particleMaterial
      );

      scene.add(particles);

      // Add subtle glowing wireframe objects.
      const shapes = [];

      const shapeMaterial = new THREE.MeshBasicMaterial({
        color: 0x9d4edd,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });

      for (let i = 0; i < 7; i++) {

        const geometry = new THREE.IcosahedronGeometry(
          0.6 + Math.random() * 0.9,
          1
        );

        const shape = new THREE.Mesh(
          geometry,
          shapeMaterial.clone()
        );

        shape.position.set(
          (Math.random() - 0.5) * 24,
          (Math.random() - 0.5) * 13,
          (Math.random() - 0.5) * 8
        );

        shape.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        scene.add(shape);
        shapes.push(shape);

      }

      let animationFrame;
      let animationActive = true;

      function animate() {

        if (!animationActive) return;

        animationFrame = requestAnimationFrame(animate);

        particles.rotation.y += 0.0007;
        particles.rotation.x += 0.0002;

        shapes.forEach(function (shape, index) {
          shape.rotation.x += 0.001 + index * 0.0001;
          shape.rotation.y += 0.0015;
        });

        renderer.render(scene, camera);

      }

      animate();

      // Resize animation to fit the screen.
      function resizeCanvas() {

        const width = canvasContainer.clientWidth;
        const height = canvasContainer.clientHeight;

        if (!width || !height) return;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);

      }

      window.addEventListener("resize", resizeCanvas);

      // Reduce unnecessary work when the tab is hidden.
      document.addEventListener("visibilitychange", function () {

        if (document.hidden) {
          animationActive = false;
          cancelAnimationFrame(animationFrame);
        } else if (!animationActive) {
          animationActive = true;
          animate();
        }

      });

    } catch (error) {
      console.error("3D animation could not start:", error);
    }

  }


  console.log("MRKHAN WORKS website script loaded successfully.");

});
