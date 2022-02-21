import { Text, TextContent, Title } from '@patternfly/react-core';
import React from 'react';

const DemoTemplate = ({ title, description }: {title: string, description: string}) => (
    <div>
        <Title headingLevel="h1">{title}</Title>
        <TextContent>
            <Text>
                {description}
            </Text>
        </TextContent>
    </div>
)

export default DemoTemplate;
