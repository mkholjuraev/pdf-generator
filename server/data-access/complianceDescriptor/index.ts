import ServiceNames from '../service-names';
import { ServiceCallFunction } from '../call-service';
import { complianceData } from './complianceData';
import axios, { AxiosRequestHeaders } from 'axios';
import config from '../../config';

const getMock: ServiceCallFunction = () => Promise.resolve(complianceData);
const responseProcessor = (data: typeof complianceData) => data;

const getRulesQuery = {
  operationName: 'getProfiles',
  query:
    'query getProfiles($filter: String!, $policyId: ID!) {\\n  profiles(search: $filter) {\\n    totalCount\\n    edges {\\n      node {\\n        topFailedRules(policyId: $policyId) {\\n          refId\\n          title\\n          remediationAvailable\\n          severity\\n          identifier\\n          failedCount\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n',
};

const getSystemsQuery = {
  operationName: 'getSystems',
  query:
    'query getSystems($filter: String!, $policyId: ID, $perPage: Int, $page: Int, $sortBy: [String!], $tags: [String!]) {\\n  systems(\\n    search: $filter\\n    limit: $perPage\\n    offset: $page\\n    sortBy: $sortBy\\n    tags: $tags\\n  ) {\\n    totalCount\\n    edges {\\n      node {\\n        id\\n        name\\n        osMajorVersion\\n        osMinorVersion\\n        insightsId\\n        testResultProfiles(policyId: $policyId) {\\n          lastScanned\\n          compliant\\n          score\\n          supported\\n          benchmark {\\n            version\\n            __typename\\n          }\\n          rulesFailed\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n',
};

type Profile = {
  lastScanned: string;
  compliant: boolean;
  supported: boolean;
};

type System = {
  testResultProfiles: Profile[];
  id: string;
};

const scannedProfiles = (profiles: Profile[]) =>
  profiles?.filter((profile) => profile.lastScanned != 'Never') || [];

const isSystemCompliant = (system: System) => {
  const hasScannedProfiles =
    scannedProfiles(system.testResultProfiles).length > 0;
  const hasOnlyCompliantScannedProfiles = scannedProfiles(
    system.testResultProfiles
  ).every((profile) => profile.compliant);

  return hasScannedProfiles && hasOnlyCompliantScannedProfiles;
};

const isSystemNonCompliant = (system: System) => {
  const hasScannedProfiles =
    scannedProfiles(system.testResultProfiles).length > 0;
  const hasNonCompliantProfiles =
    scannedProfiles(system.testResultProfiles).filter(
      (profile) => !profile.compliant
    ).length > 0;

  return hasScannedProfiles && hasNonCompliantProfiles;
};

const hasProfiles = ({ testResultProfiles }: System) =>
  scannedProfiles(testResultProfiles).length > 0;

const isSystemSupported = (system: System) =>
  hasProfiles(system) &&
  scannedProfiles(system.testResultProfiles).every(
    (profile) => profile.supported
  );

const isSystemUnsupported = (system: System) =>
  hasProfiles(system) &&
  scannedProfiles(system.testResultProfiles).every(
    (profile) => !profile.supported
  );

export const compliantSystemsData = (systems: System[]) =>
  systems.filter(
    (system) => isSystemSupported(system) && isSystemCompliant(system)
  );

export const nonCompliantSystemsData = (systems: System[]) =>
  systems.filter(
    (system) => isSystemSupported(system) && isSystemNonCompliant(system)
  );

export const unsupportedSystemsData = (systems: System[]) =>
  systems.filter((system) => isSystemUnsupported(system));

export const supportedSystemsData = (systems: System[]) =>
  systems.filter((system) => isSystemSupported(system));

export const nonReportingSystemsData = (systems: System[]) => {
  const reportingSystemIds = [
    ...compliantSystemsData(systems),
    ...nonCompliantSystemsData(systems),
    ...unsupportedSystemsData(systems),
  ].map((system) => system.id);

  return systems.filter((system) => !reportingSystemIds.includes(system.id));
};

