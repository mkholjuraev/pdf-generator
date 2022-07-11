export interface ProfileInterface {
  compliant: boolean,
  external: boolean,
  id: string,
  lastScanned: string,
  name: string,
  osMajorVersion: string,
  refId: string,
  rules: {
    compliant: boolean,
    identifier: string,
    refId: string,
    remediationAvailable: boolean,
    title: string,
    __typename: string,
  }[],
  score: number,
  ssgVersion: string,
  supported: boolean,
  __typename: string,
};

export interface ComplianceSystemsInterface {
  id: string,
  name: string,
  insightsId: string,
  osMajorVersion: number,
  osMinorVersion: number,
  expectedSSGVersion: string,
  policies: {
    id: string,
    name: string,
    __typename: string,
  }[],
  tags: {
    namespace: string,
    key: string,
    value: string,
    __typename: string,
  }[],
  testResultProfiles: {
    compliant: boolean,
    external: boolean,
    id: string,
    lastScanned: string,
    name: string,
    osMajorVersion: string,
    refId: string,
    rules: {
      compliant: boolean,
      identifier: string,
      refId: string,
      remediationAvailable: boolean,
      severity: string,
      title: string,
      __typename: string,
    }[],
    score: number,
    supported: boolean,
    ssgVersion: string,
    __typename: string,
  }[],
};

export interface SystemsTableProps {
  systems: ComplianceSystemsInterface[];
};

export interface PolicyInterface {
  benchmark: {
    id: string,
    version: string,
    __typename: string,
  },
  businessObjective: string,
  complianceThreshold: number,
  compliantHostCount: number,
  id: string,
  name: string,
  osMajorVersion: string,
  policy: {
    id: string,
    name: string,
    __typename: string,
  },
  policyType: string,
  refId: string,
  ssgVersion: string,
  testResultHostCount: number,
  totalHostCount: number,
  unsupportedHostCount: number,
  __typename:string
}

export interface RulesCollection {
  compliant: boolean,
  identifier: string,
  refId: string,
  remediationAvailable: boolean
  severity: string,
  systemsCount: number,
  title: string,
  _typename: string,
};
