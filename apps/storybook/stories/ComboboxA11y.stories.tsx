// Copyright (c) Meta Platforms, Inc. and affiliates.

/** Checked-in browser fixtures for Selector's Combobox contract binding. */

import type {Meta, StoryObj} from '@storybook/react';
import {Selector} from '@astryxdesign/core/Selector';

const meta: Meta<typeof Selector> = {
  title: 'Core/Accessibility/Combobox',
  component: Selector,
  parameters: {layout: 'centered'},
  decorators: [
    Story => (
      <div style={{width: 280}}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Fruit',
    options: [
      {value: 'apple', label: 'Apple'},
      {value: 'banana', label: 'Banana'},
    ],
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Selector>;

export const SelectorClosed: Story = {};
export const SelectorOpen: Story = {};
export const SelectorReadOnly: Story = {
  args: {isReadOnly: true, value: 'apple'},
};
export const SelectorBusy: Story = {
  args: {isLoading: true},
};
