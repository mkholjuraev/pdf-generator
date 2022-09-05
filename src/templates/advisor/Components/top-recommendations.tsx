import React from 'react';
import {
  CriticalRiskIcon,
  AngleDoubleUpIcon,
  EqualsIcon,
  AngleDoubleDownIcon,
} from '@patternfly/react-icons';
import {
  Grid,
  GridItem,
  Text,
  TextContent,
  Label,
} from '@patternfly/react-core';

interface TopRecProps {
  meta: {
    count: number;
  };
  links: {
    first: string;
    next: string;
    previous: string;
    last: string;
  };
  data: {
    rule_id: string;
    created_at: string;
    updated_at: string;
    description: string;
    active: boolean;
    category: {
      id: number;
      name: string;
    };
    impact: {
      name: string;
      impact: number;
    };
    likelihood: number;
    node_id: string;
    tags: string;
    playbook_count: number;
    reboot_required: boolean;
    publish_date: string;
    summary: string;
    generic: string;
    reason: string;
    more_info: string;
    impacted_systems_count: number;
    reports_shown: boolean;
    rule_status: string;
    resolution_set: {
      system_type: number;
      resolution: string;
      resolution_risk: {
        name: string;
        risk: number;
      };
      has_playbook: boolean;
    }[];
    total_risk: number;
    hosts_acked_count: number;
    rating: number;
    pathway: {
      name: string;
      component: string;
      resolution_risk: {
        name: string;
        risk: number;
      };
    };
  }[];
}

const TopRecommendations: React.FC<TopRecProps> = ({ ...topActiveRec }) => (
  <React.Fragment>
    {topActiveRec.data.map(
      ({ impacted_systems_count, total_risk, description, summary }, index) => (
        <React.Fragment key={index}>
          <Grid className="pf-u-mb-lg" hasGutter>
            <GridItem span={3}>
              <div className="pf-u-color-400">Systems exposed</div>
              <div className="pf-u-font-weight-bold pf-u-font-size-3xl">
                {impacted_systems_count}
              </div>
            </GridItem>
            <GridItem span={2}>
              <div className="pf-u-color-400">Total risk</div>
              {total_risk === 4 && (
                <Label color="red" icon={<CriticalRiskIcon />}>
                  Critical
                </Label>
              )}
              {total_risk === 3 && (
                <Label color="orange" icon={<AngleDoubleUpIcon />}>
                  Important
                </Label>
              )}
              {total_risk === 2 && (
                <Label color="orange" icon={<EqualsIcon />}>
                  Moderate
                </Label>
              )}
              {total_risk === 1 && (
                <Label color="blue" icon={<AngleDoubleDownIcon />}>
                  Low
                </Label>
              )}
            </GridItem>
            <GridItem span={7}>
              <TextContent>
                <Text>
                  {description} {summary}
                </Text>
              </TextContent>
            </GridItem>
          </Grid>
        </React.Fragment>
      )
    )}
  </React.Fragment>
);

export default TopRecommendations;
