import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{t as n}from"./react-B7Te67-h.js";import{E as r,F as i,I as a,O as o}from"./ime-B2gVvZm0.js";import{t as s}from"./jsx-runtime-DqZldVDK.js";import{n as c,r as l}from"./layerScopedContext-B4jcFeGf.js";import{P as u,t as d}from"./utils-CuDRdYlB.js";import{n as f,t as p}from"./Item-DfLJL-nq.js";var m,h=e((()=>{l(),m=c(null),m.displayName=`ListContext`}));function g({children:e,density:t=`balanced`,hasDividers:n=!1,edgeCompensation:r,header:i,listStyle:s=`none`,start:c,xstyle:l,className:d,style:f,"data-testid":p,ref:h,...g}){let b=(0,_.useId)(),S=s===`decimal`,C=S?`ol`:`ul`,w=(0,_.useMemo)(()=>({density:t,hasDividers:n,listStyle:s,edgeCompensation:r}),[t,n,s,r]),T=(0,v.jsx)(C,{ref:h,...g,"data-testid":p,...i==null?null:{"aria-labelledby":b},...S&&c!=null&&c!==1?{start:c}:{},role:`list`,...u(o(`list`,{density:t,listStyle:s}),a(y.list,n&&y.withDividers,s!==`none`&&(c!=null&&c!==1?x.counterStart(c-1):y.withCounter),l),d,f),children:e});return i==null?(0,v.jsx)(m,{value:w,children:T}):(0,v.jsx)(m,{value:w,children:(0,v.jsxs)(`div`,{className:`astryx78zum5 astryxdt5ytf`,children:[(0,v.jsx)(`div`,{id:b,className:`astryx1p37lm5`,children:i}),T]})})}var _,v,y,b,x,S=e((()=>{_=t(n(),1),i(),h(),d(),r(),v=s(),y={list:{kogj98:`astryx1ghz6dp`,kZCmMZ:`astryx1c1uobl`,kH6xsr:`astryx3ct3a4`,k1xSpc:`astryx78zum5`,kXwgrk:`astryxdt5ytf`,kOIVth:`astryx1lsbc85`,$$css:!0},withDividers:{kOIVth:`astryxxhr3t`,$$css:!0},withCounter:{kt6KFK:`astryxif0320`,$$css:!0}},b={kt6KFK:`astryx1khind5`,$$css:!0},x={counterStart:e=>[b,{"--x-counterReset":`astryx-list ${e}`==null?void 0:`astryx-list ${e}`}]},g.displayName=`List`,g.__docgenInfo={description:`A vertical list component for rendering collections of items.

Renders semantic \`<ul>\` or \`<ol>\` elements with configurable density,
dividers, marker styles, and an optional header.

Set \`edgeCompensation="inline"\` to compensate for the items' inline inset
up to the container padding available on each edge, for alignment with
sibling content such as a section heading.

@example
\`\`\`
<List>
  <ListItem label="Notifications" description="Manage your alerts" />
  <ListItem label="Privacy" description="Control your data" />
</List>
<List listStyle="decimal" density="compact">
  <ListItem label="First step" />
  <ListItem label="Second step" />
</List>
\`\`\``,methods:[],displayName:`List`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLUListElement | HTMLOListElement>`,elements:[{name:`union`,raw:`HTMLUListElement | HTMLOListElement`,elements:[{name:`HTMLUListElement`},{name:`HTMLOListElement`}]}]},description:`Ref forwarded to the root element`},children:{required:!0,tsType:{name:`ReactNode`},description:`List items. Should be ListItem components.`},density:{required:!1,tsType:{name:`union`,raw:`'compact' | 'balanced' | 'spacious'`,elements:[{name:`literal`,value:`'compact'`},{name:`literal`,value:`'balanced'`},{name:`literal`,value:`'spacious'`}]},description:`Spacing density for list items.
- 'compact': Tighter spacing for dense UIs
- 'balanced': Standard spacing
- 'spacious': Extra spacing for readability
@default 'balanced'`,defaultValue:{value:`'balanced'`,computed:!1}},hasDividers:{required:!1,tsType:{name:`boolean`},description:`Whether to show dividers between list items.
@default false`,defaultValue:{value:`false`,computed:!1}},edgeCompensation:{required:!1,tsType:{name:`literal`,value:`'inline'`},description:`Compensates for each item's built-in inline inset, up to the container
padding available on each edge. Use "inline" to bring row content toward
sibling content such as a section heading. Content aligns when the
container padding is at least the item inset; smaller padding leaves
some inset uncompensated.
The cancelling margin reads the same variable the items derive their
inline padding from, so it tracks density and theme padding overrides
automatically. Hover and selection backgrounds still extend past the
text by the inset.
Omit to leave item positions unchanged.`},header:{required:!1,tsType:{name:`ReactNode`},description:`Header content rendered above the list.
Semantically associated via aria-labelledby.`},listStyle:{required:!1,tsType:{name:`union`,raw:`'none' | 'disc' | 'decimal' | 'circle'`,elements:[{name:`literal`,value:`'none'`},{name:`literal`,value:`'disc'`},{name:`literal`,value:`'decimal'`},{name:`literal`,value:`'circle'`}]},description:"List marker style.\nWhen 'decimal', renders an `<ol>`. Otherwise renders a `<ul>`.\n@default 'none'",defaultValue:{value:`'none'`,computed:!1}},start:{required:!1,tsType:{name:`number`},description:`Starting number for ordered lists (listStyle='decimal').
Sets the CSS counter to begin at this value.
@default 1`},"data-testid":{required:!1,tsType:{name:`string`},description:`Test ID for testing frameworks.`}},composes:[`Omit`]}}));function C({label:e,description:t,startContent:n,endContent:r,onClick:i,interactiveRef:a,href:s,target:c,rel:l,isDisabled:d=!1,isSelected:p=!1,xstyle:h,className:g,style:_,ref:v,...y}){let b=(0,w.use)(m),x=b?.density??`balanced`,S=b?.hasDividers??!1,C=b?.listStyle??`none`,O=b?.edgeCompensation;return(0,T.jsx)(f,{as:`li`,ref:v,marker:C===`disc`?(0,T.jsx)(`span`,{className:`astryxoi2r2e astryx9f619 astryx78zum5 astryx6s0dn4 astryxl56j7k astryx2lah0s astryx12xnipv astryx1233pnv`,children:(0,T.jsx)(`span`,{className:`astryx1v4s8kt astryxols6we astryx16rqkct astryx19aspcf`})}):C===`circle`?(0,T.jsx)(`span`,{className:`astryxoi2r2e astryx9f619 astryx78zum5 astryx6s0dn4 astryxl56j7k astryx2lah0s astryx12xnipv astryx1233pnv`,children:(0,T.jsx)(`span`,{className:`astryx1v4s8kt astryxols6we astryx16rqkct astryxmkeg23 astryx1y0btm7 astryxqcx1ss astryxjbqb8w`})}):C===`decimal`?(0,T.jsx)(`span`,{className:`astryxoi2r2e astryx2lah0s astryx1tgivj0 astryxjm74w1 astryxw6l6zx astryx12xnipv astryxc2ndz5`}):null,startContent:n,label:e,description:t,endContent:r,onClick:i,interactiveRef:a,href:s,target:c,rel:l,isDisabled:d,isSelected:p,density:x,xstyle:[C!==`none`&&E.withCounter,S&&E.withDivider,S&&D.noRadius,O===`inline`&&E.inlineEdgeCompensation,h],...u(o(`list-item`),{className:g,style:_}),...y})}var w,T,E,D,O=e((()=>{w=t(n(),1),h(),d(),p(),r(),T=s(),E={withCounter:{kAmcRD:`astryxfrknyr`,$$css:!0},inlineEdgeCompensation:{keTefX:`astryx1t1czy8`,k71WvV:`astryx1cphv78`,koQZXg:null,km5ZXQ:null,$$css:!0},withDivider:{kt9PQ7:`astryx92x3c3`,kfdmCh:`astryx1q0q8m5`,kL6WhQ:`astryxw8gpjh`,kx8K5S:`astryx1t1lzn6`,$$css:!0}},D={noRadius:{kaIpWk:`astryx2u8bby`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,$$css:!0}},C.displayName=`ListItem`,C.__docgenInfo={description:`A list item component for use within List.

Renders structured content with label, description, start/end content areas.
When \`onClick\` is provided, uses the invisible button pattern for accessibility.
When \`href\` is provided, uses an invisible anchor pattern.

@example
\`\`\`
<ListItem label="Settings" description="Manage your preferences" />
<ListItem label="Profile" onClick={() => navigate('/profile')} />
<ListItem label="Docs" href="/docs" target="_blank" rel="noreferrer" />
\`\`\``,methods:[],displayName:`ListItem`,props:{xstyle:{required:!1,tsType:{name:`StyleXStyles`},description:"StyleX styles created via `stylex.create()`. Merged with the component's\nbase styles inside a single `stylex.props()` call for optimal deduplication.\n\n@example\n```\nconst overrides = stylex.create({ root: { marginBottom: 8 } });\n<Component xstyle={overrides.root} />\n```"},ref:{required:!1,tsType:{name:`ReactRef`,raw:`React.Ref<HTMLLIElement>`,elements:[{name:`HTMLLIElement`}]},description:`Ref forwarded to the root element`},label:{required:!0,tsType:{name:`ReactNode`},description:`Primary text label for the item.

Accepts a plain string (single-line truncation applied automatically)
or a ReactNode for rich content (no truncation constraints —
child components control their own text behavior).`},description:{required:!1,tsType:{name:`ReactNode`},description:`Secondary description below the label.

Accepts a plain string (single-line truncation applied automatically)
or a ReactNode for rich/multi-line content (no wrapping constraints
applied — child components control their own text behavior).`},startContent:{required:!1,tsType:{name:`ReactNode`},description:`Content rendered before the item (icon, avatar, checkbox).
Uses start/end naming for RTL support.`},endContent:{required:!1,tsType:{name:`ReactNode`},description:`Content rendered after the item (badge, action button, chevron).`},onClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(e: React.MouseEvent) => void`,signature:{arguments:[{type:{name:`ReactMouseEvent`,raw:`React.MouseEvent`},name:`e`}],return:{name:`void`}}},description:`Click handler for interactive items.
Automatically enables hover/press styles when provided.`},interactiveRef:{required:!1,tsType:{name:`ReactRefObject`,raw:`React.RefObject<HTMLElement | null>`,elements:[{name:`union`,raw:`HTMLElement | null`,elements:[{name:`HTMLElement`},{name:`null`}]}]},description:"Ref to a nested control inside the item (e.g. a checkbox in\n`startContent`) that already provides the item's keyboard access and\naction. When set, the item becomes an enlarged click/tap target that\ndelegates surface clicks to that control via the `useClickableContainer`\npattern: it renders no invisible button/anchor, so the row adds no second\ntab stop (WCAG 4.1.2 — one focusable control per option). Mutually\nexclusive with `onClick`/`href` — when set those are ignored."},href:{required:!1,tsType:{name:`string`},description:`URL for link items. Renders an invisible anchor element.
Automatically enables hover/press styles when provided.`},target:{required:!1,tsType:{name:`string`},description:`Link target (e.g., '_blank'). Only used with href.`},rel:{required:!1,tsType:{name:`string`},description:`Link relationship. Automatically includes noopener noreferrer when
target is "_blank".`},isDisabled:{required:!1,tsType:{name:`boolean`},description:`Whether the item is disabled.
@default false`,defaultValue:{value:`false`,computed:!1}},isSelected:{required:!1,tsType:{name:`boolean`},description:`Whether the item is currently selected.
@default false`,defaultValue:{value:`false`,computed:!1}}},composes:[`Omit`]}})),k=e((()=>{S(),O()}));export{S as a,g as i,C as n,m as o,O as r,h as s,k as t};