import { html } from 'lit';

export const routes: any[] = [
    {
      path: '/',
      render: () => html`<home-page></home-page>`,
      enter: async () => await import('@/pages/home.page'),
    },
    {
      path: '/second',
      render: () => html`<second-page></second-page>`,
      enter: async () => await import('@/pages/second.page'),
    },
];
