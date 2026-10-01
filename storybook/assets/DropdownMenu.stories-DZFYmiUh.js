import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{t as n}from"./react-B7Te67-h.js";import{t as ee}from"./jsx-runtime-DqZldVDK.js";import{n as te,t as ne}from"./Badge-LIupL8_I.js";import{d as r,l as re,r as i}from"./renderDropdownItems-COCxJVqU.js";import{a as ie,r as ae,t as a}from"./DropdownMenuRadioItem-CFjf2TaB.js";import{t as o}from"./DropdownMenu-BjRw5ZC7.js";import{rt as oe}from"./iframe-C_-I7RLe.js";import{A as se,In as ce,It as s,K as le,Ot as ue,Pt as de,R as c,Rn as fe,St as l,Wt as pe,c as u,g as d,t as me}from"./esm-BNuSW8ar.js";function he(){return(0,p.jsx)(o,{button:{label:`Project actions`},presentation:`bottom-sheet`,items:[{label:`Rename project`,icon:c},{label:`Move to project`,icon:l,items:ve.slice(0,4).map(([e,t])=>({label:e,description:t,icon:l}))},{label:`Archive project`,icon:fe}]})}var f,p,ge,_e,ve,m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$,ye;e((()=>{ne(),f=t(n()),oe(),me(),p=ee(),ge={title:`Core/DropdownMenu`,component:o,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{button:{description:`Props for customizing the trigger button`},items:{description:`Menu items (items, dividers, or sections)`},presentation:{control:`select`,options:[`popover`,`bottom-sheet`],description:`Surface used to present data-driven menu actions`},isMenuOpen:{control:`boolean`,description:`Controlled open state`},menuWidth:{control:`text`,description:`Minimum menu width for lengths, or preferred width for intrinsic keywords; capped to the available viewport space`},placement:{control:`select`,options:[`above`,`below`,`start`,`end`],description:`Menu placement relative to trigger`},alignment:{control:`select`,options:[`start`,`center`,`end`],description:`Menu alignment along the placement axis`},"data-testid":{control:`text`,description:`Test ID for testing frameworks`}}},_e=[{label:`Edit project`,description:`Update the project details.`,icon:c},{label:`Duplicate project`,description:`Create a copy of this project.`,icon:s},{label:`Share project`,description:`Invite people to collaborate.`,icon:se},{label:`Archive project`,description:`Move this project out of active work.`,icon:fe}],ve=[[`Apollo launch`,`Marketing`],[`Customer insights`,`Research`],[`Design systems`,`Platform`],[`Growth experiments`,`Product`],[`Incident review`,`Operations`],[`Mobile quality`,`Engineering`],[`Quarterly planning`,`Strategy`],[`Recruiting plan`,`People`],[`Security follow-up`,`Trust`],[`Website refresh`,`Brand`]],m={parameters:{layout:`fullscreen`,docs:{story:{inline:!1,height:`560px`},description:{story:`Shows titled sections in the bottom-sheet presentation. Section headings and spacious action rows share the same inline content edge.`}}},globals:{viewport:{value:`mobile1`,isRotated:!1}},render:()=>(0,p.jsx)(`div`,{className:`x9f619 xh8yej3 x1ov3xa9 x1oa1p4a x1awphl8 x1rey3nv xnjyzlh x7giv3`,children:(0,p.jsx)(o,{presentation:`bottom-sheet`,button:{label:`File actions`},items:[{type:`section`,title:`Create`,items:[{label:`New file`},{label:`New folder`}]},{type:`section`,title:`Manage`,items:[{label:`Share file`},{label:`Archive file`}]}]})}),play:async({canvasElement:e})=>{let t=e.querySelector(`button`);t instanceof HTMLElement&&t.click()}},h={render:()=>(0,p.jsx)(o,{button:{label:`Actions`},items:[{label:`Edit`,onClick:()=>console.log(`Edit clicked`)},{label:`Duplicate`,onClick:()=>console.log(`Duplicate clicked`)},{label:`Delete`,onClick:()=>console.log(`Delete clicked`)}]})},g={render:()=>(0,p.jsx)(o,{button:{label:`Actions`,variant:`primary`},items:[{label:`Edit`,icon:c,onClick:()=>console.log(`Edit`)},{label:`Duplicate`,icon:s,onClick:()=>console.log(`Duplicate`)},{label:`Download`,icon:ce,onClick:()=>console.log(`Download`)},{label:`Delete`,icon:d,onClick:()=>console.log(`Delete`)}]})},_={render:()=>(0,p.jsx)(o,{button:{label:`File`,variant:`ghost`},items:[{type:`section`,title:`Create`,items:[{label:`New File`,icon:de,onClick:()=>console.log(`New File`)},{label:`New Folder`,icon:l,onClick:()=>console.log(`New Folder`)}]},{type:`section`,title:`Share`,items:[{label:`Share`,icon:se,onClick:()=>console.log(`Share`)},{label:`Archive`,icon:fe,onClick:()=>console.log(`Archive`)}]}]})},v={render:()=>(0,p.jsx)(o,{button:{label:`Actions`},items:[{label:`Edit`,onClick:()=>console.log(`Edit`)},{label:`Duplicate`,onClick:()=>console.log(`Duplicate`)},{type:`divider`},{label:`Delete`,onClick:()=>console.log(`Delete`)}]})},y={render:()=>(0,p.jsx)(o,{button:{label:`Actions`},items:[{label:`Edit`,onClick:()=>console.log(`Edit`)},{label:`Duplicate`,onClick:()=>console.log(`Duplicate`)},{label:`Delete (disabled)`,isDisabled:!0}]})},b={name:`Destructive item`,render:()=>(0,p.jsx)(o,{button:{label:`Actions`},items:[{label:`Edit`,onClick:()=>console.log(`Edit`)},{label:`Duplicate`,icon:`copy`,onClick:()=>console.log(`Duplicate`)},{type:`divider`},{label:`Delete`,icon:`close`,variant:`destructive`,onClick:()=>console.log(`Delete`)}]})},x={render:()=>{let[e,t]=(0,f.useState)(!1);return(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,alignItems:`center`},children:[(0,p.jsxs)(`div`,{children:[`Menu is `,e?`open`:`closed`]}),(0,p.jsx)(o,{button:{label:`Controlled Menu`},isMenuOpen:e,onOpenChange:t,items:[{label:`Item 1`,onClick:()=>console.log(`Item 1`)},{label:`Item 2`,onClick:()=>console.log(`Item 2`)},{label:`Item 3`,onClick:()=>console.log(`Item 3`)}]})]})}},S={render:function(){let[e,t]=(0,f.useState)(!0);return(0,p.jsxs)(o,{button:{label:`Sort`},isMenuOpen:e,onOpenChange:t,children:[(0,p.jsx)(r,{label:`Newest`}),(0,p.jsx)(r,{label:`Oldest`})]})},parameters:{docs:{description:{story:"A controlled menu mounted with `isMenuOpen` true renders open without taking focus; `document.activeElement` stays on the page until the user opens the menu themselves. Tab to the trigger, then ArrowDown enters the already-open menu at the first item."}}}},C={render:()=>(0,p.jsx)(o,{button:{label:`Wide Menu`},menuWidth:300,items:[{label:`This is a longer option that needs more space`,onClick:()=>console.log(`Option 1`)},{label:`Another long option with extra text`,onClick:()=>console.log(`Option 2`)},{label:`Short one`,onClick:()=>console.log(`Option 3`)}]})},w={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,gap:16,flexWrap:`wrap`},children:[(0,p.jsx)(o,{button:{label:`Secondary`,variant:`secondary`},items:[{label:`Option 1`},{label:`Option 2`}]}),(0,p.jsx)(o,{button:{label:`Primary`,variant:`primary`},items:[{label:`Option 1`},{label:`Option 2`}]}),(0,p.jsx)(o,{button:{label:`Ghost`,variant:`ghost`},items:[{label:`Option 1`},{label:`Option 2`}]}),(0,p.jsx)(o,{button:{label:`Destructive`,variant:`destructive`},items:[{label:`Option 1`},{label:`Option 2`}]})]})},T={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,p.jsx)(o,{button:{label:`Small`,size:`sm`},items:[{label:`Option 1`},{label:`Option 2`}]}),(0,p.jsx)(o,{button:{label:`Medium`,size:`md`},items:[{label:`Option 1`},{label:`Option 2`}]}),(0,p.jsx)(o,{button:{label:`Large`,size:`lg`},items:[{label:`Option 1`},{label:`Option 2`}]})]})},E={render:()=>{let[e,t]=(0,f.useState)(0);return(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,alignItems:`center`},children:[(0,p.jsxs)(`div`,{children:[`Button clicked `,e,` times`]}),(0,p.jsx)(o,{button:{label:`Click Me`},onClick:()=>t(e=>e+1),items:[{label:`Menu Item`,onClick:()=>console.log(`Item clicked`)}]})]})}},D={render:()=>{let[e,t]=(0,f.useState)(!1);return(0,p.jsx)(o,{button:{label:`Session`},items:[{label:e?`Copied`:`Copy session ID`,icon:(0,p.jsx)(s,{style:{width:16,height:16}}),hasCloseOnSelect:!1,onClick:()=>t(!0)},{label:`Rename`},{label:`Delete`,variant:`destructive`}],onOpenChange:e=>{e||t(!1)}})}},O={render:()=>(0,p.jsxs)(o,{button:{label:`Select User`},menuWidth:280,children:[(0,p.jsx)(r,{icon:u,label:`Alice Johnson`,description:`alice.johnson@example.com`,onClick:()=>console.log(`Alice`)}),(0,p.jsx)(r,{icon:u,label:`Bob Smith`,description:`bob.smith@example.com`,onClick:()=>console.log(`Bob`)}),(0,p.jsx)(r,{icon:u,label:`Carol Williams`,description:`carol.williams@example.com`,onClick:()=>console.log(`Carol`)})]})},k={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,p.jsx)(o,{button:{label:`More options`,icon:(0,p.jsx)(ue,{}),variant:`ghost`,isIconOnly:!0},items:[{label:`Edit`,icon:c,onClick:()=>console.log(`Edit`)},{label:`Delete`,icon:d,onClick:()=>console.log(`Delete`)}]}),(0,p.jsx)(o,{button:{label:`Settings`,icon:(0,p.jsx)(pe,{}),variant:`secondary`,isIconOnly:!0},items:[{label:`Preferences`,onClick:()=>console.log(`Preferences`)},{label:`Account`,onClick:()=>console.log(`Account`)}]})]})},A={render:()=>(0,p.jsx)(o,{button:{label:`Settings`,icon:(0,p.jsx)(pe,{}),variant:`ghost`,children:`Settings`},items:[{label:`Preferences`,onClick:()=>console.log(`Preferences`)},{label:`Account`,onClick:()=>console.log(`Account`)}]})},j={render:()=>(0,p.jsx)(o,{button:{label:`Sort by: Name`,variant:`ghost`},hasChevron:!1,items:[{label:`Name`,onClick:()=>console.log(`Name`)},{label:`Date`,onClick:()=>console.log(`Date`)},{label:`Size`,onClick:()=>console.log(`Size`)}]})},M={render:()=>(0,p.jsxs)(o,{button:{label:`Actions`},children:[(0,p.jsx)(r,{icon:c,label:`Edit`,onClick:()=>console.log(`Edit`)}),(0,p.jsx)(r,{icon:s,label:`Duplicate`,onClick:()=>console.log(`Duplicate`)}),(0,p.jsx)(re,{}),(0,p.jsx)(r,{icon:d,label:`Delete`,onClick:()=>console.log(`Delete`)})]})},N={render:()=>(0,p.jsxs)(o,{button:{label:`File Actions`},children:[(0,p.jsx)(r,{icon:c,label:`Edit`,onClick:()=>console.log(`Edit`)}),(0,p.jsx)(r,{icon:s,label:`Duplicate`,onClick:()=>console.log(`Duplicate`)}),(0,p.jsx)(re,{}),(0,p.jsx)(r,{icon:d,label:`Delete (no permission)`,isDisabled:!0})]})},P={render:()=>{let[e,t]=(0,f.useState)(!1);return(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,alignItems:`center`},children:[(0,p.jsxs)(`label`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,p.jsx)(`input`,{type:`checkbox`,checked:e,onChange:e=>t(e.target.checked)}),`Show delete option`]}),(0,p.jsxs)(o,{button:{label:`Actions`},children:[(0,p.jsx)(r,{icon:c,label:`Edit`,onClick:()=>console.log(`Edit`)}),(0,p.jsx)(r,{icon:se,label:`Share`,onClick:()=>console.log(`Share`)}),e&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(re,{}),(0,p.jsx)(r,{icon:d,label:`Delete`,onClick:()=>console.log(`Delete`)})]})]})]})}},F={render:()=>(0,p.jsxs)(o,{button:{label:`Select User`},menuWidth:280,children:[(0,p.jsx)(r,{icon:u,label:`Alice Johnson`,description:`alice.johnson@example.com`,onClick:()=>console.log(`Alice`)}),(0,p.jsx)(r,{icon:u,label:`Bob Smith`,description:`bob.smith@example.com`,onClick:()=>console.log(`Bob`)}),(0,p.jsx)(r,{icon:u,label:`Carol Williams`,description:`carol.williams@example.com`,onClick:()=>console.log(`Carol`)})]})},I={render:()=>(0,p.jsx)(o,{button:{label:`Bottom toolbar menu`},placement:`above`,items:[{label:`Edit`,onClick:()=>console.log(`Edit`)},{label:`Duplicate`,onClick:()=>console.log(`Duplicate`)},{label:`Delete`,onClick:()=>console.log(`Delete`)}]})},L={render:()=>(0,p.jsx)(o,{button:{label:`Row actions`},alignment:`end`,menuWidth:220,items:[{label:`Edit`,onClick:()=>console.log(`Edit`)},{label:`Duplicate`,onClick:()=>console.log(`Duplicate`)},{label:`Delete`,onClick:()=>console.log(`Delete`)}]}),parameters:{docs:{description:{story:`Use alignment="end" when a menu should extend back over the trigger, such as a row action menu near the inline-end edge.`}}}},R={render:()=>(0,p.jsxs)(`div`,{style:{direction:`rtl`,display:`flex`,gap:`16px`},children:[(0,p.jsx)(o,{button:{label:`CSS direction: rtl`},items:[{label:`Edit`,onClick:()=>console.log(`Edit`)},{label:`Duplicate`,onClick:()=>console.log(`Duplicate`)},{label:`Delete`,onClick:()=>console.log(`Delete`)}]}),(0,p.jsx)(`div`,{dir:`ltr`,children:(0,p.jsx)(`div`,{dir:`rtl`,children:(0,p.jsx)(o,{button:{label:`dir="rtl" attribute`},items:[{label:`Edit`,onClick:()=>console.log(`Edit`)},{label:`Duplicate`,onClick:()=>console.log(`Duplicate`)},{label:`Delete`,onClick:()=>console.log(`Delete`)}]})})})]}),parameters:{docs:{description:{story:`In RTL contexts (CSS direction property or dir attribute) the menu right-edge-aligns to the trigger and grows toward the left — the logical mirror of the LTR default (#3389). Both direction mechanisms are shown; the popover inherits direction from the trigger subtree and the self-* position-area keywords mirror it in pure CSS.`}}}},z={render:function(){let[e,t]=(0,f.useState)(!1),[n,ee]=(0,f.useState)(!0);return(0,p.jsxs)(o,{button:{label:`View`},children:[(0,p.jsx)(ie,{label:`Show archived`,value:e,onChange:t}),(0,p.jsx)(ie,{label:`Show drafts`,description:`Include unpublished items`,value:n,onChange:ee})]})},parameters:{docs:{description:{story:`DropdownMenuCheckboxItem — independent toggles (role="menuitemcheckbox"). The menu stays open on toggle by default so several can be flipped at once.`}}}},B={render:function(){let[e,t]=(0,f.useState)(`newest`);return(0,p.jsx)(o,{button:{label:`Sort`},children:(0,p.jsxs)(ae,{value:e,onChange:t,label:`Sort by`,children:[(0,p.jsx)(a,{value:`newest`,label:`Newest`}),(0,p.jsx)(a,{value:`oldest`,label:`Oldest`}),(0,p.jsx)(a,{value:`az`,label:`Alphabetical`,description:`A → Z`})]})})},parameters:{docs:{description:{story:`DropdownMenuRadioGroup + DropdownMenuRadioItem — single-select group (role="menuitemradio"). Selecting closes the menu by default.`}}}},V={render:function(){let[e,t]=(0,f.useState)(`a`),[n,ee]=(0,f.useState)(`a`);return(0,p.jsxs)(`div`,{style:{display:`flex`,gap:24},children:[(0,p.jsx)(o,{button:{label:`Small menu`,size:`sm`},children:(0,p.jsxs)(ae,{value:e,onChange:t,label:`Small`,children:[(0,p.jsx)(a,{value:`a`,label:`Option A`}),(0,p.jsx)(a,{value:`b`,label:`Option B`})]})}),(0,p.jsx)(o,{button:{label:`Large menu`,size:`lg`},children:(0,p.jsxs)(ae,{value:n,onChange:ee,label:`Large`,children:[(0,p.jsx)(a,{value:`a`,label:`Option A`}),(0,p.jsx)(a,{value:`b`,label:`Option B`})]})})]})},parameters:{docs:{description:{story:"The checkbox/radio control size is derived from the menu item size — a `sm` menu renders the small (18px) control, `md`/`lg` render the standard (22px) control. On coarse-pointer (touch) devices the control swaps to the inline-end of the row."}}}},H={render:()=>(0,p.jsxs)(o,{button:{label:`Actions`},children:[(0,p.jsx)(r,{icon:c,label:`Rename`,onClick:()=>{}}),(0,p.jsxs)(i,{icon:l,label:`Move to`,children:[(0,p.jsx)(r,{label:`Folder A`,onClick:()=>{}}),(0,p.jsx)(r,{label:`Folder B`,onClick:()=>{}}),(0,p.jsx)(r,{label:`Folder C`,onClick:()=>{}})]}),(0,p.jsx)(r,{icon:d,label:`Delete`,onClick:()=>{}})]}),parameters:{docs:{description:{story:`DropdownMenuSubMenu is a single menu row that reveals a nested flyout of its own children. Hover or Right arrow (Left in RTL) / Enter / Space opens it and moves focus to its first item; Left arrow / Escape closes it and returns focus to the trigger. The flyout opens inline-end by default and auto-flips at the viewport edge.`}}}},U={render:()=>(0,p.jsxs)(o,{button:{label:`Share`},children:[(0,p.jsx)(r,{icon:se,label:`Copy link`,onClick:()=>{}}),(0,p.jsxs)(i,{label:`Share to`,children:[(0,p.jsx)(r,{label:`Email`,onClick:()=>{}}),(0,p.jsxs)(i,{label:`Team`,children:[(0,p.jsx)(r,{label:`Design`,onClick:()=>{}}),(0,p.jsx)(r,{label:`Engineering`,onClick:()=>{}})]})]})]}),parameters:{docs:{description:{story:`Submenus nest to arbitrary depth — each level owns its own roving focus and positioning layer.`}}}},W={render:()=>(0,p.jsxs)(o,{button:{label:`Actions`},children:[(0,p.jsx)(r,{label:`Rename`,onClick:()=>{}}),(0,p.jsx)(i,{label:`Move to`,hasSpinner:!0,children:(0,p.jsx)(r,{label:`Loading…`,isDisabled:!0,onClick:()=>{}})})]}),parameters:{docs:{description:{story:"A submenu row can show a spinner in place of the caret via `hasSpinner`, e.g. while a lazy submenu’s children load."}}}},G={render:()=>(0,p.jsx)(o,{button:{label:`Actions`},items:[{label:`Rename`,onClick:()=>{}},{label:`Move to`,icon:l,items:[{label:`Folder A`,onClick:()=>{}},{label:`Folder B`,onClick:()=>{}}]},{type:`divider`},{label:`Delete`,onClick:()=>{}}]}),parameters:{docs:{description:{story:"Data-driven parity: give a menu item a nested `items` array and it becomes a submenu automatically — no separate item type."}}}},K={parameters:{layout:`padded`},render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,gap:160,justifyContent:`center`},children:[(0,p.jsx)(o,{button:{label:`Data mode`},menuWidth:220,items:[{label:`Search`,icon:le,endContent:(0,p.jsx)(te,{label:`⌘K`})},{label:`Duplicate`,icon:s,endContent:(0,p.jsx)(te,{label:`⌘D`})},{type:`divider`},{label:`Delete`,icon:d,variant:`destructive`}]}),(0,p.jsxs)(o,{button:{label:`Compound mode`},menuWidth:220,children:[(0,p.jsx)(r,{icon:le,label:`Search`,endContent:(0,p.jsx)(te,{label:`⌘K`})}),(0,p.jsx)(r,{icon:s,label:`Duplicate`,endContent:(0,p.jsx)(te,{label:`⌘D`})}),(0,p.jsx)(re,{}),(0,p.jsx)(r,{icon:d,label:`Delete`,variant:`destructive`})]})]})},q={name:`Presentation / action sheet`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,height:`560px`},description:{story:`Forces DropdownMenu’s bottom-sheet presentation for a short, flat set of actions. It uses BottomSheet behavior including dialog focus, a scrim, Escape, and swipe dismissal.`}}},globals:{viewport:{value:`mobile1`,isRotated:!1}},render:()=>(0,p.jsx)(`div`,{className:`x9f619 xh8yej3 x1ov3xa9 x1oa1p4a x1awphl8 x1rey3nv xnjyzlh x7giv3`,children:(0,p.jsx)(o,{presentation:`bottom-sheet`,button:{label:`Project actions`},items:_e.map(e=>({...e,onClick:()=>console.log(`${e.label} selected`)}))})}),play:async({canvasElement:e})=>{let t=e.querySelector(`button`);t instanceof HTMLElement&&t.click()}},J={name:`Presentation / adaptive action menu`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,height:`560px`},description:{story:`Uses DropdownMenu’s adaptive presentation: a BottomSheet on compact coarse-pointer layouts and an anchored popover elsewhere.`}}},globals:{viewport:{value:`mobile1`,isRotated:!1}},render:()=>(0,p.jsx)(`div`,{className:`x9f619 xh8yej3 x1ov3xa9 x1oa1p4a x1awphl8 x1rey3nv xnjyzlh x7giv3`,children:(0,p.jsx)(o,{presentation:`adaptive`,button:{label:`Project actions`},items:_e.map(e=>({...e,onClick:()=>console.log(`${e.label} selected`)}))})}),play:async({canvasElement:e})=>{let t=e.querySelector(`button`);t instanceof HTMLElement&&t.click()}},Y={name:`Presentation / compact drill-in hierarchy`,parameters:{layout:`fullscreen`,docs:{story:{inline:!1,height:`560px`},description:{story:`Uses DropdownMenu’s bottom-sheet presentation for a hierarchy that cannot fit as adjacent flyouts. Move to project drills into a second list with a Back action while BottomSheet owns the modal contract.`}}},globals:{viewport:{value:`mobile1`,isRotated:!1}},render:()=>(0,p.jsx)(`div`,{className:`x9f619 xh8yej3 x1ov3xa9 x1oa1p4a x1awphl8 x1rey3nv xnjyzlh x7giv3`,children:(0,p.jsx)(he,{})}),play:async({canvasElement:e})=>{let t=e.querySelector(`button`);t instanceof HTMLElement&&(t.click(),await new Promise(e=>requestAnimationFrame(()=>e())),Array.from(e.querySelectorAll(`li`)).find(e=>e.textContent?.includes(`Move to project`))?.querySelector(`button`)?.click())}},X={...Y,name:`Presentation / compact drill-in hierarchy / RTL`,globals:{viewport:{value:`mobile1`,isRotated:!1},direction:`rtl`}},Z={name:`Readiness / viewport fit`,parameters:{layout:`fullscreen`,docs:{description:{story:`Uses the actual Storybook viewport. The menu requests a 640px minimum width near the inline edge and must keep 16px safe-area-aware gutters instead of widening the page.`}}},globals:{viewport:{value:`mobile1`,isRotated:!1}},render:()=>(0,p.jsx)(`div`,{className:`x9f619 xh8yej3 x1ov3xa9 x1oa1p4a x1awphl8 x1rey3nv xnjyzlh x7giv3`,children:(0,p.jsx)(`div`,{className:`x78zum5 x13a6bvl`,children:(0,p.jsx)(o,{button:{label:`Project actions`},alignment:`end`,menuWidth:640,items:[{label:`Rename project`,onClick:()=>{}},{label:`Duplicate project`,onClick:()=>{}},{label:`Share with external collaborators and reviewers`,onClick:()=>{}},{type:`divider`},{label:`Archive project`,onClick:()=>{}}]})})}),play:async({canvasElement:e})=>{let t=e.querySelector(`button`);t instanceof HTMLElement&&t.click()}},Q={name:`Readiness / tall content overflow`,parameters:{layout:`fullscreen`,docs:{description:{story:`Uses the actual Storybook viewport and a realistic project list. The anchored menu stays at or below 300px and scrolls internally, so its actions remain reachable without scrolling the page.`}}},globals:{viewport:{value:`mobile1`,isRotated:!1}},render:()=>(0,p.jsx)(`div`,{className:`x9f619 xh8yej3 x1ov3xa9 x1oa1p4a x1awphl8 x1rey3nv xnjyzlh x7giv3`,children:(0,p.jsx)(o,{button:{label:`Move to project`},menuWidth:280,children:ve.map(([e,t])=>(0,p.jsx)(r,{label:e,description:t,onClick:()=>{}},e))})}),play:async({canvasElement:e})=>{let t=e.querySelector(`button`);t instanceof HTMLElement&&t.click()}},$={name:`Readiness / submenu edge fit`,parameters:{layout:`fullscreen`,docs:{description:{story:`Uses the actual Storybook viewport with concise parent and child menus that can fit side by side. The submenu flips toward the available side, remains separated from its parent, and stays within viewport gutters. Use the compact drill-in example when the hierarchy cannot fit this contract.`}}},globals:{viewport:{value:`mobile1`,isRotated:!1}},render:()=>(0,p.jsx)(`div`,{className:`x9f619 xh8yej3 x1ov3xa9 x1oa1p4a x1awphl8 x1rey3nv xnjyzlh x7giv3`,children:(0,p.jsx)(`div`,{className:`x78zum5 x13a6bvl`,children:(0,p.jsxs)(o,{button:{label:`Project actions`},alignment:`end`,menuWidth:140,children:[(0,p.jsx)(r,{label:`Rename`,onClick:()=>{}}),(0,p.jsxs)(i,{label:`Move to`,menuWidth:140,children:[(0,p.jsx)(r,{label:`Research`,onClick:()=>{}}),(0,p.jsx)(r,{label:`Platform`,onClick:()=>{}}),(0,p.jsx)(r,{label:`Engineering`,onClick:()=>{}})]}),(0,p.jsx)(r,{label:`Archive`,onClick:()=>{}})]})})}),play:async({canvasElement:e})=>{let t=e.querySelector(`button`);if(!(t instanceof HTMLElement))return;t.click(),await new Promise(e=>requestAnimationFrame(()=>e()));let n=e.querySelector(`[role="menuitem"][aria-haspopup="menu"]`);if(n instanceof HTMLElement){n.click(),await new Promise(e=>requestAnimationFrame(()=>e()));let[t,ee]=Array.from(e.querySelectorAll(`[role="menu"]`)).filter(e=>e.getClientRects().length>0);if(t&&ee){let e=t.getBoundingClientRect(),n=ee.getBoundingClientRect();if(!(n.right<=e.left||n.left>=e.right))throw Error(`Submenu must not overlap its parent menu`)}}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '560px'
      },
      description: {
        story: 'Shows titled sections in the bottom-sheet presentation. Section headings and spacious action rows share the same inline content edge.'
      }
    }
  },
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false
    }
  },
  render: () => <div {...stylex.props(readinessStyles.viewportStoryCanvas)}>
      <DropdownMenu presentation="bottom-sheet" button={{
      label: 'File actions'
    }} items={[{
      type: 'section',
      title: 'Create',
      items: [{
        label: 'New file'
      }, {
        label: 'New folder'
      }]
    }, {
      type: 'section',
      title: 'Manage',
      items: [{
        label: 'Share file'
      }, {
        label: 'Archive file'
      }]
    }]} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Actions'
  }} items={[{
    label: 'Edit',
    onClick: () => console.log('Edit clicked')
  }, {
    label: 'Duplicate',
    onClick: () => console.log('Duplicate clicked')
  }, {
    label: 'Delete',
    onClick: () => console.log('Delete clicked')
  }]} />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Actions',
    variant: 'primary'
  }} items={[{
    label: 'Edit',
    icon: PencilIcon,
    onClick: () => console.log('Edit')
  }, {
    label: 'Duplicate',
    icon: DocumentDuplicateIcon,
    onClick: () => console.log('Duplicate')
  }, {
    label: 'Download',
    icon: ArrowDownTrayIcon,
    onClick: () => console.log('Download')
  }, {
    label: 'Delete',
    icon: TrashIcon,
    onClick: () => console.log('Delete')
  }]} />
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'File',
    variant: 'ghost'
  }} items={[{
    type: 'section',
    title: 'Create',
    items: [{
      label: 'New File',
      icon: DocumentPlusIcon,
      onClick: () => console.log('New File')
    }, {
      label: 'New Folder',
      icon: FolderPlusIcon,
      onClick: () => console.log('New Folder')
    }]
  }, {
    type: 'section',
    title: 'Share',
    items: [{
      label: 'Share',
      icon: ShareIcon,
      onClick: () => console.log('Share')
    }, {
      label: 'Archive',
      icon: ArchiveBoxIcon,
      onClick: () => console.log('Archive')
    }]
  }]} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Actions'
  }} items={[{
    label: 'Edit',
    onClick: () => console.log('Edit')
  }, {
    label: 'Duplicate',
    onClick: () => console.log('Duplicate')
  }, {
    type: 'divider'
  }, {
    label: 'Delete',
    onClick: () => console.log('Delete')
  }]} />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Actions'
  }} items={[{
    label: 'Edit',
    onClick: () => console.log('Edit')
  }, {
    label: 'Duplicate',
    onClick: () => console.log('Duplicate')
  }, {
    label: 'Delete (disabled)',
    isDisabled: true
  }]} />
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Destructive item',
  render: () => <DropdownMenu button={{
    label: 'Actions'
  }} items={[{
    label: 'Edit',
    onClick: () => console.log('Edit')
  }, {
    label: 'Duplicate',
    icon: 'copy',
    onClick: () => console.log('Duplicate')
  }, {
    type: 'divider'
  }, {
    label: 'Delete',
    icon: 'close',
    variant: 'destructive',
    onClick: () => console.log('Delete')
  }]} />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'center'
    }}>
        <div>Menu is {isOpen ? 'open' : 'closed'}</div>
        <DropdownMenu button={{
        label: 'Controlled Menu'
      }} isMenuOpen={isOpen} onOpenChange={setIsOpen} items={[{
        label: 'Item 1',
        onClick: () => console.log('Item 1')
      }, {
        label: 'Item 2',
        onClick: () => console.log('Item 2')
      }, {
        label: 'Item 3',
        onClick: () => console.log('Item 3')
      }]} />
      </div>;
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: function MountedOpenStory() {
    const [isOpen, setIsOpen] = useState(true);
    return <DropdownMenu button={{
      label: 'Sort'
    }} isMenuOpen={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuItem label="Newest" />
        <DropdownMenuItem label="Oldest" />
      </DropdownMenu>;
  },
  parameters: {
    docs: {
      description: {
        story: 'A controlled menu mounted with \`isMenuOpen\` true renders open without taking focus; \`document.activeElement\` stays on the page until the user opens the menu themselves. Tab to the trigger, then ArrowDown enters the already-open menu at the first item.'
      }
    }
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Wide Menu'
  }} menuWidth={300} items={[{
    label: 'This is a longer option that needs more space',
    onClick: () => console.log('Option 1')
  }, {
    label: 'Another long option with extra text',
    onClick: () => console.log('Option 2')
  }, {
    label: 'Short one',
    onClick: () => console.log('Option 3')
  }]} />
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap'
  }}>
      <DropdownMenu button={{
      label: 'Secondary',
      variant: 'secondary'
    }} items={[{
      label: 'Option 1'
    }, {
      label: 'Option 2'
    }]} />
      <DropdownMenu button={{
      label: 'Primary',
      variant: 'primary'
    }} items={[{
      label: 'Option 1'
    }, {
      label: 'Option 2'
    }]} />
      <DropdownMenu button={{
      label: 'Ghost',
      variant: 'ghost'
    }} items={[{
      label: 'Option 1'
    }, {
      label: 'Option 2'
    }]} />
      <DropdownMenu button={{
      label: 'Destructive',
      variant: 'destructive'
    }} items={[{
      label: 'Option 1'
    }, {
      label: 'Option 2'
    }]} />
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    alignItems: 'center'
  }}>
      <DropdownMenu button={{
      label: 'Small',
      size: 'sm'
    }} items={[{
      label: 'Option 1'
    }, {
      label: 'Option 2'
    }]} />
      <DropdownMenu button={{
      label: 'Medium',
      size: 'md'
    }} items={[{
      label: 'Option 1'
    }, {
      label: 'Option 2'
    }]} />
      <DropdownMenu button={{
      label: 'Large',
      size: 'lg'
    }} items={[{
      label: 'Option 1'
    }, {
      label: 'Option 2'
    }]} />
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [clickCount, setClickCount] = useState(0);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'center'
    }}>
        <div>Button clicked {clickCount} times</div>
        <DropdownMenu button={{
        label: 'Click Me'
      }} onClick={() => setClickCount(c => c + 1)} items={[{
        label: 'Menu Item',
        onClick: () => console.log('Item clicked')
      }]} />
      </div>;
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [copied, setCopied] = useState(false);
    return <DropdownMenu button={{
      label: 'Session'
    }} items={[{
      label: copied ? 'Copied' : 'Copy session ID',
      icon: <DocumentDuplicateIcon style={{
        width: 16,
        height: 16
      }} />,
      hasCloseOnSelect: false,
      onClick: () => setCopied(true)
    }, {
      label: 'Rename'
    }, {
      label: 'Delete',
      variant: 'destructive'
    }]} onOpenChange={isOpen => {
      if (!isOpen) {
        setCopied(false);
      }
    }} />;
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Select User'
  }} menuWidth={280}>
      <DropdownMenuItem icon={UserIcon} label="Alice Johnson" description="alice.johnson@example.com" onClick={() => console.log('Alice')} />
      <DropdownMenuItem icon={UserIcon} label="Bob Smith" description="bob.smith@example.com" onClick={() => console.log('Bob')} />
      <DropdownMenuItem icon={UserIcon} label="Carol Williams" description="carol.williams@example.com" onClick={() => console.log('Carol')} />
    </DropdownMenu>
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    alignItems: 'center'
  }}>
      <DropdownMenu button={{
      label: 'More options',
      icon: <EllipsisHorizontalIcon />,
      variant: 'ghost',
      isIconOnly: true
    }} items={[{
      label: 'Edit',
      icon: PencilIcon,
      onClick: () => console.log('Edit')
    }, {
      label: 'Delete',
      icon: TrashIcon,
      onClick: () => console.log('Delete')
    }]} />
      <DropdownMenu button={{
      label: 'Settings',
      icon: <Cog6ToothIcon />,
      variant: 'secondary',
      isIconOnly: true
    }} items={[{
      label: 'Preferences',
      onClick: () => console.log('Preferences')
    }, {
      label: 'Account',
      onClick: () => console.log('Account')
    }]} />
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Settings',
    icon: <Cog6ToothIcon />,
    variant: 'ghost',
    children: 'Settings'
  }} items={[{
    label: 'Preferences',
    onClick: () => console.log('Preferences')
  }, {
    label: 'Account',
    onClick: () => console.log('Account')
  }]} />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Sort by: Name',
    variant: 'ghost'
  }} hasChevron={false} items={[{
    label: 'Name',
    onClick: () => console.log('Name')
  }, {
    label: 'Date',
    onClick: () => console.log('Date')
  }, {
    label: 'Size',
    onClick: () => console.log('Size')
  }]} />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Actions'
  }}>
      <DropdownMenuItem icon={PencilIcon} label="Edit" onClick={() => console.log('Edit')} />
      <DropdownMenuItem icon={DocumentDuplicateIcon} label="Duplicate" onClick={() => console.log('Duplicate')} />
      <DropdownMenuDivider />
      <DropdownMenuItem icon={TrashIcon} label="Delete" onClick={() => console.log('Delete')} />
    </DropdownMenu>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'File Actions'
  }}>
      <DropdownMenuItem icon={PencilIcon} label="Edit" onClick={() => console.log('Edit')} />
      <DropdownMenuItem icon={DocumentDuplicateIcon} label="Duplicate" onClick={() => console.log('Duplicate')} />
      <DropdownMenuDivider />
      <DropdownMenuItem icon={TrashIcon} label="Delete (no permission)" isDisabled />
    </DropdownMenu>
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [canDelete, setCanDelete] = useState(false);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'center'
    }}>
        <label style={{
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }}>
          <input type="checkbox" checked={canDelete} onChange={e => setCanDelete(e.target.checked)} />
          Show delete option
        </label>
        <DropdownMenu button={{
        label: 'Actions'
      }}>
          <DropdownMenuItem icon={PencilIcon} label="Edit" onClick={() => console.log('Edit')} />
          <DropdownMenuItem icon={ShareIcon} label="Share" onClick={() => console.log('Share')} />
          {canDelete && <>
              <DropdownMenuDivider />
              <DropdownMenuItem icon={TrashIcon} label="Delete" onClick={() => console.log('Delete')} />
            </>}
        </DropdownMenu>
      </div>;
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Select User'
  }} menuWidth={280}>
      <DropdownMenuItem icon={UserIcon} label="Alice Johnson" description="alice.johnson@example.com" onClick={() => console.log('Alice')} />
      <DropdownMenuItem icon={UserIcon} label="Bob Smith" description="bob.smith@example.com" onClick={() => console.log('Bob')} />
      <DropdownMenuItem icon={UserIcon} label="Carol Williams" description="carol.williams@example.com" onClick={() => console.log('Carol')} />
    </DropdownMenu>
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Bottom toolbar menu'
  }} placement="above" items={[{
    label: 'Edit',
    onClick: () => console.log('Edit')
  }, {
    label: 'Duplicate',
    onClick: () => console.log('Duplicate')
  }, {
    label: 'Delete',
    onClick: () => console.log('Delete')
  }]} />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Row actions'
  }} alignment="end" menuWidth={220} items={[{
    label: 'Edit',
    onClick: () => console.log('Edit')
  }, {
    label: 'Duplicate',
    onClick: () => console.log('Duplicate')
  }, {
    label: 'Delete',
    onClick: () => console.log('Delete')
  }]} />,
  parameters: {
    docs: {
      description: {
        story: 'Use alignment="end" when a menu should extend back over the trigger, such as a row action menu near the inline-end edge.'
      }
    }
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    direction: 'rtl',
    display: 'flex',
    gap: '16px'
  }}>
      <DropdownMenu button={{
      label: 'CSS direction: rtl'
    }} items={[{
      label: 'Edit',
      onClick: () => console.log('Edit')
    }, {
      label: 'Duplicate',
      onClick: () => console.log('Duplicate')
    }, {
      label: 'Delete',
      onClick: () => console.log('Delete')
    }]} />
      <div dir="ltr">
        <div dir="rtl">
          <DropdownMenu button={{
          label: 'dir="rtl" attribute'
        }} items={[{
          label: 'Edit',
          onClick: () => console.log('Edit')
        }, {
          label: 'Duplicate',
          onClick: () => console.log('Duplicate')
        }, {
          label: 'Delete',
          onClick: () => console.log('Delete')
        }]} />
        </div>
      </div>
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'In RTL contexts (CSS direction property or dir attribute) the menu right-edge-aligns to the trigger and grows toward the left — the logical mirror of the LTR default (#3389). Both direction mechanisms are shown; the popover inherits direction from the trigger subtree and the self-* position-area keywords mirror it in pure CSS.'
      }
    }
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: function LabCheckboxItemsStory() {
    const [showArchived, setShowArchived] = useState(false);
    const [showDrafts, setShowDrafts] = useState(true);
    return <DropdownMenu button={{
      label: 'View'
    }}>
        <DropdownMenuCheckboxItem label="Show archived" value={showArchived} onChange={setShowArchived} />
        <DropdownMenuCheckboxItem label="Show drafts" description="Include unpublished items" value={showDrafts} onChange={setShowDrafts} />
      </DropdownMenu>;
  },
  parameters: {
    docs: {
      description: {
        story: 'DropdownMenuCheckboxItem — independent toggles (role="menuitemcheckbox"). The menu stays open on toggle by default so several can be flipped at once.'
      }
    }
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: function LabRadioGroupStory() {
    const [sort, setSort] = useState('newest');
    return <DropdownMenu button={{
      label: 'Sort'
    }}>
        <DropdownMenuRadioGroup value={sort} onChange={setSort} label="Sort by">
          <DropdownMenuRadioItem value="newest" label="Newest" />
          <DropdownMenuRadioItem value="oldest" label="Oldest" />
          <DropdownMenuRadioItem value="az" label="Alphabetical" description="A → Z" />
        </DropdownMenuRadioGroup>
      </DropdownMenu>;
  },
  parameters: {
    docs: {
      description: {
        story: 'DropdownMenuRadioGroup + DropdownMenuRadioItem — single-select group (role="menuitemradio"). Selecting closes the menu by default.'
      }
    }
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: function LabSelectableSizesStory() {
    const [sm, setSm] = useState('a');
    const [lg, setLg] = useState('a');
    return <div style={{
      display: 'flex',
      gap: 24
    }}>
        <DropdownMenu button={{
        label: 'Small menu',
        size: 'sm'
      }}>
          <DropdownMenuRadioGroup value={sm} onChange={setSm} label="Small">
            <DropdownMenuRadioItem value="a" label="Option A" />
            <DropdownMenuRadioItem value="b" label="Option B" />
          </DropdownMenuRadioGroup>
        </DropdownMenu>
        <DropdownMenu button={{
        label: 'Large menu',
        size: 'lg'
      }}>
          <DropdownMenuRadioGroup value={lg} onChange={setLg} label="Large">
            <DropdownMenuRadioItem value="a" label="Option A" />
            <DropdownMenuRadioItem value="b" label="Option B" />
          </DropdownMenuRadioGroup>
        </DropdownMenu>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'The checkbox/radio control size is derived from the menu item size — a \`sm\` menu renders the small (18px) control, \`md\`/\`lg\` render the standard (22px) control. On coarse-pointer (touch) devices the control swaps to the inline-end of the row.'
      }
    }
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Actions'
  }}>
      <DropdownMenuItem icon={PencilIcon} label="Rename" onClick={() => {}} />
      <DropdownMenuSubMenu icon={FolderPlusIcon} label="Move to">
        <DropdownMenuItem label="Folder A" onClick={() => {}} />
        <DropdownMenuItem label="Folder B" onClick={() => {}} />
        <DropdownMenuItem label="Folder C" onClick={() => {}} />
      </DropdownMenuSubMenu>
      <DropdownMenuItem icon={TrashIcon} label="Delete" onClick={() => {}} />
    </DropdownMenu>,
  parameters: {
    docs: {
      description: {
        story: 'DropdownMenuSubMenu is a single menu row that reveals a nested flyout of its own children. Hover or Right arrow (Left in RTL) / Enter / Space opens it and moves focus to its first item; Left arrow / Escape closes it and returns focus to the trigger. The flyout opens inline-end by default and auto-flips at the viewport edge.'
      }
    }
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Share'
  }}>
      <DropdownMenuItem icon={ShareIcon} label="Copy link" onClick={() => {}} />
      <DropdownMenuSubMenu label="Share to">
        <DropdownMenuItem label="Email" onClick={() => {}} />
        <DropdownMenuSubMenu label="Team">
          <DropdownMenuItem label="Design" onClick={() => {}} />
          <DropdownMenuItem label="Engineering" onClick={() => {}} />
        </DropdownMenuSubMenu>
      </DropdownMenuSubMenu>
    </DropdownMenu>,
  parameters: {
    docs: {
      description: {
        story: 'Submenus nest to arbitrary depth — each level owns its own roving focus and positioning layer.'
      }
    }
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Actions'
  }}>
      <DropdownMenuItem label="Rename" onClick={() => {}} />
      <DropdownMenuSubMenu label="Move to" hasSpinner>
        <DropdownMenuItem label="Loading…" isDisabled onClick={() => {}} />
      </DropdownMenuSubMenu>
    </DropdownMenu>,
  parameters: {
    docs: {
      description: {
        story: 'A submenu row can show a spinner in place of the caret via \`hasSpinner\`, e.g. while a lazy submenu\\u2019s children load.'
      }
    }
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <DropdownMenu button={{
    label: 'Actions'
  }} items={[{
    label: 'Rename',
    onClick: () => {}
  }, {
    label: 'Move to',
    icon: FolderPlusIcon,
    items: [{
      label: 'Folder A',
      onClick: () => {}
    }, {
      label: 'Folder B',
      onClick: () => {}
    }]
  }, {
    type: 'divider'
  }, {
    label: 'Delete',
    onClick: () => {}
  }]} />,
  parameters: {
    docs: {
      description: {
        story: 'Data-driven parity: give a menu item a nested \`items\` array and it becomes a submenu automatically — no separate item type.'
      }
    }
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  parameters: {
    layout: 'padded'
  },
  render: () => <div style={{
    display: 'flex',
    gap: 160,
    justifyContent: 'center'
  }}>
      <DropdownMenu button={{
      label: 'Data mode'
    }} menuWidth={220} items={[{
      label: 'Search',
      icon: MagnifyingGlassIcon,
      endContent: <Badge label="⌘K" />
    }, {
      label: 'Duplicate',
      icon: DocumentDuplicateIcon,
      endContent: <Badge label="⌘D" />
    }, {
      type: 'divider'
    }, {
      label: 'Delete',
      icon: TrashIcon,
      variant: 'destructive'
    }]} />
      <DropdownMenu button={{
      label: 'Compound mode'
    }} menuWidth={220}>
        <DropdownMenuItem icon={MagnifyingGlassIcon} label="Search" endContent={<Badge label="⌘K" />} />
        <DropdownMenuItem icon={DocumentDuplicateIcon} label="Duplicate" endContent={<Badge label="⌘D" />} />
        <DropdownMenuDivider />
        <DropdownMenuItem icon={TrashIcon} label="Delete" variant="destructive" />
      </DropdownMenu>
    </div>
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Presentation / action sheet',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '560px'
      },
      description: {
        story: 'Forces DropdownMenu’s bottom-sheet presentation for a short, flat set of actions. It uses BottomSheet behavior including dialog focus, a scrim, Escape, and swipe dismissal.'
      }
    }
  },
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false
    }
  },
  render: () => <div {...stylex.props(readinessStyles.viewportStoryCanvas)}>
      <DropdownMenu presentation="bottom-sheet" button={{
      label: 'Project actions'
    }} items={PROJECT_ACTIONS.map(action => ({
      ...action,
      onClick: () => console.log(\`\${action.label} selected\`)
    }))} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Presentation / adaptive action menu',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '560px'
      },
      description: {
        story: 'Uses DropdownMenu’s adaptive presentation: a BottomSheet on compact coarse-pointer layouts and an anchored popover elsewhere.'
      }
    }
  },
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false
    }
  },
  render: () => <div {...stylex.props(readinessStyles.viewportStoryCanvas)}>
      <DropdownMenu presentation="adaptive" button={{
      label: 'Project actions'
    }} items={PROJECT_ACTIONS.map(action => ({
      ...action,
      onClick: () => console.log(\`\${action.label} selected\`)
    }))} />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  }
}`,...J.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Presentation / compact drill-in hierarchy',
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '560px'
      },
      description: {
        story: 'Uses DropdownMenu’s bottom-sheet presentation for a hierarchy that cannot fit as adjacent flyouts. Move to project drills into a second list with a Back action while BottomSheet owns the modal contract.'
      }
    }
  },
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false
    }
  },
  render: () => <div {...stylex.props(readinessStyles.viewportStoryCanvas)}>
      <CompactDrillInActionSheet />
    </div>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      const submenuRow = Array.from(canvasElement.querySelectorAll('li')).find(item => item.textContent?.includes('Move to project'));
      submenuRow?.querySelector('button')?.click();
    }
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  ...CompactDrillInPresentation,
  name: 'Presentation / compact drill-in hierarchy / RTL',
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false
    },
    direction: 'rtl'
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Readiness / viewport fit',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Uses the actual Storybook viewport. The menu requests a 640px minimum width near the inline edge and must keep 16px safe-area-aware gutters instead of widening the page.'
      }
    }
  },
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false
    }
  },
  render: () => <div {...stylex.props(readinessStyles.viewportStoryCanvas)}>
      <div {...stylex.props(readinessStyles.edgeAnchorRow)}>
        <DropdownMenu button={{
        label: 'Project actions'
      }} alignment="end" menuWidth={640} items={[{
        label: 'Rename project',
        onClick: () => {}
      }, {
        label: 'Duplicate project',
        onClick: () => {}
      }, {
        label: 'Share with external collaborators and reviewers',
        onClick: () => {}
      }, {
        type: 'divider'
      }, {
        label: 'Archive project',
        onClick: () => {}
      }]} />
      </div>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Readiness / tall content overflow',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Uses the actual Storybook viewport and a realistic project list. The anchored menu stays at or below 300px and scrolls internally, so its actions remain reachable without scrolling the page.'
      }
    }
  },
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false
    }
  },
  render: () => <div {...stylex.props(readinessStyles.viewportStoryCanvas)}>
      <DropdownMenu button={{
      label: 'Move to project'
    }} menuWidth={280}>
        {PROJECT_DESTINATIONS.map(([label, team]) => <DropdownMenuItem key={label} label={label} description={team} onClick={() => {}} />)}
      </DropdownMenu>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (trigger instanceof HTMLElement) {
      trigger.click();
    }
  }
}`,...Q.parameters?.docs?.source}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: 'Readiness / submenu edge fit',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Uses the actual Storybook viewport with concise parent and child menus that can fit side by side. The submenu flips toward the available side, remains separated from its parent, and stays within viewport gutters. Use the compact drill-in example when the hierarchy cannot fit this contract.'
      }
    }
  },
  globals: {
    viewport: {
      value: 'mobile1',
      isRotated: false
    }
  },
  render: () => <div {...stylex.props(readinessStyles.viewportStoryCanvas)}>
      <div {...stylex.props(readinessStyles.edgeAnchorRow)}>
        <DropdownMenu button={{
        label: 'Project actions'
      }} alignment="end" menuWidth={140}>
          <DropdownMenuItem label="Rename" onClick={() => {}} />
          <DropdownMenuSubMenu label="Move to" menuWidth={140}>
            <DropdownMenuItem label="Research" onClick={() => {}} />
            <DropdownMenuItem label="Platform" onClick={() => {}} />
            <DropdownMenuItem label="Engineering" onClick={() => {}} />
          </DropdownMenuSubMenu>
          <DropdownMenuItem label="Archive" onClick={() => {}} />
        </DropdownMenu>
      </div>
    </div>,
  play: async ({
    canvasElement
  }) => {
    const trigger = canvasElement.querySelector('button');
    if (!(trigger instanceof HTMLElement)) {
      return;
    }
    trigger.click();
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    const submenuTrigger = canvasElement.querySelector('[role="menuitem"][aria-haspopup="menu"]');
    if (submenuTrigger instanceof HTMLElement) {
      submenuTrigger.click();
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
      const openMenus = Array.from(canvasElement.querySelectorAll<HTMLElement>('[role="menu"]')).filter(menu => menu.getClientRects().length > 0);
      const [parentMenu, submenu] = openMenus;
      if (parentMenu && submenu) {
        const parentRect = parentMenu.getBoundingClientRect();
        const submenuRect = submenu.getBoundingClientRect();
        const isSeparated = submenuRect.right <= parentRect.left || submenuRect.left >= parentRect.right;
        if (!isSeparated) {
          throw new Error('Submenu must not overlap its parent menu');
        }
      }
    }
  }
}`,...$.parameters?.docs?.source}}},ye=`Default.BasicPopover.WithIcons.WithSections.WithDividers.WithDisabledItems.DestructiveItem.Controlled.MountedOpen.CustomWidth.ButtonVariants.ButtonSizes.WithOnClick.StaysOpenOnSelect.CustomItemRender.IconOnly.IconWithLabel.NoChevron.CompoundBasic.CompoundWithDisabled.CompoundConditional.CompoundWithDescriptions.PlacementAbove.AlignmentEnd.RTL.LabCheckboxItems.LabRadioGroup.LabSelectableSizes.Submenu.NestedSubmenu.SubmenuAsyncSpinner.SubmenuDataDriven.ModeParity.ActionSheetPresentation.AdaptiveActionPresentation.CompactDrillInPresentation.CompactDrillInPresentationRTL.ViewportFit.TallContentOverflow.SubmenuViewportFit`.split(`.`)}))();export{q as ActionSheetPresentation,J as AdaptiveActionPresentation,L as AlignmentEnd,h as BasicPopover,T as ButtonSizes,w as ButtonVariants,Y as CompactDrillInPresentation,X as CompactDrillInPresentationRTL,M as CompoundBasic,P as CompoundConditional,F as CompoundWithDescriptions,N as CompoundWithDisabled,x as Controlled,O as CustomItemRender,C as CustomWidth,m as Default,b as DestructiveItem,k as IconOnly,A as IconWithLabel,z as LabCheckboxItems,B as LabRadioGroup,V as LabSelectableSizes,K as ModeParity,S as MountedOpen,U as NestedSubmenu,j as NoChevron,I as PlacementAbove,R as RTL,D as StaysOpenOnSelect,H as Submenu,W as SubmenuAsyncSpinner,G as SubmenuDataDriven,$ as SubmenuViewportFit,Q as TallContentOverflow,Z as ViewportFit,y as WithDisabledItems,v as WithDividers,g as WithIcons,E as WithOnClick,_ as WithSections,ye as __namedExportsOrder,ge as default};