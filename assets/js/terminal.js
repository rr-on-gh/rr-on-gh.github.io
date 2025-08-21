// Terminal Animation Script for rao.sh
class TerminalAnimation {
  constructor() {
    this.commands = [
      { cmd: './rao.sh --init', delay: 1000 },
      { cmd: '', delay: 500 }
    ];

    this.outputs = [
      { text: 'Initializing rao.sh environment...', type: 'info', delay: 800 },
      { text: 'Loading profile data...', type: 'info', delay: 600 },
      { text: 'Setting up development environment...', type: 'info', delay: 700 },
      { text: 'Fetching project data...', type: 'info', delay: 500 },
      { text: 'Configuring terminal interface...', type: 'info', delay: 600 },
      { text: '✓ Environment ready', type: 'success', delay: 400 },
      { text: '✓ Profile loaded successfully', type: 'success', delay: 300 },
      { text: '✓ Development tools initialized', type: 'success', delay: 300 },
      { text: '✓ Projects synchronized', type: 'success', delay: 300 },
      { text: '✓ Interface configured', type: 'success', delay: 300 },
      { text: '', delay: 500 },
      { text: 'Welcome to rao.sh! Launching website...', type: 'success', delay: 800 }
    ];

    this.currentCommandIndex = 0;
    this.currentOutputIndex = 0;
    this.isTyping = false;
  }

  async init() {
    // Wait a bit before starting
    await this.delay(1000);
    await this.typeCommands();
    await this.showOutputs();
    await this.delay(1000);
    this.showMainContent();
  }

  async typeCommands() {
    for (let i = 0; i < this.commands.length; i++) {
      const command = this.commands[i];
      await this.typeCommand(command.cmd);
      await this.delay(command.delay);

      if (i < this.commands.length - 1) {
        this.addNewLine();
      }
    }
  }

  async typeCommand(text) {
    const commandElement = document.getElementById('typing-command');
    commandElement.textContent = '';

    for (let i = 0; i < text.length; i++) {
      commandElement.textContent += text[i];
      await this.delay(50 + Math.random() * 50); // Vary typing speed
    }
  }

  async showOutputs() {
    const outputContainer = document.getElementById('terminal-output');

    for (const output of this.outputs) {
      if (output.text) {
        const outputLine = document.createElement('div');
        outputLine.className = `output-line ${output.type || ''}`;
        outputContainer.appendChild(outputLine);

        // Type out the output
        for (let i = 0; i < output.text.length; i++) {
          outputLine.textContent += output.text[i];
          await this.delay(20);
        }
      }

      await this.delay(output.delay);
    }
  }

  addNewLine() {
    const outputContainer = document.getElementById('terminal-output');
    const newLine = document.createElement('div');
    newLine.className = 'terminal-line';
    newLine.innerHTML = '<span class="prompt">rakshith@rao:~$</span> <span class="cursor">|</span>';
    outputContainer.appendChild(newLine);
  }

  showMainContent() {
    const loader = document.getElementById('terminal-loader');
    const mainContent = document.getElementById('main-content');

    // Fade out terminal
    loader.classList.add('fade-out');

    // Show main content
    setTimeout(() => {
      loader.style.display = 'none';
      mainContent.classList.add('show');
    }, 500);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if user has seen the animation before (optional)
  const hasSeenAnimation = sessionStorage.getItem('rao-sh-animation-seen');

  if (!hasSeenAnimation) {
    const terminal = new TerminalAnimation();
    terminal.init();
    sessionStorage.setItem('rao-sh-animation-seen', 'true');
  } else {
    // Skip animation for returning users in the same session
    document.getElementById('terminal-loader').style.display = 'none';
    document.getElementById('main-content').classList.add('show');
  }
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
  // Add typing effect to code blocks
  const codeBlocks = document.querySelectorAll('.code-block');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document.querySelectorAll('.content-section, .code-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
});