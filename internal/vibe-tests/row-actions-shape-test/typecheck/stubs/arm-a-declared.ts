// Copyright (c) Meta Platforms, Inc. and affiliates.
// Arm A: actions declared as data.
export * from '../../../../../packages/core/src';
import type {ReactNode} from 'react';
import type {BaseListItemProps, ActionTone, ActionsReveal} from './common';
export type ListItemAction = {
  label: string;
  icon?: ReactNode;
  onAction: () => void;
  tone?: ActionTone;
};
export type ListItemProps = BaseListItemProps & {
  actions?: ListItemAction[];
  actionsReveal?: ActionsReveal;
};
export declare function ListItem(props: ListItemProps): ReactNode;
