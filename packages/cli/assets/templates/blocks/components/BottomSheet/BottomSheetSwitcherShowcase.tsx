// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {BottomSheet, BottomSheetSwitcher} from '@astryxdesign/core/BottomSheet';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {List, ListItem} from '@astryxdesign/core/List';
import {Section} from '@astryxdesign/core/Section';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';

interface Issue {
  id: string;
  title: string;
  summary: string;
  status: string;
  detail: string;
  activity: ReadonlyArray<string>;
}

const ISSUES: ReadonlyArray<Issue> = [
  {
    id: 'login-timeout',
    title: 'Sign-in times out on slow networks',
    summary: 'Reported 2 hours ago · 14 people affected',
    status: 'Investigating',
    detail:
      'Sign-in requests over slow connections exceed the gateway timeout ' +
      'before the second factor completes, so people land back on the ' +
      'sign-in form without an error message.',
    activity: [
      'Gateway timeout raised to 30 seconds on the canary tier.',
      'Retry telemetry added to the sign-in form.',
      'Issue opened from support escalation.',
    ],
  },
  {
    id: 'sync-conflict',
    title: 'Offline edits overwrite newer changes',
    summary: 'Reported yesterday · 6 people affected',
    status: 'Fix in review',
    detail:
      'Edits made offline replace newer server versions instead of merging ' +
      'when the device reconnects, dropping the changes made elsewhere in ' +
      'the meantime.',
    activity: [
      'Merge-on-reconnect fix opened for review.',
      'Conflict reproduction recorded on two devices.',
      'Issue opened from a customer report.',
    ],
  },
  {
    id: 'export-encoding',
    title: 'CSV export garbles accented names',
    summary: 'Reported 3 days ago · 2 people affected',
    status: 'Scheduled',
    detail:
      'Exports omit the byte-order mark, so spreadsheets opened with a ' +
      'legacy default encoding show accented characters as mojibake.',
    activity: [
      'Fix scheduled for the next maintenance release.',
      'Issue confirmed against three spreadsheet apps.',
    ],
  },
];

/**
 * Drill-in flow on the ordered `activeSheets` path: selecting an issue pushes
 * its details above the list, and details push a further activity level. The
 * covered sheets stay visible and receded behind the top sheet; Back pops one
 * level and Close all clears the path.
 */
export default function BottomSheetSwitcherShowcase() {
  const [activeSheets, setActiveSheets] = useState<ReadonlyArray<string>>([]);
  const [selectedIssueId, setSelectedIssueId] = useState(ISSUES[0].id);
  const issue =
    ISSUES.find(candidate => candidate.id === selectedIssueId) ?? ISSUES[0];
  const popSheet = () => setActiveSheets(current => current.slice(0, -1));
  const closeAll = () => setActiveSheets([]);

  return (
    <>
      <Button
        label="Browse open issues"
        onClick={() => setActiveSheets(['issues'])}
      />
      <BottomSheetSwitcher
        activeSheets={activeSheets}
        onActiveSheetsChange={setActiveSheets}>
        <BottomSheet sheetId="issues" label="Open issues" height="hug">
          <Section padding={4}>
            <VStack gap={3}>
              <Heading level={3}>Open issues</Heading>
              <List hasDividers>
                {ISSUES.map(candidate => (
                  <ListItem
                    key={candidate.id}
                    label={candidate.title}
                    description={candidate.summary}
                    onClick={() => {
                      setSelectedIssueId(candidate.id);
                      setActiveSheets(['issues', 'issue-details']);
                    }}
                  />
                ))}
              </List>
            </VStack>
          </Section>
        </BottomSheet>
        <BottomSheet sheetId="issue-details" label="Issue details" height="hug">
          <Section padding={4}>
            <VStack gap={4}>
              <VStack gap={1}>
                <Heading level={3}>{issue.title}</Heading>
                <Text type="supporting" color="secondary">
                  {issue.status} · {issue.summary}
                </Text>
              </VStack>
              <Text type="body">{issue.detail}</Text>
              <HStack gap={2} hAlign="end">
                <Button label="Back" variant="secondary" onClick={popSheet} />
                <Button
                  label="View activity"
                  onClick={() =>
                    setActiveSheets(['issues', 'issue-details', 'activity'])
                  }
                />
              </HStack>
            </VStack>
          </Section>
        </BottomSheet>
        <BottomSheet sheetId="activity" label="Recent activity" height="hug">
          <Section padding={4}>
            <VStack gap={4}>
              <VStack gap={1}>
                <Heading level={3}>Recent activity</Heading>
                <Text type="supporting" color="secondary">
                  {issue.title}
                </Text>
              </VStack>
              <List hasDividers>
                {issue.activity.map(entry => (
                  <ListItem key={entry} label={entry} />
                ))}
              </List>
              <HStack gap={2} hAlign="end">
                <Button label="Back" variant="secondary" onClick={popSheet} />
                <Button label="Close all" onClick={closeAll} />
              </HStack>
            </VStack>
          </Section>
        </BottomSheet>
      </BottomSheetSwitcher>
    </>
  );
}
