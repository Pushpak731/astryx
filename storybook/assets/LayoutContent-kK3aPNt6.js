import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{t as n}from"./react-B7Te67-h.js";import{E as r,F as i,I as a,O as o}from"./ime-B2gVvZm0.js";import{t as s}from"./jsx-runtime-DqZldVDK.js";import{n as c,r as l}from"./layerScopedContext-B4jcFeGf.js";import{i as u,r as d}from"./LayoutHeader-DW01UAf6.js";import{i as f,n as p,r as m,t as h}from"./stackItem.stylex-GHZ4wVym.js";import{P as g,t as _}from"./utils-CuDRdYlB.js";import{a as v,c as y,g as b,n as x,o as S,s as C,t as w}from"./padding.stylex-Hr1weLfK.js";var T,E,D=e((()=>{T=t(n(),1),E=(0,T.createContext)(null),E.displayName=`LayoutAreaContext`})),O,k,A=e((()=>{l(),O={hasHeader:!1,hasFooter:!1,hasStart:!1,hasEnd:!1},k=c(O),k.displayName=`LayoutSlotsContext`}));function j(e){if(e==null||typeof e==`number`)return!0;let t=e.trim().toLowerCase();return t.includes(`%`)?!1:t===`0`||/^-?(?:\d+(?:\.\d+)?|\.\d+)[a-z]+$/.test(t)||/^(?:calc|min|max|clamp)\(/.test(t)}function M({area:e,children:t}){return t==null?null:(0,F.jsx)(E,{value:e,children:t})}function N({children:e,content:t,contentWidth:n,defaultHasDividers:r,end:i,footer:s,header:c,height:l=`fill`,padding:u,ref:m,start:h,xstyle:_,className:v,style:b}){let x=l===`fill`,S=t??e,w=(0,P.useMemo)(()=>r==null?null:{defaultHasDividers:r},[r]),T=c!=null,E=s!=null,D=h!=null,O=i!=null,A=D&&O,N=D!==O,L=n!=null&&j(n),B=(0,F.jsx)(k,{value:(0,P.useMemo)(()=>({hasHeader:T,hasFooter:E,hasStart:D,hasEnd:O}),[T,E,D,O]),children:(0,F.jsx)(`div`,{ref:m,...g(o(`layout`,{height:l}),a(I.layoutOuter,x?I.fill:I.auto,_),v,b),children:(0,F.jsxs)(`div`,{...a(z,I.layoutInner,...f({direction:`vertical`}),x?I.fill:I.auto,u===0&&I.fullBleed,u!=null&&C[u],u!=null&&y[u],n!=null&&R.contentWidthVar(n),L&&R.contentAlignmentWidthVar(n)),children:[(0,F.jsx)(M,{area:`header`,children:c}),(0,F.jsxs)(`div`,{...a(...f({direction:`horizontal`}),I.middle,n!=null&&(!L||A)&&R.contentWidth(n),L&&!A&&I.middleQuery,L&&N&&I.singlePanelMiddle,L&&D&&!O&&I.singleStartPanel,L&&!D&&O&&I.singleEndPanel),children:[(0,F.jsx)(M,{area:`start`,children:h}),(0,F.jsx)(`div`,{...a(...p({size:`fill`}),L&&!D&&!O&&I.singleColumnContent),children:(0,F.jsx)(M,{area:`content`,children:S})}),(0,F.jsx)(M,{area:`end`,children:i})]}),(0,F.jsx)(M,{area:`footer`,children:s})]})})});return w==null?B:(0,F.jsx)(d,{value:w,children:B})}var P,F,I,L,R,z,B=e((()=>{P=t(n(),1),i(),D(),A(),u(),m(),h(),_(),r(),S(),F=s(),I={layoutOuter:{keTefX:`astryxojxgvx`,k71WvV:`astryx1fcf3bl`,keoZOQ:`astryx1sa9bsh`,k1K539:`astryx6h7pi7`,$$css:!0},layoutInner:{"--container-padding-inline-start":`astryxrhngw9`,"--container-padding-inline-end":`astryxjsfl84`,"--container-padding-block-start":`astryx1047aw6`,"--container-padding-block-end":`astryxax9j7h`,"--layout-content-width":`astryx15lplax`,"--layout-alignment-width":`astryx19kr0ht`,$$css:!0},fill:{kZKoxP:`astryx12qplqi`,kskxy:`astryxenllk4`,$$css:!0},auto:{kAzted:`astryx1us19tq`,$$css:!0},middle:{kUk6DE:`astryx98rzlu`,kzQI83:null,kmuXW:null,kCS8Yb:null,kAzted:`astryx2lwn1j`,$$css:!0},middleQuery:{k9g6sI:`astryxsw3flo`,$$css:!0},singleColumnContent:{kzqmXN:`astryxh8yej3`,ks0D6T:`astryxjl2t3p astryxpgkkid`,kUOVxO:`astryxvueqy4`,keTefX:null,koQZXg:null,k71WvV:null,km5ZXQ:null,$$css:!0},singlePanelMiddle:{kB7OPa:`astryx9f619`,kzqmXN:`astryxh8yej3`,ks0D6T:`astryxjl2t3p astryxnpzo02`,kUOVxO:`astryxvueqy4 astryxb0m1lw`,keTefX:null,koQZXg:null,k71WvV:null,km5ZXQ:null,$$css:!0},singleStartPanel:{kZCmMZ:`astryx1vvd0s7`,kE3dHu:null,kpe85a:null,$$css:!0},singleEndPanel:{kwRFfy:`astryxxdn8bs`,kE3dHu:null,kpe85a:null,$$css:!0},fullBleed:{"--layout-padding-outer-x":`astryx1wbjvqu`,"--layout-padding-outer-y":`astryxzxxx64`,$$css:!0}},L={kzqmXN:`astryxh8yej3`,kUOVxO:`astryxvueqy4`,keTefX:``,koQZXg:``,k71WvV:``,km5ZXQ:``,$$css:!0},R={contentWidthVar:e=>[{"--layout-content-width":(typeof e==`number`?`${e}px`:e)==null?typeof e==`number`?`${e}px`:e:`astryx4906uf`,$$css:!0},{"--x---layout-content-width":(typeof e==`number`?`${e}px`:e)==null?void 0:typeof e==`number`?`${e}px`:e}],contentAlignmentWidthVar:e=>[{"--layout-alignment-width":(typeof e==`number`?`${e}px`:e)==null?typeof e==`number`?`${e}px`:e:`astryx1b1nz06`,$$css:!0},{"--x---layout-alignment-width":(typeof e==`number`?`${e}px`:e)==null?void 0:typeof e==`number`?`${e}px`:e}],contentWidth:e=>[L,{ks0D6T:(typeof e==`number`?`${e}px`:e)==null?typeof e==`number`?`${e}px`:e:`astryxf68679`,$$css:!0},{"--x-maxWidth":(e=>typeof e==`number`?e+`px`:e??void 0)(typeof e==`number`?`${e}px`:e)}]},z={"astryx-default-marker":`astryx-default-marker`,$$css:!0},N.displayName=`Layout`,N.__docgenInfo={description:`General layout primitive with header, start, content, end, and footer slots.
Use it to arrange regions within a page or bounded container. AppShell owns
the page shell, app-wide navigation, responsive shell behavior, skip link,
and main landmark.

Handles padding collapse between adjacent slots, scroll containment in the
content area, and automatic RTL support via CSS logical properties.

Structure:
\`\`\`
┌─────────────────────────────────────────┐
│                 header                  │
├──────┬─────────────────────────┬────────┤
│      │                         │        │
│start │        content          │  end   │
│      │                         │        │
├──────┴─────────────────────────┴────────┤
│                 footer                  │
└─────────────────────────────────────────┘
\`\`\`

When to use Layout vs raw flexbox:
- Page with a sidebar → Layout with \`start\` slot
- Dashboard with header + scrollable body → Layout with \`header\` + \`content\`
- Settings page with nav panel → Layout with \`start\` + \`content\`
- Simple vertical stack of items → use VStack instead

@example
\`\`\`
<Layout
  header={<LayoutHeader hasDivider>App Name</LayoutHeader>}
  start={
    <LayoutPanel hasDivider width={240} role="navigation">
      <Navigation />
    </LayoutPanel>
  }
  content={
    <LayoutContent role="main">
      <MainContent />
    </LayoutContent>
  }
/>
\`\`\``,methods:[],displayName:`Layout`,props:{ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:`Ref forwarded to the root DOM element.`},content:{required:!1,tsType:{name:`ReactNode`},description:`Main content area (center).`},contentWidth:{required:!1,tsType:{name:`union`,raw:`number | string`,elements:[{name:`number`},{name:`string`}]},description:"Maximum width of the aligned content within each slot (header, content,\nfooter, panels). Dividers remain full-bleed. Content is centered with\n`margin-inline: auto` when narrower than the available space.\n\nIn a layout without start or end panels, LayoutContent spans the available\nwidth so its scrollbar stays at the outer edge, while its children align\ninternally to `contentWidth`. With exactly one panel, that panel remains\naligned to the `contentWidth` frame while LayoutContent extends to the\nopposite open edge. With both panels, `contentWidth` includes the complete\nstart + content + end composition. Intrinsic widths such as `fit-content`\nretain the constrained composition because they cannot participate in the\ninternal alignment arithmetic. Percentage widths, including\npercentage-bearing `calc()`, `min()`, `max()`, and `clamp()` values, use the\nconstrained fallback because they cannot share one arithmetic basis. Bare\n`var(...)` values also use that fallback because their resolved value may be\nintrinsic; wrap a variable guaranteed to resolve to a length in `calc(...)`\nto opt into edge scrolling.\n\nNumbers are treated as pixels, strings are used as-is (e.g., '60ch').\nCommon page widths:\n- `640` — forms, settings, text-focused pages\n- `960` — content pages, component demos, wider layouts"},end:{required:!1,tsType:{name:`ReactNode`},description:`End panel slot (right in LTR, left in RTL).`},footer:{required:!1,tsType:{name:`ReactNode`},description:`Footer slot.`},header:{required:!1,tsType:{name:`ReactNode`},description:`Header slot.`},height:{required:!1,tsType:{name:`union`,raw:`'fill' | 'auto'`,elements:[{name:`literal`,value:`'fill'`},{name:`literal`,value:`'auto'`}]},description:"Controls the height behavior:\n- `fill`: Layout fills container height, content scrolls internally (default)\n- `auto`: Layout grows with content, container/page scrolls\n@default 'fill'",defaultValue:{value:`'fill'`,computed:!1}},padding:{required:!1,tsType:{name:`union`,raw:`0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10`,elements:[{name:`literal`,value:`0`},{name:`literal`,value:`0.5`},{name:`literal`,value:`1`},{name:`literal`,value:`1.5`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`},{name:`literal`,value:`8`},{name:`literal`,value:`10`}]},description:"Padding at the layout's outer edges using the spacing scale.\nControls both `--layout-padding-outer-x` and `--layout-padding-outer-y`.\nAccepts numeric spacing steps: 0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10."},start:{required:!1,tsType:{name:`ReactNode`},description:`Start panel slot (left in LTR, right in RTL).`},defaultHasDividers:{required:!1,tsType:{name:`boolean`},description:`Default divider visibility for LayoutHeader and LayoutFooter children.
When set, headers/footers that don't explicitly pass \`hasDivider\` will use this value.
When not set, nested layouts inherit from their parent context.`},children:{required:!1,tsType:{name:`ReactNode`},description:"Children are a shorthand for the `content` slot:\n`<Layout>{main}</Layout>` is equivalent to `<Layout content={main} />`.\nThe surrounding zones (`header`/`start`/`end`/`footer`) stay explicit\nprops. If both `content` and `children` are provided, `content` wins.\nAccepting children keeps the natural `<Layout>…</Layout>` form from\nrendering a blank shell."}},composes:[`Omit`]}}));function V({children:e,isScrollable:t=!0,padding:n,label:r,role:i,xstyle:s,className:c,style:l,ref:u,...d}){let{hasHeader:f,hasFooter:p,hasStart:m,hasEnd:h}=(0,H.use)(k),_=n===0;return(0,U.jsx)(`div`,{ref:u,role:i,"aria-label":r,...g(o(`layout-content`),a(W.content,!m&&!_&&n==null&&W.noStart,!h&&!_&&n==null&&W.noEnd,!f&&!_&&n==null&&W.noHeader,!p&&!_&&n==null&&W.noFooter,t&&W.scrollable,_&&W.fullBleed,n!=null&&b[n],n!=null&&v[n],n!=null&&x[n],n!=null&&w[n],!m&&!h&&!_&&W.constrainedNoPanelsStart,!m&&!h&&!_&&W.constrainedNoPanelsEnd,m&&!h&&!_&&W.constrainedSingleStartPanel,!m&&h&&!_&&W.constrainedSingleEndPanel,s),c,l),...d,children:e})}var H,U,W,G=e((()=>{H=t(n(),1),i(),A(),_(),r(),S(),U=s(),W={content:{kB7OPa:`astryx9f619`,kZKoxP:`astryx5yr21d`,kUk6DE:`astryx98rzlu`,kAzted:`astryx2lwn1j`,kVQacm:`astryx7giv3`,kZCmMZ:`astryxwjyata`,kwRFfy:`astryx1peupej`,kLKAdn:`astryxqty4a astryx1u0vwcr`,kGO01o:`astryxg476vw astryx307h6p`,"--container-padding-inline-start":`astryx408pgh`,"--container-padding-inline-end":`astryxikqloz`,"--container-padding-block-start":`astryxjmgx01`,"--container-padding-block-end":`astryxi9ns85`,$$css:!0},noStart:{kZCmMZ:`astryx139j0dd`,"--container-padding-inline-start":`astryxdvaxxn`,"--container-padding-inline-end":`astryxqpvj4r`,$$css:!0},noEnd:{kwRFfy:`astryxpc6k2p`,$$css:!0},noHeader:{kLKAdn:`astryx81pis9`,"--container-padding-block-start":`astryxzz8v79`,$$css:!0},noFooter:{kGO01o:`astryxon7vh3`,"--container-padding-block-end":`astryx1xjq73n`,$$css:!0},scrollable:{kVQacm:`astryxysyzu8`,$$css:!0},constrainedNoPanelsStart:{kZCmMZ:`astryxhlv5e7`,kE3dHu:null,kpe85a:null,$$css:!0},constrainedNoPanelsEnd:{kwRFfy:`astryx1ahicqp`,kE3dHu:null,kpe85a:null,$$css:!0},constrainedSingleStartPanel:{kwRFfy:`astryxy07wb4`,kE3dHu:null,kpe85a:null,$$css:!0},constrainedSingleEndPanel:{kZCmMZ:`astryxxjme2g`,kE3dHu:null,kpe85a:null,$$css:!0},fullBleed:{kZCmMZ:`astryx1c1uobl`,kwRFfy:`astryxyri2b`,kLKAdn:`astryxexx8yu`,kGO01o:`astryx18d9i69`,"--container-padding-inline-start":`astryxrhngw9`,"--container-padding-inline-end":`astryxjsfl84`,"--container-padding-block-start":`astryx1047aw6`,"--container-padding-block-end":`astryxax9j7h`,$$css:!0}},V.displayName=`LayoutContent`,V.__docgenInfo={description:`Scrollable main content area for Layout. Wraps the primary body content
with automatic scroll containment and context-aware padding.

Already provides its own padding and scroll — don't add padding or overflow
to children. Use \`padding={0}\` if you need edge-to-edge content.

@example
\`\`\`
<LayoutContainer variant="card">
  <Layout
    header={<LayoutHeader>Title</LayoutHeader>}
    content={<LayoutContent>Main body content</LayoutContent>}
  />
</LayoutContainer>
<LayoutContainer variant="card">
  <Layout
    content={
      <LayoutContent padding={0}>
        <Table />
      </LayoutContent>
    }
  />
</LayoutContainer>
<LayoutContainer variant="card">
  <Layout
    content={
      <LayoutContent isScrollable={false}>
        <StickyElement />
      </LayoutContent>
    }
  />
</LayoutContainer>
\`\`\``,methods:[],displayName:`LayoutContent`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLDivElement>`,elements:[{name:`HTMLDivElement`}]},description:``},children:{required:!1,tsType:{name:`ReactNode`},description:`Content to render inside the content area.`},padding:{required:!1,tsType:{name:`union`,raw:`0 | 0.5 | 1 | 1.5 | 2 | 3 | 4 | 5 | 6 | 8 | 10`,elements:[{name:`literal`,value:`0`},{name:`literal`,value:`0.5`},{name:`literal`,value:`1`},{name:`literal`,value:`1.5`},{name:`literal`,value:`2`},{name:`literal`,value:`3`},{name:`literal`,value:`4`},{name:`literal`,value:`5`},{name:`literal`,value:`6`},{name:`literal`,value:`8`},{name:`literal`,value:`10`}]},description:`Internal padding of the content area using the spacing scale.
Accepts numeric spacing steps: 0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10.
Overrides the default padding from the layout container.`},isScrollable:{required:!1,tsType:{name:`boolean`},description:`Enables scrollable overflow for the content area.
Set to false for auto-height layouts where sticky positioning
needs to work with parent containers.
@default true`,defaultValue:{value:`true`,computed:!1}},label:{required:!1,tsType:{name:`string`},description:`Accessible label for the landmark.
Required when role is set and multiple landmarks of the same type exist.`},role:{required:!1,tsType:{name:`AriaRole`},description:`ARIA landmark role for accessibility.
Use 'main' only for the primary content area of the page (not in nested layouts).`}},composes:[`Omit`]}}));export{k as a,D as c,B as i,G as n,A as o,N as r,E as s,V as t};