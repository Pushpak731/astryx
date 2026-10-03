// Copyright (c) Meta Platforms, Inc. and affiliates.
// Arm B: actions composed as controls in a slot.
export * from '../../../../../packages/core/src';
import type {ReactNode} from 'react';
import type {BaseListItemProps, ActionTone, ActionsReveal} from './common';
export type ListItemActionProps = {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  tone?: ActionTone;
  isDisabled?: boolean;
};
export declare function ListItemAction(props: ListItemActionProps): ReactNode;
export type ListItemProps = BaseListItemProps & {
  actions?: ReactNode;
  actionsReveal?: ActionsReveal;
};
export declare function ListItem(props: ListItemProps): ReactNode;
