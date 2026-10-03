// Copyright (c) Meta Platforms, Inc. and affiliates.
// Shared pieces of the candidate-API stubs. Everything not overridden by an
// arm comes straight from the real core sources, so an output that imports a
// real component (Icon, Button, Dialog) typechecks against the real surface.
import type {ReactNode} from 'react';
export type {ListItemProps as BaseListItemProps} from '../../../../../packages/core/src/List/ListItem';
export type ActionTone = 'accent' | 'success' | 'warning' | 'error';
export type ActionsReveal = 'always' | 'adaptive';
export type NodeOut = ReactNode;
