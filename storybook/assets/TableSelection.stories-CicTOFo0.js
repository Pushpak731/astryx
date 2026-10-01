import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{t as n}from"./react-B7Te67-h.js";import{t as r}from"./jsx-runtime-DqZldVDK.js";import{t as i}from"./Button-DA0IvI_z.js";import{t as a}from"./Button-CdztB0UK.js";import{t as o}from"./Table-DHrEgyt2.js";import{Tt as s,br as c,dn as l,fn as u,ln as d,yr as f}from"./iframe-C_-I7RLe.js";function p({layout:e,selection:t}){return(0,g.jsx)(u,{selection:t,"data-layout":e,xstyle:e===`floating`?M.floatingToolbar:void 0,startContent:e===`floating`?(0,g.jsx)(i,{label:`Approve`,variant:`ghost`,onClick:()=>{}}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(i,{label:`Export`,variant:`ghost`,onClick:()=>{}}),(0,g.jsx)(i,{label:`Delete`,variant:`ghost`,onClick:t.clearSelection})]})})}function m({layout:e}){let t=e===`floating`?j:x,[n,r]=(0,h.useState)(new Set),{selectionConfig:i,selectionState:a}=d({data:t,idKey:`id`,selectedKeys:n,setSelectedKeys:r}),s=l(i),u=(0,g.jsxs)(g.Fragment,{children:[e===`floating`?(0,g.jsx)(`div`,{className:`xrvj5dj x185a7wo xjcht0a x4d5cxa`,children:[[`Active users`,`12,840`],[`Selection rate`,`18.4%`],[`Pending reviews`,`247`]].map(([e,t])=>(0,g.jsxs)(`div`,{className:`x1shk3sm x1hviunn xwmxj5m`,children:[(0,g.jsx)(`span`,{className:`x1lliihq xv1l7n4`,children:e}),(0,g.jsx)(`strong`,{className:`x1lliihq xcsaf9d x1tgivj0`,children:t})]},e))}):null,(0,g.jsxs)(`div`,{"data-table-region":e,...{0:{className:`x1n2onr6`},1:{className:`x1n2onr6 x1hpo1yp xzdgnf2`}}[(e===`floating`)<<0],children:[(0,g.jsx)(p,{layout:e,selection:a}),(0,g.jsx)(o,{data:t,columns:S,idKey:`id`,hasHover:!0,plugins:{selection:s}})]})]});return e===`floating`?(0,g.jsx)(`div`,{className:`xrlsmeg xvueqy4`,children:(0,g.jsx)(c,{axis:`block`,label:`Bulk actions example`,overscroll:`contain`,xstyle:M.scrollContainer,children:u})}):(0,g.jsx)(`div`,{className:`xrlsmeg xvueqy4`,children:u})}var h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F;e((()=>{h=t(n()),a(),f(),s(),g=r(),{expect:_,userEvent:v,waitFor:y,within:b}=__STORYBOOK_MODULE_TEST__,x=[{id:`1`,name:`Alice`,email:`alice@example.com`,role:`Engineer`,isLocked:!1},{id:`2`,name:`Bob`,email:`bob@example.com`,role:`Designer`,isLocked:!1},{id:`3`,name:`Charlie`,email:`charlie@example.com`,role:`Manager`,isLocked:!1},{id:`4`,name:`Diana`,email:`diana@example.com`,role:`Engineer`,isLocked:!0},{id:`5`,name:`Eve`,email:`eve@example.com`,role:`Admin`,isLocked:!1}],S=[{key:`name`,header:`Name`},{key:`email`,header:`Email`},{key:`role`,header:`Role`}],C={title:`Core/TableSelection`,tags:[`autodocs`]},w={render:()=>{let[e,t]=(0,h.useState)(new Set),{selectionConfig:n}=d({data:x,idKey:`id`,selectedKeys:e,setSelectedKeys:t}),r=l(n);return(0,g.jsxs)(`div`,{style:{maxWidth:600},children:[(0,g.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Selected: `,e.size,` of `,x.length]}),(0,g.jsx)(o,{data:x,columns:S,idKey:`id`,plugins:{selection:r}})]})}},T={render:()=>{let[e,t]=(0,h.useState)(new Set([`1`,`3`])),{selectionConfig:n}=d({data:x,idKey:`id`,selectedKeys:e,setSelectedKeys:t}),r=l(n);return(0,g.jsxs)(`div`,{style:{maxWidth:600},children:[(0,g.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Selected: `,[...e].join(`, `)||`none`]}),(0,g.jsx)(o,{data:x,columns:S,idKey:`id`,plugins:{selection:r}})]})}},E={render:()=>{let[e,t]=(0,h.useState)(new Set),{selectionConfig:n}=d({data:x,idKey:`id`,selectedKeys:e,setSelectedKeys:t,getIsItemSelectable:e=>e.role!==`Admin`}),r=l(n);return(0,g.jsxs)(`div`,{style:{maxWidth:600},children:[(0,g.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Admin rows have no checkbox. Selected: `,e.size]}),(0,g.jsx)(o,{data:x,columns:S,idKey:`id`,plugins:{selection:r}})]})}},D={render:()=>{let[e,t]=(0,h.useState)(new Set),{selectionConfig:n}=d({data:x,idKey:`id`,selectedKeys:e,setSelectedKeys:t,getIsItemEnabled:e=>!e.isLocked}),r=l(n);return(0,g.jsxs)(`div`,{style:{maxWidth:600},children:[(0,g.jsxs)(`p`,{style:{marginBottom:8,fontSize:14,color:`var(--color-text-secondary)`},children:[`Locked rows (Diana) have a disabled checkbox. Select-all skips them. Selected: `,e.size]}),(0,g.jsx)(o,{data:x,columns:S,idKey:`id`,plugins:{selection:r}})]})}},O={render:()=>{let[e,t]=(0,h.useState)(new Set),{selectionConfig:n}=d({data:x,idKey:`id`,selectedKeys:e,setSelectedKeys:t}),r=l(n);return(0,g.jsx)(`div`,{style:{maxWidth:600},children:(0,g.jsx)(o,{data:x,columns:S,idKey:`id`,density:`compact`,plugins:{selection:r}})})}},k={render:()=>{let[e,t]=(0,h.useState)(new Set),{selectionConfig:n}=d({data:x,idKey:`id`,selectedKeys:e,setSelectedKeys:t}),r=l(n);return(0,g.jsx)(`div`,{style:{maxWidth:600},children:(0,g.jsx)(o,{data:x,columns:S,idKey:`id`,density:`spacious`,hasHover:!0,plugins:{selection:r}})})}},A={render:()=>{let[e,t]=(0,h.useState)(new Set),{selectionConfig:n}=d({data:x,idKey:`id`,selectedKeys:e,setSelectedKeys:t}),r=l(n);return(0,g.jsx)(`div`,{style:{maxWidth:600},children:(0,g.jsx)(o,{data:x,columns:S,idKey:`id`,isStriped:!0,plugins:{selection:r}})})}},j=Array.from({length:40},(e,t)=>{let n=x[t%x.length];return{...n,id:`long-${t+1}`,name:`${n.name} ${t+1}`}}),M={scrollContainer:{kskxy:`x159tps6`,kHBbk8:`xc8icb0`,kZ7BSC:`x185mbhu`,$$css:!0},floatingToolbar:{kVAEAm:`x7wzq59`,k87sOh:`x15ppc0s`,k3aq6I:`x1s0uh9m`,k1K539:`x1vv6yx0`,kY2c9j:`x1vjfegm`,kaIpWk:`xh6dtrn`,krdFHd:null,kfmiAY:null,kVL7Gh:null,kT0f0o:null,kIxVMA:null,ksF3WI:null,kqGeR4:null,kYm2EN:null,kGVxlE:`x14hfi27`,$$css:!0}},N={render:()=>(0,g.jsx)(m,{layout:`fixed`}),play:async({canvasElement:e})=>{let t=b(e);await v.click(t.getAllByLabelText(`Select row`)[0]);let n=t.getByRole(`toolbar`,{name:`Bulk actions`}),r=n.closest(`.astryx-section`);await _(n).toHaveAttribute(`data-layout`,`fixed`),await _(n).toHaveAttribute(`data-size`,`sm`),await _(r).toHaveAttribute(`data-variant`,`muted`),await _(n.closest(`[role="group"]`)).toBeNull(),await _(t.getByText(`1 selected`)).toBeInTheDocument(),await v.click(t.getByRole(`button`,{name:`Unselect All`})),await _(t.queryByRole(`toolbar`,{name:`Bulk actions`})).not.toBeInTheDocument(),await v.click(t.getAllByLabelText(`Select row`)[0])}},P={render:()=>(0,g.jsx)(m,{layout:`floating`}),play:async({canvasElement:e})=>{let t=b(e),n=await t.findByRole(`group`,{name:`Bulk actions example`}),r=t.getByRole(`table`),i=r.getBoundingClientRect().top;await _(n.scrollHeight).toBeGreaterThan(n.clientHeight),await _(n).toHaveAttribute(`tabindex`,`0`),await _(t.queryByRole(`region`,{name:`Metrics`})).toBeNull();let a=getComputedStyle(n);await _(a.overscrollBehaviorY).toBe(`contain`),await _(a.overscrollBehaviorX).toBe(`auto`),await _(a.isolation).toBe(`isolate`),await v.click(t.getAllByLabelText(`Select row`)[0]);let o=t.getByRole(`toolbar`,{name:`Bulk actions`}),s=o.closest(`.astryx-section`);if(s==null)throw Error(`Expected the Toolbar surface`);await _(o).toHaveAttribute(`data-layout`,`floating`),await _(o).toHaveAttribute(`data-size`,`sm`),await _(s).toHaveAttribute(`data-variant`,`muted`),await _(o.closest(`[role="group"]`)).toBe(n),await _(Math.abs(r.getBoundingClientRect().top-i)).toBeLessThanOrEqual(1),n.scrollTop=300,n.dispatchEvent(new Event(`scroll`)),await y(()=>{_(Math.round(s.getBoundingClientRect().top-n.getBoundingClientRect().top)).toBe(16)}),n.scrollTop=0}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const {
      selectionConfig
    } = useTableSelectionState<User>({
      data: users,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys
    });
    const selectionPlugin = useTableSelection<User>(selectionConfig);
    return <div style={{
      maxWidth: 600
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Selected: {selectedKeys.size} of {users.length}
        </p>
        <Table data={users} columns={columns} idKey="id" plugins={{
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set(['1', '3']));
    const {
      selectionConfig
    } = useTableSelectionState<User>({
      data: users,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys
    });
    const selectionPlugin = useTableSelection<User>(selectionConfig);
    return <div style={{
      maxWidth: 600
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Selected: {[...selectedKeys].join(', ') || 'none'}
        </p>
        <Table data={users} columns={columns} idKey="id" plugins={{
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const {
      selectionConfig
    } = useTableSelectionState<User>({
      data: users,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys,
      getIsItemSelectable: item => item.role !== 'Admin'
    });
    const selectionPlugin = useTableSelection<User>(selectionConfig);
    return <div style={{
      maxWidth: 600
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Admin rows have no checkbox. Selected: {selectedKeys.size}
        </p>
        <Table data={users} columns={columns} idKey="id" plugins={{
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const {
      selectionConfig
    } = useTableSelectionState<User>({
      data: users,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys,
      getIsItemEnabled: item => !item.isLocked
    });
    const selectionPlugin = useTableSelection<User>(selectionConfig);
    return <div style={{
      maxWidth: 600
    }}>
        <p style={{
        marginBottom: 8,
        fontSize: 14,
        color: 'var(--color-text-secondary)'
      }}>
          Locked rows (Diana) have a disabled checkbox. Select-all skips them.
          Selected: {selectedKeys.size}
        </p>
        <Table data={users} columns={columns} idKey="id" plugins={{
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const {
      selectionConfig
    } = useTableSelectionState<User>({
      data: users,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys
    });
    const selectionPlugin = useTableSelection<User>(selectionConfig);
    return <div style={{
      maxWidth: 600
    }}>
        <Table data={users} columns={columns} idKey="id" density="compact" plugins={{
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const {
      selectionConfig
    } = useTableSelectionState<User>({
      data: users,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys
    });
    const selectionPlugin = useTableSelection<User>(selectionConfig);
    return <div style={{
      maxWidth: 600
    }}>
        <Table data={users} columns={columns} idKey="id" density="spacious" hasHover plugins={{
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
    const {
      selectionConfig
    } = useTableSelectionState<User>({
      data: users,
      idKey: 'id',
      selectedKeys,
      setSelectedKeys
    });
    const selectionPlugin = useTableSelection<User>(selectionConfig);
    return <div style={{
      maxWidth: 600
    }}>
        <Table data={users} columns={columns} idKey="id" isStriped plugins={{
        selection: selectionPlugin
      }} />
      </div>;
  }
}`,...A.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <BulkActionsExample layout="fixed" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByLabelText('Select row')[0]);
    const toolbar = canvas.getByRole('toolbar', {
      name: 'Bulk actions'
    });
    const toolbarSurface = toolbar.closest('.astryx-section');
    await expect(toolbar).toHaveAttribute('data-layout', 'fixed');
    await expect(toolbar).toHaveAttribute('data-size', 'sm');
    await expect(toolbarSurface).toHaveAttribute('data-variant', 'muted');
    await expect(toolbar.closest('[role="group"]')).toBeNull();
    await expect(canvas.getByText('1 selected')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Unselect All'
    }));
    await expect(canvas.queryByRole('toolbar', {
      name: 'Bulk actions'
    })).not.toBeInTheDocument();

    // Leave the story ready for manual review.
    await userEvent.click(canvas.getAllByLabelText('Select row')[0]);
  }
}`,...N.parameters?.docs?.source},description:{story:`Product-composed in-flow bar. Actions lead; selection status and clear trail.`,...N.parameters?.docs?.description}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <BulkActionsExample layout="floating" />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const scrollRegion = await canvas.findByRole('group', {
      name: 'Bulk actions example'
    });
    const table = canvas.getByRole('table');
    const tableTopBeforeSelection = table.getBoundingClientRect().top;
    await expect(scrollRegion.scrollHeight).toBeGreaterThan(scrollRegion.clientHeight);
    await expect(scrollRegion).toHaveAttribute('tabindex', '0');
    await expect(canvas.queryByRole('region', {
      name: 'Metrics'
    })).toBeNull();
    const scrollStyles = getComputedStyle(scrollRegion);
    await expect(scrollStyles.overscrollBehaviorY).toBe('contain');
    await expect(scrollStyles.overscrollBehaviorX).toBe('auto');
    await expect(scrollStyles.isolation).toBe('isolate');
    await userEvent.click(canvas.getAllByLabelText('Select row')[0]);
    const toolbar = canvas.getByRole('toolbar', {
      name: 'Bulk actions'
    });
    const toolbarSurface = toolbar.closest<HTMLElement>('.astryx-section');
    if (toolbarSurface == null) {
      throw new Error('Expected the Toolbar surface');
    }
    await expect(toolbar).toHaveAttribute('data-layout', 'floating');
    await expect(toolbar).toHaveAttribute('data-size', 'sm');
    await expect(toolbarSurface).toHaveAttribute('data-variant', 'muted');
    await expect(toolbar.closest('[role="group"]')).toBe(scrollRegion);
    await expect(Math.abs(table.getBoundingClientRect().top - tableTopBeforeSelection)).toBeLessThanOrEqual(1);
    scrollRegion.scrollTop = 300;
    scrollRegion.dispatchEvent(new Event('scroll'));
    await waitFor(() => {
      expect(Math.round(toolbarSurface.getBoundingClientRect().top - scrollRegion.getBoundingClientRect().top)).toBe(16);
    });
    scrollRegion.scrollTop = 0;
  }
}`,...P.parameters?.docs?.source},description:{story:`Product-composed floating bar for a long, non-sticky table below metrics.
The example owns a capped scrollport; the toolbar stays 16px from that
scrollport and releases at the table region's block-end boundary.`,...P.parameters?.docs?.description}}},F=[`Default`,`WithPreselection`,`NonSelectableRows`,`DisabledRows`,`Compact`,`Spacious`,`WithStripedRows`,`BulkActions`,`BulkActionsFloating`]}))();export{N as BulkActions,P as BulkActionsFloating,O as Compact,w as Default,D as DisabledRows,E as NonSelectableRows,k as Spacious,T as WithPreselection,A as WithStripedRows,F as __namedExportsOrder,C as default};