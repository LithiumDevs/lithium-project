import { LithiumElement, definePage, html } from "@lithium";
import { t } from "@/i18n";

@definePage({
  tag: "second-page",
  title: "Second Page",
})
export class SecondPage extends LithiumElement {
  private counter = this.channel<number>('counter:session', {
    initialValue: 0
  });

  render() {
    return html`
      <h1>${t("welcome")} ${this.counter.get()}</h1>

      <button @click=${this.plusOne}>${t('counter')}</button>
      <button @click=${() => this.navigate("/")}>${t("return_home")}</button>
    `;
  }

  private plusOne() {
    this.publish('counter:session', this.counter.get() + 1);
  }
}
