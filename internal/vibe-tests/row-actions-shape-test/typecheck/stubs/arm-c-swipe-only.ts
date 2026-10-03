// Copyright (c) Meta Platforms, Inc. and affiliates.
// Arm C: the open pull request's shape, on the same host as the other arms.
export * from '../../../../../packages/core/src';
import type {ReactNode} from 'react';
import type {BaseListItemProps, ActionTone} from './common';
export type SwipeAction = {
  label: string;
  icon?: ReactNode;
  onAction: () => void;
  tone?: ActionTone;
};
export type ListItemProps = BaseListItemProps & {
  swipeActions?: {leading: SwipeAction; trailing?: SwipeAction};
};
export declare function ListItem(props: ListItemProps): ReactNode;
