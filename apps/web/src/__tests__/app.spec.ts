import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import ElementPlus from 'element-plus';
import App from '../App.vue';

describe('App [AC-1] 首屏可渲染且交互可用', () => {
  it('渲染标题与初始计数', () => {
    const wrapper = mount(App, { global: { plugins: [ElementPlus] } });

    expect(wrapper.find('h1').text()).toBe('量仪管理');
    expect(wrapper.get('[data-testid="count"]').text()).toContain('0');
  });

  it('点击按钮后计数递增', async () => {
    const wrapper = mount(App, { global: { plugins: [ElementPlus] } });

    await wrapper.get('button').trigger('click');

    expect(wrapper.get('[data-testid="count"]').text()).toContain('1');
  });
});
