import { html, defineApp, LithiumApp } from '@lithium-ts/core';
import { routes } from '@/routes/routes.js';
import { initI18n } from '@config/i18n';

import style from './main-app.style.css?inline';

const appConfig = {
  tag: 'main-app',
  routes: routes,
  styles: [style],
  i18n: initI18n,
};

@defineApp(appConfig)
export class MainApp extends LithiumApp {
  render() {
    return html`
      <lithium-router>
        ${this._router.outlet()}
      </lithium-router>
    `;
  }
}