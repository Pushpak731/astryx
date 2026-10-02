// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Codemod: preserve BottomSheet content geometry after it became a container
 *
 * BottomSheet now pads its content box like Dialog (theme `bottom-sheet`
 * padding, else `--spacing-4`). Before, the content box had no padding, so
 * callers supplied their own inset. This codemod keeps every existing sheet's
 * geometry by adding `padding={0}` to imported BottomSheet elements that do not
 * set `padding`.
 *
 * One shape is left alone because it already renders identically: a sheet
 * whose only child is a core `Section`. A lone Section escapes the inset its
 * container publishes, so it lands exactly where it did in the unpadded box.
 *
 * `padding={0}` goes before the first spread attribute, so a spread that
 * carries `padding` still wins.
 */

export const meta = {
  title: 'Preserve BottomSheet content padding',
  description:
    'BottomSheet now pads its content like Dialog. Adds `padding={0}` to ' +
    'BottomSheet elements that do not set `padding`, keeping their previous ' +
    'unpadded content box. Sheets whose only child is a Section are left ' +
    'unchanged; they render identically. Remove `padding={0}` and your own ' +
    'inset to adopt the theme padding.',
};

const CORE_IMPORT_RE = /^@(astryxdesign|xds)\/core(?:\/|$)/;

/**
 * Local JSX names bound to core components, by imported name.
 * @param {any} root
 * @param {any} j
 * @param {string} component
 * @returns {{direct: Set<string>, namespaces: Set<string>}}
 */
function findBindings(root, j, component) {
  const direct = new Set();
  const namespaces = new Set();
  root.find(j.ImportDeclaration).forEach((/** @type {any} */ importPath) => {
    const source = importPath.node.source.value;
    if (
      importPath.node.importKind === 'type' ||
      typeof source !== 'string' ||
      !CORE_IMPORT_RE.test(source)
    ) {
      return;
    }
    const subpath = source.split('/').at(-1);
    for (const specifier of importPath.node.specifiers ?? []) {
      if (specifier.importKind === 'type') continue;
      if (specifier.type === 'ImportSpecifier') {
        const imported = specifier.imported?.name ?? specifier.imported?.value;
        if (imported === component) {
          direct.add(specifier.local?.name ?? imported);
        }
      } else if (
        specifier.type === 'ImportDefaultSpecifier' &&
        subpath === component
      ) {
        direct.add(specifier.local.name);
      } else if (specifier.type === 'ImportNamespaceSpecifier') {
        namespaces.add(specifier.local.name);
      }
    }
  });
  return {direct, namespaces};
}

/**
 * @param {any} name JSX element name node
 * @param {{direct: Set<string>, namespaces: Set<string>}} bindings
 * @param {string} component
 */
function nameMatches(name, bindings, component) {
  if (name?.type === 'JSXIdentifier') {
    return bindings.direct.has(name.name);
  }
  return (
    name?.type === 'JSXMemberExpression' &&
    name.object?.type === 'JSXIdentifier' &&
    bindings.namespaces.has(name.object.name) &&
    name.property?.name === component
  );
}

/**
 * Children that render something: drops whitespace-only text and empty
 * `{}` / `{/* comment *\/}` containers.
 * @param {any[]} children
 */
function meaningfulChildren(children) {
  return children.filter((/** @type {any} */ child) => {
    if (child.type === 'JSXText') {
      return child.value.trim() !== '';
    }
    if (child.type === 'JSXExpressionContainer') {
      return child.expression?.type !== 'JSXEmptyExpression';
    }
    return true;
  });
}

/**
 * @param {import('../../../../authoring/codemod/type').AstryxCodemodFile} file
 * @param {import('../../../../authoring/codemod/type').CodemodTransformApi} api
 * @returns {string | null | undefined}
 */
export default function transformer(file, api) {
  if (!file.source.includes('BottomSheet')) return undefined;
  const j = api.jscodeshift;
  const root = j(file.source);
  const sheets = findBindings(root, j, 'BottomSheet');
  if (sheets.direct.size === 0 && sheets.namespaces.size === 0) {
    return undefined;
  }
  const sections = findBindings(root, j, 'Section');
  let hasChanges = false;

  root.find(j.JSXElement).forEach((/** @type {any} */ elementPath) => {
    const opening = elementPath.node.openingElement;
    if (!nameMatches(opening.name, sheets, 'BottomSheet')) return;

    const attributes = opening.attributes ?? [];
    const setsPadding = attributes.some(
      (/** @type {any} */ attribute) =>
        attribute.type === 'JSXAttribute' && attribute.name?.name === 'padding',
    );
    if (setsPadding) return;

    const children = meaningfulChildren(elementPath.node.children ?? []);
    const hasChildrenAttribute = attributes.some(
      (/** @type {any} */ attribute) =>
        attribute.type === 'JSXAttribute' &&
        attribute.name?.name === 'children',
    );
    if (
      !hasChildrenAttribute &&
      children.length === 1 &&
      children[0].type === 'JSXElement' &&
      nameMatches(children[0].openingElement.name, sections, 'Section')
    ) {
      return;
    }

    const padding = j.jsxAttribute(
      j.jsxIdentifier('padding'),
      j.jsxExpressionContainer(j.numericLiteral(0)),
    );
    const firstSpread = attributes.findIndex(
      (/** @type {any} */ attribute) => attribute.type === 'JSXSpreadAttribute',
    );
    if (firstSpread === -1) {
      attributes.push(padding);
    } else {
      attributes.splice(firstSpread, 0, padding);
    }
    opening.attributes = attributes;
    hasChanges = true;
  });

  return hasChanges ? root.toSource() : undefined;
}
