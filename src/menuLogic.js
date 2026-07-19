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
    document.querySelector('button').addEventListener('click', e => (this.resumeGame()));
  }

  changeToScored(onContinue) {
    const innerHTML = `
      <H1>Congratulations</H1>
      <h1>You Scored in what ever time</h1>
      <button>Continue to next level</button>
    `
    this.content.firstElementChild.innerHTML = innerHTML
    this.scoredMenu = true
    this.content.querySelector('button').addEventListener('click', () => {
      onContinue()
      this.resumeGame()
    });
  }
}
