/* eslint-disable */
// mobile menu
const rootEvent = document.getElementById("rootElement");

const burgerIcon = document.getElementById('burger');
const navbarMenu = document.getElementById('nav-links');

const toggleBurger = () => {
  navbarMenu.classList.toggle('is-active');
  /* burgerIcon.classList.toggle('is-active'); */
}

burgerIcon.addEventListener('click', toggleBurger);

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({
        from, to, start, end,
      });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let {
        from, to, start, end, char,
      } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const phrases = [
  'web-apps.',
  'websites.',
  'databases.',
  'e-commerce.',
  'solutions.',
];

const el = document.querySelector('.text');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 4000);
  });
  counter = (counter + 1) % phrases.length;
};

next();

// Hover button

class HoverButton {
  constructor(el) {
    this.el = el;
    this.hover = false;
    this.calculatePosition();
    this.attachEventsListener();
  }
  
  attachEventsListener() {
    window.addEventListener('mousemove', e => this.onMouseMove(e));
    window.addEventListener('resize', e => this.calculatePosition(e));
  }
  
  calculatePosition() {
    gsap.set(this.el, {
      x: 0,
      y: 0,
      scale: 1
    });
    const box = this.el.getBoundingClientRect();
    this.x = box.left + (box.width * 0.5);
    this.y = box.top + (box.height * 0.5);
    this.width = box.width;
    this.height = box.height;
  }
  
  onMouseMove(e) {
    let hover = false;
    let hoverArea = (this.hover ? 0.7 : 0.5);
    let x = e.clientX - this.x;
    let y = e.clientY - this.y;
    let distance = Math.sqrt( x*x + y*y );
    if (distance < (this.width * hoverArea)) {
       hover = true;
        if (!this.hover) {
          this.hover = true;
        }
        this.onHover(e.clientX, e.clientY);
    }
    
    if(!hover && this.hover) {
      this.onLeave();
      this.hover = false;
    }
  }
  
  onHover(x, y) {
    gsap.to(this.el,  {
      x: (x - this.x) * 0.4,
      y: (y - this.y) * 0.4,
      scale: 1.15,
      ease: 'power2.out',
      duration: 0.4
    });
    this.el.style.zIndex = 10;
  }
  onLeave() {
    gsap.to(this.el, {
      x: 0,
      y: 0,
      scale: 1,
      ease: 'elastic.out(1.2, 0.4)',
      duration: 0.7
    });
    this.el.style.zIndex = 1;
  }
}

const btn1 = document.getElementById('github');
new HoverButton(btn1);

const btn2 = document.getElementById('linkedin');
new HoverButton(btn2);

const btn3 = document.getElementById('angellist');
new HoverButton(btn3);

const btn4 = document.getElementById('medium');
new HoverButton(btn4);