type ExportSettings = {
  compliantSystems: System[];
  nonCompliantSystems: System[];
  unsupportedSystems: System[];
  topTenFailedRules: unknown[];
  nonReportingSystems: System[];
  userNotes?: Record<string, unknown>;
};

export const prepareForExport = (
  exportSettings: ExportSettings,
  systems: System[],
  topTenFailedRules: unknown[]
) => {
  const compliantSystems = compliantSystemsData(systems);
  const nonCompliantSystems = nonCompliantSystemsData(systems);
  const unsupportedSystems = unsupportedSystemsData(systems);
  const nonReportingSystems = nonReportingSystemsData(systems);

  return {
    totalHostCount: systems.length,

    compliantSystemCount: compliantSystems.length,
    ...(exportSettings.compliantSystems && {
      compliantSystems: compliantSystems,
    }),

    nonCompliantSystemCount: nonCompliantSystems.length,
    ...(exportSettings.nonCompliantSystems && {
      nonCompliantSystems: nonCompliantSystems,
    }),

    unsupportedSystemCount: unsupportedSystems.length,
    ...(exportSettings.unsupportedSystems && {
      unsupportedSystems: unsupportedSystems,
    }),

    ...(exportSettings.topTenFailedRules && {
      topTenFailedRules,
    }),
    nonReportingSystemCount: nonReportingSystems.length,
    ...(exportSettings.nonReportingSystems && {
      nonReportingSystems: nonReportingSystems,
    }),
    ...(exportSettings.userNotes && { userNotes: exportSettings.userNotes }),
  };
};

const fetchBatched = (
  fetchFunction: (batchSize: number, page: number) => Promise<any>,
  total: number,
  batchSize = 50
) => {
  const pages = Math.ceil(total / batchSize) || 1;
  return Promise.all(
    [...new Array(pages)].map((_, pageIdx) =>
      fetchFunction(batchSize, pageIdx + 1)
    )
  );
};

const fetchQQl = (
  query: Record<string, any>,
  headers: AxiosRequestHeaders,
  perPage: number,
  page: number,
  policyId: string | number
) => {
  const URL = `http://${config.endpoints.compliance.hostname}:${config.endpoints.compliance.port}/api/compliance/graphql`;
  return axios.post(
    URL,
    {
      ...query,
      variables: {
        perPage,
        page,
        filter: `policy_id = ${policyId}`,
        policyId,
      },
    },
    { headers }
  );
};

export const getPolicyData = async (
  headers: AxiosRequestHeaders,
  { policyId, totalHostCount }: { policyId: string; totalHostCount: number }
) => {
  const fetchSystems = (perPage: number, page: number) =>
    fetchQQl(getSystemsQuery, headers, perPage, page, policyId);
  const fetchRules = (perPage = 10, page = 1) =>
    fetchQQl(getRulesQuery, headers, page, perPage, policyId);

  const batchedSystems = await fetchBatched(fetchSystems, totalHostCount);
  const rules = await fetchRules();
  console.log(
    JSON.stringify(batchedSystems.map((r) => r.data as unknown)),
    JSON.stringify(rules.data)
  );
  // const query = {
  //   ...qqlQuery,
  //   variables: {
  //     ...defaultVariables,
  //     filter: `policy_id = ${policyId}`,
  //     policyId: policyId,
  //   },
  // };
  // const {
  //   data: { data },
  // } = await axios.post(URL, {
  //   headers,
  //   data: query,
  // });
  // const policy = data?.profile;
  // const {
  //   exportSettings,
  //   setExportSetting,
  //   isValid: settingsValid,
  // } = useExportSettings();
};

const complianceDescriptor = {
  responseProcessor,
  path: '/api/compliance/v1/status',
  options: {
    method: 'get',
  },
  service: ServiceNames.compliance,
  mock: getMock,
};

export default complianceDescriptor;
