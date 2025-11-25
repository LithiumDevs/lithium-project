import { definePage, html, LithiumElement } from "@lithium-ts/core";

import styles from './home.page.css?inline';

@definePage({
  tag: 'home-page',
  styles: [styles]
})
export class HomePage extends LithiumElement {
  private counter = this.channel<number>('counter:session', {
    initialValue: 0
  });

  render() {
    return html`
      <div class="page-container">
        <h1>Welcome Home ${this.counter.get()}</h1>
        <img src="/logo.png" alt="Lithium Logo" width="200" />
        <p>This is the home page</p>

        <button @click=${this.plusOne}>Counter</button>
        <button @click=${() => this.navigate('/second')}>Go to Second Page</button>
      </div>
    `;
  }

  private plusOne() {
    this.publish('counter:session', this.counter.get() + 1);
  }
}