import{i as e,s as t}from"./preload-helper-CT_b8DTk.js";import{t as n}from"./react-B7Te67-h.js";import{t as r}from"./jsx-runtime-DqZldVDK.js";import{n as i,t as a}from"./Badge-LIupL8_I.js";import{t as o}from"./Card-CUl_z6rB.js";import{t as s}from"./Card-B75tyNvL.js";import{i as c,t as l}from"./List-RcWsG_Vm.js";import{r as u,t as d}from"./CheckboxListItem-j2naazCF.js";import{o as f,t as p}from"./Link-CckA_OXG.js";import{Fr as m}from"./iframe-C_-I7RLe.js";function h(){let[e,t]=(0,g.useState)([`transactions`]),n=y.every(t=>e.includes(t)),r=e.length===0;return(0,_.jsxs)(u,{label:`Include in export`,hasDividers:!0,children:[(0,_.jsx)(d,{label:`Select all`,isChecked:n?!0:r?!1:`indeterminate`,onCheck:e=>{t(e?[...y]:[])}}),v.map(n=>(0,_.jsx)(d,{label:n.label,isChecked:e.includes(n.id),onCheck:e=>{t(t=>e?[...t,n.id]:t.filter(e=>e!==n.id))}},n.id))]})}var g,_,v,y,b=e((()=>{g=t(n(),1),m(),_=r(),v=[{id:`transactions`,label:`Transaction history`},{id:`statements`,label:`Account statements`},{id:`tax`,label:`Tax documents`},{id:`invoices`,label:`Invoices`}],y=v.map(e=>e.id),h.__docgenInfo={description:``,methods:[],displayName:`CheckboxListSelectAllPattern`}})),x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U;e((()=>{x=t(n()),m(),l(),a(),s(),p(),b(),S=r(),C={title:`Core/CheckboxList`,component:u,tags:[`autodocs`],argTypes:{label:{control:`text`,description:`Label text (required)`},isLabelHidden:{control:`boolean`,description:`Visually hide the label (still accessible to screen readers)`},description:{control:`text`,description:`Description text displayed below the label`},density:{control:`select`,options:[`compact`,`balanced`,`spacious`],description:`Spacing density for list items`},hasDividers:{control:`boolean`,description:`Whether to show dividers between items`},isDisabled:{control:`boolean`,description:`Whether all checkbox items are disabled`},disabledMessage:{control:`text`,description:`Explains why the group is disabled (whole-group state, not per item). With isDisabled, shows a tooltip on hover/keyboard focus and keeps the checkboxes focusable via aria-disabled (toggling stays blocked). Use this instead of wrapping a disabled CheckboxList in Tooltip.`}}},w={render:e=>{let[t,n]=(0,x.useState)(e.value??[]),{value:r,onChange:i,...a}=e;return(0,S.jsxs)(u,{...a,value:t,onChange:n,children:[(0,S.jsx)(d,{label:`Email`,value:`email`}),(0,S.jsx)(d,{label:`SMS`,value:`sms`}),(0,S.jsx)(d,{label:`Push notification`,value:`push`})]})},args:{label:`Notification preferences`}},T={render:e=>{let[t,n]=(0,x.useState)(e.value??[]),{value:r,onChange:i,...a}=e;return(0,S.jsxs)(u,{...a,value:t,onChange:n,children:[(0,S.jsx)(d,{label:`Email`,value:`email`,description:`Receive notifications via email`}),(0,S.jsx)(d,{label:`SMS`,value:`sms`,description:`Standard messaging rates apply`}),(0,S.jsx)(d,{label:`Push notification`,value:`push`,description:`Instant alerts on your device`})]})},args:{label:`Notification preferences`,description:`Choose how you would like to be notified`,hasDividers:!0}},E={render:e=>{let[t,n]=(0,x.useState)(e.value??[`analytics`]),{value:r,onChange:i,...a}=e;return(0,S.jsxs)(u,{...a,value:t,onChange:n,children:[(0,S.jsx)(d,{label:(0,S.jsxs)(S.Fragment,{children:[`Analytics `,(0,S.jsx)(f,{href:`#analytics-details`,children:`details`})]}),value:`analytics`,description:(0,S.jsxs)(S.Fragment,{children:[`Usage data only. `,(0,S.jsx)(f,{href:`#privacy`,children:`Read the policy`})]}),endContent:(0,S.jsx)(`span`,{"data-testid":`checkbox-end-content`,children:`$0/mo`})}),(0,S.jsx)(d,{label:`Personalization`,value:`personalization`,description:(0,S.jsxs)(S.Fragment,{children:[`Tailors what you see. `,(0,S.jsx)(f,{href:`#privacy`,children:`Learn more`})]})})]})},args:{label:`Data sharing`,description:`Labels and descriptions can carry links and other rich content without toggling the item.`}},D={render:e=>{let t=[{id:`react`,label:`React`},{id:`vue`,label:`Vue`},{id:`angular`,label:`Angular`},{id:`svelte`,label:`Svelte`}],[n,r]=(0,x.useState)([`react`]),{value:i,onChange:a,...o}=e;return(0,S.jsx)(u,{...o,value:n,onChange:r,children:t.map(e=>(0,S.jsx)(d,{label:e.label,value:e.id},e.id))})},args:{label:`Frameworks`}},O={render:()=>{let[e,t]=(0,x.useState)(!1),[n,r]=(0,x.useState)(!0),[i,a]=(0,x.useState)(!1);return(0,S.jsxs)(c,{children:[(0,S.jsx)(d,{label:`Accept terms and conditions`,isChecked:e,onCheck:t}),(0,S.jsx)(d,{label:`Subscribe to newsletter`,description:`Weekly updates about new features`,isChecked:n,onCheck:r}),(0,S.jsx)(d,{label:`Receive marketing emails`,isChecked:i,onCheck:a})]})}},k={render:()=>(0,S.jsxs)(c,{children:[(0,S.jsx)(d,{label:`Completed task`,isChecked:!0}),(0,S.jsx)(d,{label:`Pending task`,isChecked:!1}),(0,S.jsx)(d,{label:`In progress`,isChecked:`indeterminate`})]})},A={render:()=>{let e=[`email`,`sms`,`push`],[t,n]=(0,x.useState)([`email`]),r=e.every(e=>t.includes(e)),i=t.length===0,a=r?!0:i?!1:`indeterminate`;return(0,S.jsxs)(u,{label:`Notifications`,hasDividers:!0,children:[(0,S.jsx)(d,{label:`Select all`,isChecked:a,onCheck:t=>{n(t?[...e]:[])}}),e.map(e=>(0,S.jsx)(d,{label:e.charAt(0).toUpperCase()+e.slice(1),isChecked:t.includes(e),onCheck:t=>{n(n=>t?[...n,e]:n.filter(t=>t!==e))}},e))]})}},j={render:()=>(0,S.jsx)(h,{})},M={render:e=>{let[t,n]=(0,x.useState)([`email`]),{value:r,onChange:i,...a}=e;return(0,S.jsxs)(u,{...a,value:t,onChange:n,children:[(0,S.jsx)(d,{label:`Email`,value:`email`}),(0,S.jsx)(d,{label:`SMS`,value:`sms`}),(0,S.jsx)(d,{label:`Push notification`,value:`push`})]})},args:{label:`Notification preferences`,isDisabled:!0}},N={render:()=>{let[e,t]=(0,x.useState)([`email`]);return(0,S.jsxs)(u,{label:`Notification preferences`,value:e,onChange:t,children:[(0,S.jsx)(d,{label:`Email`,value:`email`}),(0,S.jsx)(d,{label:`SMS`,value:`sms`,isLoading:!0}),(0,S.jsx)(d,{label:`Push notification`,value:`push`})]})}},P={render:()=>{let[e,t]=(0,x.useState)([`email`]);return(0,S.jsxs)(u,{label:`Notification preferences`,description:`Toggle an option — it spins while saving`,value:e,changeAction:e=>new Promise(n=>{setTimeout(()=>{t(e),n()},1500)}),hasDividers:!0,children:[(0,S.jsx)(d,{label:`Email`,value:`email`}),(0,S.jsx)(d,{label:`SMS`,value:`sms`}),(0,S.jsx)(d,{label:`Push notification`,value:`push`})]})}},F={render:e=>{let[t,n]=(0,x.useState)([]),{value:r,onChange:i,...a}=e;return(0,S.jsxs)(u,{...a,value:t,onChange:n,children:[(0,S.jsx)(d,{label:`Email`,value:`email`}),(0,S.jsx)(d,{label:`SMS`,value:`sms`,isDisabled:!0}),(0,S.jsx)(d,{label:`Push notification`,value:`push`})]})},args:{label:`Notification preferences`}},I={render:e=>{let[t,n]=(0,x.useState)([]),{value:r,onChange:i,...a}=e;return(0,S.jsxs)(u,{...a,value:t,onChange:n,children:[(0,S.jsx)(d,{label:`Email`,value:`email`}),(0,S.jsx)(d,{label:`SMS`,value:`sms`}),(0,S.jsx)(d,{label:`Push notification`,value:`push`})]})},args:{label:`Notification preferences`,status:{type:`error`,message:`Please select at least one notification method`}}},L={render:e=>{let[t,n]=(0,x.useState)([`free`]),{value:r,onChange:a,...o}=e;return(0,S.jsxs)(u,{...o,value:t,onChange:n,children:[(0,S.jsx)(d,{label:`Free tier`,value:`free`,description:`Basic features included`,endContent:(0,S.jsx)(i,{variant:`success`,label:`$0/mo`})}),(0,S.jsx)(d,{label:`Pro tier`,value:`pro`,description:`Advanced features`,endContent:(0,S.jsx)(i,{variant:`info`,label:`$9/mo`})}),(0,S.jsx)(d,{label:`Enterprise`,value:`enterprise`,description:`Custom solutions`,endContent:(0,S.jsx)(i,{variant:`purple`,label:`Custom`})})]})},args:{label:`Add-on packages`,hasDividers:!0}},R={render:()=>{let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)([`email`]),[i,a]=(0,x.useState)(!1),[o,s]=(0,x.useState)(!0);return(0,S.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`24px`,maxWidth:`400px`},children:[(0,S.jsxs)(u,{label:`Unselected`,value:e,onChange:t,children:[(0,S.jsx)(d,{label:`Option A`,value:`a`}),(0,S.jsx)(d,{label:`Option B`,value:`b`})]}),(0,S.jsxs)(u,{label:`Pre-selected`,value:n,onChange:r,children:[(0,S.jsx)(d,{label:`Email`,value:`email`}),(0,S.jsx)(d,{label:`SMS`,value:`sms`})]}),(0,S.jsxs)(u,{label:`Disabled group`,value:[`a`],onChange:()=>{},isDisabled:!0,children:[(0,S.jsx)(d,{label:`Option A`,value:`a`}),(0,S.jsx)(d,{label:`Option B`,value:`b`})]}),(0,S.jsxs)(u,{label:`With descriptions`,value:e,onChange:t,hasDividers:!0,children:[(0,S.jsx)(d,{label:`Email`,value:`email`,description:`Delivered to your inbox`}),(0,S.jsx)(d,{label:`SMS`,value:`sms`,description:`Standard rates apply`})]}),(0,S.jsxs)(u,{label:`With error`,value:[],onChange:()=>{},status:{type:`error`,message:`Please select at least one option`},children:[(0,S.jsx)(d,{label:`Option A`,value:`a`}),(0,S.jsx)(d,{label:`Option B`,value:`b`})]}),(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`h4`,{style:{margin:`0 0 8px`},children:`Standalone mode`}),(0,S.jsxs)(c,{children:[(0,S.jsx)(d,{label:`Accept terms`,isChecked:i,onCheck:a}),(0,S.jsx)(d,{label:`Subscribe`,isChecked:o,onCheck:s})]})]})]})}},z={render(){let[e,t]=(0,x.useState)([`email`]);return(0,S.jsx)(`div`,{style:{maxWidth:400},children:(0,S.jsx)(o,{children:(0,S.jsxs)(u,{label:`Notifications`,description:`Choose how to be notified`,value:e,onChange:t,children:[(0,S.jsx)(d,{value:`email`,label:`Email`,description:`Weekly digest`}),(0,S.jsx)(d,{value:`push`,label:`Push notifications`}),(0,S.jsx)(d,{value:`sms`,label:`SMS`,isDisabled:!0})]})})})}},B={render(){let[e,t]=(0,x.useState)([`admin`]);return(0,S.jsx)(`div`,{style:{maxWidth:400},children:(0,S.jsx)(o,{children:(0,S.jsxs)(u,{label:`Assign Roles`,value:e,onChange:t,hasDividers:!0,children:[(0,S.jsx)(d,{value:`admin`,label:`Admin`}),(0,S.jsx)(d,{value:`editor`,label:`Editor`}),(0,S.jsx)(d,{value:`viewer`,label:`Viewer`}),(0,S.jsx)(d,{value:`guest`,label:`Guest`})]})})})}},V={render:e=>{let[t,n]=(0,x.useState)([`comments`]),{value:r,onChange:i,...a}=e;return(0,S.jsxs)(u,{...a,value:t,onChange:n,children:[(0,S.jsx)(d,{label:`Comments, mentions, and replies across every shared workspace`,value:`comments`,description:`Delivered to the primary address listed in your account settings`}),(0,S.jsx)(d,{label:(0,S.jsx)(`span`,{children:`Security alerts for new sign-ins on phones, tablets, and desktops`}),value:`security`,description:(0,S.jsx)(`span`,{children:`Includes a weekly summary of every device that accessed your account`})}),(0,S.jsx)(d,{label:`SMS`,value:`sms`})]})},args:{label:`Notification channels for workspace activity and account security`,description:`Choose every channel that should receive these notifications. You can change this at any time.`,width:280,hasDividers:!0}},H={render:e=>{let[t,n]=(0,x.useState)([`email`]),{value:r,onChange:i,...a}=e;return(0,S.jsxs)(u,{...a,value:t,onChange:n,children:[(0,S.jsx)(d,{label:`Email`,value:`email`}),(0,S.jsx)(d,{label:`SMS`,value:`sms`}),(0,S.jsx)(d,{label:`Push notification`,value:`push`})]})},args:{label:`Notification preferences`,isDisabled:!0,disabledMessage:`Notifications are managed by your administrator`}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(args.value ?? []);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" />
        <CheckboxListItem label="SMS" value="sms" />
        <CheckboxListItem label="Push notification" value="push" />
      </CheckboxList>;
  },
  args: {
    label: 'Notification preferences'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(args.value ?? []);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" description="Receive notifications via email" />
        <CheckboxListItem label="SMS" value="sms" description="Standard messaging rates apply" />
        <CheckboxListItem label="Push notification" value="push" description="Instant alerts on your device" />
      </CheckboxList>;
  },
  args: {
    label: 'Notification preferences',
    description: 'Choose how you would like to be notified',
    hasDividers: true
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(args.value ?? ['analytics']);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label={<>
              Analytics <Link href="#analytics-details">details</Link>
            </>} value="analytics" description={<>
              Usage data only. <Link href="#privacy">Read the policy</Link>
            </>} endContent={<span data-testid="checkbox-end-content">$0/mo</span>} />
        <CheckboxListItem label="Personalization" value="personalization" description={<>
              Tailors what you see. <Link href="#privacy">Learn more</Link>
            </>} />
      </CheckboxList>;
  },
  args: {
    label: 'Data sharing',
    description: 'Labels and descriptions can carry links and other rich content without toggling the item.'
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => {
    const items = [{
      id: 'react',
      label: 'React'
    }, {
      id: 'vue',
      label: 'Vue'
    }, {
      id: 'angular',
      label: 'Angular'
    }, {
      id: 'svelte',
      label: 'Svelte'
    }];
    const [value, setValue] = useState<string[]>(['react']);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        {items.map(item => <CheckboxListItem key={item.id} label={item.label} value={item.id} />)}
      </CheckboxList>;
  },
  args: {
    label: 'Frameworks'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [accepted, setAccepted] = useState(false);
    const [subscribed, setSubscribed] = useState(true);
    const [marketing, setMarketing] = useState(false);
    return <List>
        <CheckboxListItem label="Accept terms and conditions" isChecked={accepted} onCheck={setAccepted} />
        <CheckboxListItem label="Subscribe to newsletter" description="Weekly updates about new features" isChecked={subscribed} onCheck={setSubscribed} />
        <CheckboxListItem label="Receive marketing emails" isChecked={marketing} onCheck={setMarketing} />
      </List>;
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <List>
      <CheckboxListItem label="Completed task" isChecked={true} />
      <CheckboxListItem label="Pending task" isChecked={false} />
      <CheckboxListItem label="In progress" isChecked="indeterminate" />
    </List>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => {
    const allItems = ['email', 'sms', 'push'];
    const [selected, setSelected] = useState<string[]>(['email']);
    const allChecked = allItems.every(item => selected.includes(item));
    const noneChecked = selected.length === 0;
    const selectAllState = allChecked ? true : noneChecked ? false : 'indeterminate' as const;
    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        setSelected([...allItems]);
      } else {
        setSelected([]);
      }
    };
    return <CheckboxList label="Notifications" hasDividers>
        <CheckboxListItem label="Select all" isChecked={selectAllState} onCheck={handleSelectAll} />
        {allItems.map(item => <CheckboxListItem key={item} label={item.charAt(0).toUpperCase() + item.slice(1)} isChecked={selected.includes(item)} onCheck={checked => {
        setSelected(prev => checked ? [...prev, item] : prev.filter(v => v !== item));
      }} />)}
      </CheckboxList>;
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <CheckboxListSelectAllPattern />
}`,...j.parameters?.docs?.source},description:{story:`The select-all block exactly as the CLI ships it, so browser and axe audits
cover the copied template rather than a look-alike.`,...j.parameters?.docs?.description}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(['email']);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" />
        <CheckboxListItem label="SMS" value="sms" />
        <CheckboxListItem label="Push notification" value="push" />
      </CheckboxList>;
  },
  args: {
    label: 'Notification preferences',
    isDisabled: true
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string[]>(['email']);
    return <CheckboxList label="Notification preferences" value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" />
        <CheckboxListItem label="SMS" value="sms" isLoading />
        <CheckboxListItem label="Push notification" value="push" />
      </CheckboxList>;
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value, setValue] = useState<string[]>(['email']);
    // Simulates persisting the new selection to a server. While the promise
    // is pending, the toggled item shows a spinner inside its checkbox and
    // blocks re-toggling; the other items stay interactive.
    const persist = (next: string[]) => new Promise<void>(resolve => {
      setTimeout(() => {
        setValue(next);
        resolve();
      }, 1500);
    });
    return <CheckboxList label="Notification preferences" description="Toggle an option — it spins while saving" value={value} changeAction={persist} hasDividers>
        <CheckboxListItem label="Email" value="email" />
        <CheckboxListItem label="SMS" value="sms" />
        <CheckboxListItem label="Push notification" value="push" />
      </CheckboxList>;
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>([]);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" />
        <CheckboxListItem label="SMS" value="sms" isDisabled />
        <CheckboxListItem label="Push notification" value="push" />
      </CheckboxList>;
  },
  args: {
    label: 'Notification preferences'
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>([]);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" />
        <CheckboxListItem label="SMS" value="sms" />
        <CheckboxListItem label="Push notification" value="push" />
      </CheckboxList>;
  },
  args: {
    label: 'Notification preferences',
    status: {
      type: 'error',
      message: 'Please select at least one notification method'
    }
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(['free']);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Free tier" value="free" description="Basic features included" endContent={<Badge variant="success" label="$0/mo" />} />
        <CheckboxListItem label="Pro tier" value="pro" description="Advanced features" endContent={<Badge variant="info" label="$9/mo" />} />
        <CheckboxListItem label="Enterprise" value="enterprise" description="Custom solutions" endContent={<Badge variant="purple" label="Custom" />} />
      </CheckboxList>;
  },
  args: {
    label: 'Add-on packages',
    hasDividers: true
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [value1, setValue1] = useState<string[]>([]);
    const [value2, setValue2] = useState<string[]>(['email']);
    const [standalone1, setStandalone1] = useState(false);
    const [standalone2, setStandalone2] = useState(true);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      maxWidth: '400px'
    }}>
        <CheckboxList label="Unselected" value={value1} onChange={setValue1}>
          <CheckboxListItem label="Option A" value="a" />
          <CheckboxListItem label="Option B" value="b" />
        </CheckboxList>
        <CheckboxList label="Pre-selected" value={value2} onChange={setValue2}>
          <CheckboxListItem label="Email" value="email" />
          <CheckboxListItem label="SMS" value="sms" />
        </CheckboxList>
        <CheckboxList label="Disabled group" value={['a']} onChange={() => {}} isDisabled>
          <CheckboxListItem label="Option A" value="a" />
          <CheckboxListItem label="Option B" value="b" />
        </CheckboxList>
        <CheckboxList label="With descriptions" value={value1} onChange={setValue1} hasDividers>
          <CheckboxListItem label="Email" value="email" description="Delivered to your inbox" />
          <CheckboxListItem label="SMS" value="sms" description="Standard rates apply" />
        </CheckboxList>
        <CheckboxList label="With error" value={[]} onChange={() => {}} status={{
        type: 'error',
        message: 'Please select at least one option'
      }}>
          <CheckboxListItem label="Option A" value="a" />
          <CheckboxListItem label="Option B" value="b" />
        </CheckboxList>
        <div>
          <h4 style={{
          margin: '0 0 8px'
        }}>Standalone mode</h4>
          <List>
            <CheckboxListItem label="Accept terms" isChecked={standalone1} onCheck={setStandalone1} />
            <CheckboxListItem label="Subscribe" isChecked={standalone2} onCheck={setStandalone2} />
          </List>
        </div>
      </div>;
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render() {
    const [selected, setSelected] = useState<string[]>(['email']);
    return <div style={{
      maxWidth: 400
    }}>
        <Card>
          <CheckboxList label="Notifications" description="Choose how to be notified" value={selected} onChange={setSelected}>
            <CheckboxListItem value="email" label="Email" description="Weekly digest" />
            <CheckboxListItem value="push" label="Push notifications" />
            <CheckboxListItem value="sms" label="SMS" isDisabled />
          </CheckboxList>
        </Card>
      </div>;
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render() {
    const [selected, setSelected] = useState<string[]>(['admin']);
    return <div style={{
      maxWidth: 400
    }}>
        <Card>
          <CheckboxList label="Assign Roles" value={selected} onChange={setSelected} hasDividers>
            <CheckboxListItem value="admin" label="Admin" />
            <CheckboxListItem value="editor" label="Editor" />
            <CheckboxListItem value="viewer" label="Viewer" />
            <CheckboxListItem value="guest" label="Guest" />
          </CheckboxList>
        </Card>
      </div>;
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(['comments']);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Comments, mentions, and replies across every shared workspace" value="comments" description="Delivered to the primary address listed in your account settings" />
        <CheckboxListItem label={<span>
              Security alerts for new sign-ins on phones, tablets, and desktops
            </span>} value="security" description={<span>
              Includes a weekly summary of every device that accessed your
              account
            </span>} />
        <CheckboxListItem label="SMS" value="sms" />
      </CheckboxList>;
  },
  args: {
    label: 'Notification channels for workspace activity and account security',
    description: 'Choose every channel that should receive these notifications. You can change this at any time.',
    width: 280,
    hasDividers: true
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string[]>(['email']);
    const {
      value: _value,
      onChange: _onChange,
      ...restArgs
    } = args;
    return <CheckboxList {...restArgs} value={value} onChange={setValue}>
        <CheckboxListItem label="Email" value="email" />
        <CheckboxListItem label="SMS" value="sms" />
        <CheckboxListItem label="Push notification" value="push" />
      </CheckboxList>;
  },
  args: {
    label: 'Notification preferences',
    isDisabled: true,
    disabledMessage: 'Notifications are managed by your administrator'
  }
}`,...H.parameters?.docs?.source}}},U=[`Default`,`WithDescriptions`,`RichDescriptions`,`DynamicItems`,`StandaloneMode`,`ReadOnly`,`SelectAllWithIndeterminate`,`SelectAllPatternBlock`,`Disabled`,`Loading`,`ChangeAction`,`DisabledItem`,`WithErrorStatus`,`WithEndContent`,`AllVariations`,`InsideCard`,`InsideCardWithDividers`,`LongContent`,`DisabledWithMessage`]}))();export{R as AllVariations,P as ChangeAction,w as Default,M as Disabled,F as DisabledItem,H as DisabledWithMessage,D as DynamicItems,z as InsideCard,B as InsideCardWithDividers,N as Loading,V as LongContent,k as ReadOnly,E as RichDescriptions,j as SelectAllPatternBlock,A as SelectAllWithIndeterminate,O as StandaloneMode,T as WithDescriptions,L as WithEndContent,I as WithErrorStatus,U as __namedExportsOrder,C as default};