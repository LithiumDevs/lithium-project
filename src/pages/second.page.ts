import { LithiumElement, definePage, html } from "@lithium-ts/core";
import { t } from "@config/i18n";

import styles from './second.page.css?inline';

@definePage({
  tag: "second-page",
  title: "Second Page",
  styles: [styles]
})
export class SecondPage extends LithiumElement {
  private counter = this.channel<number>('counter:session', {
    initialValue: 0
  });

  render() {
    return html`
      <div class="page-container">
        <h1>${t("welcome")} ${this.counter.get()}</h1>
        <img src="/logo.png" alt="Lithium Logo" width="200" />

        <button @click=${this.plusOne}>${t('counter')}</button>
        <button @click=${() => this.navigate("/")}>${t("return_home")}</button>
      </div>
    `;
  }

  private plusOne() {
    this.publish('counter:session', this.counter.get() + 1);
  }
}
