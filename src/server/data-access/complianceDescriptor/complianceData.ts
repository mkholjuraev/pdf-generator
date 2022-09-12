export const complianceData = {
  compliantSystemCount: 1,
  nonCompliantSystemCount: 1,
  nonReportSystemCount: 1,
  unsupportedSystemCount: 2,
  compliantSystems: [
    {
      id: 'e34fada4-d5cb-41ef-aed0-ca46f3961df4',
      insightsId: '5179fa9a-27a7-4b21-8559-39b368ac561d',
      name: 'demo_unsupported_system_c2s_2',
      osMajorVersion: 7,
      osMinorVersion: 8,
      policies: [
        {
          id: '8bc293fd-f96d-4988-ab4d-58ebc8582722',
          name: 'C2S for Red Hat Enterprise Linux 7',
          __typename: 'Profile',
        },
      ],
      tags: [
        {
          namespace: 'nBrpf',
          key: 'hIVYX',
          value: 'hfTxu',
          __typename: 'Tag',
        },
        {
          namespace: 'sXhfkfr',
          key: 'lzlgpDvlV',
          value: 'GDPRHSm',
          __typename: 'Tag',
        },
        {
          namespace: 'JvPtdubx',
          key: 'VlKsD',
          value: 'crUBA',
          __typename: 'Tag',
        },
        {
          namespace: 'kmsELxrnii',
          key: 'ZAdIP',
          value: 'BJKWekFV',
          __typename: 'Tag',
        },
        {
          namespace: 'xwkrSJIbaW',
          key: 'pMsyCkAC',
          value: 'NvStjCuUGI',
          __typename: 'Tag',
        },
      ],
      testResultProfiles: [
        {
          compliant: false,
          external: true,
          id: 'b68b0e17-f64c-41d7-a75c-e6ed991d5d03',
          lastScanned: '2022-05-12T12:05:54Z',
          name: 'C2S for Red Hat Enterprise Linux 7',
          osMajorVersion: '7',
          refId: 'xccdf_org.ssgproject.content_profile_C2S',
          score: 0.0,
          supported: true,
          ssgVersion: '0.1.46',
          rules: [
            {
              compliant: true,
              identifier:
                '{"label":"CCE-27274-0","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId: 'xccdf_org.ssgproject.content_rule_package_rsh_removed',
              remediationAvailable: true,
              severity: 'unknown',
              title: 'Uninstall rsh Package',
              __typename: 'Rule',
            },
            {
              compliant: true,
              identifier:
                '{"label":"CCE-27399-5","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId: 'xccdf_org.ssgproject.content_rule_package_ypserv_removed',
              remediationAvailable: true,
              severity: 'high',
              title: 'Uninstall ypserv Package',
              __typename: 'Rule',
            },
            {
              compliant: false,
              identifier:
                '{"label":"CCE-80645-5","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId: 'xccdf_org.ssgproject.content_rule_sshd_set_loglevel_info',
              remediationAvailable: true,
              severity: 'low',
              title: 'Set LogLevel to INFO',
              __typename: 'Rule',
            },
            {
              compliant: true,
              identifier:
                '{"label":"CCE-80226-4","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId:
                'xccdf_org.ssgproject.content_rule_sshd_enable_x11_forwarding',
              remediationAvailable: true,
              severity: 'high',
              title: 'Enable Encrypted X11 Forwarding',
              __typename: 'Rule',
            },
          ],
        },
      ],
    },
  ],
  nonCompliantSystems: [
    {
      id: '3755267c-c42d-4c21-9fb9-d8703a03f784',
      insightsId: 'db9b6e72-5cda-41cd-8d89-52ea43b743a0',
      name: 'demo_failing_system_c2s_4',
      osMajorVersion: 7,
      osMinorVersion: 8,
      policies: [
        {
          id: '8bc293fd-f96d-4988-ab4d-58ebc8582722',
          name: 'C2S for Red Hat Enterprise Linux 7',
          __typename: 'Profile',
        },
      ],
      tags: [
        {
          namespace: 'PuukZ',
          key: 'RzHWTAc',
          value: 'YIYqvTJZu',
          __typename: 'Tag',
        },
        {
          namespace: 'juHKRCj',
          key: 'haEEd',
          value: 'uklSAGD',
          __typename: 'Tag',
        },
        {
          namespace: 'HBLfOaezC',
          key: 'rxfAzVkba',
          value: 'IOuGO',
          __typename: 'Tag',
        },
        {
          namespace: 'oFcZHfcDT',
          key: 'iJexDAHdX',
          value: 'UFIVttug',
          __typename: 'Tag',
        },
        {
          namespace: 'VUDEInCgcR',
          key: 'DUrWtYS',
          value: 'kxqNK',
          __typename: 'Tag',
        },
      ],
      testResultProfiles: [
        {
          compliant: false,
          external: true,
          id: '531b51d5-bd09-4466-8078-a704309fc20e',
          lastScanned: '2022-05-12T11:58:42Z',
          name: 'C2S for Red Hat Enterprise Linux 7',
          osMajorVersion: '7',
          refId: 'xccdf_org.ssgproject.content_profile_C2S',
          rules: [
            {
              compliant: false,
              identifier:
                '{"label":"CCE-27274-0","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId: 'xccdf_org.ssgproject.content_rule_package_rsh_removed',
              remediationAvailable: true,
              severity: 'unknown',
              title: 'Uninstall rsh Package',
              __typename: 'Rule',
            },
            {
              compliant: false,
              identifier:
                '{"label":"CCE-27336-7","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId:
                'xccdf_org.ssgproject.content_rule_service_rlogin_disabled',
              remediationAvailable: true,
              severity: 'high',
              title: 'Disable rlogin Service',
              __typename: 'Rule',
            },
            {
              compliant: false,
              identifier:
                '{"label":"CCE-27337-5","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId: 'xccdf_org.ssgproject.content_rule_service_rsh_disabled',
              remediationAvailable: true,
              severity: 'high',
              title: 'Disable rsh Service',
              __typename: 'Rule',
            },
          ],
          score: 0,
          ssgVersion: '0.1.46',
          supported: true,
          __typename: 'Profile',
        },
      ],
    },
  ],
  unsupportedSystems: [
    {
      id: 'e34fada4-d5cb-41ef-aed0-ca46f3961df4',
      insightsId: '5179fa9a-27a7-4b21-8559-39b368ac561d',
      name: 'demo_unsupported_system_c2s_2',
      osMajorVersion: 7,
      osMinorVersion: 8,
      policies: [
        {
          id: '8bc293fd-f96d-4988-ab4d-58ebc8582722',
          name: 'C2S for Red Hat Enterprise Linux 7',
          __typename: 'Profile',
        },
      ],
      tags: [
        {
          namespace: 'nBrpf',
          key: 'hIVYX',
          value: 'hfTxu',
          __typename: 'Tag',
        },
        {
          namespace: 'sXhfkfr',
          key: 'lzlgpDvlV',
          value: 'GDPRHSm',
          __typename: 'Tag',
        },
        {
          namespace: 'JvPtdubx',
          key: 'VlKsD',
          value: 'crUBA',
          __typename: 'Tag',
        },
        {
          namespace: 'kmsELxrnii',
          key: 'ZAdIP',
          value: 'BJKWekFV',
          __typename: 'Tag',
        },
        {
          namespace: 'xwkrSJIbaW',
          key: 'pMsyCkAC',
          value: 'NvStjCuUGI',
          __typename: 'Tag',
        },
      ],
      testResultProfiles: [
        {
          compliant: false,
          external: true,
          id: 'b68b0e17-f64c-41d7-a75c-e6ed991d5d03',
          lastScanned: '2022-05-12T12:05:54Z',
          name: 'C2S for Red Hat Enterprise Linux 7',
          osMajorVersion: '7',
          refId: 'xccdf_org.ssgproject.content_profile_C2S',
          score: 0.0,
          supported: true,
          ssgVersion: '0.1.46',
          rules: [
            {
              compliant: true,
              identifier:
                '{"label":"CCE-27274-0","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId: 'xccdf_org.ssgproject.content_rule_package_rsh_removed',
              remediationAvailable: true,
              severity: 'unknown',
              title: 'Uninstall rsh Package',
              __typename: 'Rule',
            },
            {
              compliant: true,
              identifier:
                '{"label":"CCE-27399-5","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId: 'xccdf_org.ssgproject.content_rule_package_ypserv_removed',
              remediationAvailable: true,
              severity: 'high',
              title: 'Uninstall ypserv Package',
              __typename: 'Rule',
            },
            {
              compliant: false,
              identifier:
                '{"label":"CCE-80645-5","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId: 'xccdf_org.ssgproject.content_rule_sshd_set_loglevel_info',
              remediationAvailable: true,
              severity: 'low',
              title: 'Set LogLevel to INFO',
              __typename: 'Rule',
            },
            {
              compliant: true,
              identifier:
                '{"label":"CCE-80226-4","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId:
                'xccdf_org.ssgproject.content_rule_sshd_enable_x11_forwarding',
              remediationAvailable: true,
              severity: 'high',
              title: 'Enable Encrypted X11 Forwarding',
              __typename: 'Rule',
            },
          ],
        },
      ],
    },
    {
      id: '7d10901a-eb74-4cd6-9b3b-51a19db33aa1',
      insightsId: 'e24eb792-14c2-4b1b-ac45-a9457c7eafa8',
      name: 'demo_unsupported_system_pci-dss_2',
      osMajorVersion: 7,
      osMinorVersion: 8,
      policies: [
        {
          id: '37b22908-31b7-492b-9b9c-3b1061d34a34',
          name: 'PCI-DSS v3.2.1 Control Baseline for Red Hat Enterprise Linux 7',
          __typename: 'Profile',
        },
      ],
      tags: [
        {
          key: 'kTFfpUtxID',
          namespace: 'YusiB',
          value: 'BFJBZw',
          __typename: 'Tag',
        },
        {
          key: 'kTFfpUtxID',
          namespace: 'YusiB',
          value: 'BFJBZw',
          __typename: 'Tag',
        },
        {
          key: 'kTFfpUtxID',
          namespace: 'YusiB',
          value: 'BFJBZw',
          __typename: 'Tag',
        },
        {
          key: 'kTFfpUtxID',
          namespace: 'YusiB',
          value: 'BFJBZw',
          __typename: 'Tag',
        },
        {
          key: 'kTFfpUtxID',
          namespace: 'YusiB',
          value: 'BFJBZw',
          __typename: 'Tag',
        },
      ],
      testResultProfiles: [
        {
          compliant: false,
          external: true,
          id: '5fa5002d-904c-44b2-9494-0b5f3777b718',
          lastScanned: '2022-06-02T11:06:50Z',
          name: 'PCI-DSS v3.2.1 Control Baseline for Red Hat Enterprise Linux 7',
          osMajorVersion: '7',
          refId: 'xccdf_org.ssgproject.content_profile_pci-dss',
          rules: [
            {
              compliant: true,
              identifier:
                '{"label":"CCE-27012-4","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId:
                'xccdf_org.ssgproject.content_rule_chronyd_or_ntpd_specify_multiple_servers',
              remediationAvailable: false,
              severity: 'medium',
              title: 'Specify Additional Remote NTP Servers',
              __typename: 'Rule',
            },
            {
              compliant: true,
              identifier:
                '{"label":"CCE-27012-4","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId:
                'xccdf_org.ssgproject.content_rule_chronyd_or_ntpd_specify_multiple_servers',
              remediationAvailable: false,
              severity: 'medium',
              title: 'Specify Additional Remote NTP Servers',
              __typename: 'Rule',
            },
            {
              compliant: true,
              identifier:
                '{"label":"CCE-27012-4","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId:
                'xccdf_org.ssgproject.content_rule_chronyd_or_ntpd_specify_multiple_servers',
              remediationAvailable: false,
              severity: 'medium',
              title: 'Specify Additional Remote NTP Servers',
              __typename: 'Rule',
            },
            {
              compliant: true,
              identifier:
                '{"label":"CCE-27012-4","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId:
                'xccdf_org.ssgproject.content_rule_chronyd_or_ntpd_specify_multiple_servers',
              remediationAvailable: false,
              severity: 'medium',
              title: 'Specify Additional Remote NTP Servers',
              __typename: 'Rule',
            },
            {
              compliant: true,
              identifier:
                '{"label":"CCE-27012-4","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId:
                'xccdf_org.ssgproject.content_rule_chronyd_or_ntpd_specify_multiple_servers',
              remediationAvailable: false,
              severity: 'medium',
              title: 'Specify Additional Remote NTP Servers',
              __typename: 'Rule',
            },
          ],
          score: 58.915581,
          ssgVersion: '0.1.43',
          supported: false,
          __typename: 'Profile',
        },
      ],
    },
  ],
  policy: {
    benchmark: {
      id: 'c9072544-4a48-45cd-8b4d-b73ef0acbc38',
      version: '0.1.57',
      __typename: 'Benchmark',
    },
    complianceThreshold: 95,
    compliantHostCount: 10,
    id: '37b22908-31b7-492b-9b9c-3b1061d34a34',
    name: 'PCI-DSS v3.2.1 Control Baseline for Red Hat Enterprise Linux 7',
    osMajorVersion: '7',
    policy: {
      id: '37b22908-31b7-492b-9b9c-3b1061d34a34',
      name: 'PCI-DSS v3.2.1 Control Baseline for Red Hat Enterprise Linux 7',
      __typename: 'Profile',
    },
    policyType:
      'PCI-DSS v3.2.1 Control Baseline for Red Hat Enterprise Linux 7',
    refId: 'xccdf_org.ssgproject.content_profile_pci-dss',
    ssgVersion: '0.1.57',
    testResultHostCount: 30,
    totalHostCount: 18,
    unsupportedHostCount: 3,
    __typename: 'Profile',
  },
  topTenFailedRules: [
    {
      compliant: false,
      identifier:
        '{"label":"CCE-26876-3","system":"https://nvd.nist.gov/cce/index.cfm"}',
      refId: 'xccdf_org.ssgproject.content_rule_ensure_gpgcheck_never_disabled',
      remediationAvailable: true,
      severity: 'high',
      systemsCount: 16,
      title: 'Ensure gpgcheck Enabled for All yum Package Repositories',
      __typename: 'Rule',
    },
    {
      compliant: false,
      identifier:
        '{"label":"CCE-27157-7","system":"https://nvd.nist.gov/cce/index.cfm"}',
      refId: 'xccdf_org.ssgproject.content_rule_rpm_verify_hashes',
      remediationAvailable: true,
      severity: 'high',
      systemsCount: 16,
      title: 'Verify File Hashes with RPM',
      __typename: 'Rule',
    },
    {
      compliant: false,
      identifier:
        '{"label":"CCE-27209-6","system":"https://nvd.nist.gov/cce/index.cfm"}',
      refId: 'xccdf_org.ssgproject.content_rule_rpm_verify_permissions',
      remediationAvailable: true,
      severity: 'high',
      systemsCount: 16,
      title: 'Verify and Correct File Permissions with RPM',
      __typename: 'Rule',
    },
    {
      compliant: false,
      identifier:
        '{"label":"CCE-27286-4","system":"https://nvd.nist.gov/cce/index.cfm"}',
      refId: 'xccdf_org.ssgproject.content_rule_no_empty_passwords',
      remediationAvailable: true,
      severity: 'high',
      systemsCount: 16,
      title: 'Prevent Login to Accounts With Empty Password',
      __typename: 'Rule',
    },
    {
      compliant: false,
      identifier:
        '{"label":"CCE-27407-6","system":"https://nvd.nist.gov/cce/index.cfm"}',
      refId: 'xccdf_org.ssgproject.content_rule_service_auditd_enabled',
      remediationAvailable: true,
      severity: 'high',
      systemsCount: 10,
      title: 'Enable auditd Service',
      __typename: 'Rule',
    },
    {
      compliant: false,
      identifier:
        '{"label":"CCE-26989-4","system":"https://nvd.nist.gov/cce/index.cfm"}',
      refId:
        'xccdf_org.ssgproject.content_rule_ensure_gpgcheck_globally_activated',
      remediationAvailable: true,
      severity: 'high',
      systemsCount: 10,
      title: 'Ensure gpgcheck Enabled In Main yum Configuration',
      __typename: 'Rule',
    },
    {
      compliant: false,
      identifier:
        '{"label":"CCE-26957-1","system":"https://nvd.nist.gov/cce/index.cfm"}',
      refId: 'xccdf_org.ssgproject.content_rule_ensure_redhat_gpgkey_installed',
      remediationAvailable: true,
      severity: 'high',
      systemsCount: 10,
      title: 'Ensure Red Hat GPG Key Installed',
      __typename: 'Rule',
    },
    {
      compliant: false,
      identifier:
        '{"label":"CCE-26818-5","system":"https://nvd.nist.gov/cce/index.cfm"}',
      refId: 'xccdf_org.ssgproject.content_rule_install_hids',
      remediationAvailable: false,
      severity: 'high',
      systemsCount: 10,
      title: 'Install Intrusion Detection Software',
      __typename: 'Rule',
    },
    {
      compliant: false,
      identifier:
        '{"label":"CCE-81004-4","system":"https://nvd.nist.gov/cce/index.cfm"}',
      refId: 'xccdf_org.ssgproject.content_rule_dconf_db_up_to_date',
      remediationAvailable: false,
      severity: 'high',
      systemsCount: 10,
      title:
        'Make sure that the dconf databases are up-to-date with regards to respective keyfiles',
      __typename: 'Rule',
    },
    {
      compliant: false,
      identifier:
        '{"label":"CCE-27433-2","system":"https://nvd.nist.gov/cce/index.cfm"}',
      refId: 'xccdf_org.ssgproject.content_rule_sshd_set_idle_timeout',
      remediationAvailable: true,
      severity: 'medium',
      systemsCount: 16,
      title: 'Set SSH Idle Timeout Interval',
      __typename: 'Rule',
    },
  ],
  nonReportingSystems: [
    {
      id: 'e34fada4-d5cb-41ef-aed0-ca46f3961df4',
      insightsId: '5179fa9a-27a7-4b21-8559-39b368ac561d',
      name: 'demo_reporting_system_c19s_94',
      osMajorVersion: 7,
      osMinorVersion: 8,
      policies: [
        {
          id: '8bc293fd-f96d-4988-ab4d-58ebc8582722',
          name: 'C2S for Red Hat Enterprise Linux 7',
          __typename: 'Profile',
        },
      ],
      tags: [
        {
          namespace: 'nBrpf',
          key: 'hIVYX',
          value: 'hfTxu',
          __typename: 'Tag',
        },
        {
          namespace: 'sXhfkfr',
          key: 'lzlgpDvlV',
          value: 'GDPRHSm',
          __typename: 'Tag',
        },
        {
          namespace: 'JvPtdubx',
          key: 'VlKsD',
          value: 'crUBA',
          __typename: 'Tag',
        },
        {
          namespace: 'kmsELxrnii',
          key: 'ZAdIP',
          value: 'BJKWekFV',
          __typename: 'Tag',
        },
        {
          namespace: 'xwkrSJIbaW',
          key: 'pMsyCkAC',
          value: 'NvStjCuUGI',
          __typename: 'Tag',
        },
      ],
      testResultProfiles: [
        {
          compliant: false,
          external: true,
          id: 'b68b0e17-f64c-41d7-a75c-e6ed991d5d03',
          lastScanned: '2022-05-12T12:05:54Z',
          name: 'C2S for Red Hat Enterprise Linux 7',
          osMajorVersion: '7',
          refId: 'xccdf_org.ssgproject.content_profile_C2S',
          score: 0.0,
          supported: true,
          ssgVersion: '0.1.46',
          rules: [
            {
              compliant: true,
              identifier:
                '{"label":"CCE-27274-0","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId: 'xccdf_org.ssgproject.content_rule_package_rsh_removed',
              remediationAvailable: true,
              severity: 'unknown',
              title: 'Uninstall rsh Package',
              __typename: 'Rule',
            },
            {
              compliant: true,
              identifier:
                '{"label":"CCE-27399-5","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId: 'xccdf_org.ssgproject.content_rule_package_ypserv_removed',
              remediationAvailable: true,
              severity: 'high',
              title: 'Uninstall ypserv Package',
              __typename: 'Rule',
            },
            {
              compliant: false,
              identifier:
                '{"label":"CCE-80645-5","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId: 'xccdf_org.ssgproject.content_rule_sshd_set_loglevel_info',
              remediationAvailable: true,
              severity: 'low',
              title: 'Set LogLevel to INFO',
              __typename: 'Rule',
            },
            {
              compliant: true,
              identifier:
                '{"label":"CCE-80226-4","system":"https://nvd.nist.gov/cce/index.cfm"}',
              refId:
                'xccdf_org.ssgproject.content_rule_sshd_enable_x11_forwarding',
              remediationAvailable: true,
              severity: 'high',
              title: 'Enable Encrypted X11 Forwarding',
              __typename: 'Rule',
            },
          ],
        },
      ],
    },
  ],
  totalHostCount: 5,
  expectedSSGVersion: '0.1.46',
};
