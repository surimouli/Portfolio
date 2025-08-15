gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

gsap.defaults({ ease: "none" });

// Pulses for each milestone (used for the ball "pulse" animation)
const pulses = gsap.timeline({
  defaults: {
    scale: 2,
    autoAlpha: 1,
    transformOrigin: 'center',
    ease: "elastic(2.5,1)",
    duration: 0.5
  }
})
.to(".ball02, .text01", { autoAlpha: 1 }, 0.84)
.to(".ball03, .text02", { autoAlpha: 1 }, 1.36)
.to(".ball04, .text03", { autoAlpha: 1 }, 1.92)
.to(".ball05, .text04", { autoAlpha: 1 }, 2.48)
.to(".ball06, .text05", { autoAlpha: 1 }, 3.04);

// ScrollTrigger for pinning and controlling the animation
gsap.timeline({
  scrollTrigger: {
    trigger: ".experience-section",  // Pin the entire Experience section
    start: "top top",  // Pin the section when it hits the top of the viewport
    endTrigger: ".experience-section", // Unpin when the last ball hits the viewport
    end: "bottom top", // Unpin once the last ball (ball06) reaches the top
    scrub: true,       // Smooth scrolling animation tied to the scroll
    pin: true,         // Pin the section
    pinSpacing: false, // Disable extra spacing after the pin
    markers: true,     // Show markers for debugging
  }
})
.from(".theLine", { drawSVG: 0, duration: 4 }) // Animate the line from 0 to full visibility
.to(".ball01", {
  motionPath: {
    path: ".theLine",  // Follow the path of the line
    align: ".theLine", // Align the ball with the line
    alignOrigin: [0.5, 0.5]  // Center the ball on the line
  },
  duration: 4  // Set the animation duration to 4 seconds
}, 0)
.add(pulses, 0);  // Add the pulse animations after the main animation
