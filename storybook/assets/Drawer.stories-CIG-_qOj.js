import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{t as n}from"./react-B7Te67-h.js";import{t as r}from"./jsx-runtime-DqZldVDK.js";import{t as i}from"./Text-BsKv-syz.js";import{t as a}from"./Button-DA0IvI_z.js";import{t as o}from"./Button-CdztB0UK.js";import{t as s}from"./Divider-DNoxHpVC.js";import{t as c}from"./Divider-BM1mhUtH.js";import{t as l}from"./Heading-BbikP_qH.js";import{i as u,o as d,t as f}from"./Stack-B0E4i6ZH.js";import{t as p}from"./Section-D4TqNfhy.js";import{t as m}from"./Section-DupXQJXg.js";import{t as h}from"./Heading-BdLqER6t.js";import{t as g}from"./Text-_U_Unoi1.js";import{t as _}from"./CheckboxInput-CTYAqHVG.js";import{t as v}from"./CheckboxInput-D_ZikzgY.js";import{Cn as y,t as b}from"./src-CCS-pLaz.js";var x,S,C,w,T,E,D,O,k,A,j,M,N;e((()=>{x=t(n()),b(),o(),v(),c(),h(),m(),f(),g(),S=r(),C={title:`Lab/Drawer`,component:y,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:[`A side panel that **floats above** page content — it overlays the`,`layout instead of reflowing it, which is what separates a drawer`,`from a docked panel.`,``,`- Anchors to the **inline start or end** edge only (left/right in`,"  LTR); block-axis sheets are `BottomSheet`.","- Works on **desktop and touch**: `width` is the desktop budget",`  budget, and below 640px the panel preserves a 56px reveal`,"  without exceeding that budget (`isFullWidthOnMobile` makes it",`  edge to edge).`,`- **Scrim optional**: modal with a scrim by default, or`,"  `hasScrim={false}` for a non-modal overlay that leaves the page",`  behind interactive.`,`- **Square corners** (0px radius) — the panel is flush with three`,`  viewport edges.`].join(`
`)}}},decorators:[e=>(0,S.jsx)(`div`,{style:{width:560,minHeight:360,padding:32},children:(0,S.jsx)(e,{})})]},w=[`us-east-1`,`eu-west-1`,`ap-south-1`],T={render:()=>{let[e,t]=(0,x.useState)(!1);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(a,{label:`Open inspector`,onClick:()=>t(!0)}),(0,S.jsx)(y,{isOpen:e,onOpenChange:t,label:`Deployment details`,width:400,children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsxs)(u,{gap:1,children:[(0,S.jsx)(l,{level:3,children:`web-prod-04`}),(0,S.jsx)(i,{type:`supporting`,color:`secondary`,children:`us-east-1, deployed 12 min ago`})]}),(0,S.jsx)(s,{}),(0,S.jsxs)(u,{gap:2,children:[(0,S.jsx)(i,{type:`label`,children:`Status`}),(0,S.jsx)(i,{type:`body`,children:`Healthy - all 6 instances passing readiness checks.`})]}),(0,S.jsxs)(u,{gap:2,children:[(0,S.jsx)(i,{type:`label`,children:`Build`}),(0,S.jsx)(i,{type:`body`,children:`#4821 - main @ 03536f1`})]})]})})})]})}},E={render:()=>{let[e,t]=(0,x.useState)(!1);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(a,{label:`Open drawer`,onClick:()=>t(!0)}),(0,S.jsx)(y,{isOpen:e,onOpenChange:t,label:`Details`,hasScrim:!1,width:360,children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsxs)(u,{gap:1,children:[(0,S.jsx)(l,{level:3,children:`Details`}),(0,S.jsx)(i,{type:`supporting`,color:`secondary`,children:`The page behind stays interactive.`})]}),(0,S.jsx)(a,{label:`Close inspector`,variant:`secondary`,onClick:()=>t(!1)})]})})})]})}},D={render:()=>{let[e,t]=(0,x.useState)(!1),[n,r]=(0,x.useState)(!1);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(a,{label:`Open order`,onClick:()=>t(!0)}),(0,S.jsx)(y,{isOpen:e,onOpenChange:t,label:`Order details`,hasScrim:!1,children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsx)(l,{level:3,children:`Order #4821`}),(0,S.jsx)(i,{type:`body`,children:`Three line items, ready to ship.`}),(0,S.jsx)(a,{label:`Open line item`,"data-autofocus":!0,onClick:()=>r(!0)})]})})}),(0,S.jsx)(y,{isOpen:n,onOpenChange:r,label:`Line item details`,hasScrim:!1,width:320,children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsx)(l,{level:3,children:`Compute instance`}),(0,S.jsx)(i,{type:`body`,children:`Quantity 6 · us-east-1`}),(0,S.jsx)(a,{label:`Close line item`,variant:`secondary`,"data-autofocus":!0,onClick:()=>r(!1)})]})})})]})}},O={render:()=>{let[e,t]=(0,x.useState)(null);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(d,{gap:2,children:[(0,S.jsx)(a,{label:`Open from start`,onClick:()=>t(`start`)}),(0,S.jsx)(a,{label:`Open from end`,onClick:()=>t(`end`)})]}),(0,S.jsx)(y,{isOpen:e!=null,onOpenChange:e=>!e&&t(null),label:`Filters (${e??`end`})`,side:e??`end`,children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsx)(l,{level:3,children:`Filter by region`}),(0,S.jsxs)(i,{type:`supporting`,color:`secondary`,children:[`Sliding in from the `,e,` edge.`]})]})})})]})}},k={render:()=>{let[e,t]=(0,x.useState)(null);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(d,{gap:2,children:[(0,S.jsx)(a,{label:`320px`,onClick:()=>t(320)}),(0,S.jsx)(a,{label:`480px`,onClick:()=>t(480)}),(0,S.jsx)(a,{label:`50%`,onClick:()=>t(`50%`)})]}),(0,S.jsx)(y,{isOpen:e!=null,onOpenChange:e=>!e&&t(null),label:`Details`,width:e??400,children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsx)(l,{level:3,children:`web-prod-04`}),(0,S.jsxs)(i,{type:`body`,children:[`Desktop width budget: `,String(e)]})]})})})]})}},A={render:()=>{let[e,t]=(0,x.useState)(!1),[n,r]=(0,x.useState)(!1),[o,s]=(0,x.useState)(w.slice(0,1)),c=(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsxs)(u,{gap:1,children:[(0,S.jsx)(l,{level:3,children:`Filter by region`}),(0,S.jsxs)(i,{type:`supporting`,color:`secondary`,children:[`Showing hosts in `,o.length,` of `,w.length,` regions`]})]}),(0,S.jsx)(u,{gap:2,children:w.map(e=>(0,S.jsx)(_,{label:e,value:o.includes(e),onChange:t=>s(n=>t?[...n,e]:n.filter(t=>t!==e))},e))}),(0,S.jsx)(a,{label:`Apply filters`,onClick:()=>{t(!1),r(!1)},"data-autofocus":!0})]})});return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(d,{gap:2,children:[(0,S.jsx)(a,{label:`56px reveal on mobile`,onClick:()=>r(!0)}),(0,S.jsx)(a,{label:`Full width on mobile`,variant:`secondary`,onClick:()=>t(!0)})]}),(0,S.jsx)(y,{isOpen:n,onOpenChange:r,label:`Region filters`,children:c}),(0,S.jsx)(y,{isOpen:e,onOpenChange:t,label:`Region filters (full width)`,isFullWidthOnMobile:!0,children:c})]})}},j={render:()=>{let[e,t]=(0,x.useState)(!1);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(u,{gap:3,children:[(0,S.jsx)(a,{label:e?`Close drawer`:`Open drawer`,onClick:()=>t(e=>!e)}),(0,S.jsx)(l,{level:3,children:`Deployment log`}),[`The page keeps its full width while the drawer is open.`,`No column reflows, no content jumps, nothing is pushed aside.`,`The drawer is painted on top and the layout underneath is`,`untouched — which is exactly what a docked panel would not do.`].map(e=>(0,S.jsx)(i,{type:`body`,children:e},e))]}),(0,S.jsx)(y,{isOpen:e,onOpenChange:t,label:`Deployment details`,hasScrim:!1,children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsx)(l,{level:3,children:`web-prod-04`}),(0,S.jsx)(i,{type:`supporting`,color:`secondary`,children:`Floating above the page, not docked beside it.`})]})})})]})}},M={render:()=>{let[e,t]=(0,x.useState)(!1),[n,r]=(0,x.useState)(!1);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(u,{gap:3,children:[(0,S.jsxs)(d,{gap:2,children:[(0,S.jsx)(a,{label:`With scrim`,onClick:()=>t(!0)}),(0,S.jsx)(a,{label:`Without scrim`,variant:`secondary`,onClick:()=>r(!0)})]}),(0,S.jsx)(i,{type:`supporting`,color:`secondary`,children:`These buttons stay clickable while the scrim-less drawer is open.`})]}),(0,S.jsx)(y,{isOpen:e,onOpenChange:t,label:`Modal details`,children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsx)(l,{level:3,children:`Modal`}),(0,S.jsx)(i,{type:`body`,children:`Scrim dims the page, focus is trapped, Escape or a scrim click closes.`})]})})}),(0,S.jsx)(y,{isOpen:n,onOpenChange:r,label:`Non-modal details`,hasScrim:!1,hasCloseButton:!0,children:(0,S.jsx)(p,{padding:4,children:(0,S.jsxs)(u,{gap:4,children:[(0,S.jsx)(l,{level:3,children:`Non-modal`}),(0,S.jsx)(i,{type:`body`,children:`No scrim, no focus trap. The page behind keeps working while this stays open.`})]})})})]})}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open inspector" onClick={() => setIsOpen(true)} />
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Deployment details" width={400}>
          <Section padding={4}>
            <VStack gap={4}>
              <VStack gap={1}>
                <Heading level={3}>web-prod-04</Heading>
                <Text type="supporting" color="secondary">
                  us-east-1, deployed 12 min ago
                </Text>
              </VStack>
              <Divider />
              <VStack gap={2}>
                <Text type="label">Status</Text>
                <Text type="body">
                  Healthy - all 6 instances passing readiness checks.
                </Text>
              </VStack>
              <VStack gap={2}>
                <Text type="label">Build</Text>
                <Text type="body">#4821 - main @ 03536f1</Text>
              </VStack>
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <Button label="Open drawer" onClick={() => setIsOpen(true)} />
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Details" hasScrim={false} width={360}>
          <Section padding={4}>
            <VStack gap={4}>
              <VStack gap={1}>
                <Heading level={3}>Details</Heading>
                <Text type="supporting" color="secondary">
                  The page behind stays interactive.
                </Text>
              </VStack>
              <Button label="Close inspector" variant="secondary" onClick={() => setIsOpen(false)} />
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...E.parameters?.docs?.source},description:{story:"Non-modal inspector: no scrim, no focus trap, and the page behind stays\ninteractive. In a real master-detail flow, derive the open state from the\nselection (`isOpen={selected != null}`) and clear it in `onOpenChange`.",...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [orderOpen, setOrderOpen] = useState(false);
    const [lineItemOpen, setLineItemOpen] = useState(false);
    return <>
        <Button label="Open order" onClick={() => setOrderOpen(true)} />
        <Drawer isOpen={orderOpen} onOpenChange={setOrderOpen} label="Order details" hasScrim={false}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Order #4821</Heading>
              <Text type="body">Three line items, ready to ship.</Text>
              <Button label="Open line item" data-autofocus onClick={() => setLineItemOpen(true)} />
            </VStack>
          </Section>
        </Drawer>
        <Drawer isOpen={lineItemOpen} onOpenChange={setLineItemOpen} label="Line item details" hasScrim={false} width={320}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Compute instance</Heading>
              <Text type="body">Quantity 6 · us-east-1</Text>
              <Button label="Close line item" variant="secondary" data-autofocus onClick={() => setLineItemOpen(false)} />
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...D.parameters?.docs?.source},description:{story:`Sibling drawers share one top-layer stack. A closing inner drawer continues
to own Escape until its slide-out finishes, then the outer drawer becomes
the topmost dismissible surface.`,...D.parameters?.docs?.description}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [side, setSide] = useState<'start' | 'end' | null>(null);
    return <>
        <HStack gap={2}>
          <Button label="Open from start" onClick={() => setSide('start')} />
          <Button label="Open from end" onClick={() => setSide('end')} />
        </HStack>
        <Drawer isOpen={side != null} onOpenChange={isOpen => !isOpen && setSide(null)} label={\`Filters (\${side ?? 'end'})\`} side={side ?? 'end'}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Filter by region</Heading>
              <Text type="supporting" color="secondary">
                Sliding in from the {side} edge.
              </Text>
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...O.parameters?.docs?.source},description:{story:'Both edges. `side="start"` is left in LTR (and right in RTL) — use it for\nnavigation-adjacent content; `end` is the inspector convention.',...O.parameters?.docs?.description}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [width, setWidth] = useState<number | string | null>(null);
    return <>
        <HStack gap={2}>
          <Button label="320px" onClick={() => setWidth(320)} />
          <Button label="480px" onClick={() => setWidth(480)} />
          <Button label="50%" onClick={() => setWidth('50%')} />
        </HStack>
        <Drawer isOpen={width != null} onOpenChange={isOpen => !isOpen && setWidth(null)} label="Details" width={width ?? 400}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>web-prod-04</Heading>
              <Text type="body">Desktop width budget: {String(width)}</Text>
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...k.parameters?.docs?.source},description:{story:`\`width\` is the desktop budget: a number of pixels or any CSS length.
Narrow the browser below 640px: each width remains an upper bound while
the drawer preserves a 56px reveal of the page behind.`,...k.parameters?.docs?.description}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [openFull, setOpenFull] = useState(false);
    const [openPartial, setOpenPartial] = useState(false);
    const [selected, setSelected] = useState<string[]>(REGIONS.slice(0, 1));
    const filters = <Section padding={4}>
        <VStack gap={4}>
          <VStack gap={1}>
            <Heading level={3}>Filter by region</Heading>
            <Text type="supporting" color="secondary">
              Showing hosts in {selected.length} of {REGIONS.length} regions
            </Text>
          </VStack>
          <VStack gap={2}>
            {REGIONS.map(region => <CheckboxInput key={region} label={region} value={selected.includes(region)} onChange={checked => setSelected(current => checked ? [...current, region] : current.filter(r => r !== region))} />)}
          </VStack>
          <Button label="Apply filters" onClick={() => {
          setOpenFull(false);
          setOpenPartial(false);
        }} data-autofocus />
        </VStack>
      </Section>;
    return <>
        <HStack gap={2}>
          <Button label="56px reveal on mobile" onClick={() => setOpenPartial(true)} />
          <Button label="Full width on mobile" variant="secondary" onClick={() => setOpenFull(true)} />
        </HStack>
        <Drawer isOpen={openPartial} onOpenChange={setOpenPartial} label="Region filters">
          {filters}
        </Drawer>
        <Drawer isOpen={openFull} onOpenChange={setOpenFull} label="Region filters (full width)" isFullWidthOnMobile>
          {filters}
        </Drawer>
      </>;
  }
}`,...A.parameters?.docs?.source},description:{story:`On touch viewports (below 640px) the drawer preserves a 56px reveal of the
page behind without exceeding its width budget; \`isFullWidthOnMobile\` makes
it edge to edge. Resize the preview below 640px to compare.`,...A.parameters?.docs?.description}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <VStack gap={3}>
          <Button label={isOpen ? 'Close drawer' : 'Open drawer'} onClick={() => setIsOpen(open => !open)} />
          <Heading level={3}>Deployment log</Heading>
          {['The page keeps its full width while the drawer is open.', 'No column reflows, no content jumps, nothing is pushed aside.', 'The drawer is painted on top and the layout underneath is', 'untouched — which is exactly what a docked panel would not do.'].map(line => <Text key={line} type="body">
              {line}
            </Text>)}
        </VStack>
        <Drawer isOpen={isOpen} onOpenChange={setIsOpen} label="Deployment details" hasScrim={false}>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>web-prod-04</Heading>
              <Text type="supporting" color="secondary">
                Floating above the page, not docked beside it.
              </Text>
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...j.parameters?.docs?.source},description:{story:`A drawer floats above the page: the content underneath keeps its layout
and never reflows to make room, which is the difference between a drawer
and a docked panel. Compare the text column with the drawer open and
closed — nothing behind it moves.`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [openWith, setOpenWith] = useState(false);
    const [openWithout, setOpenWithout] = useState(false);
    return <>
        <VStack gap={3}>
          <HStack gap={2}>
            <Button label="With scrim" onClick={() => setOpenWith(true)} />
            <Button label="Without scrim" variant="secondary" onClick={() => setOpenWithout(true)} />
          </HStack>
          <Text type="supporting" color="secondary">
            These buttons stay clickable while the scrim-less drawer is open.
          </Text>
        </VStack>
        <Drawer isOpen={openWith} onOpenChange={setOpenWith} label="Modal details">
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Modal</Heading>
              <Text type="body">
                Scrim dims the page, focus is trapped, Escape or a scrim click
                closes.
              </Text>
            </VStack>
          </Section>
        </Drawer>
        <Drawer isOpen={openWithout} onOpenChange={setOpenWithout} label="Non-modal details" hasScrim={false} hasCloseButton>
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Non-modal</Heading>
              <Text type="body">
                No scrim, no focus trap. The page behind keeps working while
                this stays open.
              </Text>
            </VStack>
          </Section>
        </Drawer>
      </>;
  }
}`,...M.parameters?.docs?.source},description:{story:`With a scrim (default) the drawer is modal: the page behind dims, focus is
trapped, and clicking the scrim closes it. Without one it is a plain
overlay — no dimming, no focus trap, and the page behind stays clickable,
which is what master-detail flows want.`,...M.parameters?.docs?.description}}},N=[`Showcase`,`RowInspector`,`StackedDrawers`,`Sides`,`Widths`,`MobileWidth`,`FloatsOverContent`,`Scrim`]}))();export{j as FloatsOverContent,A as MobileWidth,E as RowInspector,M as Scrim,T as Showcase,O as Sides,D as StackedDrawers,k as Widths,N as __namedExportsOrder,C as default};