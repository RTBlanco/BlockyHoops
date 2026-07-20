export class Menu {
  constructor(fn, time, onPauseChange = () => {}) {
    this.time = time
    this.fn = fn
    this.onPauseChange = onPauseChange
    this.isPaused = false;
    this.content = document.querySelector('.menu-background');

    this.scoredMenu = false

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (this.isPaused) {
          if (this.scoredMenu) return;
          this.resumeGame();
        } else {
          this.pauseGame();
        }
      }
    });
  }

  pauseGame() {
    this.changeToPaused()
    this.isPaused = true;
    this.onPauseChange(true);
    this.content.style.display = 'flex';
  }

  resumeGame() {
    this.isPaused = false;
    this.onPauseChange(false);
    this.content.style.display = 'none';
    this.time.reset();

    this.fn();
  }

  displayWin(onContinue) {
    this.pauseGame()
    this.changeToScored(onContinue)
    this.content.style.display = 'flex'
  }

  changeToPaused() {
    const innerHTML = `
      <H1>Game Pause</H1>
      <button>Continue</button>
    `
    this.content.firstElementChild.innerHTML = innerHTML
    this.scoredMenu = false
    const button = document.querySelector('button')
    button.focus()
    button.addEventListener('click', e => (this.resumeGame()));
  }

  changeToScored(onContinue) {
    const innerHTML = `
      <H1>Congratulations</H1>
      <h1>You Scored</h1> 
      <button autofocus>Continue to next level</button>
    `// ill change the " what ever time later"
    this.content.firstElementChild.innerHTML = innerHTML
    this.scoredMenu = true
    const button = document.querySelector('button')
    button.focus()
    button.addEventListener('click', () => {
      onContinue()
      this.resumeGame()
    });
  }
}